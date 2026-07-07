# Repository Architecture

## Purpose

Bhubesi International operates across multiple domains — media, technology, consulting, education, research, and investment. This repository exists to give all of that a single, consistent structure so that:

- Anyone (human or AI) can find the right place for information without guesswork.
- Decisions, strategy, and execution are traceable over time.
- New business units and projects can be added without redesigning the system.

## Top-Level Model

The repository is organized around **four layers**:

### 1. Direction — `executive-office/`
Sets strategy, governs risk and compliance, manages finance and legal, and defines how people are organized. Every business unit and project answers, directly or indirectly, to this layer.

### 2. Execution — `business-units/`
The standing operating divisions that carry out the company's core work on an ongoing basis:

- **Bhubesi Media** — documentary, film, and content production.
- **Bhubesi Creative** — creative direction, design, and brand work.
- **Bhubesi Labs** — software, AI engineering, and technical R&D.
- **Bhubesi Ventures** — investment, incubation, and new business development.

### 3. Initiatives — `projects/`
Time-bound or product-specific initiatives that draw on one or more business units. Projects graduate, complete, or get folded into a business unit as they mature. Current projects: RecoverHUB, 360Sports, The Chairman, Innocentia, and Future Ventures.

### 4. Operating Layer — `ai-agents/`, `workflows/`, `templates/`, `knowledge-base/`
The shared infrastructure that makes the other three layers function consistently:

- **`ai-agents/`** defines the executive AI roles (CEO Advisor, Chief of Staff, Software Architect, etc.) and when to use each.
- **`workflows/`** defines the standard operating procedures — how a task moves from objective to documented outcome.
- **`templates/`** provides reusable document formats so output is consistent regardless of who or what produces it.
- **`knowledge-base/`** holds shared reference material (company overview, brand guidelines, FAQs) used across every layer above.

## How the Layers Interact

```
executive-office  ──sets direction & approves──▶  business-units ──staff & resource──▶ projects
        │                                                │                                 │
        └───────────────────────── shared operating layer (ai-agents, workflows, templates, knowledge-base) ─────────────────────────┘
```

- Business units and projects consume templates and workflows rather than inventing their own.
- The Executive Office reviews significant decisions and outcomes documented under business units and projects (see [`governance.md`](./governance.md)).
- AI agents operating in this repository select a role from `ai-agents/`, follow the process in `workflows/standard-workflow.md`, and record outcomes in the relevant business unit or project directory.

## Adding to This Structure

- **New business unit**: create `business-units/<name>/` with a `README.md` following the existing pattern. Update this document and the root `README.md`.
- **New project**: create `projects/<name>/` with a `README.md` using [`templates/project-brief-template.md`](../templates/project-brief-template.md) as the starting point.
- **New AI role**: add a file under `ai-agents/roles/` and reference it from `ai-agents/README.md`.

Do not create parallel or ad hoc top-level directories. If something doesn't fit the existing structure, raise it as a governance question (see [`governance.md`](./governance.md)) before adding a new top-level folder.
