# Heroic Tales

Heroic Tales is an AI-powered Dungeons & Dragons character creation platform. It guides a player through concept, identity, origin, past, personality, relationships, and final story creation while keeping the player in control of every creative decision. AI output is always a suggestion that the user may accept, edit, or reject.

## Technology baseline

- Frontend: Next.js with SSR and Server Components, built on React and TypeScript, styled with SCSS, using Node.js 24 LTS.
- Backend: NestJS with TypeScript on Node.js 24 LTS.
- Database: MongoDB.
- AI integration: OpenAI.
- Deployment: Vercel.

These choices are approved and must not be replaced without an explicit architecture decision. Unselected libraries, authentication providers, observability products, queues, and infrastructure services are `TBD`.

## Documentation map

`AGENTS.md` contains the rules for AI coding agents. The numbered files in `docs/` define product requirements, approved decisions, architecture, policies, and the roadmap. The numbered files in `tasks/` are independently executable work packages.

## Directory structure

```text
heroic-tales/
├── README.md
├── AGENTS.md
├── docs/
│   ├── 00-project-overview.md
│   ├── 01-product-requirements.md
│   ├── 02-approved-decisions.md
│   ├── 03-design-system.md
│   ├── 04-system-architecture.md
│   ├── 05-frontend-architecture.md
│   ├── 06-backend-architecture.md
│   ├── 07-database-design.md
│   ├── 08-api-specification.md
│   ├── 09-ai-integration.md
│   ├── 10-dnd-content-policy.md
│   ├── 11-character-image-generation.md
│   ├── 12-security.md
│   ├── 13-testing-strategy.md
│   ├── 14-deployment.md
│   └── 15-development-roadmap.md
└── tasks/
    ├── README.md
    ├── 00-project-foundation.md
    ├── 01-frontend-foundation.md
    ├── 02-backend-foundation.md
    ├── 03-database-foundation.md
    ├── 04-authentication.md
    ├── 05-character-management.md
    ├── 06-character-creation-wizard.md
    ├── 07-ai-integration.md
    ├── 08-story-generation.md
    ├── 09-character-image-generation.md
    ├── 10-character-token-generation.md
    ├── 11-dnd-knowledge-base.md
    ├── 12-dashboard.md
    ├── 13-testing.md
    └── 14-deployment.md
```

Start with `docs/00-project-overview.md`, `docs/01-product-requirements.md`, and `docs/02-approved-decisions.md`. Read the architecture document relevant to the requested task before changing code. Next.js is the approved frontend framework; NestJS remains the dedicated backend API.

## Incremental execution

The roadmap is planning information, not authorization to implement the whole product. A user must explicitly request a task, for example:

> Execute Task 00 only. Read `AGENTS.md`, inspect the repository, verify prerequisites, and stop after the task checklist.

> Execute Task 10 only. Do not begin Task 11 or any other task.

Every task requires repository inspection, documentation review, scope control, tests, acceptance-criteria verification, a change summary, and a stop. If a prerequisite or important decision is missing, ask before expanding scope.

## Project execution checklist

- [ ] Read `AGENTS.md`.
- [ ] Confirm the requested task ID and its prerequisites.
- [ ] Read the relevant product, architecture, security, and testing documents.
- [ ] Review `docs/02-approved-decisions.md`.
- [ ] Inspect existing implementations before creating files.
- [ ] Implement only the requested task.
- [ ] Run the task's required tests and verify acceptance criteria.
- [ ] Record files changed, pending issues, and documentation updates.
- [ ] Stop; never automatically execute the next task.
