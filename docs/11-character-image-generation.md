# 11 — Character image generation

Image requests must use character information explicitly approved by the user within the current guest session or authenticated character revision as their source of truth: appearance, ancestry/race terminology as permitted, equipment, clothing, weapons, physical traits, and other established characteristics. Draft or rejected suggestions must not silently influence the final prompt.

The backend should construct a bounded, traceable prompt from approved fields or user-approved guest-session context, record the source revision or session context, call the approved OpenAI image capability, validate the result, and present it as generated output. Provider model, image size/quality, storage, moderation, variant count, cost limits, and retention are `TBD`.

The UI must communicate generation status, failure/retry, and whether an image is accepted. Guests may generate, review, and download an image without authentication; authentication is required only to persist the image or its source character in MongoDB. Image metadata must not claim official D&D art or imply canon status. Respect user rights, safety policy, and any third-party likeness restrictions.

## Board-ready character tokens

Character-token generation is a related but distinct image workflow. It creates a compact visual asset intended for placement on a D&D board, using user-approved guest-session information or an authenticated approved character revision. Draft fields, rejected suggestions, and unapproved AI output must not silently influence the token prompt.

The backend should construct a bounded token prompt, request the approved OpenAI image capability through a server-side adapter, validate the result, persist provenance, and expose explicit review, regenerate, accept, reject, and download/export actions. A token must be labeled as an original generated asset, not official D&D artwork or an official game component.

Token shape, crop, dimensions, transparent background, file format, border treatment, grid-size metadata, variant count, storage, and direct board/VTT integrations are `TBD`. Do not select these details silently.
