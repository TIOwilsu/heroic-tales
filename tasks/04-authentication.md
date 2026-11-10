# Task 04 — Authentication

## Objective
Implement only the approved authentication and authorization boundary for persistence and account-owned data.
## Context
Self-managed authentication with bearer access tokens and refresh tokens is approved. The NestJS backend owns credential verification and token lifecycle. Token format, signing, lifetimes, refresh-token storage, rotation, reuse detection, revocation, account recovery, roles, password policy, email verification, client persistence, and the final API contract remain `TBD` and must be resolved before production use.
## Prerequisites
Tasks 00–03; explicit auth decision; read `docs/06-backend-architecture.md` and `docs/12-security.md`.
## Scope
Credential and token boundary, current-user contract, reusable ownership guard/policy, protected save/resume behavior, configuration notes, and focused security tests. Use bearer access tokens for protected requests and refresh tokens to obtain replacement access tokens. Guest story, image, token, and download generation must remain available without authentication.
## Explicit exclusions
No character UI, AI generation gating, social login variants, or admin console unless selected. Do not require authentication for guest generation/export.
## Implementation steps
Inspect; confirm the self-managed token decision; implement the least-privilege identity boundary; test unauthenticated, authenticated, expired-token, refresh-token, secret-handling, and cross-owner access.
## Files to create or modify
Auth files only. The authentication boundary belongs under the auth feature module, with application services, domain DTOs/interfaces, and infrastructure persistence adapters kept in their respective layers. Final MongoDB adapters and HTTP route contracts remain separate decisions and must not be invented by this task.
## Technical considerations
Do not log passwords, access tokens, refresh tokens, authorization headers, signing keys, password-reset material, or authentication payloads. Keep credentials and token secrets server-side. Do not leak framework request, token-library, or persistence types into application/domain contracts. Avoid resource-existence leakage for missing identity and cross-owner requests.
## Acceptance criteria
Identity is verified by the backend, access tokens are validated on protected requests, refresh tokens follow an explicit lifecycle, ownership checks are reusable, protected persistence operations require authentication, guest generation/export remains public, and secrets remain protected. The current foundation issues opaque access/refresh values, stores only their digests, rotates refresh tokens, and removes the previous token pair after rotation or revocation.
## Testing requirements
Authorization and secret-handling tests are mandatory.
## Expected deliverables
Auth boundary, tests, configuration notes.
## Completion checklist
- [x] Explicit auth decision confirmed: self-managed bearer access and refresh tokens
- [x] Security docs read
- [x] Ownership and token lifecycle tests are defined for the auth service
- [ ] Execute the focused auth tests in a Node/npm-enabled environment
- [x] Files/issues reported
- [x] Stop; do not start Task 05
