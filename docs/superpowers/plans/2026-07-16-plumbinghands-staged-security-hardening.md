# PlumbingHands Staged Security Hardening Implementation Plan

> **For agentic workers:** Execute this plan task-by-task with review checkpoints. Every behavior change requires a demonstrated failing test before implementation.

**Goal:** Harden the PlumbingHands Next.js/Vercel application, APIs, repository and operational controls without breaking the approved call-only customer flow or partner application.

**Architecture:** Introduce browser protections through Next.js headers, isolate reusable API-security policy in a focused library, reduce exposed endpoints, strengthen webhook and bot controls, and enforce security checks in GitHub Actions. Changes remain incremental, reversible and test-driven.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, Zod, Vercel, npm and GitHub Actions.

## Global Constraints

- Preserve DID +1 844-397-8298 and tel:+18443978298.
- Preserve the call-only customer journey.
- Preserve valid partner applications and truthful delivery failures.
- Never print or commit secrets, webhook destinations or personal information.
- Start CSP in report-only mode.
- Use C:\Program Files\nodejs\npm.cmd on the current Windows environment.
- Commit and push only after the relevant checks pass.

---

### Task 1: Record the security baseline

**Files:**
- Create: reports/security_session1_baseline.md
- Inspect: package.json, package-lock.json, pnpm-lock.yaml, next.config.mjs, .env.example, .gitignore, src/app/api/**, src/lib/formDelivery.ts, src/lib/formRouteHandlers.ts, tests/** and .github/**

- [ ] Fetch live homepage and API headers with cache-busting requests.
- [ ] Run npm audit --json without printing environment variables.
- [ ] Search tracked files and Git history for secret-name indicators without printing discovered secret values.
- [ ] Inventory public API endpoints, request controls, response headers and repository automation.
- [ ] Record verified findings, unknowns and owner-controlled controls in reports/security_session1_baseline.md.
- [ ] Commit the baseline report only after confirming it contains no secrets.

### Task 2: Add browser security headers

**Files:**
- Modify: next.config.mjs
- Create: tests/security-headers.test.mjs

**Required behavior:** exported Next.js headers must include Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy and Content-Security-Policy-Report-Only for all routes.

- [ ] Write tests that fail because the required headers are absent.
- [ ] Run node --test tests/security-headers.test.mjs and confirm the expected failure.
- [ ] Add the smallest shared header configuration to next.config.mjs.
- [ ] Run the focused test and confirm PASS.
- [ ] Run build, typecheck, QA, lint and sites build.
- [ ] Commit the header configuration and test.

### Task 3: Add reusable API request defenses

**Files:**
- Create: src/lib/apiSecurity.ts
- Create: tests/api-security.test.mjs
- Modify: src/app/api/lead/route.ts
- Modify: src/app/api/partner-application/route.ts
- Modify: src/app/api/call-event/route.ts

**Interfaces:**
- inspectRequest(request, policy) returns an allowed result or a safe NextResponse rejection.
- noStoreHeaders provides cache-control and related response headers.
- checkRateLimit(key, policy) returns allowed, retryAfterSeconds and remaining.

- [ ] Write failing tests for oversized bodies, unsupported content types, untrusted origins, excessive requests and no-store responses.
- [ ] Implement bounded body inspection, content-type allowlists, same-site origin policy and conservative rate limiting.
- [ ] Apply the shared policy to all public API routes.
- [ ] Verify valid call events and partner submissions still pass.
- [ ] Run focused and full regression checks.
- [ ] Commit API defenses and tests.

### Task 4: Reduce unused endpoint exposure

**Files:**
- Modify or remove: src/app/api/lead/route.ts
- Modify: tests/form-routing.test.mjs
- Modify: tests/operational-status.test.mjs
- Create: tests/call-only-surface.test.mjs

**Required behavior:** customer conversion remains call-only; direct customer lead submissions are unavailable; partner applications and call events remain available.

- [ ] Write a failing test proving the lead endpoint is still exposed.
- [ ] Verify no customer-facing component depends on /api/lead.
- [ ] Disable or remove the lead endpoint.
- [ ] Run call-only, routing, production-page and full regression tests.
- [ ] Commit endpoint reduction separately.

### Task 5: Strengthen partner bot and webhook controls

**Files:**
- Modify: src/lib/formDelivery.ts
- Modify: src/lib/formRouteHandlers.ts
- Modify: tests/form-routing.test.mjs
- Modify: .env.example

**Required behavior:** production webhooks use HTTPS and approved hostnames; bot/replay submissions are filtered; secrets and full PII are not logged.

- [ ] Write failing tests for unapproved webhook hosts, replay attempts and implausibly fast bot submissions.
- [ ] Add an owner-configured webhook-host allowlist without exposing destination values.
- [ ] Add bounded timing and replay fields to partner validation.
- [ ] Preserve honeypot filtering and redacted logging.
- [ ] Run routing, security and regression tests.
- [ ] Commit webhook and bot protections.

### Task 6: Add repository security automation

**Files:**
- Create: .github/dependabot.yml
- Create: .github/workflows/ci.yml
- Create: .github/workflows/codeql.yml
- Create: .github/workflows/dependency-review.yml
- Modify: package.json
- Remove after npm verification: pnpm-lock.yaml

**Required behavior:** pull requests run npm ci, security tests, test, typecheck, QA and lint; CodeQL scans JavaScript/TypeScript; Dependabot monitors npm and Actions; dependency review rejects high-severity additions.

- [ ] Confirm npm ci reproduces the project from package-lock.json.
- [ ] Pin uncontrolled direct dependency versions.
- [ ] Add CI and security workflows with least-privilege permissions.
- [ ] Validate workflow YAML and npm commands locally where possible.
- [ ] Run npm audit and document remaining advisories.
- [ ] Commit repository-security automation separately.

### Task 7: Verify production and close security hardening

**Files:**
- Create: reports/PlumbingHands_Security_Hardening_Final_Report_2026-07-16.md
- Update: reports/security_session1_baseline.md

- [ ] Run security tests, routing tests, full test, build, typecheck, QA, lint and sites build.
- [ ] Verify live headers and expected endpoint responses after deployment.
- [ ] Confirm DID, telephone URI, robots.txt and sitemap remain correct.
- [ ] Confirm local master and origin/master are synchronized.
- [ ] Separate verified application controls from owner-controlled GitHub, Vercel, DNS and MFA controls.
- [ ] Commit and push the evidence-backed final report.

## Owner-Controlled Follow-Up

- Enable GitHub MFA, branch protection, secret scanning and push protection.
- Enable Vercel MFA, least-privilege team access and firewall controls.
- Enable registrar MFA, transfer lock and DNS change protection.
- Rotate webhook and integration credentials after hardening.

## Completion Standard

Security hardening is complete only when focused security tests and the full regression suite pass, production controls are verified, Git is synchronized, no secrets are exposed, and unknown account-level controls remain explicitly documented.
