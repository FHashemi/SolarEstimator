# Solar Estimator — Implementation Report (independent review)

**Report date:** 2026-11-09  
**Build ID:** `0.3.0-alpha.1` (local Git-ready SvelteKit rewrite)  
**Target remote:** `https://github.com/FHashemi/SolarEstimator.git`  
**GitHub push / pull request status:** **NOT PERFORMED**. The GitHub integration was connected by the user, but no repository read/write actions were exposed to the execution environment for this turn; local shell DNS could not resolve github.com. No remote commit SHA, PR URL, deploy URL or remote repo state is claimed.

## 1. Summary

A genuine SvelteKit application source tree was generated with 6 connected wizard stages, a shared SCSS design system, typed data models, simple client-side project persistence, datasheet-based Trina/Growatt catalog, pure engineering calculation functions and a PWA service worker baseline. The English Codex specification and six design images are included in the same package. The baseline uses React code only inside `reference/` as a historical specification/logic reference, **not in the runtime app**.

**Validation limit:** The isolated TypeScript engine successfully typechecked and passed direct Node smoke assertions. Full SvelteKit compilation, Vitest test execution and UI screenshot verification could not be executed because npm dependencies were not installed and the isolated environment cannot access npm. Treat UI as **unverified until Codex or Windows runs the checks**.

## 2. Architecture and added paths

| Component | Actual file/location | Status |
|---|---|---|
| Root SvelteKit application | `src/routes/+layout.svelte`, `src/routes/+page.svelte` | Implemented source, compile not verified |
| Shared shell | `src/lib/components/Header.svelte`, `Stepper.svelte` | Implemented source |
| All six stages | `src/lib/components/{System,Site,Equipment,Production,Economics,Report}Stage.svelte` | Implemented preliminary UI |
| Chart components | `src/lib/components/BarChart.svelte`, `LineChart.svelte` | Implemented source |
| Shared UI scales and SCSS | `src/styles/_tokens.scss`, `src/styles/app.scss` | Implemented source |
| Model schema | `src/lib/model.ts` | Engine typechecked |
| Datasheet catalog | `src/lib/data/equipment.ts` | Engine typechecked |
| Array / yield / financial engine | `src/lib/engine/calculate.ts` | Typechecked, smoke-tested |
| PWA shell cache and manifest | `src/service-worker.ts`, `static/manifest.webmanifest` | Implemented source, offline browser QA not run |
| Engine tests | `tests/engineering.test.ts` | Authored, Vitest not run |
| English task specification | `CODEX_MASTER_PROMPT_EN.md` | Complete |
| Six reference mockups | `mockups/01..06*.png` | Bundled, not execution screenshots |
| Calculation specification | `docs/FORMULAS_EN.md` | Complete preliminary formulas |

## 3. Stage functionality: implemented vs remaining

### Stage 1 — Plant type
**Source implemented:** three interactive system cards for grid, hybrid and off-grid; schematic/isometric artwork; project system state.
**Not verified:** full browser rendering and visual responsiveness; licensing/distribution case-by-case.

### Stage 2 — Installation site
**Source implemented:** multiple surfaces; flat roof/shed/ground types; decimal dimensions and usable percentage; slope slider + numeric; azimuth; manual coordinates, altitude and UTM polygon area; load inputs for hybrid/off-grid; schematic preview and site stats.
**Missing:** actual satellite basemap, coordinate transformation to/from UTM, drawn real polygons, obstacle placement, KML imports, reliable mapping of a coordinate to roof shape.

### Stage 3 — Equipment
**Source implemented:** panel/inverter selectors; Trina 645–665 W and 695–720 W; Growatt MID 25/30/33/36/40 kW; editable pricing per panel and per watt; custom models; auto/manual stringing; array safety checks; BOQ add/delete/edit/type and pricing; quantities and electrical results.
**Missing:** complete multi-subarray MPPT mapping, precise module placement on polygons, hot Vmp proof without data, direct verified weather/market price sources, complete verified hybrid/off-grid inverter catalog and battery dispatch.

### Stage 4 — Production
**Source implemented:** input-driven monthly/annual model, PSH input fields, losses/orientation, KPI and 12-month chart ordered Farvardin to Esfand from left to right.
**Missing:** hourly model, shade, detailed temperature derating, soiling timeline, bifacial gain, clipping and verified PVGIS / climate API.

### Stage 5 — Economics
**Source implemented:** configurable FIT/green/self/mix tariff inputs, CAPEX/other costs, 20-year degradation/growth/operating replacement cash flows, NPV/IRR/discounted LCOE, simple payback, summary chart and table. Values withheld if essential information is missing.
**Missing:** complete loan/tax/financing logic; hourly grid import/export, time-of-use pricing, discounted payback KPI, full scenario sensitivity chart, green board official quote service.

### Stage 6 — Reporting
**Source implemented:** public/technical summaries, selected equipment, energy chart, warnings, BOM table, native browser print-to-PDF, CSV BOQ and JSON export.
**Missing:** native XLSX and standalone PDF generation, persisted versioned share links, automated IranEsco request workflow.

## 4. Engineering validation results and assumptions

