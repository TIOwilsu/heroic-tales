# Task 07 — AI integration

## Objective
Add contextual OpenAI suggestions with explicit user control.
## Context
AI output is suggestion-only and must be labeled, validated, and auditable.
## Prerequisites
Tasks 02, 04, 05, and 06; approved model/cost/security decisions; read `docs/09-ai-integration.md` and `docs/12-security.md`.
## Scope
Server-side provider adapter, bounded contextual prompt input, structured suggestion response, accept/edit/reject flow, and deterministic tests.
## Explicit exclusions
No final story automation, image generation, direct browser-to-OpenAI calls, or unapproved model/provider.
## Implementation steps
Inspect; confirm provider configuration; implement adapter and validation; persist suggestion provenance; implement explicit actions; test failures and authorization.
## Files to create or modify
AI backend and directly related UI/domain files only.
## Technical considerations
Protect approved fields; handle prompt injection, refusal, malformed output, timeout, and quota errors.
## Acceptance criteria
Every suggestion is clearly labeled; user actions are required; credentials never reach the client; approved data is not silently changed.
## Testing requirements
Mocked provider tests, action-state tests, security tests, and failure tests.
## Expected deliverables
Controlled AI integration and audit-aware tests.
## Completion checklist
- [ ] Model/cost/safety decisions confirmed
- [ ] Server-only credentials verified
- [ ] Accept/edit/reject tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 08

