$ErrorActionPreference = "Stop"
Set-Location "$env:USERPROFILE\Documents\ppc-website"

if ([string]::IsNullOrWhiteSpace($env:OPENAI_API_KEY)) {
    Write-Host "OPENAI_API_KEY not found. Run scripts\03_set_openai_key_local.ps1 first."
    exit 1
}

$body = @{
    model = "gpt-4.1-mini"
    messages = @(
        @{ role = "system"; content = "You create concise SEO page briefs. No fake claims. No paid ads." },
        @{ role = "user"; content = "Create 10 concise page brief titles for emergency plumbing Dallas PPC SEO. Output plain lines only." }
    )
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod `
    -Uri "https://api.openai.com/v1/chat/completions" `
    -Method Post `
    -Headers @{
        "Authorization" = "Bearer $env:OPENAI_API_KEY"
        "Content-Type" = "application/json"
    } `
    -Body $body

$out = $response.choices[0].message.content
Set-Content -Path ".\api\outputs\openai_page_briefs.txt" -Value $out -Encoding UTF8
Write-Host "Created api/outputs/openai_page_briefs.txt"
