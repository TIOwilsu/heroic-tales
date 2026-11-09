# 02 — Approved decisions

This file is the decision register. “Approved” means an agent may implement it. “TBD” means the agent must not silently choose it.

| Area | Approved decision | Status / notes |
|---|---|---|
| Frontend | Next.js with SSR and Server Components, built on React and TypeScript, running on Node.js 24 LTS | Approved; exact rendering, caching, and build configuration are `TBD`. |
| Backend | NestJS with TypeScript on Node.js 24 LTS | Approved; exact patch version and package manager are `TBD`. |
| Database | MongoDB | Approved; hosting and ODM are `TBD`. |
| AI | OpenAI | Approved; model IDs, quotas, and SDK version are `TBD`. |
| Deployment | Vercel | Approved; environment topology is `TBD`. |
| Brand | Heroic Tales; “Every Hero Has a Story” | Approved. |
| Logo | Exact user-provided H/T intertwined serif monogram | Approved; source asset/location is `TBD`. |
| Editions | D&D 5e 2014 and Revised 5e 2024, stored and handled separately | Approved. |
| Content | Official mechanical content only; narrative originality allowed within canon constraints | Approved. |
| Auth | Authentication provider and session strategy | TBD. |
| Access model | Guest generation and export; authentication required to save character/story data in MongoDB and resume it | Approved; guest retention, rate limits, and generated-asset persistence remain `TBD`. |
| UI state | State-management library and form library | TBD. |
| Frontend styling | SCSS | Approved; Sass package/version, module strategy, naming conventions, and global/local split are `TBD`. |
| API | REST vs GraphQL, versioning, and error envelope | TBD; implementation tasks must not invent a final contract before approval. |
| Files | Image storage/provider and retention | TBD. |
| Moderation | Safety policy and review workflow | TBD; must be resolved before production AI launch. |

Additional approved architecture and product direction:

| Area | Approved decision | Status / notes |
|---|---|---|
| Application architecture | Clean Architecture dependency direction for frontend and backend | Approved; concrete folder conventions and adapter libraries remain `TBD`. |
| D&D data access | Public D&D APIs may be used through a server-side adapter | Approved in principle; provider, license/terms, fields, and synchronization strategy remain `TBD`. |
| Visual direction | Tactile fantasy character journal with Old Parchment as the primary writing surface | Approved; texture asset and exact layout tokens remain `TBD`. |
| Character tokens | Optional board-ready visual token generated from approved character information | Approved; token format, storage, and board/VTT integrations remain `TBD`. |

Changes require a dated entry, rationale, affected documents, and explicit approval by the project owner.
