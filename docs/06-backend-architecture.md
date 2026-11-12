# 06 — Backend architecture

NestJS modules should isolate identity/access, characters, wizard progress, AI orchestration, D&D content, images, and health/operations. The backend uses TypeScript. Controllers define transport concerns; services enforce domain rules; repositories isolate MongoDB access; provider adapters isolate OpenAI and any future storage service. Mongoose is the approved MongoDB ODM and must remain inside infrastructure persistence adapters.

## Backend file-naming convention

Backend source filenames must use lowercase kebab-case. Examples include `auth-service.ts`, `session-store-port.ts`, `mongo-db-connection.ts`, and `character-repository.ts`. DTOs and interfaces may use explicit suffixes such as `account-record.dto.ts` and `session-store-service.interface.ts`. Test files keep the same kebab-case base name and append the test suffix, such as `auth-service.spec.ts`.

Use PascalCase for classes, interfaces, and types, camelCase for public functions, methods, variables, and object properties, and prefix private functions, methods, and variables with `_` (for example, `_client` or `_normalizeEmail`). NestJS framework-required filenames or generated files are exceptions when the framework requires a specific name, such as `main.ts`, `app.module.ts`, or `*.controller.ts`; those names must not be changed merely to satisfy the convention.

This convention applies to new backend files. Renaming existing files is a separate refactoring task and must update all imports without changing unrelated behavior.

## Node.js runtime

Use Node.js 24 LTS as the project runtime baseline for both the Next.js frontend and the NestJS backend. Pin the major version in repository and deployment configuration so local development, CI, and Vercel builds use the same runtime. The backend foundation is isolated in `backend/`, while the frontend is isolated in `frontend/`; both packages use their own npm scripts and are intended to have their own lockfiles. The backend lockfile remains pending generation in a Node/npm-enabled environment.

## MongoDB persistence

Mongoose is the approved object-document mapper for MongoDB persistence. It may be used by infrastructure repositories and NestJS persistence modules through `@nestjs/mongoose` and `mongoose`. Domain entities, application use cases, and repository interfaces must not import Mongoose schemas, models, `HydratedDocument`, `ObjectId`, or MongoDB driver types.

The application layer depends on ports such as `ICharacterRepository` and `ICharacterRevisionRepository`. The infrastructure layer implements those ports with Mongoose models and maps persistence documents to domain DTOs. Schema definitions, indexes, connection configuration, and Mongoose lifecycle details remain infrastructure concerns. The native MongoDB driver connection from Task 03 remains a connectivity foundation and must not leak into application contracts.

Next.js requires Node.js 20.9 or newer; Node.js 24 LTS is the approved conservative baseline. Do not upgrade to another major version without checking Next.js, NestJS, OpenAI SDK, MongoDB driver/ODM, and Vercel compatibility and recording the decision.

All inputs require schema validation. Persistence and account-owned resources require authorization and ownership checks; guest generation endpoints require abuse controls but do not require authentication. AI endpoints must use server-side configuration, bounded inputs, timeouts, retry rules, provider error mapping, usage accounting, and audit records. Exact libraries, queueing, rate-limit store, and observability integration are `TBD`.

## Authentication and authorization

Authentication is self-managed. The backend verifies credentials, creates short-lived access tokens and refresh tokens, and validates self-contained bearer tokens without persisting raw tokens or token digests. Protected requests use the `Authorization: Bearer <access-token>` header. Passwords must never be stored or logged; they must be processed with an approved memory-hard password-hashing algorithm. The client stores the issued tokens and presents them to the backend as required. The token format, claims, signing algorithm and key management, token lifetimes, rotation policy, reuse detection, revocation behavior, account recovery, email verification, and roles are `TBD`.

Authentication infrastructure must expose an application-level current-user contract rather than leaking NestJS request objects, HTTP headers, bearer-token libraries, MongoDB documents, or hashing-library types into domain use cases. A reusable ownership policy must compare the authenticated subject with the resource owner before reads, updates, deletes, resume operations, image/token access, or downloads. Missing, expired, invalid, or revoked identity and failed ownership checks must be handled consistently without resource-existence leakage.

The authentication module must be composed at the backend boundary and must not gate guest story, image, token, or download generation. Protected save/resume use cases require authenticated identity and ownership checks. API routes and error-envelope details remain `TBD` until the API contract is approved.

The token implementation uses self-contained JWTs signed with HS256 and is cryptographically verifiable because the backend does not maintain an access- or refresh-token store. The backend returns a short-lived access token and a longer-lived refresh token to the client; it validates each token using its protected signing configuration and standard JWT claims. The client owns token storage and must never expose signing material. Refresh replacement, reuse detection, revocation, production lifetimes, key management, and HTTP routes remain `TBD`; these cannot rely on a backend token store.

