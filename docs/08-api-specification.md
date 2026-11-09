# 08 — API specification

This document defines required API capabilities without prematurely selecting REST or GraphQL. The transport style, versioning convention, authentication mechanism, pagination format, and error envelope are `TBD`.

## Required capability groups

- Identity: optional session/current-user and sign-out behavior; required for protected persistence operations.
- Characters: create, list, read, update draft, resume, delete/archive, and approve story.
- Wizard: read stage state, save stage input, navigate backward, and report save status.
- AI: request contextual suggestion, accept/edit/reject suggestion, and retrieve audit state.
- Images: request generation from approved data, inspect status, retrieve approved output, and download the validated result.
- Character tokens: request a board-ready token from approved data, inspect status, accept/reject or regenerate it, and download/export the accepted asset.
- D&D: select edition and return only content allowed by the content policy.

Every request must validate input and apply appropriate rate limits and safety controls. Guest generation/export operations may be unauthenticated; mutations that persist or retrieve account-owned data must enforce authentication and ownership. Return a stable status/error model once selected and be idempotent where retries are expected. Do not copy an API provider's response directly into a public contract.

## Access matrix

| Capability | Guest | Authenticated |
|---|---:|---:|
| Create/edit a session-scoped character story | Yes | Yes |
| Request AI suggestions and story generation | Yes | Yes |
| Generate/review/download an image or token | Yes | Yes |
| Save character/story/revision to MongoDB | No | Yes |
| List, retrieve, or resume persisted characters | No | Yes, owner only |

Exact guest session mechanism, rate limits, result-retention period, and generated-asset persistence are `TBD`.

## Public D&D API integration

Heroic Tales may use a public D&D API as a source for D&D data, subject to source approval and the content policy in `docs/10-dnd-content-policy.md`. Publicly reachable does not automatically mean licensed for reproduction, commercial use, bulk storage, or inclusion in AI prompts. The exact API provider, endpoint set, authentication requirements, usage limits, and license/terms review are `TBD`.

### Integration boundary

The backend must access public D&D APIs through a server-side provider adapter. Neither the Next.js browser client nor Next.js server rendering code should bypass the NestJS API for external D&D access. The adapter is responsible for:

- validating the external response;
- mapping it into an internal, versioned D&D data contract;
- attaching source URL, retrieval timestamp, edition, content type, and license/provenance metadata;
- applying timeouts, rate limits, retries, caching, and external-service error mapping; and
- preventing unsupported fields or provider-specific response shapes from leaking into the public Heroic Tales API.

The selected public API must be registered in the source inventory before implementation. If it does not clearly identify edition, provenance, or usage rights, its data must be treated as unverified and must not be presented as official mechanical content.

### Edition and content separation

Requests must include an explicit edition identifier for D&D 5th Edition (2014) or D&D Revised 5th Edition (2024). The integration must reject missing or ambiguous editions and must prevent records from one edition being returned for the other. Edition-specific external identifiers, names, rules text, and metadata must remain separated in storage, caches, prompts, API responses, and tests.

Each imported or read-through record must be classified as one of:

- `official`: permitted official mechanical data with verified provenance and usage rights;
- `original-narrative`: Heroic Tales-generated narrative, never sourced from mechanics; or
- `unverified`: data whose authority, edition, completeness, or permission is not confirmed.

Only records allowed by the content policy may be returned as official. The API must not imply that an external response is official merely because it came from a public endpoint.

### Internal capability

The internal D&D capability should support edition-scoped lookup and provenance-aware results, for example:

```text
getDndContent({ edition, contentType, identifier })
  -> { data, edition, classification, source, retrievedAt, attribution }
```

This is a conceptual contract, not a final transport schema. Exact content types, pagination, search behavior, cache duration, synchronization strategy, and whether data is read through or imported are `TBD`.

### Operational and legal safeguards

Do not bulk-ingest or permanently store public API data until the source license and terms permit it. Honor attribution, rate-limit, deletion, and no-redistribution requirements. Avoid logging full records or prompts unnecessarily. Store only the minimum fields needed for the approved feature, and define cache invalidation and source-removal behavior before production use.

If the external service is unavailable, return a bounded, clearly labeled unavailable/unverified result rather than fabricated mechanics. Never silently substitute a different source or edition.

### Testing requirements

Use deterministic provider fakes for ordinary tests. Verify response mapping, provenance retention, edition isolation, license-restricted fields, timeout/rate-limit behavior, malformed responses, source removal, and the rule that unverified data cannot be presented as official.
