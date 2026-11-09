# Task 00 — Project foundation

## Objective
Prepare repository conventions and documentation-aware development scaffolding without implementing product behavior.

## Context
The approved baseline is Next.js with SSR/Server Components and TypeScript, SCSS for frontend styling, NestJS with TypeScript on Node.js 24 LTS, MongoDB, OpenAI, and Vercel. Tooling choices remain `TBD` unless explicitly approved.

## Prerequisites
Repository access; read `AGENTS.md`, `docs/00-project-overview.md`, `docs/02-approved-decisions.md`, and `docs/04-system-architecture.md`.

## Scope
Inspect repository; establish only the minimum folder/configuration conventions required for later work; document any proposed tooling as `TBD`.

## Explicit exclusions
No character UI, API endpoints, database schema, auth, AI calls, deployment, or dependency additions without approval.

## Implementation steps
1. Inspect existing files and preserve user work.
2. Identify required project manifests and decide only approved conventions.
3. Add/update foundation documentation or safe scaffolding within the selected scope.
4. Validate that no secrets or application behavior were introduced.

## Files to create or modify
Only files justified by the inspection; record exact paths in the completion report. Do not modify the required docs unless a decision is approved.

## Technical considerations
Avoid choosing a bundler, ORM/ODM, auth provider, styling system, or CI platform silently.

## Acceptance criteria
Repository conventions are clear; no product feature is implemented; all unselected choices are marked `TBD`.

## Testing requirements
Run repository validation and any available foundation checks. Report unavailable checks.

## Expected deliverables
Minimal foundation changes and a decision/pending-issue summary.

## Completion checklist
- [x] Prerequisites read
- [x] Existing work inspected
- [x] Scope contained
- [x] Tests run — repository validation completed; runtime-dependent checks remain pending because Node.js/npm are unavailable in the execution environment
- [x] Files and pending decisions reported
- [x] Stop without starting Task 01

## Execution record

- Status: Task 00 completed only; no new product behavior or backend implementation was started.
- Existing foundation preserved: Next.js/TypeScript/SCSS files, Storybook configuration, frontend ESLint configuration, and repository manifests were inspected and not overwritten.
- Validation completed: `package.json` parsed successfully, required foundation paths were present, and `git diff --check` passed.
- Pending environment check: install/use Node.js 24 LTS and npm, run `npm run install:all`, then run dependency-aware type checking, linting, and builds.
- Pending decisions: backend package manager and lockfile strategy, backend ESLint configuration, authentication, API style, storage, moderation, and CI remain `TBD`.
- Task boundary: Task 01 and later tasks were not executed by this run.
