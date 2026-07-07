# Bhubesi OS — App

Next.js + React + TypeScript + Tailwind CSS. This is the AI Chat Interface module of [Bhubesi OS](../README.md) — see that file for module status, scope, and what "prototype" means here.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Code Layout

- `src/lib/seats.ts` — the 12 AI Workforce seat profiles (responsibilities, decision authority, KPIs), sourced from [`ai-agents/workforce/`](../../../ai-agents/workforce/README.md).
- `src/lib/responder.ts` — simulated reply generation (no live LLM backend yet — see the project README's "Next Steps").
- `src/lib/modules.ts` — the 9 planned Bhubesi OS modules shown in the nav bar.
- `src/components/` — `BhubesiOS` (top-level state), `SeatSidebar`, `ChatPanel`, `ChatMessageBubble`, `ModuleNav`, `PrototypeBanner`.

## Scripts

- `npm run dev` — development server.
- `npm run build` — production build.
- `npm run lint` — ESLint.
