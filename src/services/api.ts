import { API_CONFIG, buildApiUrl } from '@/config/api';

// Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'down';
  version: string;
  uptime: number;
  services: {
    database: boolean;
    ryu_controller: boolean;
  };
}

export interface ThreatData {
  id: string;
  type: string;
  severity: 'critical' | 'warning' | 'info';
  ip: string;
  timestamp: string;
  description: string;
  status: 'active' | 'resolved' | 'investigating';
}

export interface TrafficData {
  timestamp: string;
  inbound: number;
  outbound: number;
  threats: number;
}

export interface BlockedIP {
  id: string;
  ip: string;
  reason: string;
  blocked_at: string;
  requests_blocked: number;
  status: 'blocked' | 'monitored';
}

export interface DashboardStats {
  events_processed: number;
  threats_detected: number;
  active_blocks: number;
  connected_switches: number;
  uptime_seconds: number;
}

// API Service Class
class ApiService {
  // Generic fetch wrapper
  private async fetchWithTimeout<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearTimeout(timeout);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Health Check
  async checkHealth(): Promise<ApiResponse<HealthCheckResponse>> {
    return this.fetchWithTimeout<HealthCheckResponse>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.HEALTH)
    );
  }

  // Get Dashboard Stats
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.fetchWithTimeout<DashboardStats>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.STATS)
    );
  }

  // Get Threats
  async getThreats(): Promise<ApiResponse<ThreatData[]>> {
    return this.fetchWithTimeout<ThreatData[]>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.THREATS)
    );
  }

  // Get Blocked IPs
  async getBlockedIPs(): Promise<ApiResponse<BlockedIP[]>> {
    return this.fetchWithTimeout<BlockedIP[]>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.BLOCKED_IPS)
    );
  }

  // Block IP
  // Block IP: backend expects `source_ip` (and optional `duration` in seconds)
  async blockIP(source_ip: string, duration?: number, reason?: string): Promise<ApiResponse<{ success: boolean }>> {
    const body: Record<string, any> = { source_ip };
    if (typeof duration === 'number') body.duration = duration;
    if (reason) body.reason = reason;

    return this.fetchWithTimeout<{ success: boolean }>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.BLOCKED_IPS),
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    );
  }

  // Unblock IP
  async unblockIP(ip: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.fetchWithTimeout<{ success: boolean }>(
      buildApiUrl(`${API_CONFIG.REST_API.ENDPOINTS.BLOCKED_IPS}/${ip}`),
      {
        method: 'DELETE',
      }
    );
  }

  // Get Traffic Data
  async getTrafficData(timeRange: string = '24h'): Promise<ApiResponse<TrafficData[]>> {
    return this.fetchWithTimeout<TrafficData[]>(
      buildApiUrl(`${API_CONFIG.REST_API.ENDPOINTS.TRAFFIC}?range=${timeRange}`)
    );
  }

  // Get Alerts
  async getAlerts(): Promise<ApiResponse<ThreatData[]>> {
    return this.fetchWithTimeout<ThreatData[]>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.ALERTS)
    );
  }

  // Update Settings
  async updateSettings(settings: Record<string, any>): Promise<ApiResponse<{ success: boolean }>> {
    return this.fetchWithTimeout<{ success: boolean }>(
      buildApiUrl(API_CONFIG.REST_API.ENDPOINTS.SETTINGS),
      {
        method: 'PUT',
        body: JSON.stringify(settings),
      }
    );
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export utility hooks for React Query
export const apiKeys = {
  health: ['health'] as const,
  stats: ['stats'] as const,
  threats: ['threats'] as const,
  blockedIPs: ['blockedIPs'] as const,
  traffic: (range: string) => ['traffic', range] as const,
  alerts: ['alerts'] as const,
};
