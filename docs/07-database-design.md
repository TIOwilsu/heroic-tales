# 07 — Database design

MongoDB is the approved database. The initial conceptual collections are `users` (or external identity references), `characters`, `character_revisions`, `ai_suggestions`, `image_requests`, `character_tokens`, and `audit_events`. Exact collection names, indexes, shard/replica strategy, and ODM are `TBD`.

Character records should include owner identity, title, selected edition, wizard stage, draft fields, approved fields, completion/approval status, timestamps, and schema version. Edition-specific mechanical fields must be namespaced or separated so 2014 data cannot be read as 2024 data.

Persist immutable or append-only revision metadata for accepted user decisions and AI actions. Do not store raw secrets. Retention, deletion/export behavior, and encrypted-field strategy are `TBD` and must be resolved before production data is collected.

Guest generation is not persisted in these collections by default. A guest may receive session-scoped or ephemeral results, but a character, story, or revision becomes an owned MongoDB record only after authentication and an explicit save action. Persistence of generated image/token binaries is `TBD`; guest download must not depend on it.

## Character token records

A token record should include owner identity, character identity, source approved-character revision, generation status, provider metadata, asset reference, token format/variant metadata, acceptance state, provenance/classification, timestamps, and schema version. A token must never be generated from an unapproved draft without an explicit future decision.

The asset storage provider, whether binary data is stored directly or by reference, retention, download authorization, and supported board/VTT metadata are `TBD`.
