# CODEX MASTER IMPLEMENTATION SPECIFICATION — SOLAR ESTIMATOR

**Language of this specification:** English. **Product UI language:** Persian (fa-IR), RTL.
**Repository:** `https://github.com/FHashemi/SolarEstimator.git`
**Required application framework:** Svelte 5, SvelteKit, TypeScript, SCSS.
**Prohibited production frameworks:** React, Tailwind CSS, Bootstrap, Material UI and heavyweight visual builders.
**Reference UI:** the six numbered screenshots in `mockups/`.
**Existing implementation:** the SvelteKit alpha source in this package; legacy React code under `reference/` is a logic-only historical reference.
**Expected final result:** real working web/PWA application, automated tests, visual screenshots, a GitHub pull request, and an independently auditable implementation report.

> **Critical direction:** You are a senior Svelte engineer, solar PV engineer, product designer, test engineer and technical writer. Do not merely summarize requirements or generate images. Inspect the repository, implement working code, execute validation, fix verified defects, and accurately record unfinished work. Never invent electrical performance, electricity prices, regulatory permissions, completed tests, simulated screenshots or deployed URLs.

## 0. Start-up instructions and safe Git workflow

1. Inspect the connected GitHub repository and its default branch before modifying anything. Determine the actual repository contents, framework, current branch, README, and status. If empty, initialize using this package. If it contains existing source, preserve and reconcile all pre-existing work. Do not force-push, erase history or overwrite unknown user changes.
2. Read all six mockups, `README.md`, `AGENTS.md`, `docs/FORMULAS_EN.md`, and relevant `reference/*` documentation.
3. Create a feature branch such as `feat/sveltekit-solar-estimator-ui`, or another suitable branch that does not collide with existing work. Make coherent small commits with descriptive commit messages, then open a PR against the repository default branch. Never merge an unreviewed or failing PR automatically.
4. If GitHub permissions prevent commits/PRs, preserve a local Git repository, provide an actionable patch/bundle and exact commands. Record the blocker explicitly; never pretend a push was made.
5. Draft a short implementation plan and technical gaps report; then implement systematically without requiring repeated clarifications. When uncertain, favor a safe, transparent calculation, warning or disabled feature over a made-up result.
6. Review the current alpha code for correctness and security before extending it. Do not assume existing features are finished just because their components exist.
7. Finish by updating `docs/IMPLEMENTATION_REPORT_EN.md` and `docs/ACCEPTANCE_MATRIX_EN.md` with **real evidence** and precise status, then include these in the PR.

## 1. Source-of-truth hierarchy and artifacts

- **First priority:** engineering safety, accurate data, privacy, financial correctness, published equipment characteristics, user-confirmed constraints and legal compatibility.
- **Second:** functional requirements in this specification and verified state transitions across the six steps.
- **Third:** overall composition, density, color and layout demonstrated by `mockups/01_system_type.png` through `06_reporting.png`.
- **Fourth:** design refinements required by responsiveness and accessibility.
- **Last:** optional AI/3D features, only after a trustworthy estimation foundation is working.

The mockup images are **visual references, not source data**. Their displayed numbers, model names, colored ratings, charts, and apparent satellite imagery are illustrative. Do not hardcode them as real results, render a mockup as an interactive page background, or claim map imagery where only a schematic exists.

| Reference | Step | Required visual/interaction elements |
|---|---|---|
| `mockups/01_system_type.png` | 1 — Plant Type | Three isometric system cards with a realistic flat-roof/grid/pylon example, hybrid battery/inverter, and isolated villa; compact header/stepper; prominent selection |
| `mockups/02_site_and_geometry.png` | 2 — Installation Site | Map/editor, roof polygon, slope and azimuth, editable surface geometry, site metrics, local coordinates, optional load/storage, schematic |
| `mockups/03_equipment_and_array.png` | 3 — Equipment | Side-by-side panel/inverter pickers, brand+model, per-unit and per-watt panel pricing, array/string design, MPPT validation, editable other-equipment BOQ |
| `mockups/04_energy_production.png` | 4 — Production | DC/AC KPIs, monthly production chart left-to-right Farvardin to Esfand, loss inputs, climate assumptions, calculations table |
| `mockups/05_economics.png` | 5 — Economics | CAPEX, OPEX, tariffs/green power, 20-year cash flow, NPV/IRR/LCOE/payback, annual growth and degradation, sensitivity controls |
| `mockups/06_reporting.png` | 6 — Report | Executive and expert reports, design parameters, BOQ, production/economics charts, print/PDF, export, documented limitations |

