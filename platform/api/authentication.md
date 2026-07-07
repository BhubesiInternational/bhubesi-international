# Authentication

## Decision: Supabase Auth (OIDC-based)

Justified in [`../architecture/technology-stack.md`](../architecture/technology-stack.md); this document covers the authentication design in detail.

## Supported Methods

| Method | Use Case |
|---|---|
| Email + password | Default for individual users without an institutional identity provider |
| Google SSO | Likely first SSO option — Google Workspace usage is already evident in the company's existing tooling |
| Microsoft SSO | For institutional partners (government departments, corporates) standardized on Microsoft 365, common among South African institutions |
| Magic link | Low-friction option for infrequent external users (e.g., a partner reviewing a single shared report) |

MFA is **required, not optional**, for every Executive Office and admin-role account, per [`../architecture/security-architecture.md`](../architecture/security-architecture.md)'s "secure by default" posture. MFA is strongly encouraged but not blocking for lower-privilege venture-staff accounts at MVP, revisited as the platform matures.

## Session Strategy

- **Access token:** short-lived JWT (15 minutes), containing user ID and a signature the API validates without a database round-trip for most requests.
- **Refresh token:** longer-lived (7 days for web, 30 days for mobile — mobile sessions persist longer given "mobile-first" usage patterns where re-authenticating frequently is a real friction cost), rotated on use, revocable server-side.
- **Mobile offline consideration:** the mobile app caches a valid session across offline periods (see [`../mobile/offline-strategy.md`](../mobile/offline-strategy.md)) but re-validates and refreshes as soon as connectivity returns; no offline action is permanently committed without a subsequent authenticated sync.

## Multi-Tenant Login

A user can belong to more than one `Company` (see [`../database/data-model.md`](../database/data-model.md)) — for example, a Bhubesi Ventures staff member supporting both RecoverHUB and 360Sports. Login authenticates the *user*; a subsequent, lightweight "active company" selection (or automatic default if the user belongs to only one) sets the tenant context for the session, surfaced in the UI per [`../frontend/navigation.md`](../frontend/navigation.md).

## AI Seat Authentication

AI Workforce seats (see [`../ai/executive-ai.md`](../ai/executive-ai.md)) are not user accounts — they act *on behalf of* an authenticated human user's session and inherit that user's tenant and role context. There is no standing "AI service account" with independent, broader access than any human could have; this is a deliberate constraint that keeps [`authorization.md`](./authorization.md)'s RBAC model uniform across human and AI-initiated actions.

## Password and Credential Policy

Minimum complexity enforced by Supabase Auth defaults; breach-detection (checking against known-compromised password lists) enabled. No password ever logged, including in error logs or AI Gateway prompt logs (see [`../ai/ai-platform.md`](../ai/ai-platform.md)'s redaction policy).

## Account Lifecycle

Deactivation (departing staff, a venture winding down per [`business-units/bhubesi-ventures/sops.md`](../../business-units/bhubesi-ventures/sops.md) Section 4) immediately revokes all sessions and refresh tokens — access removal is real-time, not dependent on token expiry.
