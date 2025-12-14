import { TrendingUp } from "lucide-react";
import { useDashboardStats } from "@/hooks/useApi";

export const ThreatCounterWidget = () => {
  const { data: statsResponse, isLoading, error } = useDashboardStats();
  const stats = statsResponse?.data;
  
  const blocked = stats?.threats_detected || 0;
  const eventsProcessed = stats?.events_processed || 0;
  const progress = eventsProcessed > 0 ? Math.min(Math.round((blocked / Math.max(eventsProcessed, 1)) * 100), 100) : 0;

  return (
    <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <h3 className="widget-header mb-4">Threats Neutralized</h3>
      
      <div className="flex items-center gap-4">
        {/* Ring Progress */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {/* Background ring */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="hsl(220, 13%, 91%)"
              strokeWidth="3"
            />
            {/* Progress ring */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${progress}, 100`}
              className="animate-ring"
              style={{ strokeDashoffset: 0 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground">{progress}%</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1">
          <p className="stat-number">{blocked.toLocaleString()}</p>
        </div>
      </div>

    </div>
  );
};
