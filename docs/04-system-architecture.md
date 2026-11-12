# 04 — System architecture

## Logical boundary

The TypeScript-based Next.js frontend uses SSR/Server Components where appropriate and communicates with a TypeScript-based NestJS API. The API owns optional authentication integration, authorization for protected persistence, validation, guest and authenticated character workflows, OpenAI calls, D&D content classification, persistence, and audit events. MongoDB with Mongoose infrastructure adapters stores authenticated user-owned character documents and revisions. Vercel hosts deployable web/API surfaces subject to platform limits.

```text
Next.js frontend -> NestJS API -> MongoDB
                         -> OpenAI
                         -> TBD: image/token storage / moderation
```

The client never calls OpenAI directly and never receives provider credentials. Domain modules should separate character data, AI orchestration, D&D content, authentication, and image workflows.

The repository uses separate application packages: `frontend/` contains the Next.js application and `backend/` contains the NestJS API. The repository root contains shared documentation and orchestration. The root `dev:all` command starts both development servers without adding a process-manager dependency.

The backend should organize feature code under `backend/src/modules/` and cross-cutting code under `backend/src/shared/`. Each feature module should apply the documented Clean Architecture boundaries. The example structure is a guide for future modules, not an inventory of implemented features. The backend composition root is `backend/src/app.module.ts`, and the NestJS bootstrap is `backend/src/main.ts`.

Dependency setup is also orchestrated from the repository root. `npm run install:all` installs dependencies in `frontend/` and `backend/` sequentially; it does not merge their manifests or lockfiles. Use package-level `npm --prefix <package> install` only when intentionally installing one package.

Frontend and backend implementations must preserve Clean Architecture dependency direction: domain rules and application use cases remain independent from React, NestJS, MongoDB, OpenAI, HTTP, and browser concerns. Public D&D API access belongs behind a server-side infrastructure adapter and must return provenance-aware, edition-scoped data through the backend's internal contract.

Character images and board-ready tokens are separate application workflows. Both must be traceable to an approved character revision; a token must not be treated as a generic crop of an unapproved or rejected image unless that behavior is explicitly approved later.

## Authentication boundary

Heroic Tales uses self-managed authentication for account-owned persistence. The NestJS backend owns credential verification, token creation, and token validation; the Next.js frontend must not receive passwords, signing secrets, refresh-token signing secrets, or database credentials. Successful authentication returns a short-lived access token and a longer-lived refresh token. The client stores both issued tokens and sends the access token through the `Authorization: Bearer <access-token>` header. Backend guards validate the token and resolve the current user before any account-owned read or mutation. The backend does not persist access tokens, refresh tokens, or token digests.

When the access token expires, the client uses the refresh token with the backend token-refresh operation to obtain a new access token. Tokens must be self-contained and verifiable by the backend without a token store. Refresh-token rotation, reuse detection, revocation, logout behavior, token format, signing algorithm, token lifetimes, and the exact refresh endpoint are `TBD`. Refresh tokens must not be placed in URLs or logged. The client storage mechanism and persistence lifetime are `TBD` and require an explicit security decision; implementation must protect tokens against XSS and unintended exposure.

Guest story, image, token, and download workflows remain available without authentication, subject to abuse controls. Saving a character or resuming account-owned data requires an authenticated access token and an ownership check. A missing, invalid, expired, or revoked token must produce an unauthenticated result without revealing whether another account owns the requested resource.

The exact API contract, token claims, signing-key management, password policy, account recovery, access/refresh lifetimes, rotation, revocation, email verification, roles, and browser storage strategy are `TBD`. A backend token store or token indexes are not planned. These decisions must be resolved before production authentication is enabled.

## Data flow rules

1. User input is validated and held in a guest session/local workspace or saved as a revision when the user is authenticated and requests persistence.
2. AI receives only the minimum necessary context and returns a labeled suggestion.
3. The user accepts, edits, or rejects the suggestion.
4. Only user-approved data becomes authoritative context for downstream generation; it may be session-scoped for guests or persisted for authenticated users.

API style, asynchronous job mechanism, event bus, cache, and storage provider are `TBD`.
