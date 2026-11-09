# 05 — Frontend architecture

The Next.js application should organize features around the user journey rather than provider-specific screens. Use SSR/Server Components for public or read-heavy surfaces where they improve initial delivery, and Client Components for the interactive wizard, AI suggestions, editing, image, and token workflows. Recommended boundaries are shell/navigation, authentication, dashboard, character editor, wizard stages, AI suggestion presentation, story approval, and image workflow. These are recommendations until the relevant task approves file conventions.

The frontend uses TypeScript and Node.js 24 LTS, matching the NestJS backend runtime. TypeScript is the default language for Next.js pages, layouts, Server Components, Client Components, domain code, application use cases, adapters, tests, and configuration where supported. The Node.js major version must be pinned consistently across local development, CI, and Vercel. The exact patch version, TypeScript version, package manager, and lockfile strategy are `TBD`.

The wizard needs draft state, persisted server state, save status, revision history visibility, edition selection, and explicit AI action states. A failed automatic save must not discard local input. Editing a prior step must clearly indicate whether later suggestions are now stale.

SCSS is the approved frontend styling approach. The routing library, state library, form validation library, component library, Sass package/version, module strategy, naming conventions, and global/local style split are `TBD`. Do not add one merely because it is conventional. All user-facing AI content needs loading, error, empty, accepted, rejected, and retry states.

### SCSS rules

- Keep design tokens, typography, Old Parchment surfaces, brand colors, and interaction states in a maintainable SCSS structure.
- Keep styling concerns in the framework/infrastructure layer; domain and application code must not import SCSS or UI-specific modules.
- Use scoped styles for components where the selected Next.js/Sass setup supports them, while reserving global styles for resets, typography, tokens, and application-wide states.
- Preserve the exact approved H/T logo asset and the approved design-system colors; do not recreate the logo in SCSS.
- Avoid adding a CSS framework or component library unless separately approved.

## Clean Architecture

The Next.js frontend must use Clean Architecture as an organizing principle. The goal is to keep product rules and user decisions independent from Next.js, React, browser APIs, the selected transport, and third-party libraries. Clean Architecture is a structural constraint, not permission to add a framework or dependency.

### Dependency rule

Dependencies point inward only:

```text
Frameworks and infrastructure
        -> interface adapters
        -> application use cases
        -> domain rules and entities
```

The domain and application layers must not import React, routing, HTTP clients, MongoDB models, OpenAI SDK types, browser storage APIs, or UI components. Infrastructure may implement application ports, but the core must depend on interfaces/contracts rather than concrete adapters.

### Frontend layers

#### Domain

Contains character concepts, wizard stages, approval states, edition identity, AI suggestion status, and invariants such as “approved character information cannot be overwritten by an AI response.” Domain objects and pure rules should be deterministic and independently testable.

#### Application

Contains use cases that coordinate user intent, for example `CreateCharacter`, `SaveWizardStep`, `ResumeCharacter`, `RequestSuggestion`, `AcceptSuggestion`, `EditSuggestion`, `RejectSuggestion`, and `ApproveFinalStory`. Use cases expose input/output contracts and depend on ports such as `CharacterRepository`, `SuggestionService`, and `Clock`; they must not know whether the caller is a React component or whether data is transported over REST or another `TBD` protocol.

#### Interface adapters

Contains view models, presenters, form mappers, state orchestration, and controllers/hooks that translate application results into UI state. Adapters must map API/provider shapes into application contracts and must not leak raw provider responses or transport-specific errors into domain code.

#### Frameworks and infrastructure

Contains Next.js routes/layouts, React Server and Client Components, browser storage, network clients, API adapters, and dependency wiring. This layer may depend on the inner layers. The concrete state-management library, routing library, HTTP client, and form library remain `TBD`.

### Suggested feature structure

The following is a guide, not an authorization to create every directory immediately:

```text
src/
├── domain/
│   ├── character/
│   ├── wizard/
│   └── shared/
├── application/
│   ├── ports/
│   └── use-cases/
├── adapters/
│   ├── presenters/
│   ├── controllers/
│   └── mappers/
└── infrastructure/
    ├── api/
    ├── persistence/
    ├── routing/
    └── ui/
```

Feature-oriented alternatives may be used only if they preserve the same dependency direction and boundaries. A decision to use a different layout must be recorded before implementation.

### Next.js and React rules

- Server and Client Components render state and emit user intent; they do not contain character business rules or call OpenAI directly.
- SSR and Server Components may load public/read-only data, but sensitive mutations and business rules remain behind the NestJS API.
- Hooks may coordinate use cases and UI lifecycle, but must not become an unbounded service layer.
- API clients and browser persistence belong to infrastructure and are injected through application ports.
- AI suggestion actions must be explicit commands. A successful provider response is not an automatic character mutation.
- Approved character data, draft data, and rejected suggestions must have distinct application types and UI states.
- Loading, error, retry, and stale-suggestion states must be represented without bypassing the application layer.

### Testing consequences

Domain rules and use cases should be tested without a browser or network. Adapter tests should verify mapping and error translation. Component tests should verify rendering and user intent, while a smaller number of integration tests should verify that dependency wiring connects the UI to the correct adapters. Tests must prove that an AI response cannot overwrite approved information without an explicit user action.
