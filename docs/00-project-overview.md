# 00 — Project overview

## Purpose

Heroic Tales helps users create D&D characters through a guided wizard with contextual OpenAI assistance for narrative development and character imagery. The product supports creative exploration without taking authorship away from the user.

## Product principles

- User decisions are authoritative.
- AI output is clearly labeled and never silently applied.
- Approved character information is the source of truth for later generation.
- D&D 2014 and D&D 2024 rules/content remain separate.
- Official mechanical content is handled conservatively and never fabricated.
- The interface is a tactile fantasy character journal: readable, responsive, and inspired by old-paper tabletop sourcebooks without reproducing a specific publisher's trade dress.

## Actors

- Visitor: can view public product surfaces; exact anonymous capabilities are `TBD`.
- Authenticated user: creates, saves, resumes, edits, approves, and exports characters; export format is `TBD`.
- Platform operator: manages operational configuration and safety processes; administrative UI and roles are `TBD`.

## Constraints

The approved stack is React, NestJS on Node.js, MongoDB, OpenAI, and Vercel. API credentials remain server-side. This documentation does not authorize application implementation by itself.
