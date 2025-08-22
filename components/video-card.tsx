"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, ShoppingBag } from "lucide-react"

interface VideoCardProps {
  video: {
    id: number
    thumbnail: string
    likes: number
    comments: number
    shares: number
    creator: string
    products: Array<{
      name: string
      price: number
    }>
  }
}

export function VideoCard({ video }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="relative bg-card rounded-xl overflow-hidden border border-border">
      <div className="aspect-[9/16] relative">
        <img src={video.thumbnail || "/placeholder.svg"} alt="Video thumbnail" className="w-full h-full object-cover" />

        {/* Video overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Creator info */}
        <div className="absolute top-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">{video.creator.charAt(0)}</span>
            </div>
            <span className="text-white text-sm font-medium">{video.creator}</span>
          </div>
        </div>

        {/* Product tags */}
        {video.products.length > 0 && (
          <div className="absolute bottom-16 left-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {video.products[0].name} - ${video.products[0].price}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Interaction buttons */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-1 text-white">
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-sm">{video.likes.toLocaleString()}</span>
            </button>

            <button className="flex items-center gap-1 text-white">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{video.comments}</span>
            </button>

            <button className="flex items-center gap-1 text-white">
              <Share className="h-5 w-5" />
              <span className="text-sm">{video.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
