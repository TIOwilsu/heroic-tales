# 06 — Backend architecture

NestJS modules should isolate identity/access, characters, wizard progress, AI orchestration, D&D content, images, and health/operations. The backend uses TypeScript. Controllers define transport concerns; services enforce domain rules; repositories isolate MongoDB access; provider adapters isolate OpenAI and any future storage service.

## Node.js runtime

Use Node.js 24 LTS as the project runtime baseline for both the Next.js frontend and the NestJS backend. Pin the major version in repository and deployment configuration so local development, CI, and Vercel builds use the same runtime. The backend foundation is isolated in `backend/`, while the frontend is isolated in `frontend/`; both packages use their own npm scripts and are intended to have their own lockfiles. The backend lockfile remains pending generation in a Node/npm-enabled environment.

Next.js requires Node.js 20.9 or newer; Node.js 24 LTS is the approved conservative baseline. Do not upgrade to another major version without checking Next.js, NestJS, OpenAI SDK, MongoDB driver/ODM, and Vercel compatibility and recording the decision.

All inputs require schema validation. Persistence and account-owned resources require authorization and ownership checks; guest generation endpoints require abuse controls but do not require authentication. AI endpoints must use server-side configuration, bounded inputs, timeouts, retry rules, provider error mapping, usage accounting, and audit records. Exact libraries, queueing, rate-limit store, and observability integration are `TBD`.

The backend must reject attempts to mutate approved fields through an AI response path unless a user action explicitly authorizes the change. Version conflicts should be handled deliberately; conflict UX is `TBD`.

## Brand asset boundary

The supplied H/T monogram is a frontend brand asset governed by `docs/03-design-system.md`. The NestJS backend must not redraw, transform, recolor, embed, or use the logo in AI prompts, character images, character tokens, D&D data, or generated content. Next.js owns presentation of the canonical asset; backend responses remain brand-neutral unless a future asset-delivery decision explicitly approves a reference or URL.

## Clean Architecture

The NestJS backend must use Clean Architecture to keep business rules independent from NestJS decorators, MongoDB, OpenAI, HTTP, and deployment details. This is an architectural constraint; it does not authorize adding an ORM, queue, event bus, or other dependency that is currently `TBD`.

### Dependency rule

Dependencies point toward the domain:

```text
Frameworks and external systems
        -> interface adapters
        -> application use cases
        -> domain entities and rules
```

The domain must not import NestJS, MongoDB driver/ODM types, OpenAI SDK types, HTTP DTOs, environment access, or infrastructure services. TypeScript domain and application contracts should use explicit types and avoid leaking framework or provider types across boundaries. The application layer depends on ports/interfaces. Infrastructure and NestJS modules provide the concrete adapters at the composition boundary.

### Backend layers

#### Domain

Contains entities, value objects, domain errors, and pure rules for characters, wizard stages, revisions, editions, provenance, AI suggestion states, and final-story approval. Rules such as edition isolation and protection of approved fields belong here or in application policies, not in controllers.

#### Application

Contains use cases such as `CreateCharacter`, `SaveWizardStep`, `ResumeCharacter`, `RequestAISuggestion`, `AcceptSuggestion`, `RejectSuggestion`, `ApproveFinalStory`, `RequestCharacterImage`, and `RequestCharacterToken`. Use cases coordinate validation, optional authentication, authorization for persistence, repositories, provider ports, audit recording, and transactions where required. They must not depend on transport or vendor response shapes.

#### Interface adapters

Contains NestJS controllers, request/response DTOs, guards, presenters, mappers, and exception translators. Controllers should remain thin: resolve optional identity, enforce authentication for protected persistence operations, validate transport input, invoke a use case, and map the result to the selected API contract. The REST/GraphQL choice and final error envelope remain `TBD`.

#### Infrastructure

Contains MongoDB repositories, OpenAI adapters, future image-storage adapters, configuration loading, logging, and other external-system integrations. Infrastructure may depend on inner layers and must translate external failures into application-level errors without leaking secrets or provider-specific internals.

### Suggested module structure

The following layout is a guide and may be adapted to the repository after the relevant task confirms conventions:

```text
src/
├── domain/
│   ├── character/
│   ├── wizard/
│   ├── ai/
│   └── shared/
├── application/
│   ├── ports/
│   └── use-cases/
├── adapters/
│   ├── http/
│   ├── presenters/
│   └── mappers/
├── infrastructure/
│   ├── persistence/
│   ├── openai/
│   ├── images/
│   └── configuration/
└── main/
    ├── modules/
    └── composition-root/
```

NestJS feature modules may group files differently, provided that module boundaries preserve the dependency rule. A concrete folder convention, ODM, and dependency-injection token strategy are `TBD` until approved.

### Backend boundary rules

- Controllers never call MongoDB or OpenAI directly.
- Domain and application code never read environment variables; configuration is injected through a port or adapter.
- MongoDB documents must be mapped to domain objects; persistence schemas must not become domain contracts.
- OpenAI requests must be created by a server-side adapter from validated application data and must return a validated application result.
- AI responses are suggestions until a user-authorized use case changes the character aggregate.
- Approved character fields, drafts, rejected suggestions, and generated-image source revisions must remain distinct in application contracts.
- Authorization and ownership checks must run before reading or mutating user-owned data. Guest generation must not create user-owned database records.
- Audit events must record user-authorized AI actions and relevant source revisions without storing secrets or unnecessary sensitive content.

### Request and provider flow

```text
HTTP request
  -> NestJS controller / guard / DTO validation
  -> application use case
  -> domain rules
  -> repository or provider port
  -> infrastructure adapter
  -> mapper / presenter
  -> HTTP response
```

Provider timeouts, retries, rate limits, usage accounting, malformed output, refusal, and outages must be translated at the adapter boundary. The application layer decides whether the operation can be retried or surfaced as a user-actionable failure.

## ESLint quality step

The backend must use ESLint to check NestJS and TypeScript code for correctness, maintainability, security-sensitive patterns, and violations of the Clean Architecture dependency direction. ESLint must complement, not replace, type checking, unit tests, integration tests, API contract tests, and security review.

The backend ESLint setup must:

- Lint application source, configuration, DTOs, adapters, tests, and NestJS module code that belongs to the backend.
- Prevent or flag framework, MongoDB, OpenAI, HTTP, and environment concerns from leaking into domain and application layers where the selected rules can enforce that boundary. The exact rule or plugin is `TBD`.
- Avoid rules that encourage logging secrets, provider responses containing sensitive content, private prompts, or environment values.
- Validate async/error-handling patterns appropriate for NestJS and provider adapters without hiding failures.
- Run as a documented local command and as a CI quality gate once CI is configured.

The ESLint version, configuration format, TypeScript/NestJS plugins, shared-versus-separate configuration, file ignores, severity policy, auto-fix policy, and CI command are `TBD`. The setup step must resolve these decisions before changing the backend package manifest and must not add a formatter or unrelated dependency without approval.

### Testing consequences

Domain rules and use cases should be tested without NestJS, MongoDB, or live OpenAI calls. Adapter integration tests should verify persistence and provider mappings using isolated test resources or deterministic fakes. Controller tests should verify validation, authorization wiring, and response mapping. Critical tests must prove cross-user access is rejected, 2014 and 2024 content cannot cross boundaries, and an AI response cannot overwrite approved data without explicit authorization.
