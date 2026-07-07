# Bhubesi OS

## Status

**Active.** Directed directly by company leadership (standing in for the Strategy approval gate in [`workflows/project-kickoff.md`](../../workflows/project-kickoff.md)). First module — AI Chat Interface — has a real backend: real accounts, real Postgres persistence, real Claude-powered replies when an API key is configured. Remaining eight modules are not started.

## Mandate

Bhubesi OS is the software product that turns this repository's documentation-only operating system (Phases 1–2) into a real, usable platform. Where `executive-brain/`, `executive-office/`, and `ai-agents/` define *how the company should run*, Bhubesi OS is the tool that lets people actually run it that way day to day.

## Lead Business Unit

[Bhubesi Labs](../../business-units/bhubesi-labs/README.md), under the [CTO seat](../../ai-agents/workforce/cto.md), which also owns the `ai-agents/` layer this platform surfaces.

## Modules

| Module | Status | Owns / Draws On |
|---|---|---|
| AI Chat Interface | **Real backend built** (`app/`) | [`ai-agents/workforce/`](../../ai-agents/workforce/README.md) — chat with any of the 12 AI Workforce seats |
| CRM | Not started | Sales Director, Chief Marketing Officer |
| Project Management | Not started | COO, Project Manager role, [`projects/`](../../projects), [`executive-brain/quarterly-planning-framework.md`](../../executive-brain/quarterly-planning-framework.md) |
| Document Management | Not started | COO, Chief Legal Officer |
| Finance | Not started | CFO, [`templates/financial-report-template.md`](../../templates/financial-report-template.md) |
| Media Asset Library | Not started | Chief Creative Officer, Film Producer, Bhubesi Media |
| Research Database | Not started | Chief Research Officer, [`knowledge-base/`](../../knowledge-base) |
| Knowledge Search | Not started | Search across this entire repository (`docs/`, `executive-brain/`, `knowledge-base/`, etc.) |
| Automation Hub | Not started | CTO — orchestration across the AI Workforce and roles |

Module build order is a Type 2 decision for the CTO seat (see [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md)); AI Chat Interface was chosen first because it makes the [AI Workforce org chart](../../ai-agents/workforce/README.md) immediately usable rather than just documentation.

## AI Chat Interface (`app/`)

A Next.js + React + TypeScript + Tailwind CSS web app, now with a real backend: Postgres via Prisma, Auth.js authentication, and an LLM Gateway. See [`app/README.md`](./app/README.md) for the technical detail and local setup.

What's real:

- **Accounts and multi-tenancy** — signup creates a real user, a real company (tenant), and a membership; every chat request is authorized against that membership server-side.
- **Persistence** — conversations and messages are rows in Postgres, not React state. They survive a page refresh or a server restart.
- **AI Workforce replies** — calls Claude with a system prompt built from each seat's actual Responsibilities/Decision Authority/KPIs (see [`ai-agents/workforce/`](../../ai-agents/workforce/README.md)) when `ANTHROPIC_API_KEY` is set. Falls back to the original deterministic simulated responder when it isn't, so the app is fully usable either way.
- All 12 AI Workforce seats, grouped and browsable (Executive Office vs. Operating Seats).
- A live "Decision authority" panel per seat, showing Type 2 (decide directly) vs. Type 1 (must escalate) per [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md).
- A module nav bar showing all 9 planned Bhubesi OS modules, with only AI Chat enabled and the rest marked "Soon."

Verified end-to-end: signup → auto-login → chat → page reload → data still there → sign out → route re-protected. Real rows checked directly in Postgres, not just claimed.

### Running it locally

See [`app/README.md`](./app/README.md) for full setup (requires a local Postgres instance).

### What's Still Prototype-Grade

This is a first real slice of [`platform/roadmap/mvp.md`](../../platform/roadmap/mvp.md), built directly in this app rather than the full architecture in [`platform/`](../../platform/README.md):

1. Not yet migrated into the Turborepo/NestJS monorepo structure in [`platform/architecture/solution-architecture.md`](../../platform/architecture/solution-architecture.md) — this is a single Next.js app with API routes, not the target modular backend.
2. Row-Level Security (per [`platform/database/data-model.md`](../../platform/database/data-model.md)) is not yet implemented — tenant isolation is currently enforced only at the application layer (checked in every API route), not also at the database layer. Acceptable for MVP scale, a gap to close before [`platform/roadmap/version-1.md`](../../platform/roadmap/version-1.md).
3. No memory/knowledge engine (per [`platform/ai/memory-system.md`](../../platform/ai/memory-system.md)) — each Claude call only sees the current conversation, not the rest of this repository.
4. Every other module in the table above.

## Related Documents

- [`platform/`](../../platform/README.md) — the complete recommended system architecture this app is incrementally growing into, including the [CTO Report](../../platform/CTO-REPORT.md).
- [`ai-agents/workforce/`](../../ai-agents/workforce/README.md) — the org chart this interface makes usable.
- [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md) — the Type 1/Type 2 logic each seat's system prompt encodes.
- [`executive-brain/executive-dashboard-spec.md`](../../executive-brain/executive-dashboard-spec.md) — a sibling specification for a future Bhubesi OS module (Executive Dashboard), written before this one was built.
