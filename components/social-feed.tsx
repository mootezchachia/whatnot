"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SocialPost } from "@/components/social-post"
import { Users, TrendingUp, Clock } from "lucide-react"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Emma Wilson",
      username: "@emmastyle",
      avatar: "/fashion-influencer-avatar.png",
      isVerified: true,
    },
    content: "Just dropped my winter collection! 🔥 What do you think of this cozy sweater look?",
    image: "/cozy-winter-sweater.png",
    likes: 2340,
    comments: 156,
    shares: 89,
    timeAgo: "2h",
    isLiked: false,
    products: [{ name: "Cozy Winter Sweater", price: 59.99 }],
  },
  {
    id: 2,
    user: {
      name: "Style Maven",
      username: "@stylemaven",
      avatar: "/fashion-influencer-avatar.png",
      isVerified: false,
    },
    content: "Obsessed with this vintage find! Perfect for the holiday season ✨",
    image: "/vintage-designer-handbag.png",
    likes: 1890,
    comments: 92,
    shares: 45,
    timeAgo: "4h",
    isLiked: true,
    products: [{ name: "Vintage Designer Handbag", price: 245.0 }],
  },
]

export function SocialFeed() {
  const [activeFilter, setActiveFilter] = useState("following")

  const filters = [
    { id: "following", label: "Following", icon: Users },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "recent", label: "Recent", icon: Clock },
  ]

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="px-4">
        <div className="flex gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {filter.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts.map((post) => (
          <SocialPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
