# Version 2

## Goal

Bring in the highest-stakes and highest-storage-volume modules once the platform has a proven security, reliability, and mobile track record from [`version-1.md`](./version-1.md).

## Scope

| Item | Description |
|---|---|
| Finance module | Budget tracking, transaction recording, financial reporting per [`../database/data-model.md`](../database/data-model.md), replacing the manual [`templates/financial-report-template.md`](../../templates/financial-report-template.md) process with a real system feeding [CFO seat](../../ai-agents/workforce/cfo.md) workflows |
| Media Asset Library | Video/image storage and delivery per [`../database/storage-strategy.md`](../database/storage-strategy.md) — serves 360Sports' content volume and The Chairman's production assets directly |
| Automation Hub (Workflow Engine goes live) | Temporal-backed execution of [`workflows/decision-making.md`](../../workflows/decision-making.md) and [`workflows/project-kickoff.md`](../../workflows/project-kickoff.md) per [`../ai/workflow-engine.md`](../ai/workflow-engine.md) |
| Full mobile parity | Media capture (camera integration per [`../mobile/mobile-architecture.md`](../mobile/mobile-architecture.md)), full offline sync across all modules per [`../mobile/offline-strategy.md`](../mobile/offline-strategy.md) |
| Multi-tenancy expansion | Onboarding process hardened for new tenants — the first [Future Ventures](../../projects/future-ventures/README.md) graduation (e.g., Bhubesi AI or Bhubesi Studios, once evaluated per [`../../projects/future-ventures/sops.md`](../../projects/future-ventures/sops.md)) becomes a real test of "Multi-company capable" beyond the founding ventures |
| Payment integration | Paystack/Flutterwave/Stripe per [`../api/integrations.md`](../api/integrations.md), activated whichever venture first launches a paid revenue line (RecoverHUB coaching, 360Sports subscriptions) |
| Search upgrade evaluation | Revisit Postgres full-text search vs. a dedicated search engine per [`../architecture/technology-stack.md`](../architecture/technology-stack.md)'s deferred decision, based on real volume by this point |

## Explicitly Out of Scope

Research Database, external partner API, multi-region infrastructure, SOC 2 certification push.

## Success Criteria

- Financial reporting for at least one venture runs entirely through the platform, with [CFO seat](../../ai-agents/workforce/cfo.md) AI-assisted analysis grounded in real transaction data.
- The Chairman's production team uses the Media Asset Library as its actual footage/asset store, not an ad hoc external drive.
- At least one new tenant (beyond the founding ventures) onboards without any code change — proving multi-tenancy works as designed, not just as documented.

## Next

[`version-3.md`](./version-3.md).
