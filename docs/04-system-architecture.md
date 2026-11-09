# 04 — System architecture

## Logical boundary

The TypeScript-based Next.js frontend uses SSR/Server Components where appropriate and communicates with a TypeScript-based NestJS API. The API owns optional authentication integration, authorization for protected persistence, validation, guest and authenticated character workflows, OpenAI calls, D&D content classification, persistence, and audit events. MongoDB stores authenticated user-owned character documents and revisions. Vercel hosts deployable web/API surfaces subject to platform limits.

```text
Next.js frontend -> NestJS API -> MongoDB
                         -> OpenAI
                         -> TBD: image/token storage / moderation / auth provider
```

The client never calls OpenAI directly and never receives provider credentials. Domain modules should separate character data, AI orchestration, D&D content, authentication, and image workflows.

Frontend and backend implementations must preserve Clean Architecture dependency direction: domain rules and application use cases remain independent from React, NestJS, MongoDB, OpenAI, HTTP, and browser concerns. Public D&D API access belongs behind a server-side infrastructure adapter and must return provenance-aware, edition-scoped data through the backend's internal contract.

Character images and board-ready tokens are separate application workflows. Both must be traceable to an approved character revision; a token must not be treated as a generic crop of an unapproved or rejected image unless that behavior is explicitly approved later.

## Data flow rules

1. User input is validated and held in a guest session/local workspace or saved as a revision when the user is authenticated and requests persistence.
2. AI receives only the minimum necessary context and returns a labeled suggestion.
3. The user accepts, edits, or rejects the suggestion.
4. Only user-approved data becomes authoritative context for downstream generation; it may be session-scoped for guests or persisted for authenticated users.

API style, asynchronous job mechanism, event bus, cache, and storage provider are `TBD`.
