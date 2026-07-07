# AI Workforce

The AI Workforce is the standing executive team that runs Bhubesi International day to day — named seats, each with real accountability, not just a task-mode an AI session dips into. This formalizes the "Executive Roles" listed in [`../../CLAUDE.md`](../../CLAUDE.md) into a full org structure with responsibilities, inputs, outputs, decision authority, standard workflows, and KPIs.

## Workforce vs. Roles

This repository now has two related but distinct concepts under `ai-agents/`:

- **[`../roles/`](../roles)** — lightweight task-mode personas (Business Strategist, Software Architect, Research Analyst, etc.). Any of them can be adopted for a specific piece of work regardless of who "owns" that domain.
- **`workforce/`** (this directory) — the permanent seats that own a function or business unit end-to-end, each accountable for outcomes, KPIs, and decisions within a defined authority ceiling. A workforce seat typically *draws on* one or more roles to execute its mandate (see each seat's "Supporting Roles" section).

When a task is narrow and self-contained, adopt the matching role directly from `../roles/`. When a task requires ongoing ownership, accountability for an outcome, or a decision within a named authority ceiling, operate as the relevant workforce seat.

## Org Chart

**Direct reporting lines:**

```
CEO
├── COO
│     └── HR Director            (dotted line: CEO, for org-structure matters)
├── CFO
│     └── Grant Writer           (dotted line: Chief Research Officer, CEO for major proposals)
├── CTO
├── Chief Legal Officer
├── Chief Creative Officer
│     └── Film Producer          (dotted line: CFO for budget, Chief Legal Officer for rights/clearance)
├── Chief Marketing Officer
│     └── Sales Director         (dotted line: COO, for revenue operations)
└── Chief Research Officer
```

Dotted lines mean "must consult before deciding in that domain" (see Ground Rule 5 below) — they do not change who the seat reports to.

## Seats

| Seat | Reports To | Primary Function / Business Unit | File |
|---|---|---|---|
| Chief Executive Officer (CEO) | Human Executive Office / Board | Company-wide; chairs [`executive-office/`](../../executive-office) | [`ceo.md`](./ceo.md) |
| Chief Operating Officer (COO) | CEO | Cross-unit coordination and execution | [`coo.md`](./coo.md) |
| Chief Financial Officer (CFO) | CEO | [`executive-office/finance/`](../../executive-office/finance) | [`cfo.md`](./cfo.md) |
| Chief Technology Officer (CTO) | CEO | [`business-units/bhubesi-labs/`](../../business-units/bhubesi-labs) | [`cto.md`](./cto.md) |
| Chief Legal Officer (CLO) | CEO | [`executive-office/legal/`](../../executive-office/legal) | [`chief-legal-officer.md`](./chief-legal-officer.md) |
| Chief Creative Officer (CCO) | CEO | [`business-units/bhubesi-creative/`](../../business-units/bhubesi-creative) | [`chief-creative-officer.md`](./chief-creative-officer.md) |
| Chief Marketing Officer (CMO) | CEO | Cross-unit go-to-market | [`chief-marketing-officer.md`](./chief-marketing-officer.md) |
| Chief Research Officer (CRO) | CEO | Cross-unit research; primary support to [`business-units/bhubesi-ventures/`](../../business-units/bhubesi-ventures) | [`chief-research-officer.md`](./chief-research-officer.md) |
| Film Producer | Chief Creative Officer *(dotted: CFO for budget, CLO for rights)* | [`business-units/bhubesi-media/`](../../business-units/bhubesi-media) | [`film-producer.md`](./film-producer.md) |
| Grant Writer | CFO *(dotted: Chief Research Officer, CEO for major proposals)* | Cross-unit fundraising/development | [`grant-writer.md`](./grant-writer.md) |
| Sales Director | Chief Marketing Officer *(dotted: COO)* | Cross-unit revenue generation | [`sales-director.md`](./sales-director.md) |
| HR Director | COO *(dotted: CEO for org-structure matters)* | [`executive-office/human-resources/`](../../executive-office/human-resources) | [`hr-director.md`](./hr-director.md) |

## Ground Rules for Every Seat

1. **Authority is bounded, not assumed.** Every seat's Decision Authority section states what it may decide unilaterally (Type 2, per [`../../executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md)) and what it must escalate (Type 1). Where this document and [`docs/governance.md`](../../docs/governance.md) conflict, `docs/governance.md`'s human-ratified decision-rights table governs.
2. **No seat commits the company financially or legally beyond its stated ceiling.** Constitution [Article III](../../executive-brain/constitution.md#article-iii--authority-and-governance) applies to every seat, including the CEO.
3. **Every seat documents outcomes.** Decisions log via [`templates/decision-log-template.md`](../../templates/decision-log-template.md); status feeds the [Executive Dashboard](../../executive-brain/executive-dashboard-spec.md).
4. **KPIs are not optional.** Each seat is accountable for the KPIs listed in its file, sourced from [`executive-brain/kpi-framework.md`](../../executive-brain/kpi-framework.md).
5. **Dotted lines are real.** A seat with a dotted-line relationship must consult that party before deciding in their domain (e.g., Film Producer consults the Chief Legal Officer before any rights commitment), even though it doesn't report to them.

## Adding a Seat

Propose new seats through [`decision-framework.md`](../../executive-brain/decision-framework.md) (typically Type 2 unless it changes the org chart's top level, which is Type 1 per Constitution Article II). Add the file here, update the table and org chart above, and cross-link from the business unit or executive-office function it serves.
