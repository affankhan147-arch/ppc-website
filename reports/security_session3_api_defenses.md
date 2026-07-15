# Security Session 3 API Defenses

Date: 2026-07-16

## Result

PASS - APPLICATION-LEVEL API DEFENSES IMPLEMENTED

## Controls

- Method allowlists
- Content-type allowlists for POST routes
- Declared request-size limit of 64 KiB
- Trusted production-origin validation when an Origin header is supplied
- Conservative per-instance rate limits
- Retry-After response on rate-limit rejection
- No-store and nosniff API responses
- Safe malformed-body errors
- Existing Zod validation and webhook delivery controls preserved

## Rate-Limit Boundary

The in-process limiter is a defense-in-depth control and is not globally consistent across distributed Vercel instances. Vercel firewall or durable rate-limit storage remains an owner-controlled requirement.

## Verification

Focused API-security, routing, operational-status, build, typecheck, QA, lint, and sites build checks passed.
