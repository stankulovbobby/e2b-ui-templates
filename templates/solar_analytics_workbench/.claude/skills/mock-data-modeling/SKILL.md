---
name: mock-data-modeling
description: Use when creating realistic local mock data for frontend-only solar contractor apps.
---

# Mock Data Modeling Skill

Mock data should be realistic enough to support a sales or operations demo.

Use concrete values:
- homeowner names
- regions
- utilities
- AHJs
- stage names
- age in stage
- contract values or cycle-time days
- next actions

Keep data local in `src/mockData.ts` and export typed arrays.
Make sure mock values support the insight cards and charts.
