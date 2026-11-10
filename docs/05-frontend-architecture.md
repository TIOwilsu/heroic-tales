# 05 — Frontend architecture

The Next.js application should organize features around the user journey rather than provider-specific screens. Use SSR/Server Components for public or read-heavy surfaces where they improve initial delivery, and Client Components for the interactive wizard, AI suggestions, editing, image, and token workflows. Recommended boundaries are shell/navigation, authentication, dashboard, character editor, wizard stages, AI suggestion presentation, story approval, and image workflow. These are recommendations until the relevant task approves file conventions.

## Frontend package boundary

All frontend application files live under `frontend/`. This includes the Next.js package manifest, App Router files, TypeScript configuration, SCSS, Storybook configuration and stories, ESLint configuration, public assets, and frontend tests. The repository root is reserved for shared documentation, orchestration, and repository-level configuration.

The frontend uses TypeScript and Node.js 24 LTS, matching the NestJS backend runtime. TypeScript is the default language for Next.js pages, layouts, Server Components, Client Components, domain code, application use cases, adapters, tests, and configuration where supported. The Node.js major version must be pinned consistently across local development, CI, and Vercel. The current foundation uses Next.js `15.5.x`, React `19.1.x`, TypeScript `5.9.x`, npm, and a package lockfile; future upgrades require compatibility review.

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

## Storybook documentation boundary

Use Storybook as the isolated documentation surface for the frontend component catalog and design-system contracts. Stories belong to the framework/infrastructure and interface-adapter concerns; they may compose presentational components and fixture data but must not become an alternative application layer.

Storybook stories must:

- Render components with deterministic fixture data and explicit states.
- Demonstrate responsive layouts, loading, error, empty, accepted, rejected, and approved states where applicable.
- Show accessibility-relevant focus, keyboard, contrast, and reduced-motion behavior.
- Use the approved SCSS tokens and typography roles without recreating the H/T logo.
- Avoid direct calls to OpenAI, NestJS endpoints, MongoDB, public D&D APIs, or browser persistence.

The frontend foundation uses Storybook `9.1.x` with the `@storybook/nextjs` adapter. Stories live under `app/` or `stories/` and use deterministic fixture data. No addons are configured yet. CI/build integration beyond the `storybook` and `build-storybook` package scripts remains `TBD`.

## ESLint quality step

The frontend must use ESLint to detect correctness, maintainability, and prohibited dependency-boundary patterns in TypeScript, Next.js, React, and Storybook code. ESLint is a quality gate and must not replace type checking, tests, accessibility checks, or code review.

The frontend ESLint setup must:

- Lint application source, configuration, and Storybook stories that belong to the frontend.
- Respect the Clean Architecture dependency direction; framework, UI, and infrastructure concerns must not leak into domain or application code. The exact boundary-enforcement rule or plugin is `TBD`.
- Cover React and Next.js conventions without imposing rules that contradict Server Components, Client Components, or the approved SCSS approach.
- Report unsafe patterns without exposing secrets, prompts, environment values, or generated user content.
- Run as a documented local command and as a CI quality gate once CI is configured.

The frontend foundation uses ESLint `9.39.x` with flat configuration in `eslint.config.mjs`. It covers Next.js, React, TypeScript, and Storybook files through the configured plugins and runs with `npm run lint`. The auto-fix policy, CI enforcement, and whether rules are shared with the backend remain `TBD`; this step does not configure backend linting.
## Frontend file-naming convention

Frontend source filenames must use PascalCase. Examples include `CharacterWizard.tsx`, `StoryEditor.tsx`, `UseCharacterDraft.ts`, and `CharacterApi.ts`. Test files keep the same PascalCase base name and append the test suffix, such as `CharacterWizard.spec.tsx`.

Use PascalCase for React component and class symbols, camelCase for functions, hooks, variables, and object properties, and explicit descriptive names for types and interfaces. Next.js reserved route filenames such as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `route.ts` are required framework exceptions and must retain their prescribed names.

This convention applies to new frontend files. Renaming existing files is a separate refactoring task and must update all imports without changing unrelated behavior.
