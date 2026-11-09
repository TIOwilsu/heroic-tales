# Task 13 — Testing

## Objective
Expand automated coverage for implemented Heroic Tales behavior without changing product scope.
## Context
Critical scenarios are listed in `docs/13-testing-strategy.md`.
## Prerequisites
Relevant implemented tasks; approved test-tool decisions; read `docs/13-testing-strategy.md` and `docs/12-security.md`.
## Scope
Unit, integration, contract, UI journey, authorization, and deterministic AI-provider tests for existing behavior.
## Explicit exclusions
No feature implementation, provider spend in tests, or arbitrary coverage target invention.
## Implementation steps
Inspect current gaps; prioritize critical flows; add deterministic fixtures/mocks; run suite; record residual gaps.
## Files to create or modify
Tests and test configuration only unless a test exposes a minimal defect in in-scope code.
## Technical considerations
Never put real secrets or personal data in fixtures.
## Acceptance criteria
Critical scenarios have repeatable tests and failures are actionable.
## Testing requirements
Run the full relevant suite and report environment limitations.
## Expected deliverables
Tests, coverage/gap report, and pending risks.
## Completion checklist
- [ ] Strategy read
- [ ] Existing coverage inspected
- [ ] Tests deterministic and passing
- [ ] Gaps reported
- [ ] Stop; do not start Task 14
