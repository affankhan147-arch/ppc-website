Select-String -Path 'C:\Users\dell\Documents\plumbinghands-live-master\src\**\*.tsx' -Pattern 'organizationSchema' -Recurse -ErrorAction SilentlyContinue
Write-Host '---'
Get-ChildItem -Recurse -Include '*.tsx','*.ts' -Path 'C:\Users\dell\Documents\plumbinghands-live-master\src' | Select-String -Pattern 'organizationSchema'
