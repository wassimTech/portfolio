# 04: Automated PR Feedback, Step Summary & Coverage Reporting

**What to build:**
Add automated GitHub Step Summaries (`$GITHUB_STEP_SUMMARY`) and Pull Request feedback comments that report the Cloudflare Preview deployment URL, test suite pass/fail counts, code coverage metrics, and quality status in a rich, readable markdown format.

**Blocked by:** 03: Cloudflare Pages Continuous Deployment (CD) Pipeline

**Status:** ready-for-agent

- [ ] Add step in test job to parse Vitest coverage output and generate visual markdown table.
- [ ] Add GitHub Action step to append summary metrics to `$GITHUB_STEP_SUMMARY`.
- [ ] Add PR comment step for pull requests with Cloudflare Preview URL and test status.
- [ ] Ensure minimal permissions (`contents: read`, `pull-requests: write`, `statuses: write`) in workflow tokens following least-privilege security principle.
