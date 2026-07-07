# Bhubesi International — Consolidated Financial Model

**This is a structural model, not a set of real consolidated figures.** Each venture and business unit's own financial model (e.g., [RecoverHUB's](../projects/recoverhub/financial-model.md), [The Chairman's](../projects/the-chairman/financial-model.md)) is the source of truth for its own numbers; this document describes how they roll up, not what the numbers currently are.

## Consolidation Structure

```
Bhubesi International (holding company — no direct revenue)
 ├── Bhubesi Media          → The Chairman (own financial model)
 ├── Bhubesi Creative        → (service function; costs allocated to ventures it serves)
 ├── Bhubesi Labs            → Bhubesi OS, future RecoverHUB/360Sports tech (own financial models)
 └── Bhubesi Ventures        → shared-services cost center (own financial model)
       ├── RecoverHUB (own financial model)
       ├── 360Sports (own financial model)
       └── Future Ventures pipeline (evaluation cost only until graduation)
```

## How Revenue and Cost Roll Up

- **Revenue** is generated at the venture/business-unit level (e.g., RecoverHUB's grant and partnership revenue, 360Sports' sponsorship revenue) and consolidates upward for company-level reporting.
- **Shared-services cost** (strategy, finance, legal, marketing, technology — see [`operations.md`](./operations.md)) is incurred centrally and allocated across the ventures it serves, per [`../business-units/bhubesi-ventures/financial-model.md`](../business-units/bhubesi-ventures/financial-model.md).
- **The holding company itself** carries Executive Office cost (governance, strategy, finance, legal, HR) not attributable to any single venture.

## North Star Metrics (Company Level)

Owned by CEO and CFO per [`kpi-framework.md`](./kpi-framework.md):

- Revenue diversification across ≥ 2 business units.
- Cash runway (months), consolidated across the group.
- % of quarterly Key Results met, company-wide.

## Funding Sources Across the Group (Current Picture)

| Venture | Primary Funding Approach |
|---|---|
| RecoverHUB | Grants, B2B/B2G partnerships |
| 360Sports | Sponsorship, advertising, self-funded via Bhubesi Media/Ventures allocation |
| The Chairman | Internal allocation, grants/documentary funds, possible co-production advance |
| Bhubesi Ventures (shared services) | Executive Office budget allocation |
| Future Ventures pipeline | Evaluation cost only — no funding until graduation |

## Review

Consolidated financial reporting is owned by [CFO](../ai-agents/workforce/cfo.md), monthly per [`../docs/governance.md`](../docs/governance.md), using [`../templates/financial-report-template.md`](../templates/financial-report-template.md) at each venture and business-unit level, rolled up centrally.
