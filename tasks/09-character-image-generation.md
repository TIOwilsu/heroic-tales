# Task 09 — Character image generation

## Objective
Generate character images from approved character information for guests and authenticated users.
## Context
Appearance, equipment, clothing, weapons, and other established characteristics must be respected.
## Prerequisites
Tasks 07 and 08; approved image model/storage/moderation/retention decisions; read `docs/11-character-image-generation.md`, `docs/08-api-specification.md`, and `docs/12-security.md`.
## Scope
Approved or session-scoped source capture, server-side image request, guest generation, optional authenticated persistence, status/error UI, result metadata, and acceptance state.
## Explicit exclusions
No image generation from drafts/rejected suggestions, arbitrary image upload, gallery/social features, or unapproved provider.
## Implementation steps
Inspect; confirm provider/storage; construct bounded prompt from approved fields; persist request source; validate result; test retry and mismatch handling.
## Files to create or modify
Image workflow files only.
## Technical considerations
Keep credentials server-side; do not claim official art or canon status; follow safety and rights policies.
## Acceptance criteria
Guests can generate, review, and download an image without authentication; saving the source character/story requires authentication; image-binary persistence remains `TBD`; requests are traceable to approved or clearly session-scoped inputs and never silently use rejected data.
## Testing requirements
Mock provider, guest-access, source-revision, optional-save authorization, validated download, content-type/size limits, provider-URL secrecy, failure, rate-limit, and UI-state tests.
## Expected deliverables
Image workflow and verification results.
## Completion checklist
- [ ] Image decisions confirmed
- [ ] Approved-source test passes
- [ ] Security/safety checks pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 10
