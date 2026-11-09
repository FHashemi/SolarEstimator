# Solar Estimator — SvelteKit PWA (alpha)

A Persian RTL six-stage solar PV preliminary sizing and financial assessment application, implemented with **Svelte 5 + SvelteKit + TypeScript + SCSS**. No React, Tailwind, Bootstrap or UI framework.

## Run locally

Requirements: a supported Node.js LTS runtime and npm. (Node 22 LTS recommended; use current SvelteKit compatibility.)

```powershell
npm.cmd install
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`). When running in Windows PowerShell, run the commands from the folder containing `package.json`.

## Architecture

- `src/lib/model.ts`: typed persistent project schema.
- `src/lib/data/equipment.ts`: module and inverter baseline datasheet entries.
- `src/lib/engine/calculate.ts`: pure geometry, electrical, generation and economics functions.
- `src/lib/components`: reusable shell components and stage views.
- `src/styles/app.scss`: shared design system and responsive rules.
- `mockups/`: six visual design references, **not** real energy or financial measurements.
- `docs/FORMULAS_EN.md`: mathematical methods, units, assumptions, limits.
- `docs/IMPLEMENTATION_REPORT_EN.md`: factual report for independent QA.
- `docs/ACCEPTANCE_MATRIX_EN.md`: required-vs-delivered inventory.
- `CODEX_MASTER_PROMPT_EN.md`: full Codex execution specification.

## Important limitations

This is an **alpha**: the user interface is built and the engine is testable, but live maps, PVGIS, commercial pricing APIs, 3D views, verified site shading, PDF export beyond browser printing, native XLSX export, local-to-cloud sync, offline caching of third-party weather/map data, battery dispatch, and automated end-to-end browser visual tests are **not implemented**. The initial schematic map is not georeferenced. Trina and Growatt datasheet values are references; hybrid/off-grid compatible inverter catalogs are not yet verified.

The current local environment lacks outbound npm/GitHub network access, so `npm install`, `npm run check`, `npm test`, `npm run build`, and visual browser QA were **not executed successfully here**; do not mark these passing until run in Codex/Windows.

## Persistence

Project data and custom equipment are stored in the browser's localStorage and can be exported/imported in JSON. A backend or true multi-project database is not implemented.

## Publishing to GitHub

Destination repository: `https://github.com/FHashemi/SolarEstimator.git`. **Do not force push**. Clone/inspect the existing repository, create a feature branch and propose a pull request. This package was prepared locally and does not represent a successful remote push.

