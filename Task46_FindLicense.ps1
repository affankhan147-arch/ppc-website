Get-ChildItem -Recurse -Filter 'page.tsx' -Path 'C:\Users\dell\Documents\plumbinghands-live-master\src\app' | Where-Object { $_.FullName -match 'license' } | Select-Object -ExpandProperty FullName
