# Cloud Backup Validation

Generated: 2026-07-13

## Location

- Active backup folder: cloud-backup/.
- Legacy archive folder preserved: cloud-backups/.

## Checks

- Required backup files present: pass.
- Manifest exists: pass.
- Manifest rows match actual backup files: pass.
- Secret pattern scan: pass.
- Broken internal backup link scan: pass; backup references repository paths and generated files that exist or explicit owner placeholders.
- Command/report references: pass for repository command-center, ops, reports, authority, and script references.

## Missing Files

- none

## Result

PASS: backup is cloud-ready and safe to commit.
