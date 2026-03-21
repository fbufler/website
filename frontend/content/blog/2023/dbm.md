---
title: "dbm — a database monitoring CLI in Go"
date: "2023-12-04"
description: "A small tool I built in 2023 to answer one recurring question: which replica is the master right now?"
tags: ["go", "postgresql", "sqlite", "cli", "monitoring", "kubernetes"]
draft: false
---

![dbm](/images/dbm.png)

In late 2023, my team and I faced a recurring challenge: managing multiple database instances without a streamlined way to distinguish between primary masters and read-only replicas. At the time, our infrastructure was hosted on-premises via [Cloud Foundry](https://www.cloudfoundry.org/), a setup that lacked native support for automatic master detection or seamless connection failover.

The result was a brittle, manual switchover process during database failures. To bridge this gap, I proactively developed a proof-of-concept tool to automate health checks, which I later refactored and integrated natively into **Kubernetes** for production use.

This tool is `dbm`.

### The Challenge

When operating a PostgreSQL cluster with a primary-replica architecture, three critical questions arise constantly:
1. **Identification:** Which host is currently the primary (master) node?
2. **State:** Is the instance currently accepting write operations?
3. **Performance:** What is the connection latency across the entire fleet?

While these metrics can be checked manually, doing so at scale is inefficient and error-prone during a high-pressure incident.

### Solution: How `dbm` Works

`dbm` is a lightweight CLI tool written in **Go** that executes connectivity and read/write health checks against a defined list of database instances.

Users define their infrastructure in a simple `yaml` configuration:

```yaml
test_timeout: 5
test_interval: 30
databases:
  - host: localhost
    port: 5432
    username: postgres
    database: postgres
    connection_timeout: 5
  - host: localhost
    port: 5433
    username: postgres
    database: postgres
    connection_timeout: 5
```

The tool offers two modes of operation:
* **One-shot Mode:** Use `dbm local` for a quick status report in the terminal.
* **Service Mode:** Use `dbm serve` to expose real-time health data as a JSON endpoint, ideal for integration with monitoring dashboards or Kubernetes liveness probes.

#### Example JSON Output:
```json
{
  "results": {
    "localhost:5432/postgres": {
      "connectable": true,
      "connection_time": 81034,
      "writable": true,
      "readable": true
    },
    "localhost:5433/postgres": {
      "connectable": true,
      "connection_time": 248551,
      "writable": false,
      "readable": true
    }
  }
}
```
The **`writable`** flag is the most critical metric here—providing immediate confirmation of which node is the primary.

### Expanded Capabilities: SQLite Support
I eventually implemented **SQLite** support to facilitate local development and allow integration tests to run without the overhead of a full PostgreSQL instance. This expanded the tool’s utility to include local database auditing within the same workflow.

### Retrospective
Looking back, `dbm` was a highly effective solution for the specific infrastructure constraints we faced. While the codebase reflects its origins as a rapid "scratchpad" project—utilizing plaintext configurations and hardcoded test table names—it successfully automated a critical manual process. 

More importantly, it served as an excellent exercise in building robust CLIs in Go, implementing YAML configuration parsing, and designing automated integration test suites.

**View the Source:** [GitHub - fbufler/dbm](https://github.com/fbufler/dbm)
