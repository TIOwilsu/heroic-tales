# Task 04 — Authentication

## Objective
Implement only the approved authentication and authorization boundary for persistence and account-owned data.
## Context
Self-managed authentication with secure server-side HTTP-only cookie sessions is approved. The NestJS backend owns credential verification and session lifecycle. Account recovery, roles, password policy, session persistence details, rotation, revocation, email verification, and the final API contract remain `TBD` and must be resolved before production use.
## Prerequisites
Tasks 00–03; explicit auth decision; read `docs/06-backend-architecture.md` and `docs/12-security.md`.
## Scope
Credential and session boundary, current-user contract, reusable ownership guard/policy, protected save/resume behavior, configuration notes, and focused security tests. Use Secure, HTTP-only, SameSite cookies for opaque server-side sessions. Guest story, image, token, and download generation must remain available without authentication.
## Explicit exclusions
No character UI, AI generation gating, social login variants, or admin console unless selected. Do not require authentication for guest generation/export.
## Implementation steps
Inspect; confirm the self-managed session decision; implement the least-privilege identity boundary; test unauthenticated, authenticated, expired-session, secret-handling, and cross-owner access.
## Files to create or modify
Auth files only. The current boundary is implemented in `backend/src/auth/`: `auth.types.ts`, `auth.ports.ts`, `auth.crypto.ts`, `auth.service.ts`, `ownership.policy.ts`, and `session.cookie.ts`, with focused `.spec.ts` files. Final MongoDB adapters and HTTP route contracts remain separate decisions and must not be invented by this task.
## Technical considerations
Do not log passwords, cookies, raw session identifiers, password-reset material, or authentication payloads. Keep credentials and session secrets server-side. Do not leak framework request, cookie, or persistence types into application/domain contracts. Avoid resource-existence leakage for missing identity and cross-owner requests.
## Acceptance criteria
Identity is verified by the backend, sessions are opaque and protected by secure cookie attributes, ownership checks are reusable, protected persistence operations require authentication, guest generation/export remains public, and secrets remain protected.
## Testing requirements
Authorization and secret-handling tests are mandatory.
## Expected deliverables
Auth boundary, tests, configuration notes.
## Completion checklist
- [x] Explicit auth decision confirmed: self-managed authentication with secure server-side HTTP-only cookie sessions
- [x] Security docs read
- [ ] Ownership tests pass in a Node/npm-enabled environment
- [x] Files/issues reported
- [ ] Stop; do not start Task 05
