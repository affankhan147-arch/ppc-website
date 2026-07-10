# API And Platform Safety Policy

## Absolute Credential Rules
1. Never commit passwords, API keys, GitHub tokens, OpenAI keys, OAuth secrets, payment details, recovery codes, or private credentials.
2. Use local environment variables for local scripts.
3. Use Colab Secrets for Colab-only credentials when needed.
4. Use GitHub Secrets for GitHub Actions only when the owner sets them manually.
5. Use hosting provider environment variables only after owner-approved deployment setup.
6. Prefer browser login and credential managers over manually copied tokens.

## Advertising And Local Claim Rules
The project is organic-first until the owner explicitly approves otherwise.

Do not:
- create paid ads
- create Google Ads
- create Bing Ads
- create fake Google Business Profiles
- create fake reviews
- create fake addresses
- create fake licenses
- create fake insurance claims
- create fake local office claims
- create spam backlinks
- copy competitor images or private assets

## Safe API Use
Allowed API or automation use must:
- be owner-approved
- avoid secret values in repo files
- produce reviewable output files
- include source notes when research is used
- avoid submitting forms, purchases, ads, or account changes without owner approval

## Colab Safety
Colab may generate support data only. Notebook text must not contain secrets. Any exports from Colab must be reviewed before commit.

## Codex Safety
Codex must inspect files before editing, avoid unrelated changes, run reasonable verification, and report what changed. If a command requests unsafe activity, Codex must stop and explain the conflict.
