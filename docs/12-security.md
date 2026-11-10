# 12 — Security

Use server-side secrets only; keep keys in deployment secret configuration and out of source, client bundles, logs, fixtures, screenshots, and error messages. Apply least privilege, ownership checks, input validation, output encoding, rate limits, request size limits, dependency review, and secure headers appropriate to the selected deployment configuration.

Protect draft and approved character data in transit and at rest using platform capabilities. Define retention, deletion, export, account recovery, abuse reporting, audit access, and incident response before production; these are `TBD`.

## Self-managed authentication

The backend owns authentication and uses server-side sessions identified by Secure, HTTP-only, SameSite cookies. Passwords must be hashed with a memory-hard password-hashing algorithm and must never be stored, returned, logged, or included in telemetry. Raw session identifiers, cookie values, password-reset material, and authentication payloads are secrets and must not appear in logs, errors, fixtures, screenshots, or source control.

Authentication checks must distinguish between an unauthenticated request and an authenticated request that does not own a resource, while avoiding resource-existence leakage. Every protected read or mutation must perform an ownership check before accessing account-owned data. Session expiration, rotation, revocation, password recovery, email verification, password policy, and roles are `TBD` and require security review before production.

Threat-model prompt injection, malicious character text, cross-tenant access, anonymous provider abuse, cost exhaustion, image misuse, and D&D content leakage. Guest generation must have server-side rate limiting, request bounds, safety checks, and cost controls even though authentication is not required. Security tests must cover authorization boundaries and secret handling.

Required authentication tests include invalid credentials, absent/expired/revoked sessions, cookie security attributes, password and session-secret non-disclosure, authenticated access to owned data, rejection of cross-owner access, and continued guest access to generation and download workflows.
