# Security Session 1 Baseline

Date: 2026-07-16
Repository commit inspected: 65d5ab9
Production: https://plumbinghands.com

## Overall Status

WATCH - BASIC CONTROLS PRESENT, APPLICATION HARDENING REQUIRED

## Verified Healthy Controls

- Production homepage responds with HTTP 200 over HTTPS.
- Vercel supplies Strict-Transport-Security with max-age=63072000.
- The Next.js X-Powered-By header is not exposed.
- The health endpoint responds with HTTP 200 and cache-control no-store.
- Invalid lead and partner payloads return HTTP 400.
- Production webhook delivery code requires HTTPS.
- Outbound webhook requests use a 10-second timeout.
- Zod schemas validate customer and partner payloads.
- Partner submissions include a honeypot field.
- Application logs redact full customer phone numbers and partner email addresses.
- No real environment files, private keys, certificates, or secrets-directory files are tracked.
- Local master and origin/master were synchronized at 0 0.

## Critical or High-Priority Gaps

- No application-level rate limiting was found.
- No request-body size limit was found.
- No trusted-origin validation was found.
- Customer lead, partner application, call-event, and health API routes are publicly reachable.
- The call-only customer interface no longer requires the customer lead API, but the API remains exposed.
- npm audit reports 6 high-severity dependency advisories.

## Missing Browser Protections

- Content-Security-Policy: missing
- Content-Security-Policy-Report-Only: missing
- X-Content-Type-Options: missing
- X-Frame-Options: missing
- Referrer-Policy: missing
- Permissions-Policy: missing

## Dependency Baseline

npm audit inspected 636 dependencies and reported:

- Critical: 0
- High: 6
- Moderate: 2
- Low: 1
- Total: 9

Packages involved include @cloudflare/vite-plugin, miniflare, undici, vite, wrangler, ws, esbuild, next, and postcss. Remediation must be tested rather than applying forced upgrades blindly.

## Repository and Supply-Chain Gaps

- Both package-lock.json and pnpm-lock.yaml exist.
- package.json does not declare a packageManager.
- lucide-react, next-sitemap, zod, autoprefixer, and postcss use latest version declarations.
- The .github directory is absent.
- No repository-defined continuous integration workflow was found.
- No CodeQL workflow was found.
- No Dependabot configuration was found.
- No dependency-review workflow was found.

## Unknown or Owner-Controlled Controls

- GitHub branch protection status
- GitHub secret scanning and push protection status
- Vercel firewall and rate-limit configuration
- Vercel administrator MFA and team permissions
- Domain registrar MFA, transfer lock, and DNS protections
- Webhook destination retention and access policy
- Credential age and rotation history

## Protected Production Behaviors

- DID +1 844-397-8298 must remain unchanged.
- Telephone URI tel:+18443978298 must remain unchanged.
- Customer journey must remain call-only.
- Partner applications must remain functional and report failures honestly.

## Next Approved Session

Add browser-security-header tests, confirm they fail against the current configuration, implement the minimum required headers with CSP in report-only mode, then run the full regression suite.
