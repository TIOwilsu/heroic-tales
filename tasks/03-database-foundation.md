# Task 03 — Database foundation

## Objective
Prepare MongoDB connectivity conventions without implementing domain persistence.
## Context
MongoDB is approved; hosting, ODM, migrations, and indexes are `TBD`.
## Prerequisites
Tasks 00 and 02 complete; read `docs/06-backend-architecture.md` and `docs/07-database-design.md`.
## Scope
Connection configuration, safe environment handling, and an isolated connectivity boundary using the approved native MongoDB Node.js driver. The driver is used for connectivity only; an ODM remains `TBD`.
## Explicit exclusions
No user/character collections, auth, seed data, or destructive migrations.
## Implementation steps
Inspect; resolve/ask for ODM choice if required; implement connection boundary; test configuration and failure behavior.
## Files to create or modify
Database foundation files only; expected paths include `backend/src/infrastructure/database/`, `backend/.env.example`, `backend/package.json`, `docs/02-approved-decisions.md`, and `docs/07-database-design.md`.
## Technical considerations
Never commit connection strings. Avoid destructive test cleanup against shared databases.
## Acceptance criteria
Connection behavior is isolated behind an infrastructure boundary, configuration is validated without exposing secrets, the native driver dependency is documented, and no domain schema or ODM is silently chosen. The application must not require a live MongoDB instance merely to load the existing health endpoint.
## Testing requirements
Run isolated configuration/connectivity tests; report when MongoDB is unavailable.
## Expected deliverables
MongoDB foundation and documented unresolved decisions.
## Completion checklist
- [x] Prerequisites read
- [x] Connection scope verified
- [x] No domain schema added
- [x] Dependencies installed and lockfile regenerated
- [x] Tests run
- [x] Summary/issues recorded; runtime validation is pending a shell with Node/npm and a configured MongoDB instance
- [x] Stop; do not start Task 04
