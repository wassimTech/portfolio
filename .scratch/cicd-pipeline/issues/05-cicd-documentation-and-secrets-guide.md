# 05: CI/CD Documentation, Architecture Guide & Secrets Setup

**What to build:**
Create a comprehensive `docs/CICD.md` guide and update `README.md` documenting the pipeline architecture, required GitHub Secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `GEMINI_API_KEY`), step-by-step setup instructions for Cloudflare Pages, local testing commands (`npm run ci`), and recommended branch protection rules for `main`.

**Blocked by:** 04: Automated PR Feedback, Step Summary & Coverage Reporting

**Status:** ready-for-agent

- [ ] Create `docs/CICD.md` with pipeline architecture diagrams (Mermaid), quality gate explanations, and secrets setup guide.
- [ ] Add instructions for obtaining Cloudflare API Token with `Cloudflare Pages:Edit` permissions and Account ID.
- [ ] Document local verification commands (`npm run ci`, `npm run test:coverage`, `npm run typecheck`).
- [ ] Update `README.md` with CI/CD status badge and quick start reference.
