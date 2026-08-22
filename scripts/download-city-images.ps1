$ErrorActionPreference = "Continue"
$root = "C:\Users\dell\Documents\plumbinghands-live-master"
Set-Location $root
$rows = Import-Csv "scripts\image-manifest.csv"
$total = $rows.Count
$ok = 0
$fail = 0
$failLog = @()
$i = 0
foreach ($row in $rows) {
  $i++
  $id = $row.id
  $outfile = Join-Path $root $row.outfile
  $dir = Split-Path $outfile -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  if (Test-Path $outfile) {
    $existing = Get-Item $outfile
    if ($existing.Length -gt 5000) { $ok++; continue }
  }
  $url = "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1"
  $attempt = 0
  $success = $false
  while ($attempt -lt 3 -and -not $success) {
    $attempt++
    try {
      Invoke-WebRequest -Uri $url -OutFile $outfile -UserAgent "Mozilla/5.0" -TimeoutSec 20 -ErrorAction Stop
      $size = (Get-Item $outfile).Length
      if ($size -gt 5000) { $success = $true } else { Start-Sleep -Milliseconds 500 }
    } catch {
      Start-Sleep -Milliseconds 800
    }
  }
  if ($success) {
    $ok++
  } else {
    $fail++
    $failLog += "$id`t$($row.outfile)"
  }
  if ($i % 25 -eq 0) { Write-Host "Progress: $i / $total (ok=$ok fail=$fail)" }
}
Write-Host "DONE. Total=$total OK=$ok FAIL=$fail"
if ($failLog.Count -gt 0) {
  $failLog | Out-File "scripts\download-failures.txt" -Encoding utf8
  Write-Host "Failures written to scripts\download-failures.txt"
}
