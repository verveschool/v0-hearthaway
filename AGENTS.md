# Repository Instructions

These instructions apply to the entire repository.

## Codebase Consistency

Before writing code, scan the relevant files and directories to understand existing patterns. For UI and styling work, specifically review:

- `app/globals.css`
- `components/ui/`
- `tailwind.config.ts` if it exists

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
