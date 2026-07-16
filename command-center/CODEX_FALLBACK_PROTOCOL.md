# Codex Availability and Fallback Protocol

## Project identity

- Project owner: Sana Ul Haque
- Owner/project email: affan.khan147@gmail.com
- Repository: affankhan147-arch/ppc-website
- Master planning house: ChatGPT
- Primary orchestrator: PowerShell
- Coding worker: GitHub Codex
- Compute fallback: Google Colab
- Mandatory reporting: Notepad

All PlumbingHands SEO project work performed on Sunny's office machine belongs
to Sana Ul Haque.

## Purpose

This protocol controls what PowerShell must do when GitHub Codex is temporarily
unavailable because of a usage limit, quota limit, rate limit, service
interruption or authentication interruption.

This protocol must not be used to bypass Codex limits or switch ownership.

## Detection

PowerShell may classify Codex as temporarily unavailable only when the Codex
command or returned result contains clear evidence such as:

- usage limit reached;
- quota exceeded;
- rate limit;
- too many requests;
- capacity unavailable;
- service temporarily unavailable;
- authentication required;
- Codex command unavailable.

An ordinary test failure or code error is not a Codex availability failure.

## Fallback order

### Level 1 — PowerShell local execution

PowerShell continues only deterministic and previously authorized work:

- Git status and synchronization;
- existing test commands;
- existing build commands;
- report generation;
- file-presence verification;
- diff inspection;
- non-destructive repository diagnostics.

PowerShell must not invent or implement complex application changes.

### Level 2 — Google Colab compute fallback

PowerShell creates a Colab task for eligible work:

- large SEO and AEO audits;
- bulk URL processing;
- content-inventory analysis;
- data cleanup and transformation;
- long-running calculations;
- structured report generation.

Colab must not silently replace Codex for unrestricted application coding.

### Level 3 — Deferred Codex queue

If the task requires coding intelligence or repository modification that cannot
be completed deterministically, PowerShell must:

1. preserve the original Master task;
2. record the starting branch and commit;
3. save it under command-center/fallback-queue/;
4. mark it waiting-for-codex;
5. continue only safe independent work;
6. report the deferred task in Notepad;
7. wait for a later Master-authorized availability check.

## Resumption

When Codex becomes available:

1. PowerShell fetches the latest GitHub state.
2. PowerShell verifies the assigned branch and starting commit.
3. PowerShell checks whether the queued task is still necessary.
4. ChatGPT Master confirms or revises the task.
5. Codex receives only the confirmed task.
6. PowerShell verifies Codex's resulting diff, tests, commit and push.
7. The queue entry is marked completed only after verification.

## Prohibited behavior

PowerShell, Codex and Colab must never:

- bypass a usage or quota limit;
- rotate accounts to evade a limit;
- use unauthorized credentials;
- represent another person as project owner;
- merge into master automatically;
- force push or delete project history;
- perform unapproved production deployment;
- hide failures;
- claim a deferred task was completed.

## Mandatory Notepad reporting

Every availability check, fallback decision, Colab handoff, queued Codex task
and resumed Codex result must be written to a timestamped text report and
automatically opened in Notepad.
