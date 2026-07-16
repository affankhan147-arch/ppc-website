# PlumbingHands Staged Security Hardening Design

Date: 2026-07-16
Status: Approved design pending implementation

## Objective

Fortify the PlumbingHands Next.js and Vercel deployment without disrupting the approved DID, call-only customer journey, partner application, analytics configuration, indexing, or production availability.

## Protected Behaviors

- Production DID remains +1 844-397-8298.
- Telephone URI remains tel:+18443978298.
- Customer conversion remains call-only.
- Partner application remains available and honestly reports delivery failures.
- No credentials, tokens, webhook destinations, or personal information may be committed or printed in reports.
- Security changes must fail closed without inventing successful delivery or verification.

## Session 1 - Security Baseline

Inspect live response headers, public API behavior, dependency vulnerabilities, tracked-secret indicators, repository configuration, package-manager drift, existing tests, and GitHub security automation. This session is read-only.

## Session 2 - Browser Defenses

Add Strict-Transport-Security, X-Content-Type-Options, frame protection, Referrer-Policy, Permissions-Policy, and a Content-Security-Policy-Report-Only policy. Confirm the policy does not block site functionality before enforcement is considered.

## Session 3 - API Defenses

Add application-level request-size limits, accepted-content-type checks, trusted-origin validation, rate limiting, no-store API responses, safe error handling, and tests for allowed and rejected requests.

## Session 4 - Endpoint Reduction

Prove whether the customer lead API is unused. Disable or remove /api/lead only after tests demonstrate that the call-only customer journey does not depend on it. Preserve /api/partner-application and /api/call-event.

## Session 5 - Bot and Webhook Defenses

Strengthen partner bot screening, add replay and timing controls where appropriate, restrict outbound webhook destinations, preserve HTTPS-only delivery, and avoid logging or retaining unnecessary personal information.

## Session 6 - Repository Defenses

Standardize the repository on npm, remove obsolete package-manager drift, pin uncontrolled dependency versions, add Dependabot, CodeQL, dependency review, and continuous integration security checks. Account-level GitHub and Vercel protections remain owner-controlled.

## Session 7 - Verification and Closeout

Run focused security tests followed by build, typecheck, QA, lint, sites build, dependency audit, Git synchronization, and live production verification. Produce a final report that separates verified controls from owner-controlled or unavailable controls.

## Testing Strategy

For every behavior change: reproduce the missing protection with a failing test, implement the smallest protection, rerun the focused test, then run regression checks. No security change may be committed merely because the source appears correct.

## Deployment Strategy

Use small commits per security session. Push only after that session's relevant checks pass. Begin CSP in report-only mode. Do not deploy strict enforcement until production evidence confirms required scripts, analytics, calls, navigation, and partner submissions remain functional.

## Error Handling

Commands must record failures truthfully, avoid printing secrets, stop mutation or push after failed checks, preserve local evidence, and always open a Notepad-readable transcript.

## Success Criteria

- Security headers verified on production.
- Public APIs protected against oversized, malformed, cross-origin, and excessive requests.
- Unused customer form surface removed or explicitly disabled.
- Partner application retains valid delivery behavior and stronger bot protection.
- Dependency and code-security checks run automatically.
- Full build and QA suite passes.
- GitHub and local master are synchronized.
- Remaining account-level controls are documented as owner actions rather than falsely marked complete.
