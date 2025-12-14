$endpoints = @(
  @{ name = 'HEALTH'; url = 'http://localhost:8000/health' },
  @{ name = 'STATS'; url = 'http://localhost:8000/api/stats' },
  @{ name = 'TRAFFIC'; url = 'http://localhost:8000/api/traffic?range=1h' },
  @{ name = 'THREATS'; url = 'http://localhost:8000/api/threats' },
  @{ name = 'BLOCKED'; url = 'http://localhost:8000/api/blocked-ips' }
)

foreach ($ep in $endpoints) {
  Write-Output "--- $($ep.name) ---"
  try {
    $r = Invoke-RestMethod -Uri $ep.url -Method Get -UseBasicParsing -ErrorAction Stop
    $json = $r | ConvertTo-Json -Depth 5
    Write-Output $json
  } catch {
    Write-Output "ERROR: $($_.Exception.Message)"
  }
  Write-Output ""
}
