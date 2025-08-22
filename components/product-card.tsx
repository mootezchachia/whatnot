"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isLiked: boolean
  badge?: string
  store: string
}

interface ProductCardProps {
  product: Product
  onToggleLike: () => void
}

export function ProductCard({ product, onToggleLike }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/shop/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <Badge variant={product.badge === "Sale" ? "destructive" : "secondary"} className="text-xs">
                {product.badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={onToggleLike}
          >
            <Heart className={cn("h-4 w-4", product.isLiked ? "fill-primary text-primary" : "text-muted-foreground")} />
          </Button>
        </div>

        <div className="p-3">
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground mb-2">{product.store}</p>

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>

            <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
              <ShoppingCart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
