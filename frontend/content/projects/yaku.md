---
title: "yaku-cloud-platform"
description: "A Cloud-Native Governance-as-Code platform automating compliance and quality gates through a Go-based orchestration engine and GitOps."
github: "https://github.com/B-S-F/yaku"
tags: ["go","TypeScript", "NestJS", "kubernetes", "argocd", "governance-as-code", "platform-engineering"]
primaryLanguage: "go"
status: "archived"
date: "2024-03-21"
---


## Architecting YAKU: Engineering Governance-as-Code

At Bosch Software Flow, I served as a Senior Software Engineer for **YAKU**, a platform designed to replace manual spreadsheets with automated, verifiable compliance. I was responsible for the core API architecture and the cloud orchestration layer that allows YAKU to execute "Autopilots"—specialized micro-services that collect and evaluate evidence from various DevOps tools.

### The Core Orchestration
The heart of YAKU is its **Core Engine**, which I architect in **Go**. This engine handles the lifecycle of a "Run," managing the execution of multiple Autopilots and consolidating their results into a standardized evidence format. 
* **API First:** I designed the [Core Interfaces](https://b-s-f.github.io/yaku/reference/interfaces/index.html) to ensure a clean separation between the orchestrator and the execution environment.
* **Autopilot Ecosystem:** I developed the framework for [Autopilots](https://b-s-f.github.io/yaku/autopilots/index.html), enabling them to run as ephemeral workloads that interact with the YAKU API to report compliance status.
* **Distributed Execution** As we required a workflow execution engine we did not rebuilt one ourself but stuck with [Argo Workflows](https://argoproj.github.io/workflows/).

### Cloud-Native Delivery via GitOps
To support the scale required by Bosch, I engineered the deployment strategy using a modern Cloud-Native stack:
* **Flux & Helm & Kubernetes:** I supported designing and implementing the **GitOps** workflow, ensuring that the YAKU infrastructure and its various microservices are deployed declaratively and remain in sync with the repository.
* **Scalable Execution:** By leveraging Kubernetes, the platform can dynamically scale the execution of Autopilots, providing immediate feedback on quality gates during the CI/CD process.

### Impact & Retrospective
YAKU represents a shift from "checking boxes" to "checking code." By building a robust API and a reliable orchestration layer, we enabled teams to automate their release evidence. This project allowed me to combine my experience in high-stability systems (from my automotive background) with the agility of modern cloud-native platform engineering.
