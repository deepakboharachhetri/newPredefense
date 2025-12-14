import { cn } from "@/lib/utils";
import { useDashboardStats } from "@/hooks/useApi";

interface VitalBarProps {
  label: string;
  value: number;
  unit: string;
  color: "primary" | "purple" | "healthy";
}

const VitalBar = ({ label, value, unit, color }: VitalBarProps) => {
  const colorClasses = {
    primary: "bg-primary",
    purple: "bg-purple-500",
    healthy: "bg-healthy",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground tabular-nums">
          {value}{unit}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 animate-breathe origin-left",
            colorClasses[color]
          )}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
};

export const SystemVitalsWidget = () => {
  const { data: statsResponse } = useDashboardStats();
  const stats = statsResponse?.data;
  
  const connectedSwitches = stats?.connected_switches || 0;
  const uptimeHours = Math.floor((stats?.uptime_seconds || 0) / 3600);
  
  return (
    <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h3 className="widget-header mb-6">System Vitals</h3>
      
      <div className="space-y-5">
        <VitalBar label="CPU Load" value={45} unit="%" color="primary" />
        <VitalBar label="Memory" value={60} unit="%" color="purple" />
        <VitalBar label="Active Blocks" value={stats?.active_blocks || 0} unit="" color="healthy" />
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-healthy" />
          <span className="text-xs text-muted-foreground">
            {connectedSwitches} switch{connectedSwitches !== 1 ? 'es' : ''} connected • Uptime: {uptimeHours}h
          </span>
        </div>
      </div>
    </div>
  );
};
