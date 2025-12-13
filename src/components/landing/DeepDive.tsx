import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ResponsiveContainer, Area, AreaChart } from "recharts";
import { Zap, ArrowRight } from "lucide-react";

const chartData = [
  { value: 30 },
  { value: 45 },
  { value: 35 },
  { value: 60 },
  { value: 55 },
  { value: 80 },
  { value: 70 },
  { value: 90 },
  { value: 75 },
  { value: 85 },
  { value: 95 },
  { value: 88 },
];

export const DeepDive = () => {
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-background-secondary">
      <div className="container px-4">
        {/* Section 1: Real-Time Analytics */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-micro text-primary mb-3">Real-Time Analytics</p>
            <h2 className="text-h2 mb-6">
              See the <span className="gradient-text">invisible</span>
            </h2>
            <p className="text-body-light text-muted-foreground mb-6">
              Visualize traffic spikes and anomalies as they happen. Our real-time engine processes 
              millions of events per second, giving you instant visibility into your security posture.
            </p>
            <ul className="space-y-3 mb-8">
              <FeatureItem>Sub-second threat detection latency</FeatureItem>
              <FeatureItem>ML-powered anomaly detection</FeatureItem>
              <FeatureItem>Custom alerting thresholds</FeatureItem>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedChart />
          </motion.div>
        </div>

        {/* Section 2: Automated Response */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <RuleBuilder />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="label-micro text-accent mb-3">Automated Response</p>
            <h2 className="text-h2 mb-6">
              Sleep <span className="gradient-text">soundly</span>
            </h2>
            <p className="text-body-light text-muted-foreground mb-6">
              Set rules that trigger defensive protocols automatically. Define your security playbook 
              once, and let PreDefense execute it flawlessly around the clock.
            </p>
            <ul className="space-y-3">
              <FeatureItem>Visual rule builder</FeatureItem>
              <FeatureItem>Pre-built security playbooks</FeatureItem>
              <FeatureItem>Rollback and audit capabilities</FeatureItem>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-3 text-body text-foreground">
    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
      <ArrowRight className="w-3 h-3 text-accent" />
    </div>
    {children}
  </li>
);

const AnimatedChart = () => {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true });

  return (
    <div
      ref={chartRef}
      className="bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-h3 text-foreground">Traffic Analysis</h3>
          <p className="text-sm text-muted-foreground">Live monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="h-48">
        {isInView && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#chartGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Peak Traffic</p>
          <p className="text-lg font-medium text-foreground">2.4M req/s</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg Response</p>
          <p className="text-lg font-medium text-accent">12ms</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Blocked</p>
          <p className="text-lg font-medium text-destructive">847</p>
        </div>
      </div>
    </div>
  );
};

const RuleBuilder = () => {
  return (
    <div className="bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-accent/10">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-h3 text-foreground">Rule Builder</h3>
          <p className="text-sm text-muted-foreground">Automated response</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* IF condition */}
        <div className="bg-background-secondary rounded-xl p-4 border border-border">
          <span className="label-micro text-primary mb-2 block">IF</span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
              Traffic
            </span>
            <span className="text-muted-foreground">&gt;</span>
            <span className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-medium">
              1GB / min
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent"
          />
        </div>

        {/* THEN action */}
        <div className="bg-background-secondary rounded-xl p-4 border border-accent/20">
          <span className="label-micro text-accent mb-2 block">THEN</span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm font-medium">
              Block IP
            </span>
            <span className="text-muted-foreground">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-violet/10 text-violet text-sm font-medium">
              Alert Team
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Rule Status</span>
          <span className="flex items-center gap-2 text-sm text-accent">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Active
          </span>
        </div>
      </div>
    </div>
  );
};
