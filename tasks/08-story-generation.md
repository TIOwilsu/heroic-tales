# Task 08 — Story generation

## Objective
Support AI-assisted final backstory generation and explicit approval.
## Context
Stories may be original narrative within official settings but cannot invent official mechanics or contradict known canon.
## Prerequisites
Task 07; approved content policy and moderation decisions; read `docs/09-ai-integration.md`, `docs/10-dnd-content-policy.md`, and `docs/01-product-requirements.md`.
## Scope
Generate candidate story from approved inputs, label provenance, review/edit/approve flow, and revision tracking.
## Explicit exclusions
No mechanical rules engine, image generation, publishing, or bulk corpus import.
## Implementation steps
Inspect; build grounded request; validate and label output; require review and explicit approval; test rejection and regeneration.
## Files to create or modify
Story generation and approval files only.
## Technical considerations
Never present generated mechanics as official; preserve prior approved story revisions.
## Acceptance criteria
Final story cannot become authoritative without explicit approval, and its source inputs are traceable.
## Testing requirements
Provenance, approval, content-labeling, provider failure, and authorization tests.
## Expected deliverables
Story workflow, tests, and content-policy notes.
## Completion checklist
- [ ] Policy and moderation decisions confirmed
- [ ] Approval boundary verified
- [ ] Tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 09

