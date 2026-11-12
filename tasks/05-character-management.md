# Task 05 — Character management

## Objective
Implement authenticated user-owned character draft CRUD and resume support while preserving guest session-scoped creation.
## Context
Characters must autosave, retain revisions, support optional fields, and preserve edition separation. Guest work may remain local/session-scoped; MongoDB persistence requires authentication and an explicit save action.
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
An authenticated user can create, save, resume, edit, and retrieve only their own characters, while a guest can create and edit a session-scoped character without being blocked by authentication.
## Testing requirements
CRUD, authorization, revision, edition isolation, and failure-retry tests.
## Expected deliverables
Character management implementation and tests.
## Completion checklist
- [x] Prerequisites and decisions reviewed
- [x] Existing models inspected
- [x] Character domain contracts and ownership boundary implemented
- [x] Draft create/list/read/update/archive behavior implemented
- [x] Immutable character revision metadata implemented
- [x] Edition separation enforced for 2014 and 2024 character records
- [x] MongoDB repository adapters added behind application ports
- [x] Focused authorization, CRUD, revision, and owner-isolation tests added
- [ ] Execute the focused tests in a Node/npm-enabled environment
- [x] Files/issues reported
- [x] Stop; do not start Task 06
