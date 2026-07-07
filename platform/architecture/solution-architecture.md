# Solution Architecture

How [`system-architecture.md`](./system-architecture.md)'s components are internally structured — the module boundaries, layering, and monorepo organization that make "modular architecture" real rather than aspirational.

## Layered Architecture

```mermaid
flowchart TB
    subgraph Presentation["Presentation Layer"]
        WebUI["Next.js App Router\n(server + client components)"]
        MobileUI["React Native / Expo screens"]
    end

    subgraph API["API Layer (NestJS)"]
        REST["REST Controllers\n(external/versioned)"]
        TRPC["tRPC Routers\n(internal, type-safe)"]
        Guards["Auth Guards / RLS context"]
    end

    subgraph Domain["Domain Layer — one NestJS module per Bhubesi OS module"]
        CRM["CRM"]
        PM["Project Management"]
        DM["Document Management"]
        FIN["Finance"]
        MAL["Media Asset Library"]
        RD["Research Database"]
        KS["Knowledge Search"]
        AH["Automation Hub"]
        AIChat["AI Chat"]
    end

    subgraph Shared["Shared Services"]
        AIGateway["AI Gateway"]
        WorkflowEngine["Workflow Engine"]
        Notification["Notifications"]
    end

    subgraph DataLayer["Data Layer"]
        PG[("PostgreSQL + pgvector")]
        Redis[("Redis")]
        S3[("S3")]
    end

    WebUI --> REST
    WebUI --> TRPC
    MobileUI --> REST
    TRPC --> Guards
    REST --> Guards
    Guards --> Domain
    Domain --> Shared
    Domain --> DataLayer
    Shared --> DataLayer
```

## Module Boundaries

Each Bhubesi OS module (per [`projects/bhubesi-os/README.md`](../../projects/bhubesi-os/README.md)) is a NestJS module with its own:

- Postgres schema/table namespace (e.g., `crm.*`, `finance.*`) — logical separation even within one database.
- Service and controller layer — no module reaches directly into another module's tables; cross-module data access goes through the other module's service interface.
- Ownership mapped to an AI Workforce seat (see table below), consistent with [`docs/governance.md`](../../docs/governance.md)'s decision-rights model.

| Module | Primary Owning Seat | Status |
|---|---|---|
| AI Chat | [CTO](../../ai-agents/workforce/cto.md) (platform), all seats (content) | Built — [prototype live](../../projects/bhubesi-os/README.md) |
| CRM | [Sales Director](../../ai-agents/workforce/sales-director.md), [Chief Marketing Officer](../../ai-agents/workforce/chief-marketing-officer.md) | Planned — [`../roadmap/version-1.md`](../roadmap/version-1.md) |
| Project Management | [COO](../../ai-agents/workforce/coo.md) | Planned — [`../roadmap/version-1.md`](../roadmap/version-1.md) |
| Document Management | [COO](../../ai-agents/workforce/coo.md), [Chief Legal Officer](../../ai-agents/workforce/chief-legal-officer.md) | Planned — [`../roadmap/mvp.md`](../roadmap/mvp.md) |
| Finance | [CFO](../../ai-agents/workforce/cfo.md) | Planned — [`../roadmap/version-2.md`](../roadmap/version-2.md) |
| Media Asset Library | [Chief Creative Officer](../../ai-agents/workforce/chief-creative-officer.md), [Film Producer](../../ai-agents/workforce/film-producer.md) | Planned — [`../roadmap/version-2.md`](../roadmap/version-2.md) |
| Research Database | [Chief Research Officer](../../ai-agents/workforce/chief-research-officer.md) | Planned — [`../roadmap/version-3.md`](../roadmap/version-3.md) |
| Knowledge Search | [CTO](../../ai-agents/workforce/cto.md) | Planned — [`../roadmap/mvp.md`](../roadmap/mvp.md) (basic) |
| Automation Hub | [CTO](../../ai-agents/workforce/cto.md) | Planned — [`../roadmap/version-2.md`](../roadmap/version-2.md) |

## Why a Modular Monolith, Structurally

The module boundary above is a **deployment-independent seam**: today, every module runs inside one NestJS process (see [`technology-stack.md`](./technology-stack.md) for why). If Media Asset Library's transcoding load, say, eventually needs independent scaling, it can be extracted into its own service *because* it already only talks to other modules through defined interfaces — no module directly queries another module's tables. This is the concrete mechanism behind "Modular architecture" as a principle, not just a folder-naming convention.

## Monorepo Layout

```
bhubesi-os/
├── apps/
│   ├── web/          # Next.js
│   ├── mobile/        # Expo / React Native
│   └── api/           # NestJS
├── packages/
│   ├── ui/             # Shared component library (see ../frontend/design-system.md)
│   ├── types/          # Shared TypeScript types (API contracts, entities)
│   ├── api-client/      # Typed tRPC/REST client used by web + mobile
│   ├── ai-client/       # AI Gateway client (see ../ai/ai-platform.md)
│   └── config/          # Shared ESLint/TS config
└── infra/               # Terraform (see infrastructure.md)
```

This extends, rather than replaces, [`projects/bhubesi-os/app`](../../projects/bhubesi-os/README.md) — the existing prototype becomes `apps/web` when the monorepo is introduced (see [`../roadmap/mvp.md`](../roadmap/mvp.md) for the migration step).

## Request Flow (Illustrative)

```mermaid
sequenceDiagram
    participant U as User (Web/Mobile)
    participant API as API Layer
    participant Guard as Auth Guard (RLS context)
    participant Mod as Domain Module (e.g., Finance)
    participant DB as PostgreSQL

    U->>API: Request (JWT attached)
    API->>Guard: Validate token, resolve company_id + role
    Guard->>Mod: Authorized request + tenant context
    Mod->>DB: Query (RLS enforces company_id filter)
    DB-->>Mod: Rows (tenant-scoped only)
    Mod-->>API: Domain response
    API-->>U: Response
```

See [`../api/api-architecture.md`](../api/api-architecture.md) for the full API design and [`../api/authorization.md`](../api/authorization.md) for how the Guard resolves role and tenant context.
