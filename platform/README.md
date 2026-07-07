# Bhubesi OS — Platform Architecture

This directory is the complete system architecture for Bhubesi OS: an AI-native enterprise platform designed to power every current Bhubesi business unit and venture, and every future subsidiary, without re-architecting each time one is added.

**Status:** Recommended architecture, authored by the [CTO seat](../ai-agents/workforce/cto.md), pending Executive Office ratification per [`executive-brain/decision-framework.md`](../executive-brain/decision-framework.md). No application code has been written against this design yet — see [`../projects/bhubesi-os/README.md`](../projects/bhubesi-os/README.md) for the existing prototype this architecture extends.

**Start here:** [`CTO-REPORT.md`](./CTO-REPORT.md) for the executive summary and rationale, then [`architecture/technology-stack.md`](./architecture/technology-stack.md) for the canonical, fully-justified technology decisions every other document in this directory builds on.

## Structure

| Directory | Covers |
|---|---|
| [`architecture/`](./architecture) | System shape, technology choices, deployment, infrastructure, security, scalability, disaster recovery |
| [`database/`](./database) | Data model, entity relationships, storage strategy, data governance |
| [`api/`](./api) | API design, authentication, authorization, integrations, versioning |
| [`frontend/`](./frontend) | Design system, UI architecture, navigation, accessibility |
| [`mobile/`](./mobile) | Mobile architecture, offline strategy |
| [`ai/`](./ai) | The AI-native core: platform, executive AI (the 12 workforce seats as running agents), memory, knowledge engine, workflow engine, agent orchestration |
| [`roadmap/`](./roadmap) | MVP through Version 3, and the implementation plan |

## Principles

Every document in this directory traces its decisions back to these stated principles — see [`architecture/system-architecture.md`](./architecture/system-architecture.md) for the explicit mapping:

AI-first · Mobile-first · Cloud-native · Multi-company capable · Modular architecture · Secure by default · Offline capable where practical · Enterprise-grade · Built for Africa with global standards.

## What This Platform Must Support

Executive Office, [RecoverHUB](../projects/recoverhub/README.md), [360Sports](../projects/360sports/README.md), [The Chairman](../projects/the-chairman/README.md), [Bhubesi Ventures](../business-units/bhubesi-ventures/README.md), [Future Ventures](../projects/future-ventures/README.md), and future subsidiaries — all as tenants of one multi-tenant platform (see [`database/data-model.md`](./database/data-model.md)), not as separate systems.

## Relationship to the Rest of This Repository

This is a technical architecture, not a replacement for the doctrine it implements:

- [`executive-brain/`](../executive-brain) defines *what the company is and how it decides* — this platform is built to enforce and operationalize that doctrine (Type 1/Type 2 decision authority, the AI Workforce's mandates) in running software, not to redefine it.
- [`ai-agents/workforce/`](../ai-agents/workforce) defines the 12 seats this platform's [`ai/executive-ai.md`](./ai/executive-ai.md) makes executable.
- [`projects/bhubesi-os/`](../projects/bhubesi-os) is the existing prototype this architecture extends into a production system — see [`roadmap/mvp.md`](./roadmap/mvp.md) for the concrete first step.

## How to Navigate This as a Reviewer

1. Read [`CTO-REPORT.md`](./CTO-REPORT.md) for the summary and recommendation.
2. Read [`architecture/technology-stack.md`](./architecture/technology-stack.md) — every technology choice and its justification lives here; other documents reference it rather than repeating it.
3. Read [`architecture/system-architecture.md`](./architecture/system-architecture.md) for the overall shape (context diagram).
4. Go deep on whichever layer matters to your review — database, API, frontend, mobile, or AI.
5. Read [`roadmap/implementation-plan.md`](./roadmap/implementation-plan.md) for sequencing and team requirements.
