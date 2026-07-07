# Decision Framework

**Status:** Foundational draft. This document defines *how* to reason through a decision. It complements, and does not replace, [`docs/governance.md`](../docs/governance.md) (which defines *who* has authority) and [`workflows/decision-making.md`](../workflows/decision-making.md) (which defines the day-to-day process steps).

## 1. Classify the Decision Before Deciding

Not every decision deserves the same amount of process. Classify first:

| Type | Definition | Example | Process |
|---|---|---|---|
| **Type 1 — Irreversible / high-cost to reverse** | Hard or expensive to undo | Signing a multi-year contract, closing a business unit, major capital commitment | Full process below; Executive Office approval required per [`docs/governance.md`](../docs/governance.md) |
| **Type 2 — Reversible / low-cost to reverse** | Easy to undo if wrong | Choosing a tool, trying a content format, a two-week experiment | Decide fast at the lowest competent level; document briefly; revisit if wrong |

Defaulting every decision to Type 1 process is itself a failure mode — it slows the company down without reducing real risk. Per `CLAUDE.md`, think long-term but also execute.

## 2. Assign Roles Clearly

For any Type 1 decision (and any Type 2 decision worth a moment's thought), name explicitly:

- **Decider** — the single person or function with authority to make the call (per [`docs/governance.md`](../docs/governance.md)'s decision-rights table). Never leave this ambiguous.
- **Recommender** — who did the analysis and is proposing a course of action (often an AI role from [`ai-agents/`](../ai-agents), e.g., Business Strategist, Financial Analyst).
- **Consulted** — who must be asked for input before the decision is made (e.g., Legal for contracts, Finance for budget impact) but does not hold veto.
- **Informed** — who needs to know the outcome but has no input role.

Avoid decisions with no named Decider, and avoid diffusing Decider authority across a committee — accountability requires a single owner (see Value 8, Accountability and Ownership, in [`vision-mission-values.md`](./vision-mission-values.md)).

## 3. Require a Recommendation, Not Just Options

Per `CLAUDE.md` and [`workflows/decision-making.md`](../workflows/decision-making.md): present a recommended option with reasoning, not a neutral list. A Recommender who won't commit to a recommendation hasn't finished the analysis.

## 4. Require Evidence Proportional to Stakes

- Type 1 decisions require explicit evidence: data, prior outcomes, external benchmarks, or a named assumption flagged as unverified.
- Type 2 decisions may proceed on reasoned judgment, but the reasoning should still be one sentence, not absent.

## 5. Make the Decision, Document It, Move On

- Record every Type 1 decision (and any Type 2 decision with lasting effect) using [`templates/decision-log-template.md`](../templates/decision-log-template.md).
- Communicate the outcome to everyone in the "Informed" category.
- Do not relitigate a made decision without new evidence — flag new evidence explicitly and reopen deliberately (see Section 6).

## 6. Revisit Triggers

A decision should be explicitly reopened when:

- A named assumption behind it is shown to be false.
- A risk in the [Risk Register](./risk-register.md) tied to it materializes or its likelihood/impact changes materially.
- The relevant Horizon in [`strategy-10-year.md`](./strategy-10-year.md) changes.

Otherwise, treat made decisions as stable — constant relitigating is a tax on the whole company.

## 7. Escalation

If the Decider and Consulted parties cannot reach a workable outcome, escalate one level per [`docs/governance.md`](../docs/governance.md)'s escalation path: Business Unit / Project Lead → Executive Office function owner → full Executive Office.

## 8. AI-Assisted Decisions

AI agents operating under `CLAUDE.md` typically serve as **Recommender**, occasionally as **Consulted**, and — for Type 2, low-stakes, clearly-scoped decisions within an already-approved mandate — may act as **Decider** on execution details. AI agents must not act as Decider for Type 1 decisions or anything requiring Executive Office authority under [Article III of the Constitution](./constitution.md#article-iii--authority-and-governance).

## Quick Reference

```
1. Classify: Type 1 (careful) or Type 2 (fast)?
2. Assign: Decider / Recommender / Consulted / Informed
3. Recommend: one option, with reasoning and evidence
4. Decide: the named Decider decides
5. Document: templates/decision-log-template.md
6. Communicate: to everyone Informed
7. Revisit only on a real trigger
```
