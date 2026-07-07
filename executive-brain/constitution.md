# Company Constitution

**Bhubesi International (Pty) Ltd**
**Status:** Foundational draft — pending ratification by company leadership.
**Amendment authority:** See Article VII.

## Preamble

Bhubesi International (Pty) Ltd exists to build a world-class African company across business, media, technology, education, consulting, research, and innovation. This Constitution is the highest-authority document governing how the company organizes, decides, and holds itself accountable. Every business unit, project, policy, and AI-assisted process in this repository operates within the bounds set here.

Where this Constitution is silent, [`docs/governance.md`](../docs/governance.md) and [`decision-framework.md`](./decision-framework.md) apply. Where they conflict, this Constitution governs.

## Article I — Purpose

1. The company's purpose is defined in [`vision-mission-values.md`](./vision-mission-values.md) and may only be amended per Article VII.
2. All business units, projects, and initiatives must demonstrably serve this purpose. A project that no longer does should be graduated, refocused, or closed (see [`workflows/project-kickoff.md`](../workflows/project-kickoff.md)).

## Article II — Structure

1. The company is organized into three layers, as detailed in [`docs/architecture.md`](../docs/architecture.md):
   - The **Executive Office** (Strategy, Governance, Finance, Legal, Human Resources) — direction and stewardship.
   - **Business Units** (Bhubesi Media, Bhubesi Creative, Bhubesi Labs, Bhubesi Ventures) — standing execution.
   - **Projects** — time-bound initiatives resourced by one or more business units.
2. No new top-level business unit may be created without a decision recorded under Article VII's process, reflected in [`docs/architecture.md`](../docs/architecture.md) and [`business-units/README.md`](../business-units/README.md).
3. Projects are provisional by default. A project becomes a durable part of the company only by graduating into a business unit's ongoing responsibility, per [`projects/README.md`](../projects/README.md).

## Article III — Authority and Governance

1. Decision rights are defined in [`docs/governance.md`](../docs/governance.md) and must not be exercised outside that scope. Specifically:
   - Business unit leads hold authority over day-to-day operating decisions within approved budget and strategy.
   - Project leads hold authority over scope, timeline, and delivery within an approved brief.
   - The Executive Office holds authority over strategy, governance/risk, finance, legal, and organizational structure.
2. Any decision that commits the company financially beyond an approved budget, creates legal or regulatory exposure, or changes strategic direction must be escalated to the Executive Office and recorded per [`templates/decision-log-template.md`](../templates/decision-log-template.md).
3. AI agents operating under `CLAUDE.md` act within delegated authority only. They may recommend, analyze, and execute documented, reversible work; they may not unilaterally commit the company financially or legally, create new top-level structure, or override a human decision-maker's authority under this Article.

## Article IV — Rights and Responsibilities of Business Units and Projects

1. Every business unit and project has the right to:
   - Operate autonomously within its approved mandate and budget.
   - Access the shared operating layer (`workflows/`, `templates/`, `ai-agents/`, `knowledge-base/`) on equal terms.
   - Escalate disputes or resource conflicts to the Executive Office.
2. Every business unit and project has the responsibility to:
   - Maintain accurate, current documentation of its mandate, status, and decisions (per `CLAUDE.md`: "document everything").
   - Report financial and operational status on the cadence set in [`docs/governance.md`](../docs/governance.md).
   - Operate consistently with the Values in [`vision-mission-values.md`](./vision-mission-values.md) and the Risk Register in [`risk-register.md`](./risk-register.md).

## Article V — Standards of Conduct

1. All work produced under the Bhubesi International name must meet the standard set in `CLAUDE.md`: professional, evidence-based, built for scale, and built for Africa with global standards.
2. Conflicts of interest, misrepresentation of company authority, or unauthorized commitments on the company's behalf are constitutional violations, to be escalated to Executive Office — Governance immediately.

## Article VI — Financial Stewardship

1. All spend must trace to an approved budget under [`executive-office/finance/`](../executive-office/finance).
2. No business unit or project may take on debt, external investment, or binding financial obligation on the company's behalf without Executive Office — Finance and Legal sign-off.
3. Financial reporting follows [`templates/financial-report-template.md`](../templates/financial-report-template.md) on the cadence in [`docs/governance.md`](../docs/governance.md).

## Article VII — Amendment

1. This Constitution, and the other documents in [`executive-brain/`](./README.md), may be amended only through the process in [`decision-framework.md`](./decision-framework.md), with the decision logged per [`templates/decision-log-template.md`](../templates/decision-log-template.md).
2. Amendments to Article I (Purpose) and this Article (Amendment) require explicit sign-off from company leadership (the human Executive Office) — they may not be amended by an AI-assisted process alone.
3. All other Articles may be amended by the Executive Office function with primary ownership (e.g., Article VI by Finance, in consultation with Governance), subject to review at the next scheduled Executive Office review per [`docs/governance.md`](../docs/governance.md).

## Article VIII — Dissolution and Exit

1. A business unit may be dissolved, or a project closed, only through the Executive Office decision process in [`docs/governance.md`](../docs/governance.md), with outcomes documented rather than the entry simply deleted from this repository (see [`projects/future-ventures/README.md`](../projects/future-ventures/README.md) for the pattern of retaining declined/closed initiatives as a record).
2. Closure decisions must address: outstanding obligations, intellectual property disposition, personnel, and lessons learned.

---

*This Constitution is a living foundational document. Review it at least annually alongside the strategic review cycle in [`strategy-10-year.md`](./strategy-10-year.md).*
