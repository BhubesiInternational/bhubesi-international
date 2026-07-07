# Design System

## Foundation

**Decision: Tailwind CSS + a headless component primitives layer (Radix UI), assembled into a shared `packages/ui` component library** (per [`../architecture/solution-architecture.md`](../architecture/solution-architecture.md)'s monorepo layout).

Justification: this extends the exact approach already used in the [Bhubesi OS prototype](../../projects/bhubesi-os/README.md) (Tailwind, utility-first, `dark:` variants for theme support). Radix UI adds accessible, unstyled interactive primitives (dropdowns, dialogs, tooltips) so accessibility (see [`accessibility.md`](./accessibility.md)) is built in rather than retrofitted — Radix handles keyboard navigation and ARIA semantics; Tailwind handles visual styling on top.

Alternative considered: a full pre-styled component library (e.g., Material UI, Ant Design) — rejected because their visual opinions are hard to override cleanly for a distinct brand identity, and Bhubesi's own brand guidelines (still pending, per [`knowledge-base/brand-guidelines.md`](../../knowledge-base/brand-guidelines.md)) shouldn't be constrained by someone else's design system before they even exist.

## Brand Tokens

Design tokens (color, spacing, typography) are defined once in `packages/ui/tokens` and consumed by Tailwind's config across web and mobile (React Native supports a compatible utility approach via NativeWind). Until [`knowledge-base/brand-guidelines.md`](../../knowledge-base/brand-guidelines.md) is formalized by [Chief Creative Officer](../../ai-agents/workforce/chief-creative-officer.md), tokens use the same provisional neutral-plus-accent palette already established in the prototype — this is a placeholder, not a decision, and should be the first thing replaced once real brand guidelines exist.

## Multi-Tenant Theming

**Decision: a single shared design system with narrow, deliberate per-tenant accent theming, not fully independent per-venture brands.**

Justification: per [`executive-brain/marketing.md`](../../executive-brain/marketing.md), Bhubesi International's own credibility is part of what backs every venture — a platform where every venture looks like a completely different, unrelated product would undercut that. Instead, each `Company` (tenant, see [`../database/data-model.md`](../database/data-model.md)) can set a single accent color and logo via its `settings` JSONB field, applied on top of the shared design system — consistent structure, distinguishable identity.

## Component Categories

| Category | Examples | Notes |
|---|---|---|
| Primitives | Button, Input, Select, Dialog, Tooltip | Radix-based, from `packages/ui` |
| Layout | Page shell, module nav, sidebar | Extends the [Bhubesi OS prototype](../../projects/bhubesi-os/README.md)'s `ModuleNav`/`SeatSidebar` pattern |
| Data display | Table, KPI tile, chart primitives | Charts follow the company's `dataviz` design conventions once formalized |
| AI-specific | Chat bubble, seat avatar, decision-authority badge | Extends `ChatMessageBubble`/`ChatPanel` already built in the prototype |

## Dark/Light Theming

Both themes are first-class, following the prototype's existing `prefers-color-scheme` approach, with an explicit user override (not just system-preference detection) added as the platform matures — relevant given users may work in bright outdoor conditions (field staff, event coverage) where a manual override matters practically, not just as a preference nicety.

## Governance

Component and token changes affecting the shared library are reviewed by [Chief Creative Officer](../../ai-agents/workforce/chief-creative-officer.md) for brand consistency and [CTO](../../ai-agents/workforce/cto.md) for technical soundness — a Type 2 decision in the steady state, Type 1 only for a foundational token change (e.g., replacing the color palette) that ripples across every tenant's UI.
