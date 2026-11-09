# 13 — Testing strategy

Testing must be proportional to each task and must not call paid AI services in ordinary automated tests. Use deterministic provider adapters, fixtures, contract tests, and explicit approval-state scenarios. Exact test framework, browser automation tool, coverage threshold, and CI provider are `TBD`.

Required layers are unit tests for domain rules, integration tests for NestJS/MongoDB boundaries, API contract tests, frontend component/state tests, end-to-end wizard journeys when the UI exists, security/authorization tests, and deployment smoke tests.

Minimum critical scenarios: autosave and resume, backward editing, accept/edit/reject AI flow, approved data protection, edition isolation, official/unverified labeling, image source revision, provider failure, unauthorized access, and safe secret configuration.

Token-specific scenarios must cover approved-revision source binding, rejection of unapproved data, accept/reject/regenerate behavior, download authorization, provenance labeling, malformed or unsafe provider output, storage failure, and the distinction between a board-ready token and official D&D content.
