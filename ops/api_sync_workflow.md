# PPC API Sync + Low Codex Usage Workflow

## Goal
Keep Codex usage low by preparing files, summaries, trackers, and notebooks before Codex runs.

## Safe command order

1. Authenticate GitHub if needed:
   .\scripts\00_github_auth_check.ps1

2. Pull latest:
   .\scripts\01_pull_latest.ps1

3. Generate Codex minimum context:
   .\scripts\04_generate_codex_minimum_context.ps1

4. Push updates:
   .\scripts\02_push_updates.ps1

5. Open online Colab:
   .\scripts\05_open_colab_online.ps1

6. Optional OpenAI API setup:
   .\scripts\03_set_openai_key_local.ps1
   .\scripts\06_openai_bulk_prepare.ps1

## Important
Do not commit API keys.
Do not create ads.
Do not use fake GMBs, fake reviews, fake addresses, fake licenses, or copied competitor images.
