---
name: frontend-safety-review
description: Use during review to check that the generated app remains frontend-only and does not introduce unsafe runtime behavior.
---

# Frontend Safety Review Skill

Reject or repair changes that introduce:

- backend/server/API folders
- database clients
- auth providers
- `.env` files
- secrets or tokens
- `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, `EventSource`
- `dangerouslySetInnerHTML`
- `eval` or `new Function`
- dynamic script loading
- Docker files
- package scripts beyond normal Vite build/dev/preview commands
- external network dependencies

If the user asks for data integration, simulate it with mock data and make the UI copy say it is mock/demo data.
