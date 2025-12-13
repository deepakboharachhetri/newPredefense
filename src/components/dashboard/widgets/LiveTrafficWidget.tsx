import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const generateTrafficData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    return {
      time: hour.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      requests: Math.floor(Math.random() * 500) + 200 + Math.sin(i / 3) * 100,
    };
  });
};

const data = generateTrafficData();

export const LiveTrafficWidget = () => {
  return (
    <div className="card-elevated p-6 col-span-2 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="widget-header">Live Traffic</h3>
          <p className="text-2xl font-medium text-foreground mt-1 tabular-nums">
            1,247 <span className="text-sm text-muted-foreground font-normal">req/s</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-critical/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-critical opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-critical" />
          </span>
          <span className="text-xs font-medium text-critical">LIVE</span>
        </div>
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
              dataKey="requests"
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
