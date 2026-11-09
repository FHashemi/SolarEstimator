# Codex rules for Solar Estimator

- Read `CODEX_MASTER_PROMPT_EN.md`, `README.md`, `docs/FORMULAS_EN.md`, and all six `mockups/*.png` before editing.
- Stack: **Svelte 5 + SvelteKit + TypeScript + SCSS**. Do not introduce React, Tailwind or Bootstrap.
- Use the existing shared shell, typography, spacing and SCSS variables for all six stages. Avoid per-page duplicate controls and overrides.
- Never claim an engineering result is validated if underlying datasheet, site geometry, weather or electricity tariff evidence is absent.
- Prefer independently testable functions in `src/lib/engine` for scientific or financial logic.
- Make feature branches and PRs. Preserve any existing Git history and changes made by the user; never force push.
- Run `npm run check`, `npm test`, and `npm run build` plus real mobile/desktop browser screenshots in the actual target environment.
- Document both passed and blocked checks honestly in `docs/IMPLEMENTATION_REPORT_EN.md`.
- Update `docs/ACCEPTANCE_MATRIX_EN.md` for each milestone with path/file evidence, not empty claims.