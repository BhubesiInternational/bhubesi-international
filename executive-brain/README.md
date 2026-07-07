# Executive Brain

The Executive Brain is the doctrine layer of Bhubesi International — the set of foundational documents that everything else in this repository operates from. Where [`executive-office/`](../executive-office) is the *function* that governs the company day to day, the Executive Brain is the *reference material* that function (and every business unit, project, and AI agent) is bound by.

If `CLAUDE.md` is the constitution for how the AI operating system behaves, the Executive Brain is the constitution — and supporting doctrine — for how the company itself behaves.

## Contents

| Document | Answers |
|---|---|
| [`constitution.md`](./constitution.md) | What is Bhubesi International, structurally and legally, and what are the non-negotiable rules of how it governs itself? |
| [`vision-mission-values.md`](./vision-mission-values.md) | Where are we going, what do we do, and what do we refuse to compromise on? |
| [`strategy-10-year.md`](./strategy-10-year.md) | What is the long-term path from today to a mature, world-class company? |
| [`decision-framework.md`](./decision-framework.md) | How do we decide, quickly and well, at every level of the company? |
| [`quarterly-planning-framework.md`](./quarterly-planning-framework.md) | How does long-term strategy become this quarter's work? |
| [`risk-register.md`](./risk-register.md) | What could hurt us, how badly, and who owns watching it? |
| [`kpi-framework.md`](./kpi-framework.md) | How do we know if we're actually winning? |
| [`executive-dashboard-spec.md`](./executive-dashboard-spec.md) | What should leadership see, at a glance, to run the company? |
| [`bhubesi-international-profile.md`](./bhubesi-international-profile.md) | How does the parent holding company itself map onto the six-lens venture model (Strategy, SOPs, Marketing, Operations, Financial Model, AI Agents) used for every venture in `projects/`? |
| [`sops.md`](./sops.md) | Holding-company-level operating procedures (new venture approval, shared-services delivery, cross-subsidiary escalation) |
| [`marketing.md`](./marketing.md) | How the Bhubesi International parent brand itself is positioned, distinct from any venture's own marketing |
| [`operations.md`](./operations.md) | How the holding company operates across every subsidiary and venture |
| [`financial-model.md`](./financial-model.md) | How revenue and cost consolidate across the group |

## How the Executive Brain Relates to the Rest of the Repository

```
executive-brain/            (doctrine: constitution, vision, strategy, decision rules, risk, KPIs)
        │
        ▼ operationalized by
executive-office/           (function: strategy, governance, finance, legal, HR)
        │
        ▼ staffs & resources
business-units/  ──▶  projects/
        │
        ▼ executed using
workflows/, templates/, ai-agents/   (the shared operating layer — see docs/architecture.md)
```

Concretely:

- [`docs/governance.md`](../docs/governance.md) states *who* decides what; [`decision-framework.md`](./decision-framework.md) states *how* a decision should be reasoned through once you know who owns it.
- [`executive-office/strategy/`](../executive-office/strategy) is the function that maintains and executes against [`strategy-10-year.md`](./strategy-10-year.md) and [`vision-mission-values.md`](./vision-mission-values.md).
- [`executive-office/governance/`](../executive-office/governance) owns [`risk-register.md`](./risk-register.md) as its live risk tracking instrument.
- [`workflows/project-kickoff.md`](../workflows/project-kickoff.md) and [`workflows/decision-making.md`](../workflows/decision-making.md) are the day-to-day procedures that implement [`quarterly-planning-framework.md`](./quarterly-planning-framework.md) and [`decision-framework.md`](./decision-framework.md) respectively.
- [`kpi-framework.md`](./kpi-framework.md) defines what the [`executive-dashboard-spec.md`](./executive-dashboard-spec.md) must display.
- Every venture under [`projects/`](../projects) (RecoverHUB, 360Sports, The Chairman, Future Ventures) and [`business-units/bhubesi-ventures/`](../business-units/bhubesi-ventures) is modeled through the same six-lens structure as [`bhubesi-international-profile.md`](./bhubesi-international-profile.md) uses for the parent company: `strategy.md`, `sops.md`, `marketing.md`, `operations.md`, `financial-model.md`, `ai-agents.md`.

## Precedence

Where a document elsewhere in this repository conflicts with a document in `executive-brain/`, the Executive Brain document governs — it should be updated deliberately (via [`decision-framework.md`](./decision-framework.md) and logged per [`templates/decision-log-template.md`](../templates/decision-log-template.md)), not silently overridden by a business unit or project README.

## Status

These are foundational, first-draft documents establishing the company's operating doctrine. They should be reviewed and ratified by company leadership, then revisited on the cadence each document specifies (typically annually for the Constitution and 10-Year Strategy, quarterly for planning and risk, continuously for the dashboard and KPIs).
