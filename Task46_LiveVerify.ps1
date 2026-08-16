$pages = @(
  @{ url = 'https://www.plumbinghands.com/cost-guides/drain-cleaning-cost-dfw'; phrase = 'How much does drain cleaning cost'; label = 'drain cleaning cost guide' },
  @{ url = 'https://www.plumbinghands.com/blog/how-to-verify-a-texas-plumbers-license'; phrase = 'How do I renew a Texas plumbing license'; label = 'license renewal FAQ' },
  @{ url = 'https://www.plumbinghands.com/blog/how-to-verify-a-texas-plumbers-license'; phrase = 'How do I get a plumbing license in Texas'; label = 'license how-to-get FAQ' },
  @{ url = 'https://www.plumbinghands.com/problems/kitchen-sink-backing-up'; phrase = 'kitchen sink can back up without a visible clog'; label = 'kitchen sink premium enhancement' },
  @{ url = 'https://www.plumbinghands.com/problems/bathtub-drain-backing-up'; phrase = 'How to read a bathtub drain backing up'; label = 'bathtub premium enhancement' },
  @{ url = 'https://www.plumbinghands.com/problems/washing-machine-drain-backing-up'; phrase = 'How to read a washing machine drain backup'; label = 'washing machine premium enhancement' },
  @{ url = 'https://www.plumbinghands.com/problems/no-hot-water-emergency'; phrase = 'How to decide if no hot water is an emergency'; label = 'no hot water premium enhancement' }
)

foreach ($p in $pages) {
  $content = curl.exe -sL $p.url
  if ($content -match [regex]::Escape($p.phrase)) {
    Write-Host ('PASS: ' + $p.label + ' live')
  } else {
    Write-Host ('FAIL: ' + $p.label + ' not found')
  }
}
