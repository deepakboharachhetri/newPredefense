// API Configuration
// For Docker deployments, ensure ports are mapped correctly:
// - REST API: Port 8000 should be exposed from container
// - Ryu Controller: Port 6633 should be exposed from container

const isDocker = import.meta.env.VITE_DOCKER_ENV === 'true';
const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
const apiPort = import.meta.env.VITE_API_PORT || '8000';

export const API_CONFIG = {
  // Ryu Controller
  RYU_CONTROLLER: {
    HOST: apiHost,
    PORT: 6633,
    BASE_URL: `http://${apiHost}:6633`
  },
  
  // REST API
  REST_API: {
    BASE_URL: `http://${apiHost}:${apiPort}`,
    ENDPOINTS: {
      DOCS: '/docs',
      HEALTH: '/health',
      THREATS: '/api/threats',
      BLOCKED_IPS: '/api/blocked-ips',
      TRAFFIC: '/api/traffic',
      STATS: '/api/stats',
      ALERTS: '/api/alerts',
      INTEGRATIONS: '/api/integrations',
      SETTINGS: '/api/settings',
    }
  },

  // Request timeout
  TIMEOUT: 10000,

  // Polling intervals (in milliseconds)
  POLLING: {
    REAL_TIME: 2000,      // 2 seconds for real-time data
    DASHBOARD: 5000,      // 5 seconds for dashboard
    ANALYTICS: 30000,     // 30 seconds for analytics
  },

  // Docker configuration
  IS_DOCKER: isDocker,
};

// API Helper Functions
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.REST_API.BASE_URL}${endpoint}`;
};

export const buildRyuUrl = (path: string = ''): string => {
  return `${API_CONFIG.RYU_CONTROLLER.BASE_URL}${path}`;
};

// GitHub Repository
export const GITHUB_REPO = 'https://github.com/CursedOn3/PreDefense.git';
