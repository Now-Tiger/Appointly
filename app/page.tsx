import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import DarkManifesto from "../components/landing/DarkManifesto";
import HowItWorks from "../components/landing/HowItWorks";
import PricingSection from "../components/landing/PricingSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div
      className="bg-[#F5F5F3] min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DarkManifesto />
      <HowItWorks />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