Do not copy the source code or branded layout of PVsyst or Solset. Adopt relevant design principles while building an original Persian interface.

## 2. Non-negotiable stack, project structure and maintainability

- Svelte 5 + SvelteKit, strict TypeScript and SCSS. Use semantic Svelte components, conventional Svelte stores or Svelte 5 runes consistently, and route-based architecture where it improves maintainability.
- No Tailwind, Bootstrap, React, inline HTML string rendering, or giant all-in-one Svelte component. Existing code should be refactored into shared design-system components and independent features.
- Use existing `src/lib/model.ts`, `src/lib/engine/calculate.ts`, and `src/lib/data/equipment.ts` as a starting point. Refactor or correct them as tests expose issues.
- Use SCSS tokens/mixins for spacing (4/8/12/16/20...), card radii, type scales, borders, shadows, buttons, input height, semantic statuses and responsive breakpoints. Changes to shared dimensions must affect all six steps.
- Separate pure deterministic computation from UI and API adapters. No financial equations embedded in markup; no page-specific copies of electrical formulas.
- Keep a typed project schema with versioned migrations and robust import validation. Support auto-save with recovery and explicitly prevent one project accidentally overwriting another.
- Do not ship or redistribute proprietary font files. Prefer IranSans/FaNum where the user has a valid license; use an open fallback such as Vazirmatn.
- Keep all engineering data source metadata (manufacturer/model/datasheet date/revision/quality flag). Never label invented placeholder specs as official.
- Favor accessible, mobile-friendly native controls. Use chart libraries only if needed; avoid disproportionate dependencies.

Recommended topology:

```text
src/
  lib/
    components/{layout,inputs,charts,feedback}/
    features/{plant,site,equipment,production,economics,report}/
    engine/{geometry,pv-electrical,solar-yield,storage,finance}/
    data/{equipment,datasheet-refs,tariff-sources}/
    services/{weather,map,pricing,storage,export}/
    model.ts
  routes/
  styles/{_tokens,_mixins,app}.scss
static/{icons,illustrations}/
mockups/01...06.png
reference/
tests/{unit,integration,e2e}/
docs/{FORMULAS_EN,IMPLEMENTATION_REPORT_EN,ACCEPTANCE_MATRIX_EN,...}.md
```

## 3. Shared shell and visual acceptance

1. Dark navy top bar, small solar symbol, 'Solar Estimator', compact project name and save state; keep height controlled.
2. Six-step horizontal wizard below the header, using completed/current/pending states. On mobile it may scroll horizontally but the page itself must **never** develop horizontal overflow.
3. Place small Previous and Next buttons immediately below the stepper; correct RTL arrow directions and make icon and text consistent.
4. Main content should appear quickly above the fold. At a 1365×720 or 1365×630 desktop viewport, the first step's three system options should be visible substantially or completely without needless scrolling. Do not waste vertical space on duplicate banners.
5. Match overall style of mockups: white panels, navy typographic hierarchy, yellow interactive highlights, light blue-gray background, subtle shadows, compact fields, neat tables.
6. All steps share `SectionHeading`, `Card`, `FormField`, `NumericInput`, `SliderNumericInput`, `Button`, `SegmentedControl`, `StatusBadge`, `Metric`, `WarningList`, `Table`, `ChartShell` etc.
7. Use real HTML controls, keyboard focus states, accessible labels, and descriptive error messages. Dynamic charts need accessible summaries.
8. Produce screenshots of *the actual running app* at 1440×900, 1365×720 and 390×844 for each step. Screenshots of stand-alone static HTML approximations do not count.
9. Compare screenshots side by side with the numbered mockups and record missing/changed elements in the implementation report.

