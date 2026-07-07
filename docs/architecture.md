# Repository Architecture

## Purpose

Bhubesi International operates across multiple domains — media, technology, consulting, education, research, and investment. This repository exists to give all of that a single, consistent structure so that:

- Anyone (human or AI) can find the right place for information without guesswork.
- Decisions, strategy, and execution are traceable over time.
- New business units and projects can be added without redesigning the system.

## Top-Level Model

The repository is organized around **five layers**:

### 0. Doctrine — `executive-brain/`
The foundational reference material every other layer is bound by: the [Constitution](../executive-brain/constitution.md), [Vision/Mission/Values](../executive-brain/vision-mission-values.md), the [10-Year Strategy](../executive-brain/strategy-10-year.md), the [Decision Framework](../executive-brain/decision-framework.md), the [Quarterly Planning Framework](../executive-brain/quarterly-planning-framework.md), the [Risk Register](../executive-brain/risk-register.md), the [KPI Framework](../executive-brain/kpi-framework.md), and the [Executive Dashboard spec](../executive-brain/executive-dashboard-spec.md). Where this layer conflicts with anything else in the repository, the Executive Brain governs (see [`executive-brain/README.md`](../executive-brain/README.md#precedence)).

### 1. Direction — `executive-office/`
Sets strategy, governs risk and compliance, manages finance and legal, and defines how people are organized — i.e., the function that *operationalizes* the doctrine in `executive-brain/`. Every business unit and project answers, directly or indirectly, to this layer.

### 2. Execution — `business-units/`
The standing operating divisions that carry out the company's core work on an ongoing basis:

- **Bhubesi Media** — documentary, film, and content production.
- **Bhubesi Creative** — creative direction, design, and brand work.
- **Bhubesi Labs** — software, AI engineering, and technical R&D.
- **Bhubesi Ventures** — investment, incubation, and new business development.

### 3. Initiatives — `projects/`
Time-bound or product-specific initiatives that draw on one or more business units. Projects graduate, complete, or get folded into a business unit as they mature. Current projects: RecoverHUB, 360Sports, The Chairman, Innocentia, and Future Ventures.

### 4. Operating Layer — `ai-agents/`, `workflows/`, `templates/`, `knowledge-base/`
The shared infrastructure that makes the other layers function consistently:

- **`ai-agents/`** defines the executive AI roles (CEO Advisor, Chief of Staff, Software Architect, etc.) and when to use each.
- **`workflows/`** defines the standard operating procedures — how a task moves from objective to documented outcome, implementing the frameworks in `executive-brain/`.
- **`templates/`** provides reusable document formats so output is consistent regardless of who or what produces it.
- **`knowledge-base/`** holds shared reference material (company overview, brand guidelines, FAQs) used across every layer above.

## How the Layers Interact

```
executive-brain  ──governs doctrine for──▶  executive-office  ──sets direction & approves──▶  business-units ──staff & resource──▶ projects
                                                     │                                                │                                 │
                                                     └───────────────────── shared operating layer (ai-agents, workflows, templates, knowledge-base) ─────────────────────────┘
```

- Business units and projects consume templates and workflows rather than inventing their own.
- The Executive Office reviews significant decisions and outcomes documented under business units and projects (see [`governance.md`](./governance.md)), applying the [Decision Framework](../executive-brain/decision-framework.md).
- AI agents operating in this repository select a role from `ai-agents/`, follow the process in `workflows/standard-workflow.md`, and record outcomes in the relevant business unit or project directory.

## Adding to This Structure

- **New business unit**: create `business-units/<name>/` with a `README.md` following the existing pattern. Update this document and the root `README.md`.
- **New project**: create `projects/<name>/` with a `README.md` using [`templates/project-brief-template.md`](../templates/project-brief-template.md) as the starting point.
- **New AI role**: add a file under `ai-agents/roles/` and reference it from `ai-agents/README.md`.

Do not create parallel or ad hoc top-level directories. If something doesn't fit the existing structure, raise it as a governance question (see [`governance.md`](./governance.md)) before adding a new top-level folder.
