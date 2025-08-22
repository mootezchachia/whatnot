"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, ShoppingBag, MoreHorizontal, Star } from "lucide-react"

interface SocialPostProps {
  post: {
    id: number
    user: {
      name: string
      username: string
      avatar: string
      isVerified: boolean
    }
    content: string
    image: string
    likes: number
    comments: number
    shares: number
    timeAgo: string
    isLiked: boolean
    products: Array<{
      name: string
      price: number
    }>
  }
}

export function SocialPost({ post }: SocialPostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.user.avatar || "/placeholder.svg"}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {post.user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Star className="h-2 w-2 text-white fill-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{post.user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {post.user.username} • {post.timeAgo}
            </p>
          </div>
        </div>

        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full aspect-square object-cover" />

        {/* Product Tags */}
        {post.products.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground text-sm">{post.products[0].name}</p>
                  <p className="text-primary font-semibold">${post.products[0].price}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-2 group">
              <Heart
                className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground group-hover:text-red-500"}`}
              />
              <span className="text-sm font-medium text-foreground">{likesCount.toLocaleString()}</span>
            </button>

            <button className="flex items-center gap-2 group">
              <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground">{post.comments}</span>
            </button>

            <button className="flex items-center gap-2 group">
              <Share className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground">{post.shares}</span>
            </button>
          </div>

          {post.products.length > 0 && (
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Shop Now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
