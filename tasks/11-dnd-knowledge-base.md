# Task 11 — D&D knowledge base

## Objective
Implement only an approved, licensed approach to D&D content classification and retrieval.
## Context
2014 and 2024 editions must remain separate; only official mechanical content may be presented as official.
## Prerequisites
Legal/licensing decision and source inventory; read `docs/10-dnd-content-policy.md` and `docs/09-ai-integration.md`.
## Scope
Provenance metadata, edition isolation, a server-side adapter for an approved public D&D API, the allowed retrieval boundary, and tests for official/original/unverified labels.
## Explicit exclusions
No copying books without permission, no rules engine, no assumed commercial rights, no direct browser-to-provider calls, and no bulk source ingestion before approval.
## Implementation steps
Inspect; verify the public API source and permissions; implement a server-side provider adapter and minimal metadata/retrieval boundary; test edition and provenance isolation.
## Files to create or modify
Knowledge/content-policy files only.
## Technical considerations
Stop and ask if licensing, source scope, or attribution is unresolved.
## Acceptance criteria
Unlicensed or unknown content cannot be represented as official, and editions cannot cross-contaminate.
## Testing requirements
Provenance, edition-isolation, refusal, and authorization tests.
## Expected deliverables
Permitted content boundary and source register.
## Completion checklist
- [ ] Legal/source approval verified
- [ ] Edition tests pass
- [ ] No unlicensed corpus added
- [ ] Files/issues reported
- [ ] Stop; do not start Task 12