| Test or check | Command/environment | Result | Evidence |
|---|---|---|---|
| TypeScript engine strict check | `tsc --noEmit --strict --skipLibCheck --target es2022 --module esnext --moduleResolution bundler src/lib/model.ts src/lib/engine/calculate.ts src/lib/data/equipment.ts` | **PASS** | exit code 0 |
| Node engine smoke test | Transpile 3 engine files using global TypeScript into temporary CommonJS, then run assertion script | **PASS** | project gross 240m², usable 180m², 47 area-based modules, 40 in complete strings, 28.4kWp DC, 25kW AC, zero default electrical blockers |
| Production smoke | Same Node script | **PASS** | annual `41303.4264 kWh` from explicitly sample PSH values; not verified project production |
| MPPT overcurrent | Same Node script with 120 modules, series20, 1 Growatt MID25 | **PASS** | reports both continuous MPPT overcurrent and short-circuit overcurrent |
| Persian numeric parser | Same Node script | **PASS** | `۱۲٫۵` parsed as `12.5` |
| Full SvelteKit typecheck | `npm run check` | **BLOCKED / FAIL (environment)** | exit 127: `sh: 1: svelte-kit: not found` |
| Vitest | `npm test` | **BLOCKED / FAIL (environment)** | exit 127: `sh: 1: vitest: not found` |
| Full SvelteKit build | `npm run build` | **NOT RUN** | npm dependencies unavailable |
| Mobile/desktop browser screenshots | Playwright/Chromium | **NOT RUN** | no built Svelte app or browser test harness |
| PWA install/offline | Browser test | **NOT RUN** | service worker source exists; no verified install test |
| GitHub PR / remote commit | GitHub integration | **BLOCKED** | no repository write actions surfaced; local GitHub DNS unavailable |

### Verified sample output context

The default sample site is 20m × 12m, 75% usable with 0.82 packing factor, Trina 710 W and Growatt MID 25kW. The model selects 40 panels in 2 strings of 20, resulting in 28.4kWp DC and 25kW AC. PSH and all monetary values are not fetched from an external API. The annual sample output is not a real forecast for any identified site.

## 5. Datasheet provenance and critical limits

- Trina TSM-DEG21C.20: 645/650/655/660/665 W, 2384×1303 mm, source user-provided 2022 manufacturer PDF.
- Trina TSM-NEG21C.20: 695/700/705/710/715/720 W, 2384×1303 mm, source user-provided 2024 manufacturer PDF. For 710W: Vmp 40.9 V, Imp 17.36 A, Voc 49.0 V, Isc 18.40 A, gamma Voc −0.24%/°C.
- Growatt MID 25–40KTL3-X: preliminary supplied PDF, max DC 1100 V, MPPT range 200–1000 V, per-MPPT input 26 A, per-MPPT Isc 32 A, 3–4 MPPTs, dual physical string inputs per MPPT.
- `Vmp` temperature coefficient for the provided Trina sheets is not directly specified. Hot-cell Vmp validity is **not** proven.
- Inverter peak/continuous ratings, grid-coupling and applicable certifications must be checked against final manufacturer model revision and local distribution utility requirements.
- No official Iranian FIT price, green board rate, tariff source or legal export authorization was retrieved here.

## 6. UX parity and screenshot evidence

| Mockup | Implementation reference | Screenshot actual running app | Status |
|---|---|---|---|
| 01 system | `SystemStage.svelte` | Missing | PARTIAL |
| 02 site | `SiteStage.svelte` | Missing | PARTIAL — map schematic |
| 03 equipment | `EquipmentStage.svelte` | Missing | PARTIAL — no real mapped layout |
| 04 production | `ProductionStage.svelte` | Missing | PARTIAL — no verified weather |
| 05 economics | `EconomicsStage.svelte` | Missing | PARTIAL — limited scenarios |
| 06 report | `ReportStage.svelte` | Missing | PARTIAL — print/CSV, not native XLSX |

**Next verification:** run the application in Codex's actual environment and capture desktop/mobile screenshots, test all forms and verify that the SCSS is applied correctly. Do not substitute the reference mockups as implementation screenshots.

## 7. Security / privacy / quality review

- Project is saved locally in browser localStorage, not transmitted to any server by this code. Exported JSON may contain user-entered coordinates and prices; keep it private.
- Import checks a few top-level schema fields but **does not yet implement a complete schema validation and version migration pipeline**. Untrusted imported nested values may cause errors; prioritize Zod/Valibot schema validation.
- No API keys are bundled. External mapping/irradiance connectors not wired.
- Custom equipment metadata is user-entered and explicitly unverified; invalid model numeric ranges need stronger validation before production use.
- No authenticated accounts, cloud backups, role management, audit trail or hosted services are implemented.
- Financial figures are preliminary and intentionally ignore income tax, project financing and some insurance/installation costs unless users enter them.

## 8. Highest-priority unresolved items

1. **P0:** install dependencies and run SvelteKit compiler/test suite; fix any Svelte markup/type errors and capture real screenshots.
2. **P0:** clone and inspect the actual target GitHub repository, reconcile changes, push feature branch, open PR; no remote upload is claimed from this environment.
3. **P0:** implement strong schema validation/migrations and numeric input bounds.
4. **P1:** real site georeferenced geometry and licensed imagery, polygon editing, obstructions and panel placement.
5. **P1:** source-backed weather data and full temperature/string/MPPT assignment checks.
6. **P1:** validated hybrid/off-grid storage modeling and compliant inverter selection.
7. **P2:** sensitivity scenarios, native PDF/XLSX, billing OCR, 3D and IranEsco workflow integration.

## 9. Handoff to independent reviewer

Ask the reviewer to verify: component architecture and SCSS reuse; all six stages; data persistence and migration; electrical logic including 710W modules on 26A per-MPPT input; income/cost flow semantics; climate and pricing confidence flags; computed monthly/annual charts; real screenshots; actual test output; and GitHub PR path/commit. **Do not accept 'all implemented' claims without corresponding source and test evidence.**