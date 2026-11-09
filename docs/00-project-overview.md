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

- Visitor: can create a character story, use contextual AI assistance, generate images and board-ready tokens, review results, and download/export them without authentication. Guest retention is session-scoped and `TBD`.
- Authenticated user: can do everything available to a visitor and can save characters, stories, and revisions in MongoDB; resume behavior, asset persistence, and export format are `TBD`.
- Platform operator: manages operational configuration and safety processes; administrative UI and roles are `TBD`.

## Constraints

The approved stack is Next.js with SSR/Server Components for the frontend, NestJS on Node.js for the backend API, MongoDB, OpenAI, and Vercel. API credentials remain server-side. This documentation does not authorize application implementation by itself.

## Local package setup

The repository contains separate npm packages in `frontend/` and `backend/`. From the repository root, install both dependency sets with:

```bash
npm run install:all
```

This command runs `npm install` in each package and preserves separate manifests and lockfiles. It requires Node.js 24 LTS and npm. Package-level installation remains available when working on one application only:

```bash
npm --prefix frontend install
npm --prefix backend install
```
