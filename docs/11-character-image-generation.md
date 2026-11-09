# 11 — Character image generation

Image requests must use approved character information as their source of truth: appearance, ancestry/race terminology as permitted, equipment, clothing, weapons, physical traits, and other approved characteristics. Draft or rejected suggestions must not silently influence the final prompt.

The backend should construct a bounded, traceable prompt from approved fields, record the source revision, call the approved OpenAI image capability, validate the result, and present it as generated output. Provider model, image size/quality, storage, moderation, variant count, cost limits, and retention are `TBD`.

The UI must communicate generation status, failure/retry, and whether an image is accepted. Image metadata must not claim official D&D art or imply canon status. Respect user rights, safety policy, and any third-party likeness restrictions.

