# Task 01 — Frontend foundation

## Objective
Create the minimal Next.js application foundation needed for later UI tasks.
## Context
Next.js with SSR/Server Components, TypeScript, and SCSS on Node.js 24 LTS is approved; routing conventions, state, forms, TypeScript version, Sass package/version, and build tooling are `TBD`.
## Prerequisites
Task 00 complete; read `docs/03-design-system.md` and `docs/05-frontend-architecture.md`.
## Scope
Only the `frontend/` Next.js/TypeScript shell, approved SCSS design tokens, rendering boundaries, package configuration, and a minimal verification surface.
## Explicit exclusions
No wizard, dashboard, auth, AI, API integration, or unapproved library.
## Implementation steps
Inspect first; confirm decisions; create or migrate the frontend package under `frontend/`; apply brand tokens and typography placeholders; add focused tests.

### Additional documented step — Storybook component catalog

After the minimal shell is established, create a separate Storybook setup to document reusable components and the Heroic Tales design system. This is a planned execution step and is not authorization to implement the character wizard or other product features.

The Storybook setup must:

1. Confirm the Storybook version and Next.js framework adapter before editing `package.json`.
2. Add only the dependencies and addons required for component documentation, recording each choice in `docs/02-approved-decisions.md` when it is no longer `TBD`.
3. Add stories for approved design tokens, typography roles, writing surfaces, buttons/controls, feedback states, and any components created in later tasks.
4. Use deterministic fixture data and never call application APIs, OpenAI, MongoDB, public D&D APIs, or browser persistence from stories.
5. Document responsive, accessibility, loading, error, AI-suggestion, accepted, rejected, and approved states where applicable.
6. Add the Storybook development and build commands to `package.json` only after the setup is complete and executable.

### Additional documented step — Frontend ESLint configuration

Configure ESLint for the frontend and its Storybook stories as a separate quality step. Before changing `package.json`, confirm the ESLint version, configuration format, Next.js/React/TypeScript plugins, Storybook integration, ignored generated files, severity policy, and whether the configuration will be shared with the backend. Keep all unresolved choices as `TBD` until explicitly decided.

The setup must provide a local lint command, cover the frontend source and configuration, respect Server/Client Component boundaries, avoid secret exposure, and document the CI lint command for future pipeline work. Do not add a formatter or unrelated lint plugin as part of this step.
## Files to create or modify
Frontend foundation files only. The target implementation paths are:

- `frontend/.nvmrc`
- `frontend/package.json`
- `frontend/next-env.d.ts`
- `frontend/next.config.ts`
- `frontend/tsconfig.json`
- `frontend/eslint.config.mjs`
- `frontend/.storybook/main.ts`
- `frontend/.storybook/preview.ts`
- `frontend/app/layout.tsx`
- `frontend/app/page.tsx`
- `frontend/app/globals.scss`
- `frontend/app/page.stories.tsx`
- `frontend/stories/design-system.stories.tsx`
## Technical considerations
Use the exact logo asset when available; otherwise record its source as `TBD` rather than recreating it.
## Acceptance criteria
The shell renders, is responsive at basic breakpoints, uses approved colors/type roles, and has no feature behavior.
## Testing requirements
Run frontend unit/render checks and lint/type checks available in the repository.
## Expected deliverables
Next.js/TypeScript shell, token foundation, rendering-boundary tests, and pending-decision list.
## Completion checklist
- [x] Read prerequisites and decisions
- [x] Existing implementation inspected
- [x] Scope and design rules verified
- [ ] Tests run — blocked because Node.js/npm are not installed in the execution environment
- [x] Summary/files/issues recorded
- [x] Stop; do not start Task 02

## Execution record

- Status: foundation files created; Task 02 was not started.
- Validation completed: `git diff --check` passed and `package.json` was parsed successfully.
- Pending validation: after installing Node.js 24 LTS and npm, run `npm run install:all`, then run `npm --prefix frontend run typecheck` and `npm --prefix frontend run build`.
- Pending decision: the canonical H/T monogram asset location remains `TBD`; no replacement logo was created.
- Storybook setup: completed for the frontend foundation with `@storybook/nextjs`, basic shell/design-system stories, and `storybook`/`build-storybook` scripts.
- Frontend ESLint setup: completed with ESLint flat configuration covering Next.js, React, TypeScript, and Storybook files through `npm run lint`.
- Pending validation: dependency installation and lockfile regeneration require Node.js 24 LTS and npm; use the root `npm run install:all` command.
- Pending backend work: backend ESLint configuration remains scoped to Task 02 and was not changed here.
- Frontend package migration: completed; the Next.js, SCSS, Storybook, ESLint, and frontend configuration files now live under `frontend/`.
