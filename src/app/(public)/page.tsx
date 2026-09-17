import HeroSection from "@/components/home/HeroSection";
import LatestStories from "@/components/home/LatestStories";
import TrendingList from "@/components/home/TrendingList";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import InspirationalBanner from "@/components/home/InspirationalBanner";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <HeroSection />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column (Main Content) */}
          <div className="lg:w-[70%]">
            <LatestStories />
            <FeaturedCategories />
          </div>
          
          {/* Right Column (Sidebar) */}
          <div className="lg:w-[30%] pt-12 lg:pt-20">
            <TrendingList />
          </div>
          
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <InspirationalBanner />
      </div>
    </main>
  );
}
