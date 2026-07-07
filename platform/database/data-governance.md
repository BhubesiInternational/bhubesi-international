# Data Governance

## Classification Tiers

| Tier | Definition | Example |
|---|---|---|
| **Public** | Safe for unrestricted external release | Published media content, marketing material |
| **Internal** | Not for external release, broadly accessible within the company | Meeting notes, internal reports |
| **Confidential** | Restricted to relevant business unit/role | Contracts, deal terms, unreleased financial reports |
| **Restricted** | Highest sensitivity — legal, safety, or vulnerable-population implications | RecoverHUB participant records, safeguarding data |

Every `Document`, `Asset`, and `Contact` record (see [`entity-relationship-diagram.md`](./entity-relationship-diagram.md)) carries a classification, set at creation and enforceable by [`../api/authorization.md`](../api/authorization.md)'s ABAC-lite layer.

## Why This Matters Most for RecoverHUB

[RecoverHUB's SOPs](../../projects/recoverhub/sops.md) already establish that any decision touching participant data defaults to a Chief Legal Officer Type 1 gate. This document is the technical enforcement of that policy: Restricted-classification data is never returned by a query, an AI retrieval, or an export unless the requesting user/seat is explicitly authorized for that specific classification — not just generally authenticated.

## POPIA Alignment

South Africa's Protection of Personal Information Act (POPIA) governs the baseline for this platform given its South African legal entity and `af-south-1` hosting (see [`../architecture/security-architecture.md`](../architecture/security-architecture.md)):

- **Lawful processing:** every data collection point (partner onboarding, participant intake — see [RecoverHUB's SOPs](../../projects/recoverhub/sops.md)) captures explicit consent, recorded as a first-class field, not assumed.
- **Purpose limitation:** data collected for one venture's programme is not repurposed for another venture without fresh consent — enforced structurally by the multi-tenant `company_id` boundary (see [`data-model.md`](./data-model.md)), not just by policy.
- **Data subject rights:** access, correction, and deletion requests are supported as platform capabilities (an admin-initiated export/delete flow scoped to one data subject across all their records), not manual database operations — this is a launch requirement for any module handling personal information, not a fast-follow.
- **Cross-border transfer:** the LLM Gateway (see [`../ai/ai-platform.md`](../ai/ai-platform.md)) sends prompt content to Anthropic's infrastructure, which is not in-region — Restricted-classification data is redacted or excluded from LLM context by default (see [`../ai/ai-platform.md`](../ai/ai-platform.md)'s redaction policy) specifically to avoid an unmanaged cross-border transfer of the most sensitive data category.

## Data Lineage

Every `MEMORY_CHUNK` (AI memory) and search-index entry records its `source_type` and source record ID (see [`entity-relationship-diagram.md`](./entity-relationship-diagram.md)) — an AI Workforce answer can always be traced back to the document or record it drew from, both for user trust (per [`../ai/knowledge-engine.md`](../ai/knowledge-engine.md)'s citation requirement) and for compliance audit.

## Retention and Deletion

Retention periods per classification are set in [`storage-strategy.md`](./storage-strategy.md). Deletion is "hard" for Restricted data upon a valid data-subject request or retention-period expiry (not a soft-delete flag that leaves data recoverable) — a deliberate stricter default than the rest of the platform, where soft-delete (with an audit trail) is acceptable for operational safety.

## Access Audit

Every read of Confidential- or Restricted-classification data is logged (who, when, which record) — this log is itself Restricted-classification data, and is the primary artifact reviewed if a data-handling concern is ever raised.

## Ownership and Review

[Chief Legal Officer](../../ai-agents/workforce/chief-legal-officer.md) owns data governance policy; [CTO](../../ai-agents/workforce/cto.md) owns its technical enforcement. Reviewed at minimum semi-annually per [`docs/governance.md`](../../docs/governance.md), and immediately upon any new venture handling a new category of sensitive data (e.g., a future health-adjacent or financial-services venture would trigger an ad hoc review before launch, not wait for the next scheduled one).
