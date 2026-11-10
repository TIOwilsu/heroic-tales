# 07 — Database design

MongoDB is the approved database. The initial conceptual collections are `users` (or external identity references), `characters`, `character_revisions`, `ai_suggestions`, `image_requests`, `character_tokens`, and `audit_events`. Exact collection names, indexes, shard/replica strategy, and ODM are `TBD`.

## Connectivity foundation

Task 03 establishes a small infrastructure boundary using the native MongoDB Node.js driver. This is a connectivity adapter, not a decision to use an ODM and not a domain persistence implementation. The adapter reads `MONGODB_URI` and `MONGODB_DATABASE` from backend environment variables, supports an explicit `connect`/`ping`/`close` lifecycle, and must not log connection strings. The Nest module is not imported into the application module until a future task defines startup behavior and runtime availability requirements.

No collections, indexes, repositories, migrations, seed data, or domain schemas are created by this foundation. The ODM decision remains `TBD` and requires explicit approval before persistence work begins.

Character records should include owner identity, title, selected edition, wizard stage, draft fields, approved fields, completion/approval status, timestamps, and schema version. Edition-specific mechanical fields must be namespaced or separated so 2014 data cannot be read as 2024 data.

Persist immutable or append-only revision metadata for accepted user decisions and AI actions. Do not store raw secrets. Retention, deletion/export behavior, and encrypted-field strategy are `TBD` and must be resolved before production data is collected.

Guest generation is not persisted in these collections by default. A guest may receive session-scoped or ephemeral results, but a character, story, or revision becomes an owned MongoDB record only after authentication and an explicit save action. Persistence of generated image/token binaries is `TBD`; guest download must not depend on it.

## Character token records

A token record should include owner identity, character identity, source approved-character revision, generation status, provider metadata, asset reference, token format/variant metadata, acceptance state, provenance/classification, timestamps, and schema version. A token must never be generated from an unapproved draft without an explicit future decision.

The asset storage provider, whether binary data is stored directly or by reference, retention, download authorization, and supported board/VTT metadata are `TBD`.
