# Solar Analytics Workbench Template Rules

You are customizing a frontend-only React + Vite + TypeScript analytics workbench for solar contractor operations teams.

## Non-negotiable scope

- Generate frontend code only.
- Use mock data only. Keep data in `src/mockData.ts` unless a small local helper is necessary.
- Do not create backend/server/API/database/auth code.
- Do not call external services or create network-dependent behavior.
- Do not introduce environment variables, `.env` files, secrets, tokens, API keys, Docker files, or deployment files.
- Do not use dangerous HTML injection, dynamic script loading, or remote imports.
- Prefer native SVG/CSS for charts and histograms. Do not add dependencies unless explicitly allowed by the orchestrator.

## Product intent

The app should feel like an analytical operations cockpit for solar/home-services companies similar in audience to SubcontractorHub, Seamless Energy, and high-volume residential solar contractors.

Optimize for operations leaders who need to understand:

1. Which project stages are creating cycle-time drag.
2. Which AHJs or utilities are causing permit/PTO aging.
3. Which regions, crews, or project cohorts are outliers.
4. Which active projects need escalation this week.
5. What concrete action the team should take next.

## Required analytical patterns

- At least one meaningful histogram or distribution.
- A trend view over months or weeks.
- A benchmark or comparison table.
- Plain-English insights that explain the numbers.
- Drill-down project rows with solar-specific stages and next actions.

## Domain vocabulary to use naturally

Use terms such as:

- signed contract
- site survey
- design
- AHJ
- permit submitted
- permit aging
- plan check
- scheduled install
- crew capacity
- inspection
- PTO
- utility interconnection
- cycle time
- P90
- resubmission rate
- blocker
- at-risk project

## Files you will usually edit

- `src/App.tsx`
- `src/mockData.ts`
- `src/styles.css`

Avoid editing package/toolchain files unless the task explicitly requires it.
