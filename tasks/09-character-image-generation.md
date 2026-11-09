# Task 09 — Character image generation

## Objective
Generate character images from approved character information only.
## Context
Appearance, equipment, clothing, weapons, and other established characteristics must be respected.
## Prerequisites
Tasks 05, 07, and 08; approved image model/storage/moderation/retention decisions; read `docs/11-character-image-generation.md`.
## Scope
Source-revision capture, server-side image request, status/error UI, result metadata, and acceptance state.
## Explicit exclusions
No image generation from drafts/rejected suggestions, arbitrary image upload, gallery/social features, or unapproved provider.
## Implementation steps
Inspect; confirm provider/storage; construct bounded prompt from approved fields; persist request source; validate result; test retry and mismatch handling.
## Files to create or modify
Image workflow files only.
## Technical considerations
Keep credentials server-side; do not claim official art or canon status; follow safety and rights policies.
## Acceptance criteria
Requests are traceable to an approved revision and never silently use unapproved data.
## Testing requirements
Mock provider, source-revision, authorization, failure, and UI-state tests.
## Expected deliverables
Image workflow and verification results.
## Completion checklist
- [ ] Image decisions confirmed
- [ ] Approved-source test passes
- [ ] Security/safety checks pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 10

