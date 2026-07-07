# Technology Stack — Decision Record

**Owner:** [CTO seat](../../ai-agents/workforce/cto.md). **Status:** Recommended, pending Executive Office ratification per [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md) (this is a Type 1 decision — see [`../../ai-agents/workforce/cto.md`](../../ai-agents/workforce/cto.md)'s "build-vs-buy at company scale" authority boundary).

This is the canonical justification document. Every other `platform/` document references this one rather than re-litigating a technology choice. Every recommendation below states what was chosen, what was considered and rejected (or deferred), and why — per the mandate to "justify every recommendation."

## Guiding Constraint

Bhubesi International is not a funded, staffed engineering organization yet — it is an early-stage holding company running lean ([`executive-brain/bhubesi-international-profile.md`](../../executive-brain/bhubesi-international-profile.md)). Every choice below is biased toward **low operational overhead now, with an explicit, undramatic upgrade path later** — not toward the most sophisticated architecture theoretically possible. A stack a two-to-five person engineering team can actually run beats a stack that requires a platform team Bhubesi doesn't have yet.

## Language and Runtime

**Decision: TypeScript, end to end (frontend, backend, mobile).**

| Option | Verdict | Why |
|---|---|---|
| TypeScript everywhere | **Chosen** | One language across web, mobile, and backend means a small team isn't split across ecosystems; the existing [Bhubesi OS prototype](../../projects/bhubesi-os/README.md) is already TypeScript/React, so this extends rather than replaces sunk work. |
| Polyglot (e.g., Python backend for AI, TS frontend) | Rejected for now | Python has a stronger ML/data-science ecosystem, but the AI workload here is orchestration and API calls to hosted LLMs (see [`../ai/ai-platform.md`](../ai/ai-platform.md)), not model training — TypeScript's LLM SDKs (Anthropic, OpenAI) are equally capable for this. Revisit if Bhubesi Labs ever trains/fine-tunes its own models. |

## Frontend (Web)

**Decision: Next.js (App Router) + React + Tailwind CSS — continue what Phase 3 already built.**

Already proven in [`projects/bhubesi-os/app`](../../projects/bhubesi-os/README.md). Justification: server-side rendering matters for performance on the lower-bandwidth connections common across the African markets this platform targets ("Built for Africa with global standards"); the App Router's server components reduce client-side JavaScript shipped to the browser, which directly reduces data cost for end users — a real, not cosmetic, concern here. Tailwind keeps styling consistent across a growing set of modules without a separate design-tooling investment (see [`../frontend/design-system.md`](../frontend/design-system.md)).

Alternative considered: a pure SPA (Vite + React) — rejected because it pushes more JS to the client and loses SSR's low-bandwidth benefit for no offsetting gain here.

## Mobile

**Decision: React Native via Expo.**

| Option | Verdict | Why |
|---|---|---|
| React Native (Expo) | **Chosen** | Shares TypeScript logic and types with the Next.js web app in a monorepo (see below); Expo's over-the-air updates let bug fixes ship without waiting on app-store review — meaningful when field staff (e.g., RecoverHUB facilitators, 360Sports event crews) depend on a working app *today*. |
| Flutter | Rejected | Excellent framework, but introduces Dart as a second language and forks the team's context from the TypeScript web/backend stack, for no capability Bhubesi actually needs that RN lacks. |
| Native (Swift/Kotlin per platform) | Rejected | Two codebases to maintain on a lean team is not justified at this stage. |

See [`../mobile/mobile-architecture.md`](../mobile/mobile-architecture.md).

## Monorepo Strategy

**Decision: Turborepo**, housing the Next.js web app, the Expo mobile app, the NestJS API, and shared packages (`ui`, `types`, `api-client`, `ai-client`).

Justification: multiple ventures and future subsidiaries will need consistent UI and business logic (per "Modular architecture" and "Multi-company capable" principles) — a monorepo with shared packages prevents each venture's surface from silently diverging. Turborepo over Nx: simpler configuration, sufficient caching/task-orchestration for this scale, lower learning curve for a small team; Nx remains a credible fallback if the monorepo's build complexity grows materially.

## Backend / API

**Decision: NestJS (Node.js/TypeScript), deployed as a modular monolith.**

| Option | Verdict | Why |
|---|---|---|
| NestJS modular monolith | **Chosen** | NestJS's module system gives real internal boundaries (one module per [Bhubesi OS module](../../projects/bhubesi-os/README.md): CRM, Finance, Media Asset Library, etc. — see [`../architecture/solution-architecture.md`](../architecture/solution-architecture.md)) without paying for distributed-systems complexity (service discovery, distributed tracing, network failure modes) that a team this size can't yet operate reliably. |
| Microservices from day one | Rejected now, planned path later | "Modular architecture" is satisfied by module boundaries, not by deployment topology. A module (most likely Media Asset Library, given transcoding load) can be extracted into its own service later *because* the NestJS module boundary already exists — this is designed as a seam, not a rewrite. |
| Serverless functions (e.g., Next.js API routes only) | Rejected as the sole backend | Fine for simple CRUD, but the AI workload needs long-running connections (streaming LLM responses), background job processing (workflow engine, media transcoding), and durable state — poor fit for short-lived serverless functions. |

## Database

**Decision: PostgreSQL as the single system of record, with the `pgvector` extension for embeddings.**

Justification:

- **Relational integrity** for the data that actually needs it — financial records, decision logs, RBAC — where an eventually-consistent NoSQL store would introduce risk for no benefit.
- **Row-Level Security (RLS)** gives defense-in-depth multi-tenancy (see [`../database/data-model.md`](../database/data-model.md)) enforced at the database layer, not just in application code — critical given "Secure by default" and the sensitivity of data like RecoverHUB's participant records.
- **`pgvector`** means the AI Workforce's long-term memory (see [`../ai/memory-system.md`](../ai/memory-system.md)) lives in the same database as everything else — one system to back up, secure, and apply RLS to, instead of running a separate vector database with its own operational and security surface.
- **JSONB columns** absorb the genuine schema variability between ventures (RecoverHUB's programme data looks nothing like 360Sports' content metadata) without needing per-venture schema migrations for every field.
- Available as a managed service in an AWS Cape Town region (`af-south-1`), satisfying data-residency and latency goals without operating physical infrastructure.

Alternative considered: MongoDB for flexibility — rejected; JSONB in Postgres gives the same flexibility where needed while keeping relational guarantees everywhere else, avoiding a second database technology.

**Managed layer:** Supabase (Postgres + Auth + Storage + Realtime) is recommended for the MVP to move fast without standing up infrastructure Bhubesi doesn't yet have the team to run (see [`../roadmap/mvp.md`](../roadmap/mvp.md)), with a documented exit path to self-hosted Postgres on AWS RDS if cost, data-residency, or control requirements outgrow it later — Supabase is Postgres underneath, so this is a migration, not a rewrite.

## Caching and Job Queue

**Decision: Redis, plus BullMQ for background jobs.**

Justification: caching hot reads (KPI dashboards, seat profiles) and serving as the broker for asynchronous work — media transcoding, report generation, offline-sync reconciliation, long-running AI agent tasks — that must not block a user-facing request. BullMQ is Node-native and integrates directly with NestJS, avoiding a separate queue technology (e.g., RabbitMQ) for no added capability at this scale.

## Object Storage and CDN

**Decision: S3-compatible object storage (AWS S3, `af-south-1`) behind a CDN (CloudFront).**

Justification: the [Media Asset Library](../../projects/bhubesi-os/README.md) module (360Sports footage, The Chairman's raw and edited assets) and [Document Management](../../projects/bhubesi-os/README.md) module need durable, cheap, versioned storage — S3 is the industry default with the broadest tooling support. A CDN in front matters specifically for Africa: caching media near users reduces both latency and the mobile data cost end users bear, directly serving "Built for Africa."

## Search

**Decision: Postgres full-text search (`tsvector`) for the MVP Knowledge Search module; revisit only if volume demands more.**

Rejected for now: Elasticsearch/OpenSearch — real operational overhead (a cluster to run and secure) that isn't justified until document/content volume is large enough that Postgres full-text search demonstrably can't keep up. This is a deliberate "don't build for a scale you don't have yet" call, revisited in [`../roadmap/version-2.md`](../roadmap/version-2.md).

## AI / LLM Layer

**Decision: Anthropic Claude as the primary model provider, behind an internal LLM Gateway that abstracts the provider.**

Justification: this repository's entire operating system — `CLAUDE.md`, the [AI Workforce](../../ai-agents/workforce/README.md), the [Bhubesi OS AI Chat Interface prototype](../../projects/bhubesi-os/README.md) — is already built around Claude, and Claude's tool-use/agentic capabilities are well suited to the Type 1/Type 2 decision reasoning documented in [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md). The Gateway pattern exists specifically to avoid the vendor-concentration risk already flagged as R-003 in [`executive-brain/risk-register.md`](../../executive-brain/risk-register.md) — swapping or adding a provider (OpenAI, an open-weight model for cost- or data-residency-sensitive workloads) should be a Gateway configuration change, not a rewrite of every seat's logic. See [`../ai/ai-platform.md`](../ai/ai-platform.md).

## Authentication and Authorization

**Decision: Supabase Auth (OIDC-based) for MVP, RBAC + Postgres RLS for authorization.**

See [`../api/authentication.md`](../api/authentication.md) and [`../api/authorization.md`](../api/authorization.md) for full detail; summarized here as a stack choice: Supabase Auth ships MFA, SSO (Google/Microsoft — relevant given partners like NGOs, government departments, and corporates the company already engages, per [RecoverHUB's user base](../../projects/recoverhub/README.md)), and session management without building an identity system from scratch. Bundled with the Postgres decision above rather than a standalone identity provider (e.g., Auth0/WorkOS) to keep the MVP's moving parts to a minimum; revisit if enterprise SSO requirements (SAML for a large institutional partner) outgrow it.

## Deployment Platform

**Decision: Containerized services (Docker) on a managed container platform — AWS Fargate (ECS) — not Kubernetes.**

| Option | Verdict | Why |
|---|---|---|
| AWS Fargate (ECS) | **Chosen** | Cloud-native, auto-scaling, no servers to patch — but critically, no Kubernetes control plane for a small team to operate. Matches "Cloud-native" and "Enterprise-grade" without requiring a platform engineer Bhubesi doesn't have. |
| Kubernetes (EKS) | Deferred | The right choice if/when the platform runs enough distinct services that Fargate's simplicity becomes a constraint rather than a help — see [`../architecture/scalability.md`](../architecture/scalability.md) for the trigger conditions. |
| Platform-as-a-Service (e.g., Vercel + Railway) | Partially adopted | The Next.js frontend can deploy to Vercel for its Next.js-specific optimizations; the NestJS API and stateful services run on AWS for consistency with the data layer's region and security posture. |

## Cloud Provider and Region

**Decision: AWS, primary region `af-south-1` (Cape Town).**

Justification: AWS and Azure are the only major providers with a real African region (Google Cloud has none as of this writing); AWS was chosen over Azure for the breadth of managed services this stack already depends on (RDS, ECS/Fargate, S3, CloudFront) and the maturity of its IAM model. Azure's South Africa regions remain a credible alternative worth revisiting if the company standardizes on Microsoft 365/Azure AD for other reasons (many South African government and enterprise partners already run Microsoft stacks). Hosting in-region serves both latency for African users and alignment with POPIA's data-residency expectations — see [`../architecture/security-architecture.md`](../architecture/security-architecture.md).

**Domain:** `os.bhubesi.co.za` is reserved for the production deployment (confirmed unresolvable/undeployed as of this writing — see [`../architecture/deployment-architecture.md`](../architecture/deployment-architecture.md) for DNS and environment strategy).

## CI/CD

**Decision: GitHub Actions.**

Justification: the company's code already lives on GitHub; GitHub Actions needs no new vendor relationship, integrates natively with the monorepo, and supports the environment-promotion pipeline described in [`../architecture/deployment-architecture.md`](../architecture/deployment-architecture.md).

## Observability

**Decision: OpenTelemetry instrumentation, shipped to Grafana Cloud (managed).**

Justification: vendor-neutral instrumentation (OpenTelemetry) avoids locking observability data to one backend, while Grafana Cloud avoids operating a Prometheus/Grafana/Loki stack in-house before the team exists to run it. AI-specific observability (per-seat cost, latency, prompt/response audit trail with redaction for sensitive data) is layered on top — see [`../ai/ai-platform.md`](../ai/ai-platform.md).

## Payments and Local Integrations

**Decision: Paystack/Flutterwave for African-market payments, Stripe for international/USD-denominated transactions.**

Relevant to future revenue lines already documented (RecoverHUB's premium coaching, 360Sports subscriptions) — see [`../api/integrations.md`](../api/integrations.md) for detail, including the observation that the company's existing workflow already touches Google Workspace, Zoom, and GoDaddy (inferred from tooling in active use), which should be the first integration targets rather than hypothetical ones.

## Summary Table

| Layer | Choice | Primary Justification |
|---|---|---|
| Language | TypeScript everywhere | One team, one ecosystem |
| Web frontend | Next.js + React + Tailwind | SSR for low-bandwidth performance; extends existing prototype |
| Mobile | React Native (Expo) | Code sharing with web; OTA updates for field teams |
| Monorepo | Turborepo | Shared logic across web/mobile/backend/future ventures |
| Backend | NestJS modular monolith | Modularity without premature microservices |
| Database | PostgreSQL + pgvector | Relational integrity, RLS multi-tenancy, one system for data + embeddings |
| Managed data layer (MVP) | Supabase | Speed now, clean exit to self-hosted Postgres later |
| Cache/Queue | Redis + BullMQ | Async work, hot-path caching, Node-native |
| Object storage | S3 + CloudFront | Durable media storage, Africa-aware CDN caching |
| Search | Postgres full-text (MVP) | Avoids premature search-cluster overhead |
| AI/LLM | Claude, via internal Gateway | Consistency with existing operating system; vendor-risk mitigation |
| Auth | Supabase Auth (OIDC) | MFA/SSO without building identity from scratch |
| Deployment | AWS Fargate (ECS) | Cloud-native without Kubernetes overhead |
| Cloud region | AWS `af-south-1` | Real African region; latency + POPIA alignment |
| CI/CD | GitHub Actions | Already the code host; native integration |
| Observability | OpenTelemetry → Grafana Cloud | Vendor-neutral instrumentation, managed backend |
