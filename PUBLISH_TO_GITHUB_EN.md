# Publishing this SvelteKit implementation to your GitHub repository

Destination: `https://github.com/FHashemi/SolarEstimator.git`.

**What is known:** This package contains a complete local Git commit on `feat/sveltekit-solar-estimator-ui`, with `origin` configured to the destination URL. **What has not happened:** no direct push, PR or merge was performed; repository contents and permissions were not accessible from the execution environment. Never assume the remote is empty or force overwrite it.

## Preferred: use Codex with GitHub connected

1. Open your repository in Codex (connected to your GitHub account). Confirm the actual default branch and current files.
2. Upload or copy the source package contents **except its own `.git` folder** into a new feature branch of your repository. Use a distinct folder or reconcile changes if there is an existing application.
3. Give Codex the prompt below.
4. Review its actual changes, test output and pull request. Only merge once you are satisfied that no existing files were unintentionally deleted.

```text
Repository: https://github.com/FHashemi/SolarEstimator.git
Read CODEX_MASTER_PROMPT_EN.md and every mockups/01..06 image.
Use the provided SvelteKit/SCSS alpha as a baseline, not as proof of completion.
First inspect the existing repository and preserve its history. Create a feature branch.
Install dependencies, run npm run check, npm test and npm run build, fix errors,
launch the app and capture real desktop/mobile screenshots of all six stages.
Implement missing features according to the English specification and record
verified vs unverified functionality in docs/IMPLEMENTATION_REPORT_EN.md and
docs/ACCEPTANCE_MATRIX_EN.md. Commit changes and open a PR. Never force push,
never merge automatically, and provide the actual branch, commit SHA and PR URL.
```

## Alternative: publishing source from local Windows Git

If GitHub access is already authorized in Git on your machine, clone **the existing remote** rather than blindly pushing an unrelated history:

```powershell
# Run in the directory in which you want to work.
git clone https://github.com/FHashemi/SolarEstimator.git
cd SolarEstimator
git switch -c feat/sveltekit-solar-estimator-ui
# Copy the files from the extracted project package to this checkout,
# excluding .git. Review conflicts and preserve existing repository files.
git status
git add -A
git commit -m "feat: SvelteKit + SCSS six-stage Solar Estimator alpha"
git push -u origin feat/sveltekit-solar-estimator-ui
```

Then open a Pull Request in the GitHub web interface. This is an instruction, not a claim that commands were executed remotely.

