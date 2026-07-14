import CallToAction from "@/components/home/CallToAction";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import LatestAdditions from "@/components/home/LatestAdditions";
import SafetyProtocols from "@/components/home/SafetyProtocols";
import TrendingInsights from "@/components/home/TrendingInsights";
import TrustSection from "@/components/home/TrustSection";
import Workflow from "@/components/home/Workflow";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <LatestAdditions />
      <Categories />
      <Workflow />
      <TrustSection />
      <Features />
      <TrendingInsights />
      <SafetyProtocols />
      <CallToAction />
    </div>
  );
};

export default HomePage;