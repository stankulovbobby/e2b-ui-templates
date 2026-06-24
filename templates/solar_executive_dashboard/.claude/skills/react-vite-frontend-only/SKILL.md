---
name: react-vite-frontend-only
description: Use for every generated React/Vite app in this template library. Enforces frontend-only code, local mock data, and deterministic Vite build behavior.
---

# React/Vite Frontend-Only Skill

Build a static frontend React application only.

Required constraints:

- Use React + TypeScript + Vite.
- Keep data local and deterministic.
- Keep mock data in `src/mockData.ts` unless the existing app structure clearly needs another local data file.
- Do not create backend code, API routes, server handlers, database clients, auth flows, queues, workers, or deployment files.
- Do not call external services. Avoid `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, and `EventSource`.
- Do not use secrets, `.env`, `process.env`, or `import.meta.env` for app data.
- Prefer native SVG/CSS for simple charts and visualizations.
- Keep `npm run build` passing.

When customizing the app, usually edit:

- `src/App.tsx`
- `src/mockData.ts`
- `src/styles.css`

Avoid package changes unless explicitly requested and allowed by the orchestrator.
