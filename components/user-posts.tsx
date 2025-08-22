"use client"

import { Heart, MessageCircle, ShoppingBag } from "lucide-react"

const posts = [
  {
    id: 1,
    image: "/fashion-model-vertical-video.png",
    likes: 1250,
    comments: 89,
    hasProducts: true,
  },
  {
    id: 2,
    image: "/stylish-jacket-product-photo.png",
    likes: 892,
    comments: 45,
    hasProducts: true,
  },
  {
    id: 3,
    image: "/cozy-winter-sweater.png",
    likes: 2100,
    comments: 156,
    hasProducts: false,
  },
  {
    id: 4,
    image: "/minimalist-watch.png",
    likes: 756,
    comments: 32,
    hasProducts: true,
  },
]

export function UserPosts() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div key={post.id} className="relative aspect-square group">
          <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover rounded-lg" />

          {/* Product indicator */}
          {post.hasProducts && (
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-3 w-3 text-primary" />
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 fill-white" />
                <span className="text-sm font-medium">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 fill-white" />
                <span className="text-sm font-medium">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
