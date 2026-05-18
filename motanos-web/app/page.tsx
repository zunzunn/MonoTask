import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <PricingSection />
        <MissionSection />
      </main>
      <Footer />
    </div>
  );
}