## 4. Step 1 — Plant type

- Three selectable cards: Grid-connected, Hybrid, and Off-grid. Persist the selected type; drive inverter filtering, battery inputs, energy accounting and economics from it.
- Grid example: a flat-roof industrial/commercial building with realistic modules and visible transmission pylon. No storage assumed. Include subtitles about licensed injection and FIT; do not promise an automatic legal right to inject.
- Hybrid: clearly show PV + battery + inverter + grid. Explain backup for selected loads, not guaranteed universal autonomy.
- Off-grid: isometric pitched-roof villa, panel array and battery/inverter with no grid symbol.
- Preserve the supplied Persian marketing copy in the UI as much as accuracy permits; use qualification for claims that depend on correct sizing and permitting.
- No full-page scroll requirement just to select a system on a typical desktop.

## 5. Step 2 — Site and geometry

Functional requirements:

- Site surfaces: roof (flat), industrial shed with one or multiple pitched sides, ground, or combination; add/edit/delete multiple surfaces.
- Geometry: length and width as decimals with numeric stepper, editable azimuth, slope slider with adjacent small number input. Flat roofs must disable/hide *surface* slope (array tilt can later differ).
- Display gross and usable areas in a clear summary at the bottom of the site-details panel; handle per-surface usable percentage and obstacles.
- Accept manual lat/lon, altitude above sea level, UTM Zone and datum. UTM polygon vertices can derive area only when CRS is consistent; a single coordinate cannot imply roof geometry.
- Map canvas must distinguish **actual georeferenced basemap** from **schematic preview**. Do not claim imagery or automatically derived boundaries if not connected.
- Add roof polygon editing (vertices / drag / delete), obstruction polygons (HVAC, parapets, skylights) and access pathways when map editor is implemented. Persist polygon coordinates in stable reference frame; support KML/GeoJSON import after validation. Display correct meters and area units, not pixel area.
- For hybrid and off-grid, expose load profile, daily consumption, peak load and backup duration; disable storage-specific inputs for ordinary on-grid, preserving values when switching types.
- On mobile, map and controls must be useful with touch; no giant inaccessible tables.
- Geometry engine needs unit tests for polygon area, multi-surface aggregation, point conversion and invalid polygons.

Mapping integration: choose an appropriately licensed map SDK or OpenStreetMap tiles within provider usage terms; respect attribution, API keys and Iranian coverage. Use an adapter with a clearly marked schematic fallback. Do not suggest rooftop shape or altitude can always be inferred from a point.

## 6. Step 3 — Panels, inverters, strings, and BOQ

- Use a two-column panel/inverter selector with brand and model combo boxes, compact manufacturer specifications, price entry, count. Show the number of inverters prominently.
- Panel fields: exact model, `Pmax`, `Voc`, `Vmp`, `Isc`, `Imp`, module length/width/area, efficiency, temperature coefficients with unit, weight, bifaciality (when verified), source and warranty (where verified).
- Inverter: exact model, type (grid/hybrid/offgrid), single/three-phase, AC rating, max PV input power, MPPT count, per-MPPT usable inputs, max DC voltage, startup voltage, MPPT voltage band, continuous and short-circuit input current per MPPT, efficiency, battery compatibility and injection capability (only when documented).
- Include real user-supplied Trina Vertex 645–665 W, Vertex N 695–720 W and Growatt MID 25–40KTL3-X records with manufacturer revision metadata; do not invent specifications for other models. A missing model can be entered as unverified until datasheet review.
- Panel pricing fields must be **bidirectionally linked**: `panel_price_per_watt = panel_price_per_module / Pmax_Wp`; editing either updates the other. Store one canonical price to avoid double-counting.
- Inverter pricing includes per-unit and total based on count; do not infer a current market price.
- Custom brand/model wizard for both panel and inverter, with required-field validation and source-quality flag. Prefer IndexedDB for structured catalogs and support JSON export/import.
- Array design Auto/Manual, panel orientation Portrait/Landscape, total installed panels, panels per string, string count, inverter count, DC/AC ratio, and allocation across MPPTs. Auto must explicitly distinguish rough area density from truly placed geometry. Allow multiple subarrays with separate azimuth/slope.
- Validate cold-weather `Voc`, STC/hot `Vmp` (only with validated coefficient), continuous input current per MPPT, short-circuit current per MPPT, number of DC inputs, string assignment, inverter type, phase/connection constraints and maximum recommended PV input power per datasheet. Use module max series fuse and per-string protection data appropriately.
- Example important guard: Trina NEG21C.20 710 W Imp=17.36 A, therefore **two parallel strings draw 34.72 A**, exceeding the nominal 26 A max input current per MPPT of the referenced Growatt MID family; two sockets do not imply unlimited current.
- Never mark a design as 'verified' if electrical temperature parameters or module/inverter datasheets are missing. Distinguish informational warnings, blocking errors, and unverified values.
- 'Other Equipment' BOQ table: plus button adds a row; choose category (mounting, DC cable, AC cable, DC/AC switchgear, SPD, grounding, meter, battery, labor, custom), description, unit, quantity (decimal), unit price, total, delete. Multiple rows per category; editable not pre-filled with fake quantities.
- Pricing/quantity changes propagate to CAPEX and report instantly.

