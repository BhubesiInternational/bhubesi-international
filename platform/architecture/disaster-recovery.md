# Disaster Recovery

## Objectives

| Metric | Target | Rationale |
|---|---|---|
| RPO (Recovery Point Objective) | 5 minutes | RDS automated backups + continuous WAL archiving make this achievable without custom tooling |
| RTO (Recovery Time Objective) | 4 hours for full-service restoration | Consistent with an early-stage platform's risk tolerance — not a 24/7 mission-critical system yet (e.g., no life-safety dependency), but still a real business commitment to partners like RecoverHUB's institutional clients |

These targets are a starting point to be revisited as the platform takes on higher-stakes dependents (e.g., if RecoverHUB crisis-escalation workflows come to depend on platform availability — see [`../../projects/recoverhub/sops.md`](../../projects/recoverhub/sops.md) Section 5).

## Backup Strategy

- **Database:** automated daily snapshots plus continuous point-in-time recovery via RDS, retained 30 days; a weekly snapshot replicated to a secondary AWS region for cross-region resilience against a full `af-south-1` regional failure.
- **Object storage (S3):** versioning enabled on all buckets; cross-region replication for the Media Asset Library and Document Management buckets specifically, given the practical irreplaceability of original footage/documents.
- **Infrastructure:** fully defined in Terraform (see [`infrastructure.md`](./infrastructure.md)) — a region can be reconstructed from code, not from memory.

## Failure Scenarios and Response

| Scenario | Response |
|---|---|
| Single Fargate task failure | ALB health checks route around it; ECS replaces the task automatically — no human action needed |
| Database primary failure | RDS Multi-AZ automatic failover to standby (see [`infrastructure.md`](./infrastructure.md)) — minutes of impact, no data loss |
| Full `af-south-1` regional outage | Restore from cross-region snapshot into a secondary region using the Terraform module set; DNS cutover — this is the 4-hour RTO scenario |
| Accidental data deletion (application bug or human error) | Point-in-time recovery to just before the event, restored to a separate instance for verification before promoting |
| LLM provider outage (Claude) | AI Workforce degrades gracefully — see [`../ai/ai-platform.md`](../ai/ai-platform.md)'s Gateway failover behavior; the rest of the platform (CRM, Finance, Documents) is unaffected since it doesn't depend on the LLM Gateway |
| Compromised credentials | Immediate rotation via Secrets Manager, session invalidation, incident response per [`security-architecture.md`](./security-architecture.md) |

## DR Testing

A DR drill (restoring a snapshot into an isolated environment and validating the application boots against it) is run at minimum semi-annually, aligned with [`docs/governance.md`](../../docs/governance.md)'s Governance & Legal review cadence. Results are logged via [`templates/decision-log-template.md`](../../templates/decision-log-template.md) — a DR plan that has never been tested is not a plan.

## Runbooks

Written, versioned runbooks (stored alongside `infra/` in the monorepo — see [`solution-architecture.md`](./solution-architecture.md)) exist for every scenario in the table above before [`../roadmap/mvp.md`](../roadmap/mvp.md) launches to production with real data. This is a launch blocker, not a fast-follow.

## Ownership

[CTO seat](../../ai-agents/workforce/cto.md) owns DR strategy and testing; any actual disaster-recovery invocation is escalated as a Type 1 event to the CEO seat per [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md), given the business-continuity stakes involved.
