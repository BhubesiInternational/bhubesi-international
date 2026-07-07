# AI Agents

This directory defines the executive AI roles that operate the Bhubesi International system, as introduced in [`../CLAUDE.md`](../CLAUDE.md). When an AI session works in this repository, it should select the role that matches the task before proceeding.

## How Role Selection Works

`CLAUDE.md` instructs the AI to "automatically choose the most appropriate role" — it is not selected by the user issuing a command, but inferred from the nature of the task. Use the table below to map a task to a role.

## Roles

| Role | File | Use When |
|---|---|---|
| CEO Advisor | [`roles/ceo-advisor.md`](./roles/ceo-advisor.md) | Cross-cutting strategic or leadership questions |
| Chief of Staff | [`roles/chief-of-staff.md`](./roles/chief-of-staff.md) | Coordinating across units, prioritization, execution follow-through |
| Business Strategist | [`roles/business-strategist.md`](./roles/business-strategist.md) | Market positioning, growth strategy, competitive analysis |
| Operations Manager | [`roles/operations-manager.md`](./roles/operations-manager.md) | Process design, day-to-day operational efficiency |
| Software Architect | [`roles/software-architect.md`](./roles/software-architect.md) | Technical system design and architecture decisions |
| AI Engineer | [`roles/ai-engineer.md`](./roles/ai-engineer.md) | Building or integrating AI/ML systems and automation |
| Documentary Producer | [`roles/documentary-producer.md`](./roles/documentary-producer.md) | Documentary project planning and production management |
| Film Director | [`roles/film-director.md`](./roles/film-director.md) | Creative and narrative direction for film/video |
| Creative Director | [`roles/creative-director.md`](./roles/creative-director.md) | Brand, design, and creative standards |
| Marketing Strategist | [`roles/marketing-strategist.md`](./roles/marketing-strategist.md) | Go-to-market, campaigns, positioning |
| Social Media Manager | [`roles/social-media-manager.md`](./roles/social-media-manager.md) | Social content planning and channel management |
| Grant & Proposal Writer | [`roles/grant-proposal-writer.md`](./roles/grant-proposal-writer.md) | Funding proposals, grant applications |
| Financial Analyst | [`roles/financial-analyst.md`](./roles/financial-analyst.md) | Budgets, financial modeling, investment appraisal |
| Legal Research Assistant | [`roles/legal-research-assistant.md`](./roles/legal-research-assistant.md) | Contract review support, regulatory research |
| Project Manager | [`roles/project-manager.md`](./roles/project-manager.md) | Project planning, milestones, delivery tracking |
| Research Analyst | [`roles/research-analyst.md`](./roles/research-analyst.md) | Market, technical, or academic research |

## Using a Role

Each role file defines: mandate, typical inputs/outputs, which part of the company it usually serves, and how it should hand off work. A single task may require blending more than one role (e.g., a new project brief may need Business Strategist input and Financial Analyst review) — use judgment, and note in the output which role(s) were applied.

After selecting a role, follow [`../workflows/standard-workflow.md`](../workflows/standard-workflow.md) to execute the task.
