# KPI Framework

**Status:** Foundational draft. Defines what the company measures and why; feeds directly into the [Executive Dashboard](./executive-dashboard-spec.md) and the [Quarterly Planning Framework](./quarterly-planning-framework.md)'s Key Results.

## Principle

A metric only belongs here if someone would change a decision based on it moving. Vanity metrics — numbers that are nice to report but don't inform action — do not belong in this framework or on the dashboard.

## North Star Metrics (Company-Level)

One per major value stream, reviewed at every Quarterly Business Review:

| North Star Metric | Why It Matters |
|---|---|
| **Diversified revenue across ≥2 business units** | Tests progress against the Horizon 2 exit condition in [`strategy-10-year.md`](./strategy-10-year.md) and mitigates R-001 in [`risk-register.md`](./risk-register.md) |
| **Cash runway (months)** | The single earliest warning signal of existential financial risk |
| **Active projects meeting their quarterly Key Results** | Tests whether the company executes on what it plans, not just what it plans |

## KPI Categories by Function

### Financial (owned by [Executive Office — Finance](../executive-office/finance/README.md))
- Revenue by business unit, vs. budget.
- Budget variance (actual vs. planned), per [`templates/financial-report-template.md`](../templates/financial-report-template.md).
- Cash runway in months.
- Cost per project/production relative to plan.

### Strategic (owned by [Executive Office — Strategy](../executive-office/strategy/README.md))
- Horizon exit-condition progress (see [`strategy-10-year.md`](./strategy-10-year.md)).
- Number and outcome of Quarterly Objectives met vs. missed.
- New venture pipeline size and conversion rate ([`projects/future-ventures/`](../projects/future-ventures)).

### Operational (owned by business unit / project leads, aggregated by [Operations Manager role](../ai-agents/roles/operations-manager.md))
- Delivery velocity (milestones hit on time vs. planned) per project.
- Cycle time from decision to execution (tests [`decision-framework.md`](./decision-framework.md) effectiveness).
- Documentation currency — % of business units/projects with up-to-date README status.

### People (owned by [Executive Office — Human Resources](../executive-office/human-resources/README.md))
- Headcount vs. plan.
- Retention rate.
- Key-person dependency count (roles with no documented backup — ties to R-004 in [`risk-register.md`](./risk-register.md)).

### Media / Brand (owned by [Bhubesi Media](../business-units/bhubesi-media/README.md) and [Bhubesi Creative](../business-units/bhubesi-creative/README.md))
- Production/content delivered on schedule.
- Audience reach and engagement (once distribution begins).
- Brand consistency — adherence to [`knowledge-base/brand-guidelines.md`](../knowledge-base/brand-guidelines.md), once formalized.

### Technology (owned by [Bhubesi Labs](../business-units/bhubesi-labs/README.md))
- Product usage/adoption, once shipped.
- System reliability (once in production).
- AI-agent decision quality — % of AI-recommended decisions accepted without material rework.

### Governance / Risk (owned by [Executive Office — Governance](../executive-office/governance/README.md))
- Number of open High/Critical risks in [`risk-register.md`](./risk-register.md).
- % of Type 1 decisions logged per [`decision-framework.md`](./decision-framework.md) (documentation compliance).
- Time-to-escalation for issues requiring Executive Office attention.

## Cadence

| Frequency | Activity |
|---|---|
| Continuous | Executive Dashboard reflects current values (see [`executive-dashboard-spec.md`](./executive-dashboard-spec.md)) |
| Monthly | Financial KPIs reported per [`docs/governance.md`](../docs/governance.md) |
| Quarterly | Full KPI review at the Quarterly Business Review; Key Results scored against these metrics |
| Annually | KPI set itself reviewed for relevance alongside the strategic review in [`strategy-10-year.md`](./strategy-10-year.md) |

## Adding or Retiring a KPI

Propose changes through [`decision-framework.md`](./decision-framework.md) (Type 2 decision in most cases) and update this document directly — do not let the dashboard and this framework drift out of sync.
