# Task 03 — Database foundation

## Objective
Prepare MongoDB connectivity conventions without implementing domain persistence.
## Context
MongoDB is approved; hosting, ODM, migrations, and indexes are `TBD`.
## Prerequisites
Tasks 00 and 02 complete; read `docs/06-backend-architecture.md` and `docs/07-database-design.md`.
## Scope
Connection configuration, safe environment handling, and a connectivity test using the selected approved approach.
## Explicit exclusions
No user/character collections, auth, seed data, or destructive migrations.
## Implementation steps
Inspect; resolve/ask for ODM choice if required; implement connection boundary; test configuration and failure behavior.
## Files to create or modify
Database foundation files only; report exact paths.
## Technical considerations
Never commit connection strings. Avoid destructive test cleanup against shared databases.
## Acceptance criteria
Connection behavior is isolated, configuration is safe, and no domain schema is silently chosen.
## Testing requirements
Run isolated configuration/connectivity tests; report when MongoDB is unavailable.
## Expected deliverables
MongoDB foundation and documented unresolved decisions.
## Completion checklist
- [ ] Prerequisites read
- [ ] Connection scope verified
- [ ] No domain schema added
- [ ] Tests run
- [ ] Summary/issues recorded
- [ ] Stop; do not start Task 04

