$json = Get-Content 'C:\Users\dell\Documents\plumbinghands-live-master\Task48_lighthouse_homepage_apex_2026-08-16.json' -Raw | ConvertFrom-Json
Write-Host "=== Category scores (apex URL, 2026-08-16) ==="
$json.categories.PSObject.Properties | ForEach-Object {
  Write-Host ($_.Name + ": " + [math]::Round($_.Value.score * 100))
}
Write-Host "`n=== Core Web Vitals ==="
foreach ($id in @('largest-contentful-paint','cumulative-layout-shift','total-blocking-time','first-contentful-paint','speed-index','interactive')) {
  $a = $json.audits.$id
  if ($a) { Write-Host ($id + ": " + $a.displayValue) }
}
