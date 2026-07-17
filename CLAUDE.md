# CLAUDE.md - PlumbingHands PPC Website
## Permanent Operating Manual for Claude Code

This file is the master instruction set for Claude Code operating in this
repository. Claude Code must read this file at the start of every session,
before touching any other file.

---

## 1. Business Purpose

This repository builds and maintains the PlumbingHands PPC website: a
Node.js-based marketing/landing site used to drive paid-search conversions
(phone calls and form fills) for plumbing services.

Production domain: https://www.plumbinghands.com
Primary phone CTA: tel:+18443978298

---

## 2. Authentication Model

Claude Code is authenticated via Claude Pro/Max login (Claude Desktop Code tab),
not an ANTHROPIC_API_KEY. Never create, request, or store an API key.

---

## 3. Mandatory Reading Order (every session)

1. CLAUDE.md (this file)
2. command-center/CURRENT_TASK.md
3. command-center/PROJECT_STATE.json
4. command-center/BLOCKERS.md

---

## 4. Important Repo Note

This repo ALSO contains a separate legacy "command-center" style system from
prior Codex-era sessions (references to "Antigravity continuity controller",
Codex workflow files). That is NOT this workflow. This workflow's files are:
CLAUDE.md, command-center/CURRENT_TASK.md, command-center/PROJECT_STATE.json,
command-center/BLOCKERS.md, command-center/NEXT_ACTION.md, automation/*.ps1.
Ignore other legacy automation references unless the user explicitly asks
about the old Codex system.

---

## 5. Coding Conventions

Smallest correct change only. Only touch files listed under "Authorized files"
in CURRENT_TASK.md. No dependency added without explicit user approval.

---

## 6. Test & Build Commands

npm ci
npm run build

---

## 7. Deployment Restrictions

Production deployment only after explicit user authorization in the same
session. This repo auto-deploys from the "master" branch via Vercel Git
integration - merging/pushing to master will trigger a live deploy.

---

## 8. Legal / Public-Copy Rules

Do not alter the production phone number, legal disclaimers, or safety copy
without explicit authorization.

---

## 9. PASS / FAIL / BLOCKED Standard

PASS only when: authorized change + successful build + correct git state +
evidence report. Never mark PASS because it "looks right."

---

## 10. Scope-Control Rule

If a task requires touching a file not listed in CURRENT_TASK.md, stop and
ask rather than expanding scope silently.