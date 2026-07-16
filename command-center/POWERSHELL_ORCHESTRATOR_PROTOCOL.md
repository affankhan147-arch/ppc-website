# PowerShell Orchestrator Protocol

## Project authority

Project owner: Sana Ul Haque
Owner/project email: affan.khan147@gmail.com
Repository: affankhan147-arch/ppc-website

PowerShell is the primary execution controller operating under commands
created by the ChatGPT Master planning house.

## Required actions

For every operation, PowerShell must:

1. verify the GitHub login;
2. verify the repository remote;
3. verify the assigned codex/* branch;
4. fetch the current GitHub state;
5. preserve existing project files;
6. determine which Master-authorized worker is required;
7. create controlled Codex or Colab task instructions;
8. verify worker commits, diffs, tests and reports;
9. save complete results to a timestamped text report;
10. automatically open that report in Notepad;
11. return control to the ChatGPT Master.

## Worker selection

Use local PowerShell execution for:

- Git status and synchronization;
- standard tests and builds;
- file and report verification;
- controlled Git operations.

Use GitHub Codex for:

- Master-authorized code changes;
- repository analysis requiring coding intelligence;
- narrowly scoped debugging and implementation.

Use Google Colab for:

- large SEO or AEO audits;
- bulk URL and page processing;
- long-running analysis;
- structured dataset or report generation.

## Forbidden without owner approval

- merging into master;
- force pushing;
- deleting branches;
- destructive reset or clean operations;
- changing repository ownership;
- changing authentication;
- publishing or deploying;
- exposing credentials or tokens.

All PowerShell reports must identify Sana Ul Haque as the project owner.
