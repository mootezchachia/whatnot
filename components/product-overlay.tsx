"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  position: { x: number; y: number }
}

interface ProductOverlayProps {
  products: Product[]
  onClose: () => void
}

export function ProductOverlay({ products, onClose }: ProductOverlayProps) {
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
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Featured Products</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-3">${product.price}</p>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLike(product.id)}
                        className={likedProducts.has(product.id) ? "text-primary border-primary" : ""}
                      >
                        <Heart className={`h-4 w-4 ${likedProducts.has(product.id) ? "fill-primary" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
            View All Products in Store
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductOverlay
