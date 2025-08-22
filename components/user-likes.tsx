"use client"

import { Heart, ShoppingBag } from "lucide-react"

const likedPosts = [
  {
    id: 1,
    image: "/fashion-model-vertical-video.png",
    creator: "Fashion Guru",
    likes: 5600,
    hasProducts: true,
  },
  {
    id: 2,
    image: "/vintage-designer-handbag.png",
    creator: "Luxury Finds",
    likes: 3200,
    hasProducts: true,
  },
]

export function UserLikes() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {likedPosts.map((post) => (
        <div key={post.id} className="space-y-2">
          <div className="relative aspect-square">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Liked post"
              className="w-full h-full object-cover rounded-xl"
            />

            {post.hasProducts && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-3 w-3 text-primary" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">@{post.creator}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                <span>{post.likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
