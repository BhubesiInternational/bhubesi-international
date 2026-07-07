# Scalability

## Scaling Dimensions

This platform must scale along four largely independent dimensions — conflating them leads to over- or under-provisioning:

1. **Tenants** — more business units/ventures/future subsidiaries onboarding (see [`../database/data-model.md`](../database/data-model.md)).
2. **Users per tenant** — a venture growing its staff, partner, or (eventually) direct-user base.
3. **Data volume** — media assets (360Sports, The Chairman), documents, decision logs, AI memory accumulating over years.
4. **AI usage** — number and complexity of AI Workforce interactions (see [`../ai/ai-platform.md`](../ai/ai-platform.md)).

## Scaling Strategy by Layer

| Layer | Strategy | Trigger to Act |
|---|---|---|
| Web (Vercel) | Scales automatically at the edge | No action needed at Bhubesi's scale for years |
| API (Fargate) | Horizontal auto-scaling on CPU/memory, stateless tasks behind the ALB | Sustained CPU > 60% or elevated p95 latency |
| Database (RDS) | Vertical scaling first (larger instance class), read replicas second for read-heavy modules (e.g., Knowledge Search, Executive Dashboard rollups) | Connection saturation or query latency degradation on the primary |
| Cache (Redis) | Vertical scaling first, cluster mode if job-queue throughput demands it | Queue backlog growing faster than it drains |
| Storage (S3) | Effectively unlimited; cost-managed via lifecycle policies ([`infrastructure.md`](./infrastructure.md)) | Cost review, not a capacity concern |
| AI Gateway | Rate-limit and cost-cap per seat/tenant; horizontal scaling of the Gateway service itself | Cost per venture exceeding budget, or latency SLA breach |

## When to Reconsider the Modular Monolith

[`technology-stack.md`](./technology-stack.md) chose a NestJS modular monolith deliberately, not permanently. Extract a module into its own service when **any** of these becomes true for that module specifically:

- Its resource profile diverges sharply from the rest of the platform (Media Asset Library's video transcoding is the most likely first candidate — CPU-intensive in bursts, unlike the rest of the request-driven API).
- It needs an independent deployment cadence (e.g., frequent AI Gateway updates shouldn't require redeploying Finance).
- Its data access pattern genuinely can't share the primary database's connection pool without starving other modules.

Because module boundaries already exist (see [`solution-architecture.md`](./solution-architecture.md)), this is an extraction, not a redesign.

## When to Reconsider Kubernetes

Revisit Fargate vs. EKS when the platform runs enough genuinely independent services (post-extraction, per above) that Fargate's per-task simplicity becomes *more* operational overhead than a Kubernetes control plane would be — realistically, a multi-year-out question, not a near-term one.

## Multi-Tenant Scaling

Adding a new tenant (a graduating [Future Ventures](../../projects/future-ventures/README.md) idea, or a new subsidiary) is a data-layer operation (a new `company_id` and associated RBAC roles — see [`../database/data-model.md`](../database/data-model.md)), not an infrastructure change. This is the specific technical payoff of the "Multi-company capable" principle: onboarding Bhubesi AI, Bhubesi Studios, or any future subsidiary should never require new servers.

## Capacity Planning Cadence

Reviewed quarterly alongside [`executive-brain/quarterly-planning-framework.md`](../../executive-brain/quarterly-planning-framework.md), using the Executive Dashboard's (see [`executive-brain/executive-dashboard-spec.md`](../../executive-brain/executive-dashboard-spec.md)) operational KPIs as the leading indicator rather than waiting for a user-facing incident to trigger action.
