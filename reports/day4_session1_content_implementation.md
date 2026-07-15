# Day 4 Session 1 Content Implementation

- Commercial support page: /services/burst-pipe-emergency strengthened through leak, shutoff, cost, and problem links.
- Emergency/problem page: /problems/water-shutoff-valve-will-not-close supports failed-valve triage.
- Cost/decision page: /cost-guides/emergency-leak-repair-cost-dfw separates isolation, diagnosis, repair, and restoration scope.
- Supporting FAQ/checklist guide page: /blog/emergency-leak-approval-checklist-for-homeowners added to explain approval questions before emergency leak work.
- Existing checklist page: /blog/water-shutoff-valve-will-not-close-during-a-leak remains supporting content for failed shutoff symptoms.

## 2026-07-16 PowerShell Revalidation

- Session status: IMPLEMENTED AND VERIFIED.
- Added the missing ailed shutoff leak checklist link from /cost-guides/emergency-leak-repair-cost-dfw to /blog/water-shutoff-valve-will-not-close-during-a-leak.
- The target route returns HTTP 200 and remains present in the live sitemap.
- Production DID and telephone URI remain present across the cluster.
- Customer request forms remain absent.
- Typecheck, lint, build, routing tests, status tests, and production-page tests passed.
- Deployment and post-deployment link verification remain pending.
