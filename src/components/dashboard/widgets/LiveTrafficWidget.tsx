import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTrafficData, useBlockIP } from "@/hooks/useApi";
import { useQueryClient } from '@tanstack/react-query';
import devSim from '@/lib/devSim';
import { apiService } from '@/services/api';

export const LiveTrafficWidget = () => {
  const { data: trafficResponse, isLoading, error } = useTrafficData('24h');
  const queryClient = useQueryClient();
  const blockMut = useBlockIP();
  // Backend may return { success: true, data: [...] } or directly an array
  const trafficArray: any[] = Array.isArray(trafficResponse?.data)
    ? trafficResponse.data
    : Array.isArray(trafficResponse?.data?.data)
    ? trafficResponse.data.data
    : [];

  // Convert API items to points. Backend may return either:
  // - cumulative totals (inbound/outbound increasing over time)
  // - or already per-sample rates (small numbers)
  const points = trafficArray.map((item: any) => ({
    ts: item?.timestamp ? new Date(item.timestamp).getTime() : Date.now(),
    inbound: Number(item?.inbound ?? 0),
    outbound: Number(item?.outbound ?? 0),
  }));

  // If most samples are < 2, treat values as per-sample rates already.
  const sampleValues = points.map((p) => p.inbound + p.outbound);
  const smallSamples = sampleValues.filter((v) => v < 2).length;
  const assumeRates = points.length > 0 && smallSamples / points.length > 0.6;

  // Compute per-second rates between consecutive samples and format for chart
  const rawRates: { ts: number; rate: number }[] = [];
  for (let i = Math.max(0, points.length - 48); i < points.length; i++) {
    const cur = points[i];
    const prev = points[i - 1];
    if (!cur) continue;

    if (assumeRates) {
      // Use inbound+outbound directly as rate
      rawRates.push({ ts: cur.ts, rate: cur.inbound + cur.outbound });
      continue;
    }

    // Otherwise compute delta / dt
    let rate = 0;
    if (prev) {
      const dt = (cur.ts - prev.ts) / 1000;
      if (dt > 0) {
        const curTotal = (cur.inbound || 0) + (cur.outbound || 0);
        const prevTotal = (prev.inbound || 0) + (prev.outbound || 0);
        rate = Math.max(0, (curTotal - prevTotal) / dt);
      }
    }
    rawRates.push({ ts: cur.ts, rate });
  }

  // Smooth rates with a simple moving average over last 3 samples to avoid tiny jitter
  const rates: { time: string; rate: number }[] = rawRates.map((r, idx) => {
    const window = rawRates.slice(Math.max(0, idx - 2), idx + 1);
    const avg = window.reduce((s, x) => s + x.rate, 0) / Math.max(1, window.length);
    return {
      time: new Date(r.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      rate: Number(avg.toFixed(2)),
    };
  });

  const data = rates.length > 0 ? rates : [{ time: "00:00", rate: 0 }];
  const latestRate = data[data.length - 1]?.rate || 0;

  const simulateAttack = async () => {
    const ip = `198.51.100.${Math.floor(Math.random() * 250) + 1}`;
    const sample = {
      timestamp: new Date().toISOString(),
      inbound: 12000,
      outbound: 4000,
      threats: 25,
    };

    // inject a traffic spike into cache for UI verification
    devSim.pushTrafficSample(queryClient, '24h', sample);

    // inject a threat into cache
    const threat = {
      id: `sim-${Date.now()}`,
      type: 'DDoS - Simulated',
      severity: 'critical',
      ip,
      timestamp: new Date().toISOString(),
      description: 'Simulated DDoS attack for UI testing',
      status: 'active',
    };
    devSim.pushThreat(queryClient, threat);

    // try to call backend block API; on failure, fall back to injecting blocked IP locally
    try {
      const resp = await apiService.blockIP(ip, 600, 'Auto-block from simulation');
      if (!resp.success) throw new Error(resp.error || 'block failed');
      // on success, invalidate blocked IPs so UI will refresh from backend
      queryClient.invalidateQueries({ queryKey: ['blockedIPs'] });
    } catch (e) {
      // fallback: push blocked ip directly into cache
      const blocked = {
        id: `sim-block-${Date.now()}`,
        ip,
        country: 'ZZ',
        country_code: 'ZZ',
        reason: 'Auto-block (simulated)',
        blocked_at: new Date().toISOString(),
      };
      devSim.pushBlockedIP(queryClient, blocked);
    }
  };

  return (
    <div className="card-elevated p-6 col-span-2 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="widget-header">Live Traffic</h3>
          <p className="text-2xl font-medium text-foreground mt-1 tabular-nums">
            {latestRate.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">req/s</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-critical/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-critical opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-critical" />
          </span>
          <span className="text-xs font-medium text-critical">LIVE</span>
        </div>
        <button
          onClick={simulateAttack}
          className="ml-3 text-xs px-2 py-1 rounded-md bg-muted/20 hover:bg-muted/40 text-muted-foreground"
          title="Simulate traffic spike and block"
        >
          Simulate
        </button>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(0, 0%, 100%)", 
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
                padding: "12px"
              }}
              labelStyle={{ color: "hsl(215, 28%, 17%)", fontWeight: 500, marginBottom: 4 }}
              itemStyle={{ color: "hsl(199, 89%, 48%)" }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              fill="url(#trafficGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
