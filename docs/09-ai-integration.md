# 09 — AI integration

OpenAI supports concept development, narrative improvements, backstory generation, personality and relationship exploration, and appropriate image workflows for both guest and authenticated users. The server owns credentials, model configuration, prompts, usage limits, safety checks, and provider errors. Authentication is required when the user asks to persist character/story data in MongoDB; generated-asset persistence is `TBD`.

## Grounding and control

Prompts must carry current approved character data, selected edition, content classification rules, and the instruction that output is a suggestion. The model must not silently edit approved data. Responses need structured, validated fields and provenance labels: `official`, `original-narrative`, or `unverified`.

Mechanical claims require a trusted approved source or must be labeled unverified and excluded from official recommendations. The exact model, structured-output method, moderation service, token budget, timeout, retry policy, and prompt storage approach are `TBD`.

## Generated image download

After an image result passes validation and safety checks, the user must be able to download it as an image file. Download is available to both guest and authenticated users and does not require saving the character or image in MongoDB. The download must represent the validated generated result, must not expose OpenAI credentials or internal provider URLs, and must preserve the result's provenance metadata where the selected file-delivery design supports it.

The delivery mechanism—API streaming, temporary signed URL, or another approved adapter—the supported MIME types, filename convention, maximum file size, temporary retention period, and download rate limits are `TBD`. Download failures must be recoverable without regenerating the image unnecessarily.

## Failure and safety

Handle provider outage, refusal, malformed output, timeout, quota exhaustion, prompt injection in user text, and unsafe image/story requests. Log request metadata without secrets or unnecessary personal content. A human review/escalation policy is `TBD`.
