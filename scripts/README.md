Traffic generation and test scripts

1) Generate HTTP traffic (PowerShell):

```powershell
# Send 200 requests to the target (default: http://localhost:8000/)
.\scripts\generate_http_traffic.ps1 -Target 'http://localhost:8000/' -Requests 200 -DelayMs 50
```

2) Inject blocked IPs into PreDefense (PowerShell):

```powershell
# Create 5 blocked IP entries via the REST API
.\scripts\inject_blocked_ips.ps1 -Api 'http://localhost:8000/api/blocked-ips' -Count 5
```

Notes:
- Both scripts are simple PowerShell helpers that use `curl` to call endpoints.
- Adjust `Target`, `Requests`, `Count` and `DelayMs` as needed.
- After running the inject script, refresh the dashboard (`/dashboard`) to see blocked IPs populate.
