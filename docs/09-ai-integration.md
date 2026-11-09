# 09 — AI integration

OpenAI supports concept development, narrative improvements, backstory generation, personality and relationship exploration, and appropriate image workflows for both guest and authenticated users. The server owns credentials, model configuration, prompts, usage limits, safety checks, and provider errors. Authentication is required only when the user asks to persist the result in MongoDB.

## Grounding and control

Prompts must carry current approved character data, selected edition, content classification rules, and the instruction that output is a suggestion. The model must not silently edit approved data. Responses need structured, validated fields and provenance labels: `official`, `original-narrative`, or `unverified`.

Mechanical claims require a trusted approved source or must be labeled unverified and excluded from official recommendations. The exact model, structured-output method, moderation service, token budget, timeout, retry policy, and prompt storage approach are `TBD`.

## Failure and safety

Handle provider outage, refusal, malformed output, timeout, quota exhaustion, prompt injection in user text, and unsafe image/story requests. Log request metadata without secrets or unnecessary personal content. A human review/escalation policy is `TBD`.
