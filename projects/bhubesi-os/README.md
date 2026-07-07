# Bhubesi OS

## Status

**Active.** Directed directly by company leadership (standing in for the Strategy approval gate in [`workflows/project-kickoff.md`](../../workflows/project-kickoff.md)). First module — AI Chat Interface — is a working clickable prototype. Remaining eight modules are not started.

## Mandate

Bhubesi OS is the software product that turns this repository's documentation-only operating system (Phases 1–2) into a real, usable platform. Where `executive-brain/`, `executive-office/`, and `ai-agents/` define *how the company should run*, Bhubesi OS is the tool that lets people actually run it that way day to day.

## Lead Business Unit

[Bhubesi Labs](../../business-units/bhubesi-labs/README.md), under the [CTO seat](../../ai-agents/workforce/cto.md), which also owns the `ai-agents/` layer this platform surfaces.

## Modules

| Module | Status | Owns / Draws On |
|---|---|---|
| AI Chat Interface | **Prototype built** (`app/`) | [`ai-agents/workforce/`](../../ai-agents/workforce/README.md) — chat with any of the 12 AI Workforce seats |
| CRM | Not started | Sales Director, Chief Marketing Officer |
| Project Management | Not started | COO, Project Manager role, [`projects/`](../../projects), [`executive-brain/quarterly-planning-framework.md`](../../executive-brain/quarterly-planning-framework.md) |
| Document Management | Not started | COO, Chief Legal Officer |
| Finance | Not started | CFO, [`templates/financial-report-template.md`](../../templates/financial-report-template.md) |
| Media Asset Library | Not started | Chief Creative Officer, Film Producer, Bhubesi Media |
| Research Database | Not started | Chief Research Officer, [`knowledge-base/`](../../knowledge-base) |
| Knowledge Search | Not started | Search across this entire repository (`docs/`, `executive-brain/`, `knowledge-base/`, etc.) |
| Automation Hub | Not started | CTO — orchestration across the AI Workforce and roles |

Module build order is a Type 2 decision for the CTO seat (see [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md)); AI Chat Interface was chosen first because it makes the [AI Workforce org chart](../../ai-agents/workforce/README.md) immediately usable rather than just documentation.

## AI Chat Interface (`app/`)

A Next.js + React + TypeScript + Tailwind CSS web app. Prototype fidelity: seat replies are **simulated client-side** (see `app/src/lib/responder.ts`) against each seat's documented Responsibilities, Decision Authority, and KPIs — there is no live LLM backend wired in yet, and no data persists between page loads.

What it demonstrates:

- All 12 AI Workforce seats, grouped and browsable (Executive Office vs. Operating Seats), matching [`ai-agents/workforce/README.md`](../../ai-agents/workforce/README.md).
- Per-seat chat with a greeting, suggested prompts, and simulated replies that reflect the seat's actual Responsibilities.
- A live "Decision authority" panel per seat, showing Type 2 (decide directly) vs. Type 1 (must escalate) per [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md).
- Simple heuristics for cross-domain consults (e.g., asking the CFO about a contract nudges toward looping in the Chief Legal Officer) and Type 1 detection (e.g., "sign", "hire", "restructure" trigger an escalation flag) — illustrating the dotted-line and authority-ceiling rules from the workforce specs, not a real policy engine.
- A module nav bar showing all 9 planned Bhubesi OS modules, with only AI Chat enabled and the rest marked "Soon."

### Running it locally

```bash
cd projects/bhubesi-os/app
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Next Steps Toward a Real Backend

1. Replace `app/src/lib/responder.ts`'s simulated logic with real LLM calls (per seat, using its documented mandate as a system prompt) — a Type 1 decision for the CTO seat given the vendor/cost commitment involved.
2. Add persistence (managed Postgres/Supabase, per the original stack decision) for conversation history — currently in-memory only, lost on refresh.
3. Add authentication and the access-level model described in [`executive-brain/executive-dashboard-spec.md`](../../executive-brain/executive-dashboard-spec.md) (adapted for chat rather than dashboard access).
4. Scope the next module as its own addition to this brief, following [`workflows/project-kickoff.md`](../../workflows/project-kickoff.md).

## Related Documents

- [`ai-agents/workforce/`](../../ai-agents/workforce/README.md) — the org chart this interface makes usable.
- [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md) — the Type 1/Type 2 logic the prototype simulates.
- [`executive-brain/executive-dashboard-spec.md`](../../executive-brain/executive-dashboard-spec.md) — a sibling specification for a future Bhubesi OS module (Executive Dashboard), written before this one was built.