## 7. Step 4 — Production simulation

- Outputs: panel count, DC/AC capacity, inverter count, estimated monthly and annual energy, specific yield, capacity factor, losses and assumptions with precision/unit labels.
- Months should be displayed **left to right: Farvardin ... Esfand** despite overall RTL page. Chart x-axis origin starts at bottom-left and values increase upwards; no reversed month order.
- Minimum offline fallback: user-supplied monthly PSH values + loss model; clear 'not verified / illustrative' label for defaults.
- Preferred advanced path: verified weather source (PVGIS where coverage permits, or another licensed provider) with source name, timestamp, time zone, horizon assumptions and request error handling. Avoid presenting provider coverage in Iran as guaranteed.
- Reflect tilt, azimuth, temperature, clipping, cable, soiling, mismatch and inverter conversion as distinct physical loss mechanisms where sufficient data exists. Avoid double-counting losses and inverter efficiency.
- Include a monthly production table and normalized seasonal chart; check sum of monthly energy equals annual total.
- Hybrid/off-grid: grid import/export, hourly load matching, autonomy and storage dispatch require a real time-series model. Do not claim energy balance based solely on yearly PSH.
- Never produce positive yield when the array has blocking electrical compatibility errors; show actionable cause.

## 8. Step 5 — Financial model (20 years)

Use explicit user input or verified source for FIT tariff, green energy board price, avoided self-consumption value, operating costs, one-time costs, year-0 CAPEX, annual growth, degradation, discount rate, equipment replacement, financing/tax assumptions when available.

Include:

- CAPEX = direct purchase + BOQ + installation and additional costs. Unit currency is IRR with optional UI conversion to toman (1 toman = 10 rial), never mixing units silently.
- On-grid electricity sales: feed-in power only when authorized/available. Off-grid: evaluate displaced electricity service/cost, not fictional grid exports. Hybrid: explicitly separate exported, self-consumed and stored energy.
- Annual energy degradation and tariff growth; 20-year per-year revenue, OPEX, replacement cost, net and cumulative discounted/undiscounted cash flows.
- `NPV`, `IRR` (possibly unavailable for unusual cash flow), ROI with clear definition, simple payback and discounted payback, `LCOE` with stated discounting and assumptions.
- Hourly/weekly/monthly/annual incomes: label them **averages**, or perform a true timeseries if claims are hourly-specific.
- Charts: annual revenue/cash flow, cumulative cash flow break-even, scenario comparisons and one-variable sensitivity with labels/units.
- Validation: prevent calculating final investment results when substantial prices, tariffs, installation costs or energy assumptions are missing; show separate estimates and confidence state.
- Taxes, inflation, curtailment, financing and FIT eligibility are not automatic; explicitly scope them or mark excluded.
- Ensure formulas in `docs/FORMULAS_EN.md` match the actual code. Add regression tests for NPV, IRR, degradation, tariff growth and scenario edge cases.

