param(
  [string]$Target = 'http://localhost:8000/',
  [int]$Requests = 200,
  [int]$DelayMs = 50
)

Write-Host "Sending $Requests requests to $Target (delay $DelayMs ms)"
for ($i = 1; $i -le $Requests; $i++) {
  try {
    curl -s $Target > $null
  } catch {
    # ignore
  }
  Start-Sleep -Milliseconds $DelayMs
}
Write-Host "Done."
