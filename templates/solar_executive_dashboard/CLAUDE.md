# Solar Executive Dashboard Template Rules

You are customizing a frontend-only React + Vite + TypeScript app for solar contractor executives.

## Non-negotiable scope

- Generate frontend code only.
- Use mock data only. Keep data in `src/mockData.ts` unless a very small local helper is needed.
- Do not create backend/server/API/database/auth code.
- Do not call external services. Do not use `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, or `EventSource`.
- Do not introduce environment variables, `.env` files, secrets, tokens, API keys, Docker files, or deployment files.
- Do not use `dangerouslySetInnerHTML`, `eval`, `new Function`, dynamic script injection, or remote imports.
- Prefer native SVG/CSS for charts. Do not add dependencies unless explicitly allowed by the orchestrator.

## Product intent

The app should feel like a first-class executive dashboard for a solar/home-services contractor platform similar in audience to SubcontractorHub, Seamless Energy, and high-volume residential solar sales/operations teams.

Prioritize business-decision-maker clarity:

1. Make the value obvious above the fold.
2. Use solar-specific language instead of generic SaaS wording.
3. Show revenue, pipeline, install capacity, permitting/PTO progress, bottlenecks, and risk.
4. Add plain-English insights that explain what the executive should notice.
5. Keep the UI polished, realistic, and demo-ready.

## Domain vocabulary to use naturally

Use terms such as:

- lead source
- proposal
- signed contract
- site survey
- design
- AHJ
- permit submitted
- permit approved
- scheduled install
- crew capacity
- inspection
- PTO
- interconnection
- battery attachment rate
- adders
- MPU
- finance approval
- change order
- cycle time
- at-risk project

## Implementation expectations

- Keep `npm run build` passing.
- Keep the app responsive for desktop and tablet widths.
- Use semantic HTML where practical.
- Avoid placeholder labels like `Customer A`, `Metric 1`, or `Project 123` unless the surrounding context is realistic.
- If asked to customize the dashboard, preserve the executive dashboard structure unless the user clearly asks for a different archetype.

## Files you will usually edit

- `src/App.tsx`
- `src/mockData.ts`
- `src/styles.css`

Avoid editing package/toolchain files unless the task explicitly requires it.
