# Executive Dashboard Specification

**Status:** Specification only — no implementation yet. Per current company direction, this repository documents structure ahead of application code; building this dashboard is a future initiative for [Bhubesi Labs](../business-units/bhubesi-labs/README.md), to be scoped as a project via [`workflows/project-kickoff.md`](../workflows/project-kickoff.md) when prioritized.

## Purpose

Give the Executive Office, at a glance, everything needed to answer: *"Is the company on track, and where does it need attention right now?"* The dashboard is a view over data defined elsewhere in this repository (KPIs, risk register, decisions, project status) — it does not introduce new metrics of its own.

## Audience and Access

| Audience | Access Level |
|---|---|
| Executive Office (Strategy, Governance, Finance, Legal, HR) | Full access, all sections |
| Business Unit Leads | Full access to their own unit; summary view of others |
| Project Leads | Full access to their own project's data |
| Broader team | Read-only, company-wide summary sections only |

Access levels are a data-governance decision for Executive Office — Governance to finalize before build; treat the table above as a starting default.

## Sections

### 1. Company Health Overview
- North Star Metrics from [`kpi-framework.md`](./kpi-framework.md) (revenue diversification, cash runway, % Key Results met).
- Current Strategic Horizon and progress toward its exit condition (from [`strategy-10-year.md`](./strategy-10-year.md)).

### 2. Financial Snapshot
- Budget vs. actuals, consolidated and by business unit (source: [`templates/financial-report-template.md`](../templates/financial-report-template.md) submissions).
- Cash runway trend.
- Variance flags requiring Finance attention.

### 3. Business Unit Scorecards
One card per unit ([`business-units/`](../business-units)) showing:
- Current quarter Objectives and Key Results status (from [`quarterly-planning-framework.md`](./quarterly-planning-framework.md)).
- Relevant operational and function-specific KPIs from [`kpi-framework.md`](./kpi-framework.md).

### 4. Project Portfolio Status
One row per active project ([`projects/`](../projects)) showing:
- Status (Proposed / Approved / Active / Graduated / Closed, per [`projects/README.md`](../projects/README.md)).
- Milestone progress and next milestone date.
- Any linked risk from the Risk Register at Medium or above.

### 5. Risk Heatmap
- Visual likelihood × impact grid from [`risk-register.md`](./risk-register.md).
- Filterable by category; Critical/High risks surfaced by default.

### 6. Decision Log Feed
- Recent entries logged via [`templates/decision-log-template.md`](../templates/decision-log-template.md) across the company, most recent first.
- Filter by business unit, project, or decision type (per [`decision-framework.md`](./decision-framework.md)).

### 7. KPI Trends
- Time-series view of the KPIs defined in [`kpi-framework.md`](./kpi-framework.md), by category.

## Data Sources (Today, Pre-Implementation)

Until a live system exists, the dashboard's sections map directly to manually maintained documents:

| Section | Current Source of Truth |
|---|---|
| Company Health / Financial | `executive-office/finance/`, `templates/financial-report-template.md` entries |
| Business Unit Scorecards | Each `business-units/<unit>/README.md` |
| Project Portfolio | Each `projects/<project>/README.md` |
| Risk Heatmap | `executive-brain/risk-register.md` |
| Decision Log Feed | `templates/decision-log-template.md` entries across the repo |
| KPI Trends | Manually tracked until instrumented |

## Update Cadence

- **Real-time/continuous** (once built): decision log feed, risk register changes.
- **Monthly**: financial snapshot.
- **Quarterly**: business unit scorecards, project portfolio, KPI trend review.

## Non-Goals

This spec does not cover: public-facing reporting, investor-facing materials (see [`templates/proposal-template.md`](../templates/proposal-template.md) for that), or granular day-to-day project management (see [`ai-agents/roles/project-manager.md`](../ai-agents/roles/project-manager.md) and project-level tools instead).

## Next Steps to Build

1. Draft a project brief using [`templates/project-brief-template.md`](../templates/project-brief-template.md), scoped to Bhubesi Labs.
2. Confirm data-governance/access rules with Executive Office — Governance.
3. Decide build-vs-buy (internal tool vs. existing BI platform) as a Type 2 decision per [`decision-framework.md`](./decision-framework.md).
4. Route through the standard approval process in [`workflows/project-kickoff.md`](../workflows/project-kickoff.md) before implementation begins.
