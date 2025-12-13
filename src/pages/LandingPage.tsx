import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { DeepDive } from "@/components/landing/DeepDive";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustedBy />
      <BentoGrid />
      <DeepDive />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
};

export default LandingPage;
