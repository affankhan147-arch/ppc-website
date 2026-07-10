$ErrorActionPreference = "Stop"
Set-Location "$env:USERPROFILE\Documents\ppc-website"
git pull origin master
git status
