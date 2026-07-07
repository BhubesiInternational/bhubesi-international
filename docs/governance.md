# Governance

## Purpose

This document defines who decides what at Bhubesi International, and how the Executive Office oversees business units and projects. It applies equally to human decision-makers and to AI agents acting on the company's behalf.

## Decision Rights

| Decision Type | Owner | Notes |
|---|---|---|
| Company strategy, mission, capital allocation | Executive Office — Strategy | Reviewed at least quarterly |
| Governance policy, risk, compliance | Executive Office — Governance | Applies across all units and projects |
| Budgets, spend approval, financial reporting | Executive Office — Finance | All units submit to a common reporting format (see `templates/`) |
| Contracts, IP, regulatory matters | Executive Office — Legal | Must review before external commitments are made |
| Hiring, roles, org structure | Executive Office — Human Resources | Coordinates with unit leads |
| Day-to-day operating decisions | Business Unit lead | Within approved budget and strategy |
| Project scope, timeline, delivery | Project lead | Within the approved project brief |
| Technical architecture decisions | Bhubesi Labs / Software Architect role | Documented in the relevant project or unit directory |

## Escalation

Escalate to the Executive Office when a decision:

1. Commits the company financially beyond an approved budget.
2. Creates legal, regulatory, or reputational risk.
3. Changes strategic direction, brand, or company structure.
4. Cannot be resolved between business units.

Escalations should be documented (see [`templates/decision-log-template.md`](../templates/decision-log-template.md)) so the reasoning and outcome are preserved.

## Governance for AI-Assisted Work

When an AI agent (a Claude session operating under `CLAUDE.md`) performs work in this repository:

- It must select the executive role appropriate to the task (see [`ai-agents/README.md`](../ai-agents/README.md)).
- It must follow the [standard workflow](../workflows/standard-workflow.md), including documenting the outcome.
- It should flag — rather than silently resolve — any decision that falls under Executive Office authority per the table above.
- It should not create new top-level structure, business units, or binding commitments (financial, legal, contractual) without explicit human approval.

## Review Cadence

- **Strategy**: quarterly review by Executive Office — Strategy.
- **Finance**: monthly reporting cycle, reviewed by Executive Office — Finance.
- **Governance & Legal**: reviewed as needed, minimum semi-annually.
- **Business units and projects**: status reviewed at milestones defined in each project's brief.

This cadence is a starting default. Update it here once the company formalizes its actual board/leadership meeting schedule.
