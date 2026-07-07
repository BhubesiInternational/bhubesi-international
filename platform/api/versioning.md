# API Versioning

## Scope

This policy applies to the **external, versioned REST API** described in [`api-architecture.md`](./api-architecture.md). The internal tRPC contract between the web/mobile apps and the backend is *not* independently versioned — client and server ship from the same monorepo and deploy together (see [`../architecture/solution-architecture.md`](../architecture/solution-architecture.md)), so there is never a version mismatch to manage.

## REST Versioning Scheme

**Decision: URL path versioning — `/api/v1/...`, `/api/v2/...`.**

| Option | Verdict | Why |
|---|---|---|
| URL path (`/v1/`) | **Chosen** | Immediately visible in logs, documentation, and to any external developer reading a URL — the simplest possible mental model for partners integrating without deep API expertise. |
| Header-based versioning | Rejected | More "correct" in some API-design philosophies, but adds friction for exactly the kind of external, possibly less-sophisticated partner integrations (government departments, NGOs) this platform expects — see [`integrations.md`](./integrations.md). |

## Deprecation Policy

1. A new version (`v2`) is only introduced for a **breaking** change (removing a field, changing a field's meaning, removing an endpoint). Additive changes (new optional fields, new endpoints) ship into the current version without a bump.
2. When `v2` ships, `v1` is marked deprecated but remains functional for a minimum of 6 months, with the deprecation date communicated to every registered partner integration (see [`integrations.md`](./integrations.md)).
3. `v1` is only removed after the deprecation window closes and confirmed zero active traffic — checked via API usage monitoring, not assumed.

## Governance

Introducing a new API version is a Type 1 decision under [`executive-brain/decision-framework.md`](../../executive-brain/decision-framework.md) — it has downstream cost for every external integration partner, not just an internal engineering trade-off. The [CTO seat](../../ai-agents/workforce/cto.md) owns the technical migration; [Chief Legal Officer](../../ai-agents/workforce/chief-legal-officer.md) is consulted if any partner agreement references API stability commitments.

## Internal Contract Stability

Because tRPC contracts aren't independently versioned, breaking internal changes are managed by **shipping the frontend and backend change atomically** in the same deployment (per [`../architecture/deployment-architecture.md`](../architecture/deployment-architecture.md)'s CI/CD pipeline) — there is no scenario where an old mobile app client talks to a new backend with an incompatible contract, *except* for mobile, addressed below.

## Mobile App Version Skew

Unlike the web app (always served at the latest deployed version), a mobile app version can lag behind the backend for weeks if a user hasn't updated — app-store review delays this even with Expo's OTA updates for non-native changes (see [`../mobile/mobile-architecture.md`](../mobile/mobile-architecture.md)). The backend therefore maintains **backward compatibility for tRPC contracts consumed by mobile for a minimum of 2 released app versions**, treated with the same deprecation discipline as the REST API above, even though it isn't URL-versioned.
