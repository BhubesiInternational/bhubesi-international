# Quarterly Planning Framework

**Status:** Foundational draft. This framework connects the long-term [10-Year Strategy](./strategy-10-year.md) to the day-to-day execution described in [`workflows/project-kickoff.md`](../workflows/project-kickoff.md) and [`workflows/standard-workflow.md`](../workflows/standard-workflow.md).

## Purpose

Ensure that what every business unit and project works on each quarter is traceable back to the current Horizon in the [10-Year Strategy](./strategy-10-year.md) — and that leadership can see, quarter over quarter, whether the company is actually progressing.

## Cadence

| Week (of quarter) | Activity |
|---|---|
| Final 2 weeks of prior quarter | Business units and active projects draft next-quarter objectives |
| Week 1 | Executive Office review and alignment session; objectives finalized |
| Weeks 2–11 | Execution; mid-quarter check-in at week 6 |
| Week 12 (final week) | Quarterly Business Review: results vs. objectives, retrospective, input to next quarter |

## Planning Structure: Objectives and Key Results

Each business unit and active project sets, per quarter:

- **1–3 Objectives** — qualitative statements of what matters this quarter, each explicitly linked to a pillar or horizon objective in [`strategy-10-year.md`](./strategy-10-year.md).
- **2–4 Key Results per Objective** — measurable outcomes that would prove the objective was met. Key Results should draw on metrics defined in [`kpi-framework.md`](./kpi-framework.md) wherever possible, rather than inventing one-off metrics each quarter.

Avoid objectives with no measurable Key Result — an unmeasured objective cannot be reviewed honestly at quarter end.

## Process

1. **Draft** — Business unit / project lead drafts objectives, informed by the current Horizon and prior quarter's results. AI roles (Business Strategist, Project Manager, Financial Analyst — see [`ai-agents/README.md`](../ai-agents/README.md)) may support drafting.
2. **Align** — Executive Office — Strategy reviews drafts across units for conflicts, gaps, and resourcing feasibility (in coordination with Finance and HR).
3. **Commit** — Finalized objectives are recorded in the relevant `business-units/<unit>/README.md` or `projects/<project>/README.md` for the quarter, and summarized on the [Executive Dashboard](./executive-dashboard-spec.md).
4. **Execute** — Per [`workflows/standard-workflow.md`](../workflows/standard-workflow.md), with the mid-quarter check-in used to catch slippage early rather than at quarter end.
5. **Review** — At the Quarterly Business Review, score each Key Result (met / partially met / missed) honestly, and produce a short retrospective: what worked, what didn't, what changes next quarter. Log significant strategic pivots via [`templates/decision-log-template.md`](../templates/decision-log-template.md).

## New Projects Mid-Quarter

New projects proposed mid-quarter still follow [`workflows/project-kickoff.md`](../workflows/project-kickoff.md) for approval, but their first formal objective-setting aligns to the next quarterly cycle unless urgency justifies an exception approved by Executive Office — Strategy.

## Relationship to Risk

Any Key Result at risk of being missed due to a tracked risk materializing should be cross-referenced in [`risk-register.md`](./risk-register.md) rather than treated as a surprise at review time.
