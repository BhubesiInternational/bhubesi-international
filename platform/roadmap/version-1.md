# Version 1

## Goal

Give ventures real operational tools, and prove the mobile/offline architecture with genuine field usage — not just the web/AI foundation from [`mvp.md`](./mvp.md).

## Scope

| Item | Description |
|---|---|
| CRM module | Contact and deal tracking (see [`../database/data-model.md`](../database/data-model.md)) — first real users: [Sales Director](../../ai-agents/workforce/sales-director.md) seat, Bhubesi Ventures' deal-flow tracking (see [`business-units/bhubesi-ventures/operations.md`](../../business-units/bhubesi-ventures/operations.md)) |
| Project Management module | Objectives/Key Results tracking per [`executive-brain/quarterly-planning-framework.md`](../../executive-brain/quarterly-planning-framework.md), milestone tracking per venture |
| Mobile app (first release) | Core screens for CRM and Documents, per [`../mobile/mobile-architecture.md`](../mobile/mobile-architecture.md) — read + light-write, not yet full offline sync |
| Offline sync (initial) | PowerSync integration per [`../mobile/offline-strategy.md`](../mobile/offline-strategy.md), scoped to CRM and Documents only |
| RecoverHUB and 360Sports onboarded as full tenants | Real operational data, not pilot/demo data |
| Google Workspace / Zoom integration | Meeting notes ingestion into the Knowledge Engine per [`../api/integrations.md`](../api/integrations.md) |

## Explicitly Out of Scope

Finance module, Media Asset Library, Automation Hub (workflow engine), Research Database, full mobile parity, external partner API.

## Success Criteria

- A RecoverHUB or 360Sports staff member's daily work (partner/contact tracking, project status) genuinely happens in Bhubesi OS, not a spreadsheet.
- The mobile app is used in a real field scenario (a RecoverHUB partner visit or a 360Sports event) with at least one offline period bridged successfully.
- Meeting notes automatically become searchable knowledge without manual re-entry.

## Sequencing Rationale

CRM and Project Management before Finance: these two modules have the clearest immediate operational pain today (per the ventures' own `operations.md` documents describing manual/informal tracking), while Finance's stakes (real money, audit requirements) justify waiting until the platform has a release of real-world hardening behind it first.

## Next

[`version-2.md`](./version-2.md).
