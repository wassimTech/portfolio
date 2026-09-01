# 02: GitHub Actions Parallel CI Workflow Architecture

**What to build:**
Create the primary GitHub Actions CI workflow (`.github/workflows/ci.yml`) featuring parallelized quality gates (Dependency Security Audit, Strict TypeScript Typecheck, ESLint + JSX a11y, Prettier formatting check, Vitest unit & component test suite with coverage collection, and Next.js production build) equipped with npm and Next.js build caching, path filters, and smart concurrency controls.

**Blocked by:** 01: Edge Runtime Compatibility & Local CI Script Suite

**Status:** completed

- [x] Create `.github/workflows/ci.yml` triggered on push to `main`, pull_request to `main`, and `workflow_dispatch`.
- [x] Configure concurrency grouping with `cancel-in-progress: true` to prevent resource waste.
- [x] Implement `security-audit` job running `npm audit --audit-level=high`.
- [x] Implement `code-quality` job running `npm run format:check`, `npm run lint`, and `npm run typecheck` in parallel or fast-fail sequence.
- [x] Implement `test-suite` job running `npm run test:coverage` and generating/saving test artifacts and LCOV coverage files.
- [x] Implement `build` job restoring `.next/cache` and running `npm run build` to verify production bundling.
- [x] Verify GitHub workflow syntax and validate action versions.
