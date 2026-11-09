# 02 — Approved decisions

This file is the decision register. “Approved” means an agent may implement it. “TBD” means the agent must not silently choose it.

| Area | Approved decision | Status / notes |
|---|---|---|
| Frontend | React | Approved; build tooling is `TBD`. |
| Backend | NestJS on Node.js | Approved. |
| Database | MongoDB | Approved; hosting and ODM are `TBD`. |
| AI | OpenAI | Approved; model IDs, quotas, and SDK version are `TBD`. |
| Deployment | Vercel | Approved; environment topology is `TBD`. |
| Brand | Heroic Tales; “Every Hero Has a Story” | Approved. |
| Logo | Exact user-provided H/T intertwined serif monogram | Approved; source asset/location is `TBD`. |
| Editions | D&D 5e 2014 and Revised 5e 2024, stored and handled separately | Approved. |
| Content | Official mechanical content only; narrative originality allowed within canon constraints | Approved. |
| Auth | Authentication provider and session strategy | TBD. |
| UI state | State-management library and form library | TBD. |
| API | REST vs GraphQL, versioning, and error envelope | TBD; task 08 must not invent a final contract. |
| Files | Image storage/provider and retention | TBD. |
| Moderation | Safety policy and review workflow | TBD; must be resolved before production AI launch. |

Additional approved architecture and product direction:

| Area | Approved decision | Status / notes |
|---|---|---|
| Application architecture | Clean Architecture dependency direction for frontend and backend | Approved; concrete folder conventions and adapter libraries remain `TBD`. |
| D&D data access | Public D&D APIs may be used through a server-side adapter | Approved in principle; provider, license/terms, fields, and synchronization strategy remain `TBD`. |
| Visual direction | Tactile fantasy character journal with Old Parchment as the primary writing surface | Approved; texture asset and exact layout tokens remain `TBD`. |

Changes require a dated entry, rationale, affected documents, and explicit approval by the project owner.
