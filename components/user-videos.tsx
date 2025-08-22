"use client"

import { Play, Heart } from "lucide-react"

const videos = [
  {
    id: 1,
    thumbnail: "/fashion-model-vertical-video.png",
    duration: "0:45",
    views: 12500,
    likes: 1250,
  },
  {
    id: 2,
    thumbnail: "/stylish-jacket-product-photo.png",
    duration: "1:20",
    views: 8900,
    likes: 892,
  },
]

export function UserVideos() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="relative aspect-[9/16] group">
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt="Video"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition-colors">
              <Play className="h-6 w-6 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>

          {/* Stats */}
          <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-xs">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{video.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
