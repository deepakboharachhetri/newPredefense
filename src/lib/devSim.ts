import { QueryClient } from '@tanstack/react-query';
import { apiKeys } from '@/services/api';

export const pushTrafficSample = (qc: QueryClient, range: string, sample: any) => {
  const key = apiKeys.traffic(range);
  qc.setQueryData(key, (old: any) => {
    const now = new Date().toISOString();
    if (!old) return { success: true, data: [sample], range, timestamp: now };

    // support both shapes: { data: [...] } or { data: { data: [...] } }
    if (Array.isArray(old.data)) {
      return { ...old, data: [...old.data, sample], timestamp: now };
    }
    if (old.data && Array.isArray(old.data.data)) {
      return { ...old, data: { ...old.data, data: [...old.data.data, sample] }, timestamp: now };
    }
    return { ...old, data: [sample], timestamp: now };
  });
};

export const pushThreat = (qc: QueryClient, threat: any) => {
  const key = apiKeys.threats;
  qc.setQueryData(key, (old: any) => {
    const now = new Date().toISOString();
    if (!old) return { success: true, data: [threat], timestamp: now };
    if (Array.isArray(old.data)) return { ...old, data: [threat, ...old.data], timestamp: now };
    if (old.data && Array.isArray(old.data.data)) {
      return { ...old, data: { ...old.data, data: [threat, ...old.data.data] }, timestamp: now };
    }
    return { ...old, data: [threat], timestamp: now };
  });
};

export const pushBlockedIP = (qc: QueryClient, blocked: any) => {
  const key = apiKeys.blockedIPs;
  qc.setQueryData(key, (old: any) => {
    const now = new Date().toISOString();
    if (!old) return { success: true, data: [blocked], timestamp: now };
    if (Array.isArray(old.data)) return { ...old, data: [blocked, ...old.data], timestamp: now };
    if (old.data && Array.isArray(old.data.data)) {
      return { ...old, data: { ...old.data, data: [blocked, ...old.data.data] }, timestamp: now };
    }
    return { ...old, data: [blocked], timestamp: now };
  });
};

export default {
  pushTrafficSample,
  pushThreat,
  pushBlockedIP,
};
