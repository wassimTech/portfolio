# 01: Edge Runtime Compatibility & Local CI Script Suite

**What to build:**
Ensure all API routes and Next.js handlers are 100% compliant with Cloudflare Pages Edge Runtime (removing any incompatible Node.js native `fs`/`path` imports from route handlers and ensuring web-standard Request/Response/fetch flows), and add a unified `npm run ci` compound verification script in `package.json` for running the complete validation suite locally.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] Inspect and refactor `app/api/download/route.ts` to use Edge-compatible static asset redirection or standard web streams without Node `fs`/`path`.
- [x] Ensure `app/api/chat/route.ts` runs cleanly in Edge runtime with proper error resilience.
- [x] Add `npm run ci` script in `package.json` combining `format:check`, `lint`, `typecheck`, `test:coverage`, and `build`.
- [x] Run `npm run ci` locally and verify all checks pass with 0 errors.
