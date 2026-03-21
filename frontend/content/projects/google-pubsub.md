---
title: "google-pubsub"
description: "A lightweight Google Cloud Pub/Sub emulator written in pure Go — tiny scratch image, full gRPC API compatibility."
github: "https://github.com/fbufler/google-pubsub"
tags: ["go", "grpc", "docker", "pubsub", "emulator"]
primaryLanguage: "go"
status: "active"
date: "2026-03-21"
---

A drop-in replacement for the official Google Cloud Pub/Sub emulator. The official one is a Java app shipped in a ~600 MB Docker image — this one is a single static Go binary in a scratch image.

Fully compatible with the [`cloud.google.com/go/pubsub`](https://pkg.go.dev/cloud.google.com/go/pubsub) client library.

## Features

- Full Publisher API — topics, publish, field-mask updates, retention
- Full Subscriber API — pull, streaming pull, ack/nack, dead-letter, ordering
- Snapshots — create, seek-to-snapshot, seek-to-time
- Init config — pre-create topics and subscriptions on startup
- Validated against the real Google emulator with the same integration test suite

## Quick start

```bash
docker run --rm -p 8085:8085 ghcr.io/fbufler/google-pubsub:latest
export PUBSUB_EMULATOR_HOST=localhost:8085
```
