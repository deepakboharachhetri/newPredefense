import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, apiKeys } from '@/services/api';

// Health Check Hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: apiKeys.health,
    queryFn: () => apiService.checkHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Dashboard Stats Hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: apiKeys.stats,
    queryFn: () => apiService.getDashboardStats(),
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

// Threats Hook
export const useThreats = () => {
  return useQuery({
    queryKey: apiKeys.threats,
    queryFn: () => apiService.getThreats(),
    refetchInterval: 2000, // Real-time updates every 2 seconds
  });
};

// Blocked IPs Hook
export const useBlockedIPs = () => {
  return useQuery({
    queryKey: apiKeys.blockedIPs,
    queryFn: () => apiService.getBlockedIPs(),
    refetchInterval: 5000,
  });
};

// Traffic Data Hook
export const useTrafficData = (timeRange: string = '24h') => {
  return useQuery({
    queryKey: apiKeys.traffic(timeRange),
    queryFn: () => apiService.getTrafficData(timeRange),
    refetchInterval: 2000,
  });
};

// Alerts Hook
export const useAlerts = () => {
  return useQuery({
    queryKey: apiKeys.alerts,
    queryFn: () => apiService.getAlerts(),
    refetchInterval: 2000,
  });
};

// Block IP Mutation
export const useBlockIP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ip, duration, reason }: { ip: string; duration?: number; reason?: string }) => 
      apiService.blockIP(ip, duration, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.blockedIPs });
      queryClient.invalidateQueries({ queryKey: apiKeys.threats });
    },
  });
};

// Unblock IP Mutation
export const useUnblockIP = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ip: string) => apiService.unblockIP(ip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeys.blockedIPs });
    },
  });
};

// Settings Mutation
export const useUpdateSettings = () => {
  return useMutation({
    mutationFn: (settings: Record<string, any>) => 
      apiService.updateSettings(settings),
  });
};
