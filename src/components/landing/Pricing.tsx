import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Sentry",
    description: "For small teams getting started",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "Up to 5 team members",
      "Basic IP blocking",
      "Email alerts",
      "7-day log retention",
      "Community support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Guardian",
    description: "For growing security teams",
    monthlyPrice: 149,
    yearlyPrice: 119,
    features: [
      "Up to 25 team members",
      "Advanced threat detection",
      "Slack, Jira integrations",
      "MongoDB history (90 days)",
      "Rule automation engine",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Vanguard",
    description: "For enterprise security ops",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Unlimited team members",
      "Custom integrations",
      "Unlimited retention",
      "Dedicated account manager",
      "SLA guarantees",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="label-micro text-primary mb-3">Pricing</p>
          <h2 className="text-h2 mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-body-light text-muted-foreground max-w-xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day trial.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-14 h-7 rounded-full bg-muted border border-border transition-colors"
            aria-label="Toggle billing period"
          >
            <motion.div
              animate={{ x: yearly ? 26 : 2 }}
              transition={{ duration: 0.2 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-violet"
            />
          </button>
          <span className={`text-sm flex items-center gap-1 ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly
            <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-3xl ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/5 to-violet/5 border-2 border-primary/20 shadow-xl scale-105"
                  : "bg-card border border-border"
              } p-6 lg:p-8`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-violet text-primary-foreground text-xs font-medium shadow-glow">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`mb-6 ${plan.highlighted ? "pt-2" : ""}`}>
                <h3 className="text-h3 text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-medium text-foreground">
                      ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-medium text-foreground">Custom</div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
