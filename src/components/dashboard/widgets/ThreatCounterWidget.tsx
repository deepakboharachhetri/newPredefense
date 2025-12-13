import { TrendingUp } from "lucide-react";

export const ThreatCounterWidget = () => {
  const blocked = 1042;
  const progress = 68; // percentage of daily predicted threats

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
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4 text-healthy" />
            <span className="text-sm text-healthy font-medium">+12%</span>
            <span className="text-sm text-muted-foreground">vs yesterday</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Blocked today • Predicted: 1,532
      </p>
    </div>
  );
};
