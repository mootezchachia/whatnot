"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, Users, Package } from "lucide-react"

interface StoreCardProps {
  store: {
    id: number
    name: string
    description: string
    image: string
    followers: number
    rating: number
    productCount: number
    isFollowing: boolean
  }
}

export function StoreCard({ store }: StoreCardProps) {
  const [isFollowing, setIsFollowing] = useState(store.isFollowing)

  return (
    <div className="bg-card rounded-xl p-4 border border-border space-y-3">
      <div className="flex items-start gap-3">
        <img src={store.image || "/placeholder.svg"} alt={store.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{store.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{store.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{(store.followers / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{store.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4" />
          <span>{store.productCount}</span>
        </div>
      </div>

      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        className="w-full"
        onClick={() => setIsFollowing(!isFollowing)}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  )
}
