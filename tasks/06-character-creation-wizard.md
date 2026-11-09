# Task 06 — Character creation wizard

## Objective
Deliver the seven-stage guided creation flow with autosave and backward editing.
## Context
Stages are Initial Concept, Identity, Origin, Past, Personality, Relationships, and Final Story.
## Prerequisites
Tasks 01 and 05; read `docs/01-product-requirements.md`, `docs/03-design-system.md`, and `docs/05-frontend-architecture.md`.
## Scope
Stage navigation, optional fields, draft save state, resume, prior-step editing, and final story approval UI/state.
## Explicit exclusions
No OpenAI calls, image generation, new D&D knowledge base, or unrelated dashboard redesign.
## Implementation steps
Inspect existing components; implement stages from shared model; show save/error states; preserve user edits; add journey tests.
## Files to create or modify
Wizard and directly related character files only.
## Technical considerations
AI actions may be placeholders until Task 07 but must have explicit state boundaries.
## Acceptance criteria
Users can complete, pause, resume, navigate backward, leave optional fields empty, and explicitly approve final story.
## Testing requirements
Component/state and end-to-end critical journey tests, including failed save recovery.
## Expected deliverables
Wizard flow, tests, and updated progress checklist.
## Completion checklist
- [ ] Prerequisites read
- [ ] Seven stages verified
- [ ] Autosave/backward-edit tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 07

