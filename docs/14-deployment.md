# 14 — Deployment

Vercel is the approved deployment platform. Environments, project split, preview policy, domain, database hosting, secret management, build commands, runtime limits, migrations, rollback, monitoring, and alerting are `TBD`.

Deployment must use separate development/preview/production configuration, never expose OpenAI credentials, validate required environment variables at startup, and include a health/smoke check. Production launch is blocked until licensing, moderation, retention, cost controls, and incident ownership are decided.

