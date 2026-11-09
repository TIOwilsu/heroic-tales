# Task 04 — Authentication

## Objective
Implement only the approved authentication and authorization boundary for persistence and account-owned data.
## Context
Authentication provider, session strategy, account recovery, and roles are `TBD`.
## Prerequisites
Tasks 00–03; explicit auth decision; read `docs/06-backend-architecture.md` and `docs/12-security.md`.
## Scope
Selected provider integration, current-user boundary, ownership guard, protected save/resume behavior, and focused security tests. Guest story, image, and token generation must remain available without authentication.
## Explicit exclusions
No character UI, AI generation gating, social login variants, or admin console unless selected. Do not require authentication for guest generation/export.
## Implementation steps
Inspect; confirm provider; implement least-privilege identity boundary; test unauthenticated, authenticated, and cross-owner access.
## Files to create or modify
Auth files only; list exact paths.
## Technical considerations
Do not log tokens or provider payloads; keep credentials server-side.
## Acceptance criteria
Identity is verified, ownership checks are reusable, and secrets remain protected.
## Testing requirements
Authorization and secret-handling tests are mandatory.
## Expected deliverables
Auth boundary, tests, configuration notes.
## Completion checklist
- [ ] Explicit auth decision confirmed
- [ ] Security docs read
- [ ] Ownership tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 05
