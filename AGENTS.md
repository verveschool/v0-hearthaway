# Repository Instructions

These instructions apply to the entire repository.

## Codebase Consistency

Before writing code, scan the relevant files and directories to understand existing patterns. For UI and styling work, specifically review:

- `app/globals.css`
- `components/ui/`
- `tailwind.config.ts` if it exists

## Architecture

- Framework/runtime: Next.js App Router with React, TypeScript, and Tailwind CSS v4.
- Directory responsibilities:
  - `app/`: routes, layouts, metadata, and route handlers.
  - `components/`: shared UI and page sections.
  - `components/ui/`: reusable primitives.
  - `lib/`: typed static content and data helpers.
  - `public/`: brand and page imagery.
- Routing conventions:
  - Static pages use `app/<route>/page.tsx`.
  - Dynamic content routes use `[slug]` segments and static data lookups.
  - Country pages should reuse `app/country-hub-page.tsx` where possible.
- Data conventions:
  - Country, city, university, and moving-abroad content is static and typed in `lib/country-data.ts`, `lib/place-data.ts`, and `lib/moving-abroad-data.ts`.
  - Prefer adding typed records and helper functions there rather than hardcoding duplicated content in page files.
- API convention: `app/api/get-matched/route.ts` posts submissions to `GOOGLE_SHEET_WEBHOOK_URL`; keep request/response handling strictly typed and avoid leaking operational details to clients.
- UI guidance: reuse `components/ui/button.tsx` and existing shared sections where possible; follow existing Tailwind/CSS-variable usage and avoid introducing new design tokens.

## Design Rules

- Use only existing Tailwind utility classes and CSS variables.
- Never introduce new colors or spacing values.
- Always use existing components from `components/ui` when an existing component works.
- Do not create new UI components if an existing `components/ui` component satisfies the need.
- If a request violates these design rules, stop and warn the user before making changes.

## Development Rules

- Enforce strict TypeScript typing throughout.
- Do not use `any` types.
- Maintain existing naming conventions and folder structures.
- Do not add new dependencies without explicit user permission.
- Keep code clean and avoid redundant logic.

## Operational Protocol

- Scan relevant directories before writing code.
- Preserve codebase consistency over introducing new patterns.
- Prefer the smallest clean change that satisfies the request.
