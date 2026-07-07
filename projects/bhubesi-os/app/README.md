# Bhubesi OS — App

Next.js + React + TypeScript + Tailwind CSS, with a real Postgres-backed API layer (Prisma), real authentication (Auth.js), and an LLM Gateway with graceful fallback. This is the AI Chat Interface module of [Bhubesi OS](../README.md) — see that file for module status and scope.

## What's Real Here

- **Accounts and sessions** — Auth.js credentials provider, bcrypt-hashed passwords, JWT sessions. Signup creates a `User`, a `Company` (tenant), and a `Membership` in one transaction.
- **Persistence** — every conversation and message is a real row in Postgres (`Conversation`, `Message`), scoped to `(user, company, seat)`. Refreshing the page or restarting the server doesn't lose anything.
- **Multi-tenancy foundation** — every chat request is scoped to the caller's `companyId`, checked against their actual `Membership` server-side before any data is read or written.
- **AI Workforce replies** — real Claude calls if `ANTHROPIC_API_KEY` is set (see `src/lib/llmGateway.ts`), built from each seat's actual Responsibilities/Decision Authority/KPIs from [`ai-agents/workforce/`](../../../ai-agents/workforce/README.md). Falls back to the deterministic simulated responder (`src/lib/responder.ts`) if no key is configured — the app never breaks either way.

This is a first real slice of [`platform/roadmap/mvp.md`](../../../platform/roadmap/mvp.md), built directly in this app rather than the full Turborepo/NestJS migration described in [`platform/architecture/solution-architecture.md`](../../../platform/architecture/solution-architecture.md) — that migration is still the target end-state, not yet done.

## Running Locally

1. **Postgres.** You need a running Postgres instance. Locally:
   ```bash
   sudo service postgresql start
   sudo -u postgres psql -c "CREATE DATABASE bhubesi_os;"
   sudo -u postgres psql -c "CREATE USER bhubesi_app WITH PASSWORD 'your-local-password' CREATEDB;"
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bhubesi_os TO bhubesi_app;"
   sudo -u postgres psql -d bhubesi_os -c "GRANT ALL ON SCHEMA public TO bhubesi_app;"
   ```
2. **Environment.** Copy `.env.example` to `.env` and fill in `DATABASE_URL` and `AUTH_SECRET` (generate one with `npx auth secret`). `ANTHROPIC_API_KEY` is optional — see above.
3. **Install and migrate:**
   ```bash
   npm install
   npx prisma migrate dev
   ```
4. **Run:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/signup` to create the first account.

## Code Layout

- `prisma/schema.prisma` — the data model: `User`, `Company`, `Membership`, `Conversation`, `Message`. A deliberately minimal slice of [`platform/database/data-model.md`](../../../platform/database/data-model.md).
- `src/auth.ts` — Auth.js configuration (credentials provider, JWT sessions).
- `src/lib/db.ts` — Prisma client singleton (driver-adapter based, per Prisma 7).
- `src/lib/llmGateway.ts` — real Claude call with fallback to `src/lib/responder.ts`'s simulated logic.
- `src/lib/seats.ts` — the 12 AI Workforce seat profiles, sourced from [`ai-agents/workforce/`](../../../ai-agents/workforce/README.md).
- `src/app/api/signup`, `src/app/api/auth/[...nextauth]`, `src/app/api/chat` — the real backend endpoints.
- `src/app/login`, `src/app/signup` — auth pages.
- `src/components/` — `BhubesiOS` (top-level state, now server-data-backed), `SeatSidebar`, `ChatPanel`, `ChatMessageBubble`, `ModuleNav`, `PrototypeBanner`.

## Scripts

- `npm run dev` — development server.
- `npm run build` — production build.
- `npm run lint` — ESLint.
- `npx prisma studio` — browse the database visually.
- `npx prisma migrate dev` — apply schema changes.
