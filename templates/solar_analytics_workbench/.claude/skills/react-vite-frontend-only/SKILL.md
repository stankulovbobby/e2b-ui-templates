---
name: react-vite-frontend-only
description: Use for every template customization in this repo. Enforces React/Vite/TypeScript frontend-only scope.
---

# React Vite Frontend-Only Skill

Build only client-side React + Vite + TypeScript code.

Allowed:
- React components
- TypeScript types
- CSS
- local mock data
- native SVG charts
- local UI state

Not allowed:
- backend/server/API folders
- database code
- auth implementation
- external network calls
- secrets or environment variables
- Docker or deployment files

Keep `npm run build` passing.
