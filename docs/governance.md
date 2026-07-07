# Governance

## Purpose

This document defines who decides what at Bhubesi International, and how the Executive Office oversees business units and projects. It applies equally to human decision-makers and to AI agents acting on the company's behalf.

This document states *who* decides. For *how* to reason through a decision once you know who owns it, see [`executive-brain/decision-framework.md`](../executive-brain/decision-framework.md). Both operate under the authority granted in [`executive-brain/constitution.md`](../executive-brain/constitution.md).

## Decision Rights

| Decision Type | Owner | AI Workforce Seat | Notes |
|---|---|---|---|
| Company strategy, mission, capital allocation | Executive Office — Strategy | [CEO](../ai-agents/workforce/ceo.md) | Reviewed at least quarterly |
| Governance policy, risk, compliance | Executive Office — Governance | [COO](../ai-agents/workforce/coo.md) + [Chief Legal Officer](../ai-agents/workforce/chief-legal-officer.md) | Applies across all units and projects |
| Budgets, spend approval, financial reporting | Executive Office — Finance | [CFO](../ai-agents/workforce/cfo.md) | All units submit to a common reporting format (see `templates/`) |
| Contracts, IP, regulatory matters | Executive Office — Legal | [Chief Legal Officer](../ai-agents/workforce/chief-legal-officer.md) | Must review before external commitments are made |
| Hiring, roles, org structure | Executive Office — Human Resources | [HR Director](../ai-agents/workforce/hr-director.md) | Coordinates with unit leads |
| Day-to-day operating decisions | Business Unit lead | Relevant business-unit seat ([CTO](../ai-agents/workforce/cto.md), [CCO](../ai-agents/workforce/chief-creative-officer.md), [Film Producer](../ai-agents/workforce/film-producer.md), etc.) | Within approved budget and strategy |
| Project scope, timeline, delivery | Project lead | Supported by [Project Manager role](../ai-agents/roles/project-manager.md) and [COO](../ai-agents/workforce/coo.md) | Within the approved project brief |
| Technical architecture decisions | Bhubesi Labs / Software Architect role | [CTO](../ai-agents/workforce/cto.md) | Documented in the relevant project or unit directory |
| Go-to-market, sales, and revenue commitments | Business Unit lead, in coordination with Finance | [Chief Marketing Officer](../ai-agents/workforce/chief-marketing-officer.md), [Sales Director](../ai-agents/workforce/sales-director.md) | Pricing/terms guardrails set by CFO; custom terms escalate |

Full seat-level authority detail (what each seat may decide unilaterally vs. must escalate) lives in [`ai-agents/workforce/`](../ai-agents/workforce/README.md). Where a workforce seat file and this table conflict, this table — as the human-ratified decision-rights matrix — governs.

## Escalation

Escalate to the Executive Office when a decision:

1. Commits the company financially beyond an approved budget.
2. Creates legal, regulatory, or reputational risk.
3. Changes strategic direction, brand, or company structure.
4. Cannot be resolved between business units.

Escalations should be documented (see [`templates/decision-log-template.md`](../templates/decision-log-template.md)) so the reasoning and outcome are preserved. Risks that drive an escalation should be tracked in [`executive-brain/risk-register.md`](../executive-brain/risk-register.md).

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

This cadence is a starting default. Update it here once the company formalizes its actual board/leadership meeting schedule. The quarterly cadence is executed in detail via [`executive-brain/quarterly-planning-framework.md`](../executive-brain/quarterly-planning-framework.md).
