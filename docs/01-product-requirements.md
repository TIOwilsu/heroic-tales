# 01 — Product requirements

## Character workflow

The wizard contains these ordered stages: Initial Concept, Identity, Origin, Past, Personality, Relationships, and Final Story. Users may move backward, edit prior answers, leave optional fields empty, and generate a story without authentication. Authenticated users may save unfinished characters and resume them later. Automatic saving must preserve guest progress locally/session-scoped and authenticated progress in MongoDB without requiring a separate save action.

Each AI suggestion must expose an explicit accept, edit, and reject action. Accepting a suggestion creates a user-visible revision; editing requires the final text to remain user-controlled. Approved information must not be overwritten by later AI calls.

## Functional requirements

- Accept free-form concepts and guided inputs.
- Provide contextual assistance using the current character context and relevant prior answers.
- Show save state and recover safely from failed saves.
- Allow final story review and explicit approval.
- Use approved character information as the image-generation source.
- Generate an optional board-ready character token from approved character information, with explicit user review and download/export behavior.
- Distinguish official D&D content, original narrative content, and unverified content.
- Keep 2014 and 2024 editions separate in data, prompts, and UI.

## Guest and authenticated access

Authentication is not required to use the character-creation wizard, contextual AI assistance, story generation, image generation, character-token generation, review, or download/export. Authentication is required only when the user asks to persist a character, story, revision, or generated asset in MongoDB or to resume persisted work later.

Guest data must not be silently persisted as an owned database record. The UI must clearly communicate whether work is local/session-scoped or saved to the authenticated user's account, and must provide an explicit sign-in/save path when persistence is requested.

## Non-functional requirements

Accessibility target, supported browsers, performance budgets, retention period, localization, and export formats are `TBD`; each must be decided before the affected implementation task.

## Character token requirements

Users may request a visual character token for use on D&D boards after the relevant character information has been approved. The token must use the approved character as its source of truth and must preserve established appearance, equipment, clothing, weapons, and other approved characteristics.

Token generation is a separate artifact from the full character image. Users must be able to review, regenerate, accept, reject, and download/export the token. The token must record the approved character revision used to generate it. Token shape, dimensions, transparent-background behavior, file format, border treatment, grid-size metadata, and supported board/VTT integrations are `TBD`.

The product must not claim that a generated token is official D&D artwork or an official rules object. A token is an original user-associated visual asset and must follow image safety, rights, and content-labeling requirements.

## Out of scope for the initial documentation baseline

Combat rules engines, full virtual tabletop features, campaign management, social publishing, marketplace features, payment plans, and non-OpenAI model providers are not requirements. Board-ready character-token generation is in scope as an exportable asset; direct integration with a specific board/VTT remains `TBD`.
