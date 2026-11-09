# 01 — Product requirements

## Character workflow

The wizard contains these ordered stages: Initial Concept, Identity, Origin, Past, Personality, Relationships, and Final Story. Users may move backward, edit prior answers, leave optional fields empty, and resume unfinished characters. Automatic saving must preserve progress without requiring a separate save action.

Each AI suggestion must expose an explicit accept, edit, and reject action. Accepting a suggestion creates a user-visible revision; editing requires the final text to remain user-controlled. Approved information must not be overwritten by later AI calls.

## Functional requirements

- Accept free-form concepts and guided inputs.
- Provide contextual assistance using the current character context and relevant prior answers.
- Show save state and recover safely from failed saves.
- Allow final story review and explicit approval.
- Use approved character information as the image-generation source.
- Distinguish official D&D content, original narrative content, and unverified content.
- Keep 2014 and 2024 editions separate in data, prompts, and UI.

## Non-functional requirements

Accessibility target, supported browsers, performance budgets, retention period, localization, and export formats are `TBD`; each must be decided before the affected implementation task.

## Out of scope for the initial documentation baseline

Combat rules engines, virtual tabletop features, campaign management, social publishing, marketplace features, payment plans, and non-OpenAI model providers are not requirements.

