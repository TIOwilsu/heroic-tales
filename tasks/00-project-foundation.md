# Task 00 — Project foundation

## Objective
Prepare repository conventions and documentation-aware development scaffolding without implementing product behavior.

## Context
The approved baseline is React, NestJS/Node.js, MongoDB, OpenAI, and Vercel. Tooling choices remain `TBD` unless explicitly approved.

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
- [ ] Prerequisites read
- [ ] Existing work inspected
- [ ] Scope contained
- [ ] Tests run
- [ ] Files and pending decisions reported
- [ ] Stop without starting Task 01

