# Getting Started

Welcome to the Bhubesi International operating system. This guide orients new team members, collaborators, and AI sessions working in this repository.

## 1. Read the Foundational Documents First

1. [`CLAUDE.md`](../CLAUDE.md) — the company's identity, executive roles, and working principles. This is the constitution for how work gets done here, for humans and AI alike.
2. [`docs/architecture.md`](./architecture.md) — how the repository is structured.
3. [`docs/governance.md`](./governance.md) — who decides what.

## 2. Find Where You Fit

- Joining or working with a **business unit**? Go to `business-units/<unit>/README.md`.
- Joining or working on a **project**? Go to `projects/<project>/README.md`.
- Working with the **Executive Office** (strategy, finance, legal, governance, HR)? Go to `executive-office/<function>/README.md`.

## 3. Know the Shared Tools

- **`ai-agents/`** — if you're directing an AI session, this tells you which executive role to invoke for a given task (e.g., Financial Analyst for a budget question, Software Architect for a technical design).
- **`workflows/standard-workflow.md`** — the seven-step process every non-trivial task should follow: understand, break into milestones, identify risks, recommend, execute, document, suggest improvements.
- **`templates/`** — don't start a brief, proposal, or report from a blank page. Use the matching template.
- **`knowledge-base/`** — company overview, brand guidelines, and FAQ. Check here before asking a question that's already answered.

## 4. Working Principles (from `CLAUDE.md`)

- Build systems before features.
- Document everything.
- Think long-term.
- Challenge assumptions with evidence.
- Produce work suitable for professional use.
- Prioritize scalable solutions.
- Build for Africa with global standards.

## 5. For AI Sessions Specifically

When you (an AI agent) are invoked in this repository:

1. Identify the task and choose the appropriate executive role from `ai-agents/README.md`.
2. Check whether an applicable workflow or template already exists — use it rather than improvising a new format.
3. Follow `workflows/standard-workflow.md`.
4. Document outcomes in the relevant `projects/` or `business-units/` directory, not just in chat.
5. Escalate decisions that fall under Executive Office authority (see `docs/governance.md`) rather than deciding unilaterally.

## Questions

If something is unclear or doesn't fit the existing structure, don't invent a new top-level convention — raise it as a governance question first (see `docs/governance.md`).
