---
title: "Building a lightweight Google Pub/Sub emulator in Go"
date: "2026-03-21"
description: "Why I replaced a 600 MB Java Docker image with a tiny Go binary — and how I kept full API compatibility."
tags: ["go", "grpc", "docker", "pubsub"]
draft: false
---

The official Google Cloud Pub/Sub emulator works fine, but it comes with a cost: it's a Java application packaged in a Docker image that weighs around **600 MB**. For local development or CI, that's a lot of overhead for something that just needs to shuffle messages around.

So I built a replacement in Go.

## The goal

Full drop-in compatibility with the official emulator — meaning the [`cloud.google.com/go/pubsub`](https://pkg.go.dev/cloud.google.com/go/pubsub) client library should work against it without any changes. The same gRPC API, the same behaviour.

The result is a **scratch-based Docker image** with a single static binary.

## What it supports

- Full Publisher API — topics, publish, field-mask updates, retention policies
- Full Subscriber API — pull, streaming pull, ack/nack, dead-letter topics, message ordering
- Snapshots — create, seek-to-snapshot, seek-to-time
- Init config — pre-create topics and subscriptions at startup via a YAML file

## Init config

One feature I added on top: an init config that lets you declare your topics and subscriptions upfront, so you don't need setup scripts in your tests or local dev environment.

```yaml
projects:
  - id: my-project
    topics:
      - name: orders
        subscriptions:
          - name: orders-processor
            ack_deadline_seconds: 30
```

```bash
docker run --rm -p 8085:8085 \
  -e INIT_CONFIG=/etc/pubsub/init.yaml \
  -v $(pwd)/init.yaml:/etc/pubsub/init.yaml:ro \
  ghcr.io/fbufler/google-pubsub:latest
```

## How I validated it

I wrote an integration test suite and ran it against both the official Google emulator and mine. Same tests, same assertions. If it passes against Google's, it should pass against ours — and it does.

## Proto toolchain

The gRPC server is generated from the official `googleapis/googleapis` proto definitions using [buf](https://buf.build) and the [connect-go](https://connectrpc.com/docs/go/getting-started/) plugin. Connect produces clean idiomatic Go and is fully gRPC-compatible, so existing clients work without modification.

## Try it

```bash
docker run --rm -p 8085:8085 ghcr.io/fbufler/google-pubsub:latest
export PUBSUB_EMULATOR_HOST=localhost:8085
```

Source on [GitHub](https://github.com/fbufler/google-pubsub). Apache 2.0 — and if you use it and we ever meet, buy me a beer.
