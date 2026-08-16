Write-Host "=== https://www.plumbinghands.com/ ==="
curl.exe -sIL -w "`n%{url_effective} -> HTTP %{http_code}`n" https://www.plumbinghands.com/ | Select-String -Pattern 'HTTP|Location|url_effective'
Write-Host "`n=== https://plumbinghands.com/ ==="
curl.exe -sIL -w "`n%{url_effective} -> HTTP %{http_code}`n" https://plumbinghands.com/ | Select-String -Pattern 'HTTP|Location|url_effective'
Write-Host "`n=== http://plumbinghands.com/ ==="
curl.exe -sIL -w "`n%{url_effective} -> HTTP %{http_code}`n" http://plumbinghands.com/ | Select-String -Pattern 'HTTP|Location|url_effective'
