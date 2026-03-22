#!/usr/bin/env bash
set -euo pipefail

N8N_URL="${N8N_URL:-http://n8n.fbufler.cloud:5678}"
N8N_API_KEY="${N8N_API_KEY:?set N8N_API_KEY}"
GEMINI_API_KEY="${GEMINI_API_KEY:?set GEMINI_API_KEY}"
GITHUB_TOKEN="${GITHUB_TOKEN:?set GITHUB_TOKEN}"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:?set TELEGRAM_BOT_TOKEN}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:?set TELEGRAM_CHAT_ID}"
GITHUB_OWNER="${GITHUB_OWNER:-fbufler}"
GITHUB_REPO="${GITHUB_REPO:-fbufler}"
CURRENT_YEAR=$(date +%Y)
CURRENT_DATE=$(date +%Y-%m-%d)

H=(-H "X-N8N-API-KEY: $N8N_API_KEY" -H "Content-Type: application/json")

echo "→ Creating Gemini credential..."
GEMINI_CRED=$(curl -sf "${N8N_URL}/api/v1/credentials" "${H[@]}" -X POST \
  --data-raw "$(jq -n --arg key "$GEMINI_API_KEY" '{
    name: "Gemini API",
    type: "googlePalmApi",
    data: { apiKey: $key, host: "https://generativelanguage.googleapis.com" }
  }')")
GEMINI_CRED_ID=$(echo "$GEMINI_CRED" | jq -r '.id')
echo "   ✓ Gemini credential: $GEMINI_CRED_ID"

echo "→ Creating Telegram credential..."
TELEGRAM_CRED=$(curl -sf "${N8N_URL}/api/v1/credentials" "${H[@]}" -X POST \
  --data-raw "$(jq -n --arg token "$TELEGRAM_BOT_TOKEN" '{
    name: "Telegram Bot",
    type: "telegramApi",
    data: { accessToken: $token }
  }')")
TELEGRAM_CRED_ID=$(echo "$TELEGRAM_CRED" | jq -r '.id')
echo "   ✓ Telegram credential: $TELEGRAM_CRED_ID"

echo "→ Creating GitHub credential..."
GITHUB_CRED=$(curl -sf "${N8N_URL}/api/v1/credentials" "${H[@]}" -X POST \
  --data-raw "$(jq -n --arg token "$GITHUB_TOKEN" '{
    name: "GitHub Token",
    type: "httpBearerAuth",
    data: { token: $token }
  }')")
GITHUB_CRED_ID=$(echo "$GITHUB_CRED" | jq -r '.id')
echo "   ✓ GitHub credential: $GITHUB_CRED_ID"

SYSTEM_MESSAGE="You are a technical blog post assistant for fbufler.cloud, a personal developer blog written by Florian Bufler, a senior software engineer.

When the user gives you a rough idea or notes:
1. Write a polished, engaging markdown blog post in the style of a senior software engineer — technical, direct, with code examples where relevant
2. Suggest a URL-friendly slug (lowercase, hyphens, no special chars)
3. Suggest relevant tags from: go, typescript, docker, kubernetes, grpc, postgresql, monitoring, cloud-native, devops, cli, rest
4. Send a SHORT summary in Telegram (title, slug, tags, first 2-3 sentences) and ask if they are happy or want changes
5. Iterate until the user explicitly says it is good / approved / publish

IMPORTANT: Keep all Telegram replies short and conversational. Never dump the full markdown post into Telegram.

