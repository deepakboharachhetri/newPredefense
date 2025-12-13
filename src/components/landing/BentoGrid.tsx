import { motion } from "framer-motion";
import { Shield, Activity, Database, Zap, MessageSquare, Mail, TicketCheck, Terminal } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const BentoGrid = () => {
  return (
    <section id="features" className="py-24 lg:py-32 bg-background">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="label-micro text-primary mb-3">Core Capabilities</p>
          <h2 className="text-h2 max-w-2xl mx-auto">
            Everything you need for{" "}
            <span className="gradient-text">proactive security</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card A - Control Center (spans 2 cols) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="md:col-span-2 group"
          >
            <div className="h-full bg-card rounded-3xl border border-border p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shine-effect noise-overlay">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-2xl bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <span className="label-micro bg-accent/10 text-accent px-3 py-1 rounded-full">Real-time</span>
              </div>
              <h3 className="text-h3 text-foreground mb-2">Instant IP Blocking</h3>
              <p className="text-body-light text-muted-foreground mb-6">
                Neutralize threats at the source with one click. Automatically quarantine suspicious IPs with intelligent threat scoring.
              </p>
              
              {/* Mock IP blocking UI */}
              <div className="bg-background-secondary rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">Blocked IPs</span>
                  <span className="text-xs text-accent">3 blocked today</span>
                </div>
                <div className="space-y-2">
                  <IPRow ip="192.168.45.127" threat="High" blocked />
                  <IPRow ip="10.0.0.234" threat="Medium" blocked />
                  <IPRow ip="172.16.0.89" threat="Critical" blocked />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card B - System Health */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="group"
          >
            <div className="h-full bg-card rounded-3xl border border-border p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shine-effect noise-overlay">
              <div className="p-3 rounded-2xl bg-accent/10 mb-6 w-fit">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-h3 text-foreground mb-2">99.9% Uptime</h3>
              <p className="text-body-light text-muted-foreground mb-6">
                Real-time system health monitoring with instant alerts.
              </p>
              
              {/* Radial gauge */}
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="url(#gauge-gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="352"
                      initial={{ strokeDashoffset: 352 }}
                      whileInView={{ strokeDashoffset: 3.52 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <defs>
                      <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--accent))" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-medium text-foreground">99.9%</span>
                    <span className="text-xs text-muted-foreground">Uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card C - MongoDB History */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="group"
          >
            <div className="h-full bg-card rounded-3xl border border-border p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shine-effect noise-overlay">
              <div className="p-3 rounded-2xl bg-violet/10 mb-6 w-fit">
                <Database className="w-6 h-6 text-violet" />
              </div>
              <h3 className="text-h3 text-foreground mb-2">Historical Forensics</h3>
              <p className="text-body-light text-muted-foreground mb-6">
                Infinite retention backed by MongoDB for complete audit trails.
              </p>
              
              {/* Database stack visualization */}
              <div className="flex flex-col items-center gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="w-20 h-4 rounded-sm bg-gradient-to-r from-violet/40 to-violet/20 border border-violet/30"
                    style={{ transform: `perspective(500px) rotateX(${20 - i * 5}deg)` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card D - Omnichannel Alerting (spans 2 cols) */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="md:col-span-2 group"
          >
            <div className="h-full bg-card rounded-3xl border border-border p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shine-effect noise-overlay">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-violet/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-h3 text-foreground mb-2">Broadcast Intelligence</h3>
              <p className="text-body-light text-muted-foreground mb-8">
                Push alerts to the tools you already use. Post incidents to Slack, Jira, or email instantly.
              </p>
              
              {/* Integration visualization */}
              <div className="relative flex items-center justify-center py-8">
                {/* Center node */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-violet flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                
                {/* Connection lines and nodes */}
                <IntegrationNode icon={MessageSquare} label="Slack" position="left" delay={0} />
                <IntegrationNode icon={TicketCheck} label="Jira" position="top" delay={0.1} />
                <IntegrationNode icon={Mail} label="Email" position="right" delay={0.2} />
                <IntegrationNode icon={Terminal} label="API" position="bottom" delay={0.3} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const IPRow = ({ ip, threat, blocked }: { ip: string; threat: string; blocked: boolean }) => {
  const threatColors = {
    High: "text-amber-500 bg-amber-500/10",
    Medium: "text-amber-400 bg-amber-400/10",
    Critical: "text-destructive bg-destructive/10",
  };
  
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-card rounded-lg border border-border">
      <span className="text-sm font-mono text-foreground">{ip}</span>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-0.5 rounded-full ${threatColors[threat as keyof typeof threatColors]}`}>
          {threat}
        </span>
        {blocked && (
          <span className="text-xs text-accent">Blocked</span>
        )}
      </div>
    </div>
  );
};

const IntegrationNode = ({
  icon: Icon,
  label,
  position,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  position: "left" | "right" | "top" | "bottom";
  delay: number;
}) => {
  const positionClasses = {
    left: "absolute left-0 top-1/2 -translate-y-1/2",
    right: "absolute right-0 top-1/2 -translate-y-1/2",
    top: "absolute top-0 left-1/2 -translate-x-1/2",
    bottom: "absolute bottom-0 left-1/2 -translate-x-1/2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={positionClasses[position]}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <span className="text-[10px] text-muted-foreground">{label}</span>
      </div>
    </motion.div>
  );
};
