# 12 — Security

Use server-side secrets only; keep keys in deployment secret configuration and out of source, client bundles, logs, fixtures, screenshots, and error messages. Apply least privilege, ownership checks, input validation, output encoding, rate limits, request size limits, dependency review, and secure headers appropriate to the selected deployment configuration.

Protect draft and approved character data in transit and at rest using platform capabilities. Define retention, deletion, export, account recovery, abuse reporting, audit access, and incident response before production; these are `TBD`.

Threat-model prompt injection, malicious character text, cross-tenant access, provider abuse, cost exhaustion, image misuse, and D&D content leakage. Security tests must cover authorization boundaries and secret handling.

