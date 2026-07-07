# UI Architecture

## Framework

Next.js App Router — justified in [`../architecture/technology-stack.md`](../architecture/technology-stack.md). This document covers how the frontend is structured internally.

## Route Structure

Mirrors the backend's module boundaries (per [`../architecture/solution-architecture.md`](../architecture/solution-architecture.md)) so the mental model is identical whether you're reading the frontend or backend code:

```
apps/web/src/app/
├── (auth)/                # login, MFA, SSO callback
├── (platform)/
│   ├── [company]/          # tenant-scoped route segment
│   │   ├── chat/            # AI Chat (built)
│   │   ├── crm/
│   │   ├── projects/
│   │   ├── documents/
│   │   ├── finance/
│   │   ├── media/
│   │   ├── research/
│   │   ├── search/
│   │   └── automation/
│   └── executive/           # cross-tenant Executive Dashboard (see executive-brain/executive-dashboard-spec.md)
```

The `[company]` dynamic segment carries tenant context through the URL, consistent with [`../database/data-model.md`](../database/data-model.md)'s tenant model — switching tenants (for a user who belongs to more than one, per [`../api/authentication.md`](../api/authentication.md)) is a route change, not a hidden global-state flip, which keeps URLs shareable and bookmarkable per tenant.

## Rendering Strategy

- **Server Components by default** — data-heavy views (KPI dashboards, CRM lists, financial reports) render on the server, shipping minimal JavaScript to the client. Directly serves the "Built for Africa" bandwidth-consciousness principle.
- **Client Components only where interactivity demands it** — the AI Chat interface (already built this way in the [prototype](../../projects/bhubesi-os/README.md)), forms, and real-time elements.
- **Streaming responses** for AI Chat, using React Server Components' streaming support paired with the LLM Gateway's token-streaming (see [`../ai/ai-platform.md`](../ai/ai-platform.md)) — a user sees a seat's response appear progressively, not after a long blocking wait.

## State Management

**Decision: server state via tRPC + React Query (bundled with tRPC); minimal client-side global state.**

Justification: most of this platform's state *is* server state (CRM records, projects, documents) — React Query's caching, refetching, and optimistic-update primitives cover this without a separate state-management library (Redux, Zustand) for data that doesn't need one. Client-only UI state (sidebar open/closed, active theme) uses React's built-in state — no global store needed at this scale.

## Shared Components Across Monorepo

Per [`../architecture/solution-architecture.md`](../architecture/solution-architecture.md), `packages/ui` components are consumed by both the web app and, where React Native/NativeWind compatibility allows, the mobile app (see [`../mobile/mobile-architecture.md`](../mobile/mobile-architecture.md)) — reducing duplicate implementation of, for example, the KPI tile or chat bubble component.

## Forms and Validation

A shared validation schema library (Zod) defines each entity's shape once in `packages/types`, used for both frontend form validation and backend request validation — one schema, not two definitions that can drift apart.

## Extending the Existing Prototype

The [Bhubesi OS AI Chat Interface prototype](../../projects/bhubesi-os/README.md) becomes `apps/web/src/app/(platform)/[company]/chat/` under this structure — its existing components (`ChatPanel`, `SeatSidebar`, `ModuleNav`) move into `packages/ui` largely as-is, since they were already built with this eventual structure in mind (see [`../roadmap/mvp.md`](../roadmap/mvp.md) for the concrete migration step).
