# Task 08 — Story generation

## Objective
Support AI-assisted final backstory generation and explicit approval for guests and authenticated users.
## Context
Stories may be original narrative within official settings but cannot invent official mechanics or contradict known canon. Authentication is required only when the user chooses to save the story in MongoDB.
## Prerequisites
Task 07; approved content policy and moderation decisions; read `docs/09-ai-integration.md`, `docs/10-dnd-content-policy.md`, `docs/01-product-requirements.md`, and `docs/08-api-specification.md`.
## Scope
Generate a candidate story from guest or authenticated session inputs, label provenance, provide review/edit/approve flow, and track a revision in MongoDB only after authenticated persistence is explicitly requested.
## Explicit exclusions
No mechanical rules engine, image generation, publishing, bulk corpus import, or mandatory authentication for generation/review/download.
## Implementation steps
Inspect; build grounded request; validate and label output; require review and explicit approval; test rejection and regeneration.
## Files to create or modify
Story generation and approval files only.
## Technical considerations
Never present generated mechanics as official; preserve prior approved story revisions.
## Acceptance criteria
Final story cannot become authoritative without explicit approval, its source inputs are traceable, guests can generate/review/download it without authentication, and MongoDB persistence requires authentication plus an explicit save action.
## Testing requirements
Provenance, approval, content-labeling, guest access, provider failure, optional-save authentication, and authorization tests.
## Expected deliverables
Story workflow, tests, and content-policy notes.
## Completion checklist
- [ ] Policy and moderation decisions confirmed
- [ ] Approval boundary verified
- [ ] Tests pass
- [ ] Files/issues reported
- [ ] Stop; do not start Task 09