## 9. Step 6 — Reports and next action

- Executive summary: plain Persian explanations, system type, equipment quantity, DC/AC, production, preliminary CAPEX, expected revenue and payback with risk disclaimer.
- Technical report: full electrical array assumptions, MPPT checks, climate and orientation settings, performance assumptions, selected manufacturer datasheet references, BOM/BOQ and model warnings.
- Print-friendly PDF using browser print is acceptable as an interim output **only if labeled 'print-to-PDF'**. True downloaded PDF requires tested client/server generator and correct font/RTL layout.
- CSV export must not be mislabeled as native Excel (`.xlsx`); implement true XLSX if requested and tested, otherwise offer clearly labeled CSV.
- JSON project import/export, report download, design scenario identification and optional sharing links. Disable direct 'Send to IranEsco' until a real authorized endpoint is configured.
- Export reproducible input assumptions and engine revision to the report; labels must distinguish sample, measured and verified data.

## 10. Persistent data and component contracts

- Versioned `Project` type with system, site surfaces/polygons, location, equipment model IDs, panel/inverter counts, string group, load profile, climate, financial input, notes and sources.
- Use shared controlled numeric inputs with decimal support, arrows/spinners where appropriate, min/max and unit symbols; do not translate raw numerical data into Persian strings internally.
- `Fa-Num` CSS class for Persian numeral display and properly licensed IranSans FaNum. Use Persian digit formatting in labels/statistics, not in computation; allow Persian, Arabic and Latin digits during input and validate.
- Autosave should persist safely; imports must validate schema, prevent prototype pollution and handle legacy version migrations. For larger structured data, use IndexedDB; store only selected metadata in localStorage.
- No secrets in repo; map and weather credentials use environment variables and a suitable server-side adapter.
- Components and engine must avoid SSR-only crashes (`window`, `document`, `localStorage` unavailable on server) and must be accessible with keyboard navigation.

## 11. PWA, mobile, offline, deployment

- Responsive layout for desktop/tablet/mobile. No horizontal overflow at 390px except purpose-built scrollable tables and stepper; touch targets appropriate for mobile.
- Installable manifest with valid icon files, service worker and reasonable offline shell caching. Any live prices/weather/maps must clearly indicate unavailable/offline or stale data.
- SvelteKit deployment adapter must match hosting choice; document server/SPA tradeoffs. Do not claim hosting is configured if no environment has been provided.
- Prepare future Tauri packaging through modular engine, but do not add desktop packaging as a blocking prerequisite for web PWA.

## 12. AI assistant integration (future milestone)

- Prepare an optional, isolated interface for bill extraction, roof boundary suggestions, equipment suggestions and technical QA.
- AI must never be the numerical authority: all engineering checks use deterministic, tested methods.
- No automatic publishing or submission to IranEsco without consent, security review and a real connected API.
- Label any AI function that is not implemented. Do not generate a fake chat experience that implies processing completed.

## 13. Testing requirements (mandatory evidence)

Run on the actual project after dependencies install:

```bash
npm install
npm run check
npm test
npm run build
npm run dev
```

Unit tests must cover: decimal input including Persian numerals; UTM polygon area; surface types and azimuth; panel/inverter selection; auto/manual module count; current checks for Trina 710/Growatt MID 25; cold Voc maximum; invalid hot-temperature voltage without coefficient; inverter counts; energy sums; battery caveats; CAPEX; panel price per W vs unit price; IRR/NPV/payback/annual degradation; import/export migration and bad JSON.

Integration/E2E checks must cover: switching each system type; editing all six steps; adding/removing equipment rows; app persistence across reload; PDF print flow; CSV/Excel clear naming; mobile menu/stepper; no horizontal overflow; error and loading states. Use Playwright (or comparable tool) to capture **real** screenshots at `1440x900`, `1365x720`, `390x844` per step and any relevant modal, keeping files in `docs/screenshots/`. Compare image content with design references and include a discrepancy table. Never use AI-generated mockups as screenshots of your implementation.

