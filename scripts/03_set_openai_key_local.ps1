$key = Read-Host "Paste OPENAI API key. Input is hidden if your terminal supports it" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($key)
try {
    $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    [Environment]::SetEnvironmentVariable("OPENAI_API_KEY", $plain, "User")
    $env:OPENAI_API_KEY = $plain
    Write-Host "OPENAI_API_KEY saved to Windows User environment. Restart terminals after this if needed."
}
finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}
