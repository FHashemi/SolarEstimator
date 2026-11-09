# Acceptance matrix — Solar Estimator Svelte alpha

Status legend: **SOURCE DONE** = code exists but full app build not verified; **PARTIAL** = partial functional coverage; **BLOCKED** = cannot run/validate; **NOT STARTED** = missing implementation.

| ID | Stage | Requirement | Status | Evidence | Remaining work |
|---|---|---|---|---|---|
| SYS-01 | Shared | SvelteKit/Svelte 5 and TypeScript | SOURCE DONE | `package.json`, `src/routes` | `npm run check` and build blocked |
| SYS-02 | Shared | SCSS design tokens; no Tailwind | SOURCE DONE | `src/styles` | Real visual validation |
| SYS-03 | Shared | Compact shared header and stepper | SOURCE DONE | `Header.svelte`, `Stepper.svelte` | Mobile browser QA |
| SYS-04 | Shared | Six screens and forward/back | SOURCE DONE | `+page.svelte`, six `*Stage.svelte` | Browser QA |
| SYS-05 | Shared | fa-IR, RTL, Fa-Num | PARTIAL | `app.html`, `app.scss`, number formatter | Fully normalized numeric input across all fields |
| SYS-06 | Shared | Installable/offline PWA | PARTIAL | manifest + service worker | Install test; offline routing and maps |
| SYS-07 | Shared | Safe JSON project persistence | PARTIAL | `+page.svelte` | schema versioning, validation/migration |
| PLT-01 | 1 | Three system options | SOURCE DONE | `SystemStage.svelte` | Visual screenshot |
| SITE-01 | 2 | Multiple surfaces, decimals, slope and azimuth | SOURCE DONE | `SiteStage.svelte` | Full end-to-end QA |
| SITE-02 | 2 | Coordinates and UTM polygon area | PARTIAL | `SiteStage.svelte`, `calculate.ts` | CRS conversion and geometry validation |
| SITE-03 | 2 | Real satellite map / polygon edit / KML | NOT STARTED | schematic placeholder only | Licensed tiles and interactive map |
| EQ-01 | 3 | Brand and model panel/inverter selectors | SOURCE DONE | `EquipmentStage.svelte` | UI verification and filter edge cases |
| EQ-02 | 3 | Datasheet-based initial equipment | SOURCE DONE | `equipment.ts` | Model revision cross-check |
| EQ-03 | 3 | Bidirectional panel pricing | SOURCE DONE | `EquipmentStage.svelte` | Form synchronization E2E test |
| EQ-04 | 3 | Additional BOQ rows with types and pricing | SOURCE DONE | `EquipmentStage.svelte` | Multiple row E2E test |
| EQ-05 | 3 | Strings, MPPT, cold voltage and current guards | PARTIAL | `calculate.ts` + engine smoke | Full hot Vmp data, string allocation |
| EQ-06 | 3 | Real panel placement per roof polygon | NOT STARTED | — | Spatial placement engine |
| EQ-07 | 3 | Full verified hybrid/offgrid catalog | NOT STARTED | custom model form | Verified manufacturers and battery models |
| PROD-01 | 4 | Input-based monthly/annual generation | SOURCE DONE | `ProductionStage.svelte`, engine | Verified weather and simulation accuracy |
| PROD-02 | 4 | Farvardin → Esfand left-to-right | SOURCE DONE | `BarChart.svelte` | Screenshot verification |
| PROD-03 | 4 | Hourly weather, shading and clipping | NOT STARTED | — | Time series provider and model |
| FIN-01 | 5 | 20-year cash flows and core KPIs | SOURCE DONE | `EconomicsStage.svelte`, engine | Actual Vitest and reference cases |
| FIN-02 | 5 | FIT, green board, self-consumption inputs | PARTIAL | `EconomicsStage.svelte` | Legal applicability and dispatch model |
| FIN-03 | 5 | Scenario and sensitivity comparison | NOT STARTED | — | Configurable scenario engine |
| REP-01 | 6 | Executive and technical report | SOURCE DONE | `ReportStage.svelte` | Printed result/browser QA |
| REP-02 | 6 | CSV, print-PDF, JSON export | SOURCE DONE | `ReportStage.svelte`, `+page.svelte` | Real file validation |
| REP-03 | 6 | Native PDF and Excel XLSX | NOT STARTED | — | Export library/print layout |
| REP-04 | 6 | Submit to IranEsco | NOT STARTED | — | Authorized endpoint and approval |
| QA-01 | QA | Engine strict TypeScript check | PASS | `tsc --noEmit` exit 0 | Re-run in CI |
| QA-02 | QA | Direct engineering smoke assertions | PASS | Results in implementation report | Extend coverage |
| QA-03 | QA | Full SvelteKit check and build | BLOCKED | missing local dependencies | Install and run in Codex |
| QA-04 | QA | Vitest and browser screenshots | BLOCKED | missing `vitest`, no compiled app | Actual test harness |
| GIT-01 | Git | Push feature branch to user GitHub | BLOCKED | No GitHub actions visible in this session | Connected Codex/GitHub PR workflow |
| DOC-01 | Docs | English prompt, formulas, report, matrix | SOURCE DONE | `CODEX_MASTER_PROMPT_EN.md`, `docs` | Update with executed QA evidence |

