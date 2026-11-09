# 04 — System architecture

## Logical boundary

The React client communicates with a NestJS API. The API owns authentication integration, authorization, validation, character workflows, OpenAI calls, D&D content classification, persistence, and audit events. MongoDB stores user-owned character documents and revisions. Vercel hosts deployable web/API surfaces subject to platform limits.

```text
React client -> NestJS API -> MongoDB
                         -> OpenAI
                         -> TBD: image storage / moderation / auth provider
```

The client never calls OpenAI directly and never receives provider credentials. Domain modules should separate character data, AI orchestration, D&D content, authentication, and image workflows.

Frontend and backend implementations must preserve Clean Architecture dependency direction: domain rules and application use cases remain independent from React, NestJS, MongoDB, OpenAI, HTTP, and browser concerns. Public D&D API access belongs behind a server-side infrastructure adapter and must return provenance-aware, edition-scoped data through the backend's internal contract.

## Data flow rules

1. User input is validated and saved as a revision.
2. AI receives only the minimum necessary context and returns a labeled suggestion.
3. The user accepts, edits, or rejects the suggestion.
4. Only user-approved data becomes authoritative context for downstream generation.

API style, asynchronous job mechanism, event bus, cache, and storage provider are `TBD`.
