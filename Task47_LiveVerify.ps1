$checks = @(
  @{ url = 'https://www.plumbinghands.com/services/emergency-drain-cleaning'; phrase = '<title>24/7 Emergency Drain Cleaning'; label = 'service page title' },
  @{ url = 'https://www.plumbinghands.com/services/emergency-drain-cleaning'; phrase = 'Need emergency drain cleaning in Dallas-Fort Worth?'; label = 'service page description' },
  @{ url = 'https://www.plumbinghands.com/cities/mansfield/emergency-drain-cleaning'; phrase = '<title>24/7 Emergency Drain Cleaning in Mansfield'; label = 'Mansfield combo title' },
  @{ url = 'https://www.plumbinghands.com/cities/lewisville/emergency-drain-cleaning'; phrase = '<title>24/7 Emergency Drain Cleaning in Lewisville'; label = 'Lewisville combo title' },
  @{ url = 'https://www.plumbinghands.com/cities/rockwall/emergency-drain-cleaning'; phrase = 'Need Emergency Drain Cleaning in Rockwall?'; label = 'Rockwall combo description' }
)

foreach ($c in $checks) {
  $content = curl.exe -sL $c.url
  if ($content -match [regex]::Escape($c.phrase)) {
    Write-Host ('PASS: ' + $c.label + ' live')
  } else {
    Write-Host ('FAIL: ' + $c.label + ' not found')
  }
}
