# Task 11 — Dashboard

## Objective
Provide a focused dashboard for creating, resuming, and managing user-owned characters.
## Context
The dashboard must support unfinished-character resumption and clear save/approval status.
## Prerequisites
Tasks 01, 04, 05, and 06; read `docs/03-design-system.md` and `docs/05-frontend-architecture.md`.
## Scope
Authenticated dashboard listing, create/resume actions, empty/loading/error states, and responsive presentation.
## Explicit exclusions
No social feed, marketplace, campaign management, or new backend capability beyond existing character APIs.
## Implementation steps
Inspect; reuse existing components; implement dashboard states; verify ownership and responsive design; add tests.
## Files to create or modify
Dashboard and directly related navigation files only.
## Technical considerations
Use approved brand tokens and exact logo; do not add decoration outside the design system.
## Acceptance criteria
Users can find, resume, and create their own characters with clear status and no cross-user data.
## Testing requirements
Component, authorization-contract, responsive smoke, and critical navigation tests.
## Expected deliverables
Dashboard and tests.
## Completion checklist
- [ ] Prerequisites read
- [ ] Existing UI reused
- [ ] Acceptance tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 12

