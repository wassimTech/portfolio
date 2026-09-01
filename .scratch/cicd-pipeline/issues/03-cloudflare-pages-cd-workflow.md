# 03: Cloudflare Pages Continuous Deployment (CD) Pipeline

**What to build:**
Implement the continuous deployment workflow to Cloudflare Pages that automatically deploys a live preview environment on Pull Requests and deploys to the Production environment on push/merge to `main`, gated by successful completion of all CI quality checks.

**Blocked by:** 02: GitHub Actions Parallel CI Workflow Architecture

**Status:** completed

- [x] Create `.github/workflows/deploy.yml` (or integrated `deploy` job in pipeline) dependent on CI jobs (`needs: [code-quality, test-suite, build]`).
- [x] Configure deployment triggers for PR preview deployments vs `main` production deployments.
- [x] Implement Cloudflare Wrangler / Pages deployment action using `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- [x] Pass environment variables (`GEMINI_API_KEY`) safely into the deployment build step.
- [x] Ensure deployment output exports deployment status and preview URL for downstream consumption.
