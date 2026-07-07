# Infrastructure

## Infrastructure as Code

**Decision: Terraform**, one state per environment (`dev`/`staging`/`production`), stored in `infra/` in the monorepo (see [`solution-architecture.md`](./solution-architecture.md)).

Justification: Terraform is cloud-agnostic (a hedge against the AWS-vs-Azure question revisited in [`technology-stack.md`](./technology-stack.md)), has the largest ecosystem of provider modules, and makes environment reconstruction — critical for [`disaster-recovery.md`](./disaster-recovery.md) — a documented, repeatable process rather than tribal knowledge.

## Provisioned Resources (Production)

| Resource | Sizing Approach | Notes |
|---|---|---|
| VPC | Single VPC, public + private subnets across 2 Availability Zones | AZ redundancy from day one; multi-region deferred to [`scalability.md`](./scalability.md) |
| ECS Fargate (API) | Start at 2 tasks, auto-scale on CPU/memory | No idle-server cost; scales to zero non-production environments overnight |
| RDS PostgreSQL | Multi-AZ, `db.t4g` burstable class at MVP, sized up per [`scalability.md`](./scalability.md) triggers | Multi-AZ from the start — database downtime is not an acceptable trade-off to save cost |
| ElastiCache Redis | Single node at MVP, cluster mode when queue volume demands it | |
| S3 | Standard storage class, lifecycle rules to Infrequent Access after 90 days for archival media | Cost control for large media assets (360Sports, The Chairman) |
| CloudFront | Default AWS edge locations, no African-specific PoP guarantee but nearest-edge routing still improves latency materially over origin-only serving | |
| Secrets Manager | All credentials, API keys (including the LLM Gateway's provider keys) | Never in environment files committed to the repo |

## Cost Management

- Non-production environments (`dev`, PR previews) scale down outside working hours.
- S3 lifecycle policies move cold media to cheaper storage tiers automatically.
- Reserved capacity (RDS reserved instances) considered once production load is predictable enough to commit to a 1-year term — not before, to preserve flexibility while the platform's real usage pattern is still unknown.
- Per-venture and per-AI-seat cost visibility (see [`../ai/ai-platform.md`](../ai/ai-platform.md)) feeds into [`executive-brain/kpi-framework.md`](../../executive-brain/kpi-framework.md)'s financial KPIs so infrastructure spend is never a surprise line item to the CFO.

## Environment Parity

`staging` runs the identical Terraform module set as `production` at smaller instance sizes — the goal is that anything that works in `staging` works in `production` without topology surprises, per [`deployment-architecture.md`](./deployment-architecture.md).

## Network Security

Private subnets host the API and data tier with no direct internet ingress; only the Application Load Balancer sits in a public subnet. All inter-service traffic stays within the VPC. See [`security-architecture.md`](./security-architecture.md) for the full security posture.

## Ownership

Infrastructure changes are a [CTO seat](../../ai-agents/workforce/cto.md) Type 1 decision when they affect production topology or cost materially (per [`../../ai-agents/workforce/cto.md`](../../ai-agents/workforce/cto.md)'s decision authority), Type 2 for routine scaling within existing budget.
