# Risk Register

**Status:** Framework established; register population pending a formal risk assessment by Executive Office — Governance. The example rows below are **illustrative only** — placeholders showing the categories and format, not an assessed view of the company's actual risk exposure. Replace them with real entries as risks are formally identified and scored.

Owned by [`executive-office/governance/`](../executive-office/governance/README.md); referenced by [`decision-framework.md`](./decision-framework.md) and [`quarterly-planning-framework.md`](./quarterly-planning-framework.md).

## Methodology

**Score = Likelihood × Impact**, each rated 1–5.

| Likelihood | Meaning | | Impact | Meaning |
|---|---|---|---|---|
| 1 | Rare | | 1 | Negligible |
| 2 | Unlikely | | 2 | Minor |
| 3 | Possible | | 3 | Moderate |
| 4 | Likely | | 4 | Major |
| 5 | Almost certain | | 5 | Severe / existential |

**Score bands:** 1–5 Low · 6–12 Medium · 15–19 High · 20–25 Critical

Critical and High risks must be reviewed at every Quarterly Business Review (see [`quarterly-planning-framework.md`](./quarterly-planning-framework.md)). Medium and Low risks are reviewed at least semi-annually per [`docs/governance.md`](../docs/governance.md).

## Risk Categories

1. **Strategic** — market shifts, competitive threats, wrong-bet initiatives.
2. **Financial** — funding runway, budget overruns, revenue concentration.
3. **Legal / Regulatory** — IP disputes, contract exposure, regulatory change.
4. **Operational** — delivery failure, key-person dependency, process breakdown.
5. **Reputational** — brand damage, public controversy, media/content risk.
6. **Technology / AI** — system failure, data security, AI-agent misuse or error, over-delegation of authority to automated processes.
7. **People** — hiring/retention failure, culture erosion, capability gaps.

## Register

| ID | Category | Risk Description | Likelihood | Impact | Score | Owner | Mitigation | Status |
|---|---|---|---|---|---|---|---|---|
| R-001 *(illustrative)* | Financial | Concentration of company funding in a single flagship project (e.g., one media production) with no diversified revenue yet | 3 | 4 | 12 (Medium) | Executive Office — Finance | Diversify Horizon 1 proof points across business units per [`strategy-10-year.md`](./strategy-10-year.md) | Open |
| R-002 *(illustrative)* | Legal / Regulatory | Media/documentary content exposes the company to rights, defamation, or clearance disputes | 2 | 4 | 8 (Medium) | Executive Office — Legal | Legal review of all rights/clearances before production per [`business-units/bhubesi-media/README.md`](../business-units/bhubesi-media/README.md) | Open |
| R-003 *(illustrative)* | Technology / AI | AI agents acting under `CLAUDE.md` take an action beyond delegated authority (e.g., a financial or legal commitment) | 2 | 4 | 8 (Medium) | Executive Office — Governance | Enforce [`decision-framework.md`](./decision-framework.md) Section 8 (AI-Assisted Decisions) and Constitution Article III | Open |
| R-004 *(illustrative)* | Operational | Key-person dependency in early-stage business units with small teams | 3 | 3 | 9 (Medium) | Executive Office — Human Resources | Documentation-first culture (`CLAUDE.md`) to reduce tacit-knowledge risk; cross-training as team grows | Open |
| R-005 *(illustrative)* | Strategic | Pursuing too many unproven initiatives in parallel instead of validating Horizon 1 proof points | 3 | 3 | 9 (Medium) | Executive Office — Strategy | Enforce project approval gate in [`workflows/project-kickoff.md`](../workflows/project-kickoff.md); quality-over-volume pillar in [`strategy-10-year.md`](./strategy-10-year.md) | Open |

## Process

1. **Identify** — any role or business unit may propose a new risk entry; Research Analyst and Legal Research Assistant roles (see [`ai-agents/`](../ai-agents)) support identification.
2. **Score** — Executive Office — Governance assigns/validates likelihood and impact.
3. **Assign** — every risk has one named owner responsible for mitigation and status updates — never an unowned or jointly-owned entry.
4. **Mitigate or Accept** — each entry states a mitigation approach, or an explicit rationale for acceptance if mitigation cost exceeds the risk.
5. **Review** — per the cadence above; update scores as circumstances change and log material changes via [`templates/decision-log-template.md`](../templates/decision-log-template.md).
6. **Retire** — closed or no-longer-relevant risks move to a "Closed" status rather than being deleted, preserving institutional memory per `CLAUDE.md`.
