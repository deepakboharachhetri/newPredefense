import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2, Activity, Globe, Lock } from "lucide-react";

export const DashboardPreview = () => {
  return (
    <div className="relative mx-auto max-w-5xl perspective-1000">
      {/* Glow effect behind */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-violet/20 to-accent/20 blur-3xl scale-95 opacity-60" />
      
      {/* Main dashboard container */}
      <div className="relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden transform rotate-x-2 hover:rotate-x-0 transition-transform duration-500">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-amber-400/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              dashboard.predefense.io
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 bg-background-secondary/50">
          {/* Top stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={Shield}
              label="Threats Blocked"
              value="12,847"
              trend="+23%"
              color="primary"
            />
            <StatCard
              icon={Activity}
              label="System Health"
              value="99.9%"
              trend="Optimal"
              color="accent"
            />
            <StatCard
              icon={Globe}
              label="Active Monitors"
              value="156"
              trend="+12"
              color="violet"
            />
            <StatCard
              icon={AlertTriangle}
              label="Pending Alerts"
              value="3"
              trend="Low"
              color="warning"
            />
          </div>

          {/* Main content area */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Activity chart */}
            <div className="md:col-span-2 bg-card rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-foreground">Threat Activity</h3>
                <span className="text-xs text-muted-foreground">Last 24 hours</span>
              </div>
              <ActivityChart />
            </div>

            {/* Recent events */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <h3 className="text-sm font-medium text-foreground mb-4">Recent Events</h3>
              <div className="space-y-3">
                <EventItem
                  status="blocked"
                  message="IP 192.168.1.45 blocked"
                  time="2m ago"
                />
                <EventItem
                  status="resolved"
                  message="DDoS attempt mitigated"
                  time="8m ago"
                />
                <EventItem
                  status="blocked"
                  message="Suspicious login blocked"
                  time="15m ago"
                />
                <EventItem
                  status="resolved"
                  message="Auto-resolved: Rate limit"
                  time="23m ago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  color: "primary" | "accent" | "violet" | "warning";
}) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    violet: "text-violet bg-violet/10",
    warning: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="bg-card rounded-xl border border-border p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xl font-medium text-foreground">{value}</span>
        <span className="text-xs text-accent">{trend}</span>
      </div>
    </div>
  );
};

const ActivityChart = () => {
  const bars = [35, 55, 40, 70, 45, 60, 80, 55, 45, 65, 50, 75];
  
  return (
    <div className="flex items-end justify-between gap-2 h-32">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-primary"
        />
      ))}
    </div>
  );
};

const EventItem = ({
  status,
  message,
  time,
}: {
  status: "blocked" | "resolved";
  message: string;
  time: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2"
    >
      {status === "blocked" ? (
        <div className="p-1 rounded bg-destructive/10 text-destructive mt-0.5">
          <AlertTriangle className="w-3 h-3" />
        </div>
      ) : (
        <div className="p-1 rounded bg-accent/10 text-accent mt-0.5">
          <CheckCircle2 className="w-3 h-3" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground truncate">{message}</p>
        <p className="text-[10px] text-muted-foreground">{time}</p>
      </div>
    </motion.div>
  );
};
