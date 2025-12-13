# PreDefense API Integration Guide

## Overview
This webapp is integrated with the PreDefense security platform APIs for real-time threat monitoring and management.

## API Endpoints

### REST API (Port 8000)
- **Base URL**: `http://localhost:8000`
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### Ryu Controller (Port 6633)
- **Host**: `localhost:6633`
- Used for SDN network flow management

## Available Endpoints

### Health & Status
- `GET /health` - API health status and service availability
- `GET /api/stats` - Dashboard statistics

### Threats & Alerts
- `GET /api/threats` - List all detected threats
- `GET /api/alerts` - Real-time security alerts

### IP Management
- `GET /api/blocked-ips` - List blocked IP addresses
- `POST /api/blocked-ips` - Block a new IP address
- `DELETE /api/blocked-ips/{ip}` - Unblock an IP address

### Traffic Analytics
- `GET /api/traffic?range={timeRange}` - Network traffic data
  - Parameters: `range` (24h, 7d, 30d)

### Settings & Configuration
- `GET /api/settings` - Get current settings
- `PUT /api/settings` - Update settings
- `GET /api/integrations` - List configured integrations

## React Query Hooks

The webapp uses custom hooks for data fetching:

```typescript
// Health check
const { data, isLoading, isError } = useHealthCheck();

// Dashboard stats
const { data } = useDashboardStats();

// Threats
const { data } = useThreats();

// Blocked IPs
const { data } = useBlockedIPs();

// Traffic data
const { data } = useTrafficData('24h');

// Mutations
const blockIP = useBlockIP();
const unblockIP = useUnblockIP();
```

## Configuration

API configuration is centralized in `/src/config/api.ts`:

```typescript
export const API_CONFIG = {
  REST_API: {
    BASE_URL: 'http://localhost:8000',
    // ... endpoints
  },
  RYU_CONTROLLER: {
    PORT: 6633,
    // ... config
  },
  POLLING: {
    REAL_TIME: 2000,      // 2 seconds
    DASHBOARD: 5000,      // 5 seconds
    ANALYTICS: 30000,     // 30 seconds
  }
};
```

## Automatic Data Refresh

Components automatically refresh data at configurable intervals:
- **Real-time data** (threats, traffic): Every 2 seconds
- **Dashboard stats**: Every 5 seconds
- **Analytics**: Every 30 seconds
- **Health checks**: Every 30 seconds

## API Status Indicator

The TopBar shows real-time API connection status:
- ✅ **Connected** - API is responding
- ⚠️ **Checking...** - Connecting to API
- ❌ **API Offline** - Cannot connect to API

## Usage in Components

### Example: Using API data in a component

```typescript
import { useThreats } from '@/hooks/useApi';

const ThreatsComponent = () => {
  const { data, isLoading, isError } = useThreats();
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading threats</div>;
  
  const threats = data?.data || [];
  
  return (
    <div>
      {threats.map(threat => (
        <div key={threat.id}>{threat.description}</div>
      ))}
    </div>
  );
};
```

### Example: Blocking an IP

```typescript
import { useBlockIP } from '@/hooks/useApi';

const BlockIPButton = () => {
  const blockIP = useBlockIP();
  
  const handleBlock = async () => {
    await blockIP.mutateAsync({
      ip: '192.168.1.100',
      reason: 'DDoS Attack detected'
    });
  };
  
  return <button onClick={handleBlock}>Block IP</button>;
};
```

## Error Handling

All API calls include automatic error handling:
- Network timeouts (10 seconds default)
- HTTP error responses
- JSON parsing errors
- Connection failures

Failed requests return a structured error response:

```typescript
{
  success: false,
  error: 'Error message',
  timestamp: '2025-12-14T...'
}
```

## GitHub Repository

PreDefense Backend: https://github.com/CursedOn3/PreDefense.git

## Getting Started

1. **Start the PreDefense backend**:
   ```bash
   # Clone and run the PreDefense API
   git clone https://github.com/CursedOn3/PreDefense.git
   cd PreDefense
   # Follow backend setup instructions
   ```

2. **Start the webapp**:
   ```bash
   cd webapp
   npm run dev
   ```

3. **Verify connection**:
   - Check the API status indicator in the TopBar
   - Visit http://localhost:8000/health to verify backend is running
   - Dashboard should display real-time data

## Troubleshooting

### API shows "Offline"
- Verify PreDefense backend is running on port 8000
- Check CORS settings if running on different domains
- Verify firewall/network settings

### No data showing
- Check browser console for API errors
- Verify API endpoints match backend implementation
- Check network tab for failed requests

### Slow updates
- Adjust polling intervals in `/src/config/api.ts`
- Check backend performance
- Monitor network latency

## Development vs Production

For production deployment:
1. Update API URLs in `/src/config/api.ts`
2. Set appropriate CORS headers on backend
3. Use environment variables for configuration
4. Enable API authentication/authorization
5. Add request rate limiting
