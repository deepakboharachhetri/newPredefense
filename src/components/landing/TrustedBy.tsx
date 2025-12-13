import { motion } from "framer-motion";

const companies = [
  "Acme Corp",
  "TechFlow",
  "DataSync",
  "CloudNine",
  "SecureNet",
  "InnovateTech",
  "CyberGuard",
  "NextGen AI",
];

export const TrustedBy = () => {
  return (
    <section className="py-16 bg-background-secondary/50 border-y border-border/50">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Securing data for forward-thinking teams
        </motion.p>

        {/* Logo marquee */}
        <div className="relative overflow-hidden group">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background-secondary/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background-secondary/50 to-transparent z-10" />

          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...companies, ...companies].map((company, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-8 lg:px-12 transition-all duration-400 grayscale hover:grayscale-0 opacity-50 hover:opacity-100"
              >
                <div className="flex items-center justify-center h-12 px-6 rounded-lg bg-muted/50 border border-border/50">
                  <span className="text-lg font-medium text-foreground whitespace-nowrap">
                    {company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
