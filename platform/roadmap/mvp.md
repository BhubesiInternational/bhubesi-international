# MVP

## Goal

Prove the AI Workforce is genuinely useful in daily operation before building the other eight Bhubesi OS modules. The MVP is deliberately narrow — it upgrades what already exists (the [chat interface prototype](../../projects/bhubesi-os/README.md)) to production quality rather than starting new module construction.

## Scope

| Item | Description |
|---|---|
| Monorepo migration | Move `projects/bhubesi-os/app` into the `apps/web` structure described in [`../architecture/solution-architecture.md`](../architecture/solution-architecture.md); stand up `apps/api` (NestJS) |
| Real authentication | Supabase Auth per [`../api/authentication.md`](../api/authentication.md), replacing the prototype's no-auth state |
| Multi-tenancy foundation | `Company`, `User`, `UserCompanyRole` tables with RLS per [`../database/data-model.md`](../database/data-model.md) — even with only 1–2 real tenants at launch, the isolation model must exist from day one, not be retrofitted |
| Real AI Chat | Replace `responder.ts`'s simulated logic with the LLM Gateway and Executive AI seat configuration per [`../ai/ai-platform.md`](../ai/ai-platform.md) and [`../ai/executive-ai.md`](../ai/executive-ai.md) |
| Basic memory | Tier 1 (persisted conversations) and Tier 3 (this documentation repository ingested) per [`../ai/memory-system.md`](../ai/memory-system.md) — Tier 2 RAG retrieval working end to end |
| Basic Knowledge Search | Search over the ingested documentation corpus (see [`../ai/knowledge-engine.md`](../ai/knowledge-engine.md)) |
| Minimal Document Management | Upload and retrieve documents with classification tagging (see [`../database/data-governance.md`](../database/data-governance.md)) — enough to support Chief Legal Officer and Grant Writer seat workflows |
| Security and DR baseline | Everything in [`../architecture/security-architecture.md`](../architecture/security-architecture.md) and [`../architecture/disaster-recovery.md`](../architecture/disaster-recovery.md) marked as a launch requirement, not deferred |

## Explicitly Out of Scope for MVP

CRM, Project Management, Finance, Media Asset Library, Research Database, Automation Hub, mobile app, offline sync. Each has its own roadmap entry below.

## Success Criteria

- An Executive Office member can have a real, LLM-backed conversation with any of the 12 seats, grounded in this repository's actual content (a seat can correctly answer "what's my decision authority" by retrieving its own workforce document).
- At least one real venture (recommend starting with whichever of RecoverHUB/360Sports/The Chairman has the most active near-term need) operates as a real tenant with real users.
- Security and DR runbooks exist and have been tested once, per their respective documents.

## Sequencing Rationale

AI Chat first, not last, because it's the one module where the underlying documentation (all of `ai-agents/workforce/`) already exists in complete, structured form — the fastest path to a genuinely useful production system, and the best real-world test of the Executive AI / Memory / Knowledge Engine architecture before building further modules on top of it.

## Next

[`version-1.md`](./version-1.md).