If npm, browser or remote APIs fail to run, record an explicit **BLOCKED/NOT RUN** result, command and reason. Never label it PASS.

## 14. Acceptance checklist

The final implementation is accepted only when:

1. SvelteKit actually builds and renders six working routes/stages.
2. Shared components/style tokens yield consistent compact spacing across all stages.
3. All input forms update real persisted state and dependent calculations.
4. Stage 1 shows three realistic system cards in the first desktop viewport.
5. Stage 2 handles multiple surfaces, decimals, slopes/azimuth, coordinates and location warnings.
6. Stage 3 handles panel + inverter bank, two price forms, counts, stringing, electric guardrails, BOQ plus rows.
7. Stage 4 computes monthly and annual energy consistently and labels data provenance.
8. Stage 5 runs a 20-year input-driven financial model, withholding unsupported values.
9. Stage 6 exports a coherent report with complete assumptions and warnings.
10. `Fa-Num`, RTL, small-device accessibility and keyboard focus are satisfactory.
11. Every meaningful test was **actually run** with logs and results.
12. Documentation includes clear nonfunctional limitations, regulatory restrictions and data-source attribution.
13. PR contains change list, screenshots and review checklist and does not silently merge.

## 15. Required independent implementation report

Create/update **`docs/IMPLEMENTATION_REPORT_EN.md`**. This is mandatory and must be sufficiently explicit that a second reviewer (ChatGPT or an independent engineer) can check the work without trusting your summary.

The report must contain:

- Date, commit SHA, branch, PR URL (only if actual), runtime and dependency versions.
- Repository before/after structure and list of files added/removed/modified.
- Feature list by six stages with statuses `DONE`, `PARTIAL`, `BLOCKED`, `NOT STARTED`; include exact source file path/function for each claim.
- Each major formula implemented, with inputs, units, provenance, fallback behavior and test IDs.
- Full test command table with actual stdout/stderr excerpts, exit code, test counts; explicitly distinguish `NOT RUN` from `PASS`.
- Desktop/mobile screenshot manifest with viewport and corresponding PNG paths; any unavailable screenshots called out as missing.
- UX parity assessment versus each of the six mockups, including differences and rationale.
- Security and privacy review: input validation, secrets, API policy, persistence and user-supplied model trust.
- Data provenance: exact Trina/Growatt datasheets, environmental data service, price/tariff timestamps where relevant.
- Known defects and technical debts, severity, reproduction steps, owner/next action.
- Build and deployment details (working build artifact or blocker).
- Next recommended work items in priority order.

## 16. Acceptance matrix and handoff

Also create/update **`docs/ACCEPTANCE_MATRIX_EN.md`** with one row per substantial requirement, including:

`ID | Stage | Requirement | Status | Evidence (source/test/screenshot) | Limitation / follow-up`.

No checkbox may be considered complete without observable evidence.

Provide `docs/FORMULAS_EN.md`, a coherent `CHANGELOG.md`, the install/run instructions in `README.md`, `AGENTS.md` for future Codex sessions, screenshots and complete PR details. When finished, summarize what was shipped and what remains unimplemented. Do not hide blockers.

## 17. Definition of done for this Codex task

Your answer is NOT complete merely because code files exist. **Execute, test and document.** Open a GitHub pull request if authorized. Provide the actual PR link (never an invented URL), branch and commit. Clearly separate completed production-quality code from preliminary/schematic implementations.

If you encounter a dependency blocker (no API access, lack of map tiles, unresolved tariff sources or missing Vmp temperature curve), continue other implementation work, make the blocker visible in UI/report and recommend a specific solution. Do not backfill unknown values with generated numbers.

**Independent review handoff:** the user will share `docs/IMPLEMENTATION_REPORT_EN.md`, `docs/ACCEPTANCE_MATRIX_EN.md`, source ZIP/commit and the six screenshots with ChatGPT. Write these documents expecting detailed architectural, mathematical, UX, security and QA verification.