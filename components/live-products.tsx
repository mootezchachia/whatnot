"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star } from "lucide-react"

interface LiveProductsProps {
  streamId: string
}

const mockLiveProducts = [
  {
    id: "1",
    name: "Designer Winter Jacket",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    liveDiscount: 25,
    featured: true,
  },
  {
    id: "2",
    name: "Premium Leather Boots",
    price: 189,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    liveDiscount: 15,
    featured: false,
  },
  {
    id: "3",
    name: "Silk Scarf Collection",
    price: 89,
    originalPrice: 129,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 156,
    inStock: false,
    liveDiscount: 30,
    featured: false,
  },
]

export function LiveProducts({ streamId }: LiveProductsProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts)
    if (newLiked.has(productId)) {
      newLiked.delete(productId)
    } else {
      newLiked.add(productId)
    }
    setLikedProducts(newLiked)
  }

  return (
    <Card className="border-b border-border rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Featured Products</CardTitle>
        <p className="text-sm text-muted-foreground">Live exclusive deals</p>
      </CardHeader>
      <CardContent className="space-y-4 max-h-80 overflow-y-auto">
        {mockLiveProducts.map((product) => (
          <div key={product.id} className="relative">
            {product.featured && (
              <Badge className="absolute -top-2 -right-2 z-10 bg-primary animate-pulse">Featured</Badge>
            )}

            <Card className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    {product.liveDiscount > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs px-1">
                        -{product.liveDiscount}%
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary text-sm">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleLike(product.id)}>
                          <Heart
                            className={`h-3 w-3 ${
                              likedProducts.has(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                        <Button size="sm" className="h-6 px-2 text-xs" disabled={!product.inStock}>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          {product.inStock ? "Add" : "Sold Out"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
