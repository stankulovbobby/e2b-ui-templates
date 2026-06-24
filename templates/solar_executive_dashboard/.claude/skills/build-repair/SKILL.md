---
name: build-repair
description: Use after TypeScript, Vite, or scanner failures. Focuses repair work on the smallest safe code change.
---

# Build Repair Skill

When fixing build or validation errors:

1. Read the failing error carefully.
2. Identify the smallest file change that can fix it.
3. Do not rewrite the whole app unless necessary.
4. Preserve the frontend-only constraints.
5. Do not add dependencies to avoid a type error.
6. Prefer explicit TypeScript types for mock data and component props.
7. Re-check imports, exported names, JSX syntax, and object field names.

Common fixes:

- Add or correct an exported TypeScript type.
- Remove unused imports.
- Align mock data fields with component props.
- Replace invalid CSS or JSX syntax.
- Fix chart math edge cases such as division by zero.
