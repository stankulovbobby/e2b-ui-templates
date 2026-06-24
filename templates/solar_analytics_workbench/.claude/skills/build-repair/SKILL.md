---
name: build-repair
description: Use after TypeScript or Vite build failures to make minimal targeted fixes.
---

# Build Repair Skill

When fixing build errors:
1. Read the exact error.
2. Identify the smallest file and line range responsible.
3. Make the smallest safe change.
4. Preserve the template intent and visual structure.
5. Do not add dependencies as a shortcut.
6. Keep frontend-only constraints intact.

Common issues:
- missing imports
- incompatible union types
- invalid JSX attribute names
- unused variables under strict TypeScript
- incorrect object field names
