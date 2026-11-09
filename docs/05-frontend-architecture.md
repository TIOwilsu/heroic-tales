# 05 — Frontend architecture

The React application should organize features around the user journey rather than provider-specific screens. Recommended boundaries are shell/navigation, authentication, dashboard, character editor, wizard stages, AI suggestion presentation, story approval, and image workflow. These are recommendations until the relevant task approves file conventions.

The wizard needs draft state, persisted server state, save status, revision history visibility, edition selection, and explicit AI action states. A failed automatic save must not discard local input. Editing a prior step must clearly indicate whether later suggestions are now stale.

Routing library, state library, form validation library, styling approach, and component library are `TBD`. Do not add one merely because it is conventional. All user-facing AI content needs loading, error, empty, accepted, rejected, and retry states.

## Clean Architecture

The React frontend must use Clean Architecture as an organizing principle. The goal is to keep product rules and user decisions independent from React, browser APIs, the selected transport, and third-party libraries. Clean Architecture is a structural constraint, not permission to add a framework or dependency.

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

Contains React components, routing, browser storage, network clients, API adapters, and dependency wiring. This layer may depend on the inner layers. The concrete state-management library, routing library, HTTP client, and form library remain `TBD`.

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

### React-specific rules

- Components render state and emit user intent; they do not contain character business rules or call OpenAI directly.
- Hooks may coordinate use cases and UI lifecycle, but must not become an unbounded service layer.
- API clients and browser persistence belong to infrastructure and are injected through application ports.
- AI suggestion actions must be explicit commands. A successful provider response is not an automatic character mutation.
- Approved character data, draft data, and rejected suggestions must have distinct application types and UI states.
- Loading, error, retry, and stale-suggestion states must be represented without bypassing the application layer.

### Testing consequences

Domain rules and use cases should be tested without a browser or network. Adapter tests should verify mapping and error translation. Component tests should verify rendering and user intent, while a smaller number of integration tests should verify that dependency wiring connects the UI to the correct adapters. Tests must prove that an AI response cannot overwrite approved information without an explicit user action.
