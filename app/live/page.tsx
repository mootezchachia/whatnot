import { LiveStreamGrid } from "@/components/live-stream-grid"
import { LiveStreamHeader } from "@/components/live-stream-header"

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background">
      <LiveStreamHeader />
      <div className="container mx-auto px-4 py-6">
        <LiveStreamGrid />
      </div>
    </div>
  )
}
