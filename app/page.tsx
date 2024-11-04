import CommunityHighlights from "@/components/landing/community-highlights";
import FeaturesGrid from "@/components/landing/features-grid";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import StatsSection from "@/components/landing/stats-section";
import AirQualityCard from "@/components/landing/air-quality-card";

const defaultStats = {
  total_users: 1000,
  total_items_recycled: 50000,
  co2_saved: 25,
  active_centers: 42,
};

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection defaultStats={defaultStats} />
      <StatsSection stats={defaultStats} />
      <HowItWorks />
      <FeaturesGrid />
      <AirQualityCard />
      <CommunityHighlights />
    </div>
  );
}