When the user approves, respond with ONLY this exact format and nothing else:
PUBLISH_JSON_START
{\"slug\":\"the-slug\",\"year\":\"${CURRENT_YEAR}\",\"content\":\"FULL_MARKDOWN_HERE\"}
PUBLISH_JSON_END

The content field must be the COMPLETE markdown post including frontmatter:
---
title: \"Post Title\"
date: \"${CURRENT_DATE}\"
description: \"One sentence summary\"
tags: [\"tag1\", \"tag2\"]
---

Body here...

Never output PUBLISH_JSON_START without explicit user approval."

echo "→ Creating workflow..."
PAYLOAD=$(jq -n \
  --arg geminiCredId "$GEMINI_CRED_ID" \
  --arg telegramCredId "$TELEGRAM_CRED_ID" \
  --arg githubCredId "$GITHUB_CRED_ID" \
  --arg systemMessage "$SYSTEM_MESSAGE" \
  --arg chatId "$TELEGRAM_CHAT_ID" \
  --arg githubOwner "$GITHUB_OWNER" \
  --arg githubRepo "$GITHUB_REPO" \
  '{
    name: "Blog Post Generator",
    nodes: [
      {
        id: "telegram-trigger",
        name: "Telegram Trigger",
        type: "n8n-nodes-base.telegramTrigger",
        typeVersion: 1.1,
        position: [480, 560],
        webhookId: "blog-post-generator",
        parameters: { updates: ["message"], additionalFields: {} },
        credentials: { telegramApi: { id: $telegramCredId, name: "Telegram Bot" } }
      },
      {
        id: "auth-check",
        name: "Authorized?",
        type: "n8n-nodes-base.filter",
        typeVersion: 2,
        position: [640, 560],
        parameters: {
          conditions: {
            options: { caseSensitive: true, leftValue: "", typeValidation: "strict", version: 1 },
            conditions: [{
              id: "chat-id-check",
              leftValue: "={{ $json.message.chat.id.toString() }}",
              rightValue: $chatId,
              operator: { type: "string", operation: "equals" }
            }],
            combinator: "and"
          },
          options: {}
        }
      },
      {
        id: "agent",
        name: "AI Agent",
        type: "@n8n/n8n-nodes-langchain.agent",
        typeVersion: 1.7,
        position: [800, 560],
        parameters: {
          promptType: "define",
          text: "={{ $json.message.text }}",
          options: { systemMessage: $systemMessage }
        }
      },
      {
        id: "check-publish",
        name: "Publishing?",
        type: "n8n-nodes-base.if",
        typeVersion: 2,
        position: [1008, 560],
        parameters: {
          conditions: {
            options: { caseSensitive: true, leftValue: "", typeValidation: "strict" },
            conditions: [{
              id: "publish-check",
              leftValue: "={{ $json.output }}",
              rightValue: "PUBLISH_JSON_START",
              operator: { type: "string", operation: "contains" }
            }],
            combinator: "and"
          },
          options: {}
        }
      },
      {
        id: "parse-publish",
        name: "Parse Publish Data",
        type: "n8n-nodes-base.code",
        typeVersion: 2,
        position: [1200, 432],
        parameters: {
          language: "javaScript",
          jsCode: "const output = $input.first().json.output;\nconst match = output.match(/PUBLISH_JSON_START\\s*([\\s\\S]*?)\\s*PUBLISH_JSON_END/);\nif (!match) throw new Error(\"Could not parse publish data\");\nconst data = JSON.parse(match[1]);\nconst encoded = Buffer.from(data.content).toString(\"base64\");\nreturn [{ json: { slug: data.slug, year: data.year, encoded, path: `frontend/content/blog/${data.year}/${data.slug}.md` } }];"
        }
      },
      {
        id: "github-push",
        name: "Push to GitHub",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.4,
        position: [1408, 432],
        parameters: {
          method: "PUT",
          url: ("={{ `https://api.github.com/repos/" + $githubOwner + "/" + $githubRepo + "/contents/${$json.path}` }}"),
          authentication: "predefinedCredentialType",
          nodeCredentialType: "httpBearerAuth",
          sendHeaders: true,
          headerParameters: {
            parameters: [
              { name: "X-GitHub-Api-Version", value: "2022-11-28" },
              { name: "User-Agent", value: "n8n" }
            ]
          },
          sendBody: true,
          bodyParameters: {
            parameters: [
              { name: "message", value: "={{ `feat: add blog post ${$json.slug}` }}" },
              { name: "content", value: "={{ $json.encoded }}" },
              { name: "branch", value: "main" }
            ]
          },
          options: {}
        },
        credentials: { httpBearerAuth: { id: $githubCredId, name: "GitHub Token" } }
      },
      {
        id: "telegram-success",
        name: "Send Success",
        type: "n8n-nodes-base.telegram",
        typeVersion: 1.2,
        position: [1600, 432],
        parameters: {
          chatId: $chatId,
          text: "={{ `✅ Published! https://me.fbufler.cloud/blog/${$(\"Parse Publish Data\").item.json.year}/${$(\"Parse Publish Data\").item.json.slug}` }}",
          additionalFields: {}
        },
        credentials: { telegramApi: { id: $telegramCredId, name: "Telegram Bot" } }
      },
      {
        id: "telegram-reply",
        name: "Send Reply",
        type: "n8n-nodes-base.telegram",
        typeVersion: 1.2,
        position: [1200, 672],
        parameters: {
          chatId: "={{ $(\"Telegram Trigger\").item.json.message.chat.id }}",
          text: "={{ $json.output.replace(/[*_`\\[\\]]/g, \"\").substring(0, 4000) }}",
          additionalFields: {}
        },
        credentials: { telegramApi: { id: $telegramCredId, name: "Telegram Bot" } }
      },
      {
        id: "gemini",
        name: "Gemini",
        type: "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
        typeVersion: 1,
        position: [800, 784],
        parameters: { modelName: "models/gemini-2.0-flash", options: {} },
        credentials: { googlePalmApi: { id: $geminiCredId, name: "Gemini API" } }
      },
      {
        id: "memory",
        name: "Memory",
        type: "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        typeVersion: 1.3,
        position: [1008, 784],
        parameters: {
          sessionIdType: "customKey",
          sessionKey: "={{ $(\"Telegram Trigger\").item.json.message.chat.id }}",
          contextWindowLength: 30
        }
      }
    ],
    connections: {
      "Telegram Trigger": { main: [[{ node: "Authorized?", type: "main", index: 0 }]] },
      "Authorized?": { main: [[{ node: "AI Agent", type: "main", index: 0 }]] },
      "AI Agent": { main: [[{ node: "Publishing?", type: "main", index: 0 }]] },
      "Publishing?": {
        main: [
          [{ node: "Parse Publish Data", type: "main", index: 0 }],
          [{ node: "Send Reply", type: "main", index: 0 }]
        ]
      },
      "Parse Publish Data": { main: [[{ node: "Push to GitHub", type: "main", index: 0 }]] },
      "Push to GitHub": { main: [[{ node: "Send Success", type: "main", index: 0 }]] },
      "Gemini": { ai_languageModel: [[{ node: "AI Agent", type: "ai_languageModel", index: 0 }]] },
      "Memory": { ai_memory: [[{ node: "AI Agent", type: "ai_memory", index: 0 }]] }
    },
    settings: { executionOrder: "v1" }
  }')

WORKFLOW=$(curl -sf "${N8N_URL}/api/v1/workflows" "${H[@]}" -X POST --data-raw "$PAYLOAD")
WORKFLOW_ID=$(echo "$WORKFLOW" | jq -r '.id')
echo "   ✓ Workflow created: $WORKFLOW_ID"

echo ""
echo "✓ Done!"
echo "  1. Open n8n via SSH tunnel → activate 'Blog Post Generator'"
echo "  2. Message your Telegram bot to start writing"
