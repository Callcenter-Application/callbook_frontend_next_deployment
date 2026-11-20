# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@../AGENTS.md

## Working rules (from the repo owner, always apply)

- **Read this file before making any change.**
- **Keep this file current.** Before you work on a general request, check that this file still describes the codebase. If it doesn't, update it first. After any change that affects commands, config, structure or conventions, update it again.
- **Scoped requests stay scoped.** If the user names a particular file or task, work only on that. Don't explore or read the rest of the codebase, and don't do the general CLAUDE.md review for that request.
- **No AI attribution.** Never add Claude as co-author or collaborator. This means no `Co-Authored-By` trailer in commits, and no "Generated with Claude Code" line in PRs, code comments or docs.

## Project

CallBook is the frontend for a call center admin panel (supervisors and operators). It is currently a **clickable demo**. All data is static mock data, there is no backend or auth, and the forms only navigate: submitting login goes to `/home`, and creating a user goes back to `/users`.

## Architecture (`src/`)

- `app/`: `/` redirects to `/login`. `(auth)/login` is the full-screen sign-in. In the `(panel)` route group, `layout.tsx` renders the shared `Sidebar` and `Header` around every screen: `home`, `live-calls`, `users`, `users/new`, `queues`, `recordings`, `reports`, `settings`. Pages are thin Server Components that set `metadata` and render a view.
- `components/ui/`: generic, design-agnostic primitives. `Button`/`ButtonLink`/`IconButton` (variants primary, secondary, subtle, outline, light, danger, muted), `Badge` (takes a `Tone`), `Avatar`, `StatusDot`, `Card`/`Panel`/`Band` (in `Surface.tsx`), `SegmentedControl`/`SegmentGroup`/`SegmentButton`, `Field`/`Input`/`Select`, `Switch`, `Table`/`Th`/`Td`, `StatGrid`, `SectionHeader`/`TextLink`/`Hint`.
- `components/`: shared app pieces (`layout/Sidebar`, `layout/Header`, `PageHeader`, `TimeRangeFilter`, `SlaBar`, `Logo`, `Identity`, which holds `CallerCell` and `PersonCell`) and one folder per feature (`calls/`, `users/`, `queues/`, `recordings/`, `reports/`, `settings/`, `home/`, `auth/`). `providers/SessionProvider` holds the demo role.
- `icons/`: one component per icon, all built on `Icon.tsx`, and re-exported from `@/icons`. Add new icons there and never inline SVGs.
- `hooks/`: `useSession` (current demo user and `switchRole`), `useCallControls` (IVR/hold/mute state shared by both live-call views), `useDialer`, `useCycle`.
- `lib/`: `types.ts`, `constants.ts` (SLA target, time ranges, status→tone maps), `navigation.ts` (sidebar items), `utils.ts` (`cn`, `initials`, `formatClock`, `countBy`), and `data/*` (mock data per feature).

Conventions: page structure is `PageHeader`, then an optional toolbar `Band`, then `Panel`. Reuse the existing ui primitives and status maps before adding new ones. Colors come from the theme tokens in `globals.css` (`bg-surface`, `text-muted`, `border-line`, `bg-accent`, …), so don't use raw hex values.

**Demo role switch:** clicking the user block in the header toggles between supervisor (Luis Reyes) and operator (Erick Marcano). `/live-calls` renders `SupervisorLiveCalls` or `OperatorLiveCalls` depending on the role.

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: production build (also type-checks)
- `npm run start`: serve the production build
- `npm run lint`: ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit`: type-check only

No test framework is configured.

## Stack and config to know about

- **Next.js 16.4 / React 19.3, App Router under `src/app/`**. The APIs differ from older Next.js versions. Check `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) before you write Next-specific code. For example, typed route helpers such as the global `LayoutProps<"/">` / `PageProps` are used instead of hand-written prop types.
- `next.config.ts` turns on these settings:
  - `cacheComponents: true`: Cache Components / PPR model. Dynamic data access must be inside `<Suspense>` or marked with `"use cache"`. Read the docs before you fetch data in components.
  - `partialPrefetching: true`
  - `reactCompiler: true` (babel-plugin-react-compiler): don't add manual `useMemo`/`useCallback`/`memo` for performance.
  - Turbopack runs CSS through `@tailwindcss/turbopack`.
- **Tailwind CSS v4**: configured in CSS. `src/app/globals.css` defines the CallBook color tokens in `@theme` and maps the IBM Plex fonts (loaded with `next/font` in `layout.tsx`) to `font-sans`/`font-mono`. There is no `tailwind.config.js`.
- Path alias: `@/*` → `./src/*`.

## Design sources (`callbook-views/`)

`callbook-views/*.dc.html` are design-canvas exports. They are the reference specs for the screens to build: login, home-supervisor, live-calls-supervisor, live-calls-operator, users-panel, create-user, queues, recordings, reports, and settings. They are not part of the Next app, and they won't run standalone (they reference a missing `./support.js`). Each file has these parts:
- Markup inside `<x-dc>` with inline styles and `{{binding}}` template expressions.
- A `<helmet>` block with fonts and global styles. The design uses IBM Plex Sans / IBM Plex Mono, light blue surfaces (`#F0F6FC`, `#DCEBF8`), text `#10273D`, and the default accent `#2B7BC0`.
- A trailing `<script type="text/x-dc" data-dc-script data-props='…'>` class. It defines editable props (e.g. `accent`, error-state toggles, preview size) and component state/handlers. This shows the intended interactions and validation, such as the login email/password checks.

When you implement a view, convert it to React components with Tailwind classes. Don't copy the inline styles or the dc runtime.

## Project skills (`.claude/skills/`)

- The design skills (`accessibility-review`, `design-critique`, `design-handoff`, `design-system`, `ux-copy`, `user-research`, `research-synthesis`) link to `../../CONNECTORS.md`, which doesn't exist. They are generic and work without it.
