"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { User, Sparkles } from "lucide-react"

const recommendedProducts = [
  {
    id: 1,
    name: "Cozy Winter Sweater",
    price: 59.99,
    originalPrice: 89.99,
    image: "/cozy-winter-sweater.png",
    rating: 4.7,
    reviews: 156,
    store: "Comfort Zone",
    isLiked: false,
    discount: 33,
    reason: "Based on your recent views",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 129.99,
    originalPrice: 179.99,
    image: "/minimalist-watch.png",
    rating: 4.9,
    reviews: 89,
    store: "Time Pieces",
    isLiked: true,
    discount: 28,
    reason: "Similar to your favorites",
  },
]

export function PersonalizedRecommendations() {
  return (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Just For You</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="space-y-2">
            <ProductCard product={product} />
            <div className="flex items-center gap-1 px-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{product.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
