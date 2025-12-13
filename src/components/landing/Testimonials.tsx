import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "PreDefense transformed our security operations. We went from reactive firefighting to proactive threat hunting. The automation alone saved us 40 hours per week.",
    author: "Sarah Chen",
    role: "CISO",
    company: "TechFlow Inc.",
  },
  {
    quote: "The Bento-style dashboard gives us complete visibility without overwhelming our team. It's security that actually makes sense.",
    author: "Marcus Johnson",
    role: "Security Lead",
    company: "DataSync",
  },
  {
    quote: "Integration with our existing tools was seamless. Slack alerts, Jira tickets, it all just works. Our mean time to respond dropped by 80%.",
    author: "Emily Rodriguez",
    role: "VP of Engineering",
    company: "CloudNine",
  },
  {
    quote: "Finally, a security platform that doesn't require a PhD to operate. Our entire team adopted it within days, not months.",
    author: "David Park",
    role: "DevOps Manager",
    company: "InnovateTech",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-background" />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="label-micro text-primary mb-3">Testimonials</p>
          <h2 className="text-h2">Trusted by security leaders</h2>
        </motion.div>

        {/* Carousel container */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl border border-border p-8 lg:p-12 shadow-xl relative"
            >
              {/* Quote mark */}
              <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />

              <blockquote className="text-xl lg:text-2xl font-light text-foreground mb-8 relative z-10 leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-violet flex items-center justify-center text-primary-foreground font-medium">
                  {testimonials[current].author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonials[current].author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role} at {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
