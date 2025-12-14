param(
  [string]$Api = 'http://localhost:8000/api/blocked-ips',
  [int]$Count = 5,
  [int]$DelayMs = 200
)

Write-Host "Injecting $Count blocked IPs to $Api"
for ($i = 1; $i -le $Count; $i++) {
  $ip = "198.51.100." + ((Get-Random -Minimum 2 -Maximum 250))
  # API expects 'source_ip' per OpenAPI schema
  $body = @{ source_ip = $ip; reason = "Automated test block #$i"; duration = 300 } | ConvertTo-Json
  try {
    $resp = Invoke-RestMethod -Uri $Api -Method Post -Body $body -ContentType 'application/json'
    Write-Host "[$i] $ip -> SUCCESS: $($resp | ConvertTo-Json -Depth 2)"
  } catch {
    Write-Host "[$i] $ip -> ERROR: $($_.Exception.Message)"
  }
  Start-Sleep -Milliseconds $DelayMs
}
Write-Host "Injection complete."