$pages = @(
  @{ url = 'https://www.plumbinghands.com/blog/does-homeowners-insurance-cover-a-plumbing-leak-in-texas'; phrase = 'Does home insurance cover plumbing leaks'; label = 'insurance page' },
  @{ url = 'https://www.plumbinghands.com/services/water-heater-emergency'; phrase = 'hot water heater'; label = 'water heater page' },
  @{ url = 'https://www.plumbinghands.com/services/24-hour-emergency-plumber'; phrase = '24 hour plumber near me'; label = 'emergency plumber page' }
)

foreach ($p in $pages) {
  $content = curl.exe -sL $p.url
  if ($content -match [regex]::Escape($p.phrase)) {
    Write-Host ('PASS: ' + $p.label + ' phrase live')
  } else {
    Write-Host ('FAIL: ' + $p.label + ' phrase not found')
  }
}
