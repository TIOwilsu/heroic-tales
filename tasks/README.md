# Task execution guide

Each task is an independent work package. A coding agent must execute only the task explicitly requested by the user, after checking prerequisites. Never infer permission from task numbering or the roadmap.

At the beginning: inspect the repository, read `AGENTS.md`, read relevant docs, check prerequisites, review approved decisions, and identify existing implementations. During work: stay within scope, avoid undocumented dependencies, and ask about important missing decisions. After work: run required tests, verify acceptance criteria, summarize changes, list files, record pending issues, update checklists, and stop.

## Dependency setup

The frontend and backend are separate npm packages. Before executing a task that requires dependencies, run this command from the repository root:

```bash
npm run install:all
```

It installs dependencies in both `frontend/` and `backend/`. Node.js 24 LTS and npm must be available first. For package-specific work, use `npm --prefix frontend install` or `npm --prefix backend install`.
