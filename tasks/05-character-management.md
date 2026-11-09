# Task 05 — Character management

## Objective
Implement user-owned character draft CRUD and resume support.
## Context
Characters must autosave, retain revisions, support optional fields, and preserve edition separation.
## Prerequisites
Tasks 00–04; read `docs/01-product-requirements.md`, `docs/07-database-design.md`, and `docs/08-api-specification.md`.
## Scope
Character ownership, draft persistence, revision metadata, list/read/update/archive behavior, and tests.
## Explicit exclusions
No wizard UI, AI, final story generation, image generation, or D&D corpus.
## Implementation steps
Inspect existing schemas; implement versioned character draft model; enforce ownership and edition fields; test autosave/resume/conflicts.
## Files to create or modify
Character domain/API/persistence files only.
## Technical considerations
Approved fields must not be overwritten by ordinary draft updates; deletion semantics are subject to the documented retention decision.
## Acceptance criteria
An authenticated user can create, save, resume, edit, and retrieve only their own characters.
## Testing requirements
CRUD, authorization, revision, edition isolation, and failure-retry tests.
## Expected deliverables
Character management implementation and tests.
## Completion checklist
- [ ] Prerequisites and decisions reviewed
- [ ] Existing models inspected
- [ ] Acceptance tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 06

