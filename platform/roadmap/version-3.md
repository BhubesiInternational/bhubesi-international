# Version 3

## Goal

Mature the platform from "internal operating system" toward the enterprise-grade, externally-credible posture implied by "Built for Africa with global standards" — external interoperability, deeper AI orchestration, and scale-readiness.

## Scope

| Item | Description |
|---|---|
| Research Database module | Structured evidence-base storage for [Chief Research Officer](../../ai-agents/workforce/chief-research-officer.md), replacing ad hoc research notes with a queryable, cited knowledge store feeding [`../ai/knowledge-engine.md`](../ai/knowledge-engine.md) directly |
| External partner API | The versioned REST layer described in [`../api/api-architecture.md`](../api/api-architecture.md) and [`../api/versioning.md`](../api/versioning.md) opens to real external consumers — e.g., a government department integrating with RecoverHUB referral data, per a cleared data-sharing agreement ([`../../projects/recoverhub/sops.md`](../../projects/recoverhub/sops.md)) |
| Advanced agent orchestration | Multi-seat collaborative workflows beyond the single-consult pattern in [`../ai/agent-orchestration.md`](../ai/agent-orchestration.md) — e.g., a full project-kickoff review sequence spanning Strategy, Finance, and Legal seats in one orchestrated flow |
| SOC 2 readiness push | Formal audit preparation, building on controls already in place since [`mvp.md`](./mvp.md) per [`../architecture/security-architecture.md`](../architecture/security-architecture.md) — a paperwork and evidence-gathering exercise at this point, not an architecture change, because the controls were designed for this from the start |
| Multi-region infrastructure evaluation | Assess whether The Chairman's international distribution reach or a new subsidiary in another African market justifies a second active region, per [`../architecture/scalability.md`](../architecture/scalability.md)'s trigger conditions |
| Second LLM provider (active, not just failover) | Revisit the LLM Gateway's vendor posture per [`../ai/ai-platform.md`](../ai/ai-platform.md) — by this stage, real usage data informs whether a second always-warm provider is justified |

## Explicitly Out of Scope

Anything not yet triggered by [`../architecture/scalability.md`](../architecture/scalability.md)'s conditions (Kubernetes migration, microservice extraction) — Version 3 does not assume these are needed; it evaluates whether they are, based on real data by this point.

## Success Criteria

- At least one external partner consumes the platform's API under a real data-sharing agreement.
- SOC 2 Type I audit (or equivalent) is either complete or in active progress.
- The platform has weathered at least one full year of real multi-tenant operation across the ventures active by this point, with the DR plan tested against real (not just simulated) incidents if any occurred.

## Beyond Version 3

Further evolution (additional modules, deeper AI autonomy, new subsidiary-specific requirements) should be scoped the same way every module in this roadmap was: against real, demonstrated need, following [`workflows/project-kickoff.md`](../../workflows/project-kickoff.md) — this roadmap is deliberately not extended further out than can be reasoned about with real information.
