# 07 — Database design

MongoDB is the approved database. The initial conceptual collections are `users` (or external identity references), `characters`, `character_revisions`, `ai_suggestions`, `image_requests`, and `audit_events`. Exact collection names, indexes, shard/replica strategy, and ODM are `TBD`.

Character records should include owner identity, title, selected edition, wizard stage, draft fields, approved fields, completion/approval status, timestamps, and schema version. Edition-specific mechanical fields must be namespaced or separated so 2014 data cannot be read as 2024 data.

Persist immutable or append-only revision metadata for accepted user decisions and AI actions. Do not store raw secrets. Retention, deletion/export behavior, and encrypted-field strategy are `TBD` and must be resolved before production data is collected.

