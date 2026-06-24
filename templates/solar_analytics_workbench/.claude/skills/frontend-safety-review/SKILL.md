---
name: frontend-safety-review
description: Use before finalizing generated frontend code to check scope, safety, and template constraints.
---

# Frontend Safety Review Skill

Before final output, verify:
- no backend/server/API code
- no database code
- no secrets or environment variables
- no network-dependent behavior
- no dangerous HTML/script behavior
- no unapproved dependencies
- all data is local mock data
- package/toolchain files were not changed unnecessarily

If any violation exists, fix it before finalizing.
