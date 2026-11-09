# Task 10 — Character token generation

## Objective
Implement an optional board-ready character-token workflow for guests and authenticated users, derived from approved character information.

## Context
The token is a distinct visual asset for use on D&D boards. It is not official D&D artwork, a rules object, or a full virtual tabletop integration.

## Prerequisites
Tasks 07 and 09 complete; approved image provider, storage, moderation, cost, and token-format decisions; read `docs/01-product-requirements.md`, `docs/04-system-architecture.md`, `docs/10-dnd-content-policy.md`, `docs/11-character-image-generation.md`, and `docs/12-security.md`. Task 05 is required only for authenticated persistence.

## Scope
Token request, approved/session source binding, server-side generation, guest access, optional authenticated persistence, provenance metadata, review, regenerate, accept/reject, and authorized download/export.

## Explicit exclusions
No direct board/VTT integration, combat rules, automatic use of rejected or draft data, copying of official artwork, or unapproved token shape/file format.

## Implementation steps
1. Inspect existing image-generation, character-approval, storage, and authorization implementations.
2. Confirm the approved token format, dimensions, background behavior, and storage decisions; ask if any are missing.
3. Build a token request from approved character fields and record the source character revision.
4. Generate through the server-side image/provider adapter and validate the result.
5. Implement explicit review, regenerate, accept, reject, and download/export states.
6. Add provenance, rights, safety, authorization, and failure handling.

## Files to create or modify
Character-token domain, API, persistence, provider, and directly related UI files only. Record exact paths after inspection.

## Technical considerations
Keep token data separate from full character images. Do not expose provider credentials. Do not claim official D&D status. Preserve 2014/2024 edition context without implying that the token itself is mechanical content.

## Acceptance criteria
- A token request can use only approved character information or clearly labeled session-scoped inputs.
- The source session context or authenticated source revision is recorded and visible in relevant metadata.
- Users can review, regenerate, accept, reject, and download/export the token.
- Guests can perform generation and download/export without authentication; persistence of token binaries is `TBD` and must not block guest access.
- Provider, storage, safety, and malformed-output failures are handled without silently changing character data.

## Testing requirements
Test approved-source binding, rejection of drafts, authorization, provider failure, storage failure, provenance labeling, regenerate/accept/reject behavior, and authorized download/export using deterministic fakes.

## Expected deliverables
Board-ready character-token workflow, persistence/API/UI changes within scope, automated tests, and updated pending-decision notes.

## Completion checklist
- [ ] Prerequisites and approved token decisions reviewed
- [ ] Existing image and character implementations inspected
- [ ] Only approved character data is used
- [ ] Review and export behavior verified
- [ ] Security and failure tests pass
- [ ] Files changed and pending issues reported
- [ ] Stop; do not automatically start another task
