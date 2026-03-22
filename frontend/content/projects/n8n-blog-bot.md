---
title: "n8n Blog Bot"
description: "Self-hosted n8n workflow that turns Telegram messages into published blog posts via Gemini AI and the GitHub API."
github: "https://github.com/fbufler/fbufler"
blogpost: "/blog/2026/telegram-ai-powered-blog-workflow"
tags: ["docker", "n8n", "ai", "telegram", "devops"]
primaryLanguage: "typescript"
status: "active"
date: "2026-03-22"
---

A self-hosted AI blog publishing pipeline. Send rough notes to a Telegram bot, iterate with Gemini on the draft, say "publish" — the post lands in the GitHub repo and deploys automatically.

## Architecture

```
Telegram → Traefik → n8n webhook → AI Agent (Gemini) → GitHub API → CI/CD → me.fbufler.cloud
```

- **Telegram** is the chat interface — available on any device, no special app needed
- **Traefik** terminates TLS and acts as the edge router on the VPS
- **n8n** orchestrates the workflow: trigger → auth → AI → publish decision → GitHub push
- **Gemini 2.0 Flash** handles the writing — given rough notes it produces a full markdown post with frontmatter
- **GitHub API** commits the file directly to `main`, triggering the existing CI/CD pipeline

## Security layers

Several measures to make a publicly reachable webhook safe:

**1. Minimal attack surface** — only `/webhook/*` is exposed publicly via Traefik. Everything else (`/`, `/api/*`, the n8n UI) is blocked with an IP allowlist set to `127.0.0.1/32`. The admin UI is only reachable via SSH tunnel.

**2. n8n webhook secret** — when n8n registers the webhook with Telegram, it includes a secret token. Telegram sends this token on every request as a header. n8n validates it automatically, so raw POST requests to the webhook URL are rejected with 403.

**3. Chat ID filter** — even if a request passes the webhook secret check, the workflow has a filter node that drops any message where `message.chat.id` doesn't match the owner's Telegram ID. Anyone else who finds the bot gets silently ignored.

**4. TLS everywhere** — ZeroSSL certificate via Traefik's ACME integration. Telegram requires HTTPS for webhooks, so this is mandatory anyway.

**5. Scoped GitHub token** — the token used to push blog posts has `contents: write` access to a single repository only. Compromise of the token can't affect anything outside that repo.

## Workflow nodes

| Node | Role |
|------|------|
| Telegram Trigger | Receives messages via webhook |
| Authorized? | Drops messages from unknown chat IDs |
| AI Agent | Gemini-backed agent with blog writing system prompt |
| Memory | Per-session buffer for multi-turn conversation |
| Publishing? | Detects `PUBLISH_JSON_START` in agent output |
| Parse Publish Data | Extracts slug, year, content and base64-encodes |
| Push to GitHub | PUT to GitHub contents API |
| Send Success / Send Reply | Telegram responses |

## Setup

The entire setup is scripted — credentials and workflow are created via the n8n REST API:

```bash
N8N_API_KEY=... \
GEMINI_API_KEY=... \
GITHUB_TOKEN=... \
TELEGRAM_BOT_TOKEN=... \
TELEGRAM_CHAT_ID=... \
./deploy/n8n/setup-workflow.sh
```
