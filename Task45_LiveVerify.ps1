try {
  $r = Invoke-WebRequest -Uri 'https://www.plumbinghands.com/blog/does-homeowners-insurance-cover-a-plumbing-leak-in-texas' -UseBasicParsing
  if ($r.Content -match 'Does home insurance cover plumbing leaks') {
    Write-Host 'PASS: insurance page phrase live'
  } else {
    Write-Host 'FAIL: phrase not found on insurance page'
  }
} catch {
  Write-Host 'ERROR insurance page:' $_.Exception.Message
}

try {
  $r2 = Invoke-WebRequest -Uri 'https://www.plumbinghands.com/services/water-heater-emergency' -UseBasicParsing
  if ($r2.Content -match 'hot water heater') {
    Write-Host 'PASS: hot water heater phrase live'
  } else {
    Write-Host 'FAIL: hot water heater phrase not found'
  }
} catch {
  Write-Host 'ERROR water heater page:' $_.Exception.Message
}

try {
  $r3 = Invoke-WebRequest -Uri 'https://www.plumbinghands.com/services/24-hour-emergency-plumber' -UseBasicParsing
  if ($r3.Content -match '24 hour plumber near me') {
    Write-Host 'PASS: 24 hour plumber near me phrase live'
  } else {
    Write-Host 'FAIL: 24 hour plumber near me phrase not found'
  }
} catch {
  Write-Host 'ERROR emergency plumber page:' $_.Exception.Message
}
