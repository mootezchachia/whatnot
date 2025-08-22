import VideoFeed from "@/components/video-feed"
import BottomNavigation from "@/components/bottom-navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative">
      <VideoFeed />
      <BottomNavigation />
    </div>
  )
}
