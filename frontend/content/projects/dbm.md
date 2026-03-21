---
title: "dbm"
description: "A CLI database monitoring tool in Go — connectivity, read/write health checks, replica master identification, and a JSON metrics endpoint."
github: "https://github.com/fbufler/dbm"
tags: ["go", "postgresql", "sqlite", "cli", "monitoring"]
primaryLanguage: "go"
status: "archived"
date: "2023-12-04"
---

A small CLI tool for monitoring databases. Useful when you need to quickly identify your replica master, check connectivity, or grep uptime and health metrics across multiple database instances.

Supports PostgreSQL and SQLite. Results can be served as JSON over HTTP.

## Commands

```bash
dbm setup   # create required tables on configured databases
dbm local   # run a one-shot health check and print results
dbm serve   # continuously test and expose results as JSON
```

## Config

```yaml
test_timeout: 5
test_interval: 30
databases:
  - host: localhost
    port: 5432
    username: postgres
    password: postgres
    database: postgres
    connection_timeout: 5
```
