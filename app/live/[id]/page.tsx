import { LiveStreamPlayer } from "@/components/live-stream-player"
import { LiveChat } from "@/components/live-chat"
import { LiveProducts } from "@/components/live-products"

interface LiveStreamPageProps {
  params: {
    id: string
  }
}

export default function LiveStreamPage({ params }: LiveStreamPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Stream */}
        <div className="flex-1 relative">
          <LiveStreamPlayer streamId={params.id} />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-background flex flex-col">
          <LiveProducts streamId={params.id} />
          <LiveChat streamId={params.id} />
        </div>
      </div>
    </div>
  )
}
