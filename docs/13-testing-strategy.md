# 13 — Testing strategy

Testing must be proportional to each task and must not call paid AI services in ordinary automated tests. Use deterministic provider adapters, fixtures, contract tests, and explicit approval-state scenarios. Exact test framework, browser automation tool, coverage threshold, and CI provider are `TBD`.

ESLint is a required static-quality check for both frontend and backend TypeScript code. Linting must run independently from tests and type checking, must include the relevant configuration and test files, and must fail on the approved error-level rules. The exact ESLint configuration, plugin set, warning policy, and CI command remain `TBD` until the frontend and backend lint-configuration steps are executed.

Required layers are unit tests for domain rules, integration tests for NestJS/MongoDB boundaries, API contract tests, frontend component/state tests, end-to-end wizard journeys when the UI exists, security/authorization tests, and deployment smoke tests. Authentication tests must verify that token creation and validation work without a backend access-token or refresh-token store and that no token or token digest is written to MongoDB.

Minimum critical scenarios: autosave and resume, backward editing, accept/edit/reject AI flow, approved data protection, edition isolation, official/unverified labeling, image source revision, provider failure, unauthorized access, and safe secret configuration.

Token-specific scenarios must cover approved-revision source binding, rejection of unapproved data, accept/reject/regenerate behavior, download authorization, provenance labeling, malformed or unsafe provider output, storage failure, and the distinction between a board-ready token and official D&D content.

Image-download scenarios must cover guest download, authenticated download, invalid or expired delivery references, content-type and size validation, provider-URL secrecy, and recovery from download failure without unnecessary regeneration.
