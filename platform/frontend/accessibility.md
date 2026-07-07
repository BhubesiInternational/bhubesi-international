# Accessibility

## Target

**WCAG 2.1 Level AA**, across web and mobile. This is a launch requirement, not a post-launch enhancement — consistent with "Enterprise-grade" and the reality that institutional partners (government departments, per [RecoverHUB's partner base](../../projects/recoverhub/README.md)) may have their own accessibility procurement requirements.

## Why This Is Not Optional Here Specifically

Beyond general good practice: RecoverHUB serves individuals in recovery, a population where cognitive load, stress, and varying digital literacy are common — an interface that's hard to use under those conditions works against the venture's actual mission (see [`../../projects/recoverhub/strategy.md`](../../projects/recoverhub/strategy.md)). Accessibility here is a product requirement, not a compliance checkbox.

## Implementation Approach

| Requirement | How It's Met |
|---|---|
| Keyboard navigation | Radix UI primitives (see [`design-system.md`](./design-system.md)) handle focus management and keyboard interaction correctly by default for all interactive components |
| Screen reader support | Semantic HTML first, ARIA attributes only to fill genuine gaps — not ARIA-heavy markup compensating for non-semantic structure |
| Color contrast | Design tokens (see [`design-system.md`](./design-system.md)) validated against WCAG AA contrast ratios in both light and dark themes, not just one |
| Text scaling | Layouts use relative units (`rem`), tested at 200% browser zoom without breaking layout |
| Motion sensitivity | Respect `prefers-reduced-motion` for animations (typing indicators, transitions) already present in the [chat interface prototype](../../projects/bhubesi-os/README.md) |
| Form errors | Announced to assistive technology, not conveyed by color alone |

## Mobile-Specific Accessibility

- Touch targets meet minimum size guidelines (44×44pt) — particularly relevant for field use where users may be standing, moving, or using the app one-handed (e.g., 360Sports event coverage).
- VoiceOver (iOS) and TalkBack (Android) tested explicitly, not assumed to work because the web version is accessible — React Native accessibility props are a separate implementation surface from web ARIA.

## AI Chat Interface Accessibility

The chat interface (see [`../ai/executive-ai.md`](../ai/executive-ai.md)) is a particular risk area for accessibility if built carelessly — streaming text updates must be announced to screen readers in a way that's useful rather than overwhelming (e.g., announcing the complete message once streaming finishes, not every incremental token).

## Testing

Automated accessibility linting (axe-core) runs in CI on every pull request (see [`../architecture/deployment-architecture.md`](../architecture/deployment-architecture.md)'s pipeline) catching regressions before merge; manual screen-reader testing performed before each major release (see [`../roadmap/`](../roadmap)), not just at initial launch.

## Ownership

[Chief Creative Officer](../../ai-agents/workforce/chief-creative-officer.md) owns accessibility as part of design-system quality; [CTO](../../ai-agents/workforce/cto.md) owns automated enforcement in CI.