NestJS interfaces do not exist at runtime, so constructor dependencies represented by interfaces must use explicit injection tokens. The auth module may use an account repository for user records, but it must not introduce a backend access-token or refresh-token store. Any in-memory token state is temporary development scaffolding and must not be used as part of production validation; production validation must rely on the self-contained token and protected signing/verification configuration.

### NestJS dependency-injection pattern

When an application service depends on an interface, the interface may be imported with `import type`, but it must not be used as the runtime NestJS token. Define a runtime token and inject it explicitly:

```ts
constructor(
  @Inject("AUTH_ACCOUNT_STORE")
  private readonly _accounts: IAccountStoreService,
  @Inject("AUTH_SESSION_STORE")
  private readonly _sessions: ISessionStoreService,
  @Inject("AUTH_CRYPTO_SERVICE")
  private readonly _cryptService: IAuthCryptService,
  @Inject("AUTH_OPTIONS")
  options: IAuthService,
) {}
```

The corresponding NestJS module must register every token:

```ts
providers: [
  { provide: "AUTH_ACCOUNT_STORE", useClass: AccountStoreService },
  { provide: "AUTH_SESSION_STORE", useClass: SessionStoreService },
  { provide: "AUTH_CRYPTO_SERVICE", useClass: AuthCryptoService },
  { provide: "AUTH_OPTIONS", useValue: {} },
  { provide: "AUTH_SERVICE", useClass: AuthService },
]
```

Use exported constants instead of repeated string literals when the token is shared across multiple files. Injectable classes used in `useClass` or `useExisting` must use a normal runtime import in the module. Never use `import type` for a class that NestJS must instantiate.

Application services should use NestJS decorators only at the composition boundary required by the module. Their business behavior must remain independent from MongoDB and provider implementations. Private properties, constructor parameters, and methods use an `_` prefix; public members retain normal camelCase.

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

### Reference module architecture

Use the following structure as the reference for building backend feature modules. It is an example and does not claim that every feature or file already exists:

```text
src/
├── app.module.ts
├── main.ts
├── modules/
│   ├── auth/
│   │   ├── application/
│   │   │   ├── auth.module.ts
│   │   │   ├── services/
│   │   │   ├── use-cases/
│   │   │   └── ports/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── dtos/
│   │   │   ├── value-objects/
│   │   │   └── rules/
│   │   ├── adapters/
│   │   │   └── http/
│   │   └── infrastructure/
│   │       └── repositories/
│   └── health/
│       ├── application/
│       ├── adapters/
│       └── health.module.ts
└── shared/
    ├── application/
    │   └── mongo-db.module.ts
    ├── domain/
    │   └── dtos/
    │       └── error.dto.ts
    └── infrastructure/
        └── database/
            ├── mongo-db-config.ts
            ├── mongo-db-connection.ts
            └── *.spec.ts
```

`modules/<feature>` is the feature boundary. Each feature combines NestJS module composition with Clean Architecture layers. Application services and use cases coordinate ports, domain code contains business rules, adapters handle HTTP and other input/output concerns, and infrastructure implements external-system details. Domain and application code must remain independent of NestJS and external providers.

`shared` is reserved for genuinely cross-cutting code reused by multiple features. Its subfolders identify the architectural responsibility; `shared` is not an additional Clean Architecture layer and must not become a general-purpose dumping ground.

For example, a shared MongoDB integration may expose a NestJS composition module from `shared/application/mongo-db.module.ts`, while driver-specific connection and configuration remain under `shared/infrastructure/database/`. It must not be imported by domain DTOs or interfaces. Feature-specific account/session persistence adapters belong under the relevant feature's infrastructure boundary.

`app.module.ts` is the application composition root. It imports feature modules such as the auth and health modules. `main.ts` is the NestJS bootstrap entry point. NestJS-required filenames such as `*.module.ts`, `*.controller.ts`, `main.ts`, and `app.module.ts` are exceptions to the general backend filename convention.

### Backend boundary rules

- Controllers never call MongoDB or OpenAI directly.
- Domain and application code never read environment variables; configuration is injected through a port or adapter.
- MongoDB documents must be mapped to domain objects; persistence schemas must not become domain contracts.
- OpenAI requests must be created by a server-side adapter from validated application data and must return a validated application result.
- AI responses are suggestions until a user-authorized use case changes the character aggregate.
- Approved character fields, drafts, rejected suggestions, and generated-image source revisions must remain distinct in application contracts.
- Authorization and ownership checks must run before reading or mutating user-owned data. Guest generation must not create user-owned database records.
- Authorization-header parsing, token validation, refresh-token lookup, and credential verification remain in interface-adapter/infrastructure code; application use cases receive an optional current-user value or an explicit authorization failure.
- Authentication failures must not log access tokens, refresh tokens, authorization headers, passwords, signing keys, or provider/database payloads.
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
