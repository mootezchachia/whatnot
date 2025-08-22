import { SearchHeader } from "@/components/search-header"
import { DiscoveryFeed } from "@/components/discovery-feed"
import { TrendingSection } from "@/components/trending-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedContent } from "@/components/featured-content"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />

      <div className="pb-20">
        {/* Featured Content Banner */}
        <FeaturedContent />

        {/* Category Navigation */}
        <CategoryGrid />

        {/* Trending Section */}
        <TrendingSection />

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />

        {/* Main Discovery Feed */}
        <DiscoveryFeed />
      </div>
    </div>
  )
}
