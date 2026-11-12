# 07 — Database design

MongoDB is the approved database and Mongoose is the approved ODM. The initial conceptual collections are `users` (or external identity references), `characters`, `character_revisions`, `ai_suggestions`, `image_requests`, `character_tokens`, and `audit_events`. Exact collection names, indexes, shard/replica strategy, and operational topology remain `TBD`.

## Connectivity foundation

Task 03 establishes a small infrastructure boundary using the native MongoDB Node.js driver. This is a connectivity adapter, not a decision to use an ODM and not a domain persistence implementation. The adapter reads `MONGODB_URI` and `MONGODB_DATABASE` from backend environment variables, supports an explicit `connect`/`ping`/`close` lifecycle, and must not log connection strings. The current NestJS composition module is `backend/src/shared/application/mongo-db.module.ts`; it should be wired into the application composition root only when runtime startup behavior and availability requirements are approved.

No collections, indexes, repositories, migrations, seed data, or domain schemas are created by this foundation. Task 03 establishes connectivity only; Mongoose schemas and persistence repositories belong to later feature tasks.

Task 05 adds character repository ports and Mongoose-backed infrastructure repository implementations for the `characters` and `character_revisions` collections. The repositories remain behind application interfaces and do not define migrations, automatic connection startup, or a final HTTP API contract. Those operational decisions remain `TBD`.

## Entity relationships

The initial data model uses authenticated users as the owners of persisted characters. Guest characters are session-scoped or local and must not be silently inserted into these collections.

```text
User 1 ──── * Character
Character 1 ──── * CharacterRevision
CharacterRevision 1 ──── * AISuggestion
CharacterRevision 1 ──── * ImageRequest
CharacterRevision 1 ──── * CharacterToken
Character 1 ──── * AuditEvent
```

Every authenticated character-related record must include `ownerId`. Application services must verify both the requested entity identifier and the authenticated owner before returning or mutating data. MongoDB references are represented by identifiers; domain code must not depend on MongoDB document types.

## Character records

The `characters` collection is the current character aggregate. It contains the editable draft and the approved snapshot pointers used by the application:

```text
Character
- _id
- ownerId
- title
- edition
- currentStage
- draftData
- approvedData
- currentRevisionId
- approvedRevisionId
- status
- createdAt
- updatedAt
- schemaVersion
```

`draftData` represents the latest editable state. `approvedData` represents information explicitly approved by the user and is the only authoritative source for downstream image and token generation. The exact field schema for the seven wizard stages is defined by the character-management and wizard tasks, not by infrastructure adapters.

Edition-specific mechanical fields must be namespaced or separated so D&D 5th Edition (2014) data cannot be read as D&D Revised 5th Edition (2024) data.

## Character revisions

The `character_revisions` collection stores immutable historical snapshots of meaningful character decisions. It prevents later edits from changing the source data used by an approved story, image, or token.

```text
CharacterRevision
- _id
- characterId
- ownerId
- parentRevisionId
- snapshot
- stage
- revisionType
- createdBy
- createdAt
- schemaVersion
```

Create a revision when the user accepts an AI suggestion, approves meaningful character information, or approves the final story. Do not create a revision for every keystroke during autosave. `parentRevisionId` provides the revision chain, while `snapshot` remains immutable after creation.

The `revisionType` and `createdBy` values must distinguish at least user-authored, user-edited, AI-suggested, AI-accepted, and final-story-approved changes. The exact enum names remain `TBD` until the character domain contract is implemented.

Images, tokens, and other generated artifacts must store the `sourceRevisionId` of the approved revision that supplied their input. They must not use an arbitrary draft revision or a rejected suggestion as their source of truth.

Do not store raw secrets. Retention, deletion/export behavior, hard deletion versus archive, and encrypted-field strategy are `TBD` and must be resolved before production data is collected.

Guest generation is not persisted in these collections by default. A guest may receive session-scoped or ephemeral results, but a character, story, or revision becomes an owned MongoDB record only after authentication and an explicit save action. Persistence of generated image/token binaries is `TBD`; guest download must not depend on it.

## Character token records

A token record should include owner identity, character identity, source approved-character revision, generation status, provider metadata, asset reference, token format/variant metadata, acceptance state, provenance/classification, timestamps, and schema version. A token must never be generated from an unapproved draft without an explicit future decision.

The minimum relationship fields are:

```text
CharacterToken
- _id
- characterId
- ownerId
- sourceRevisionId
- status
- assetReference
- createdAt
- updatedAt
- schemaVersion
```

Image requests follow the same ownership and source-revision pattern. AI suggestions must also record the `characterId`, `ownerId`, and the revision or approved context used to produce the suggestion. Audit events should reference the affected `characterId` and, when applicable, the related revision or artifact.

The application must preserve the distinction between the current draft, approved character data, and immutable revision snapshots. Updating a draft must not rewrite an existing revision or silently change an existing artifact's `sourceRevisionId`.

The asset storage provider, whether binary data is stored directly or by reference, retention, download authorization, and supported board/VTT metadata are `TBD`.
