import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const generateHistoricalData = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      volume: Math.floor(Math.random() * 50000) + 10000,
    };
  });
};

const data = generateHistoricalData();

export const HistoricalWidget = () => {
  return (
    <div className="card-elevated p-6 col-span-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="widget-header">MongoDB Historical Ingestion</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Log volume over the last 30 days
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-medium text-foreground tabular-nums">
            1.2M
          </p>
          <p className="text-xs text-muted-foreground">Total logs</p>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(215, 16%, 47%)" }}
              interval={4}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(215, 16%, 47%)" }}
              width={45}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={{ fill: "hsl(220, 13%, 91%)", radius: 4 }}
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
                padding: "12px",
              }}
              labelStyle={{ color: "hsl(215, 28%, 17%)", fontWeight: 500, marginBottom: 4 }}
              formatter={(value: number) => [`${value.toLocaleString()} logs`, "Volume"]}
            />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]} maxBarSize={16}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? "hsl(199, 89%, 48%)" : "hsl(199, 89%, 48%, 0.4)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Click a bar to explore logs for that day
      </p>
    </div>
  );
};
