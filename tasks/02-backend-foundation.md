# Task 02 — Backend foundation

## Objective
Create the minimal NestJS/Node.js service foundation.
## Context
NestJS with TypeScript on Node.js 24 LTS is approved. The backend is a separate `backend/` package using npm scripts. API style, validation package, logging, TypeScript version, and deployment runtime details remain `TBD`.
## Prerequisites
Task 00 complete; read `docs/04-system-architecture.md`, `docs/06-backend-architecture.md`, and `docs/08-api-specification.md`.
## Scope
Service bootstrap, health boundary if already decided, module conventions, and deterministic tests only.
## Explicit exclusions
No auth, character routes, OpenAI calls, MongoDB persistence, or production deployment.
## Implementation steps
Inspect; confirm server conventions; create minimal bootstrap; add tests; document unresolved decisions.

### Additional documented step — Backend ESLint configuration

Configure ESLint for the NestJS backend as a separate quality step. Before changing the backend package manifest, confirm the ESLint version, configuration format, TypeScript/NestJS plugins, ignored generated files, severity policy, auto-fix policy, and whether rules will be shared with the frontend. Keep all unresolved choices as `TBD` until explicitly decided.

The setup must provide a local lint command, cover backend source, configuration, DTOs, adapters, and tests, respect Clean Architecture boundaries, avoid secret exposure, and document the CI lint command for future pipeline work. Do not add a formatter or unrelated lint plugin as part of this step.
## Files to create or modify
Backend foundation files only. This execution created:

- `backend/package.json`
- `backend/nest-cli.json`
- `backend/tsconfig.json`
- `backend/tsconfig.build.json`
- `backend/jest.config.cjs`
- `backend/eslint.config.mjs`
- `backend/src/main.ts`
- `backend/src/app.module.ts`
- `backend/src/health/health.module.ts`
- `backend/src/health/health.controller.ts`
- `backend/src/health/health.service.ts`
- `backend/src/health/health.controller.spec.ts`
- `scripts/dev-all.mjs`
- `.gitignore`
- `package.json`
## Technical considerations
Do not expose environment values in responses or logs.
## Acceptance criteria
The service starts under the repository command, has a tested minimal boundary, and contains no product feature.
## Testing requirements
Run backend unit/startup checks and type/lint checks.
## Expected deliverables
NestJS foundation and verification results.
## Completion checklist
- [x] Prerequisites reviewed
- [x] Existing backend inspected
- [x] Foundation only
- [ ] Tests run — runtime checks are pending because Node.js/npm are unavailable in the execution environment
- [x] Files/issues reported
- [x] Stop; do not start Task 03

## Execution record

- Status: NestJS backend foundation created in `backend/`; no auth, character, AI, MongoDB, or deployment features were added.
- Health boundary: `GET /health` returns `{ "status": "ok" }` and does not expose environment values.
- Development orchestration: root `npm run dev:all` starts the `frontend/` Next.js development server and `backend/` NestJS watch server.
- Backend ESLint: configured with a flat config and `npm run lint` in `backend/`.
- Validation completed: `package.json` parsing, required-path checks, and `git diff --check`.
- Pending validation: install dependencies with the root `npm run install:all` command, generate `backend/package-lock.json`, then run backend typecheck, lint, test, build, and startup checks with Node.js 24 LTS/npm.
- Stop condition: Task 03 was not started.
