"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

interface StoreProductsProps {
  storeId: string
}

const mockStoreProducts = [
  {
    id: "1",
    name: "Designer Jacket",
    price: 299,
    originalPrice: 399,
    image: "/stylish-jacket-product-photo.png",
    rating: 4.8,
    reviews: 124,
    isLiked: false,
    badge: "Best Seller",
    store: "StyleGuru Store",
  },
  {
    id: "4",
    name: "Premium Leather Boots",
    price: 249,
    image: "/leather-boots-product.png",
    rating: 4.7,
    reviews: 89,
    isLiked: false,
    store: "StyleGuru Store",
  },
  {
    id: "5",
    name: "Silk Scarf Collection",
    price: 89,
    originalPrice: 129,
    image: "/silk-scarf-product.png",
    rating: 4.9,
    reviews: 156,
    isLiked: true,
    badge: "New",
    store: "StyleGuru Store",
  },
  {
    id: "6",
    name: "Vintage Sunglasses",
    price: 159,
    image: "/vintage-sunglasses-product.png",
    rating: 4.6,
    reviews: 78,
    isLiked: false,
    store: "StyleGuru Store",
  },
]

export function StoreProducts({ storeId }: StoreProductsProps) {
  const [products, setProducts] = useState(mockStoreProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const toggleLike = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, isLiked: !product.isLiked } : product)),
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Products ({products.length})</CardTitle>
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onToggleLike={() => toggleLike(product.id)} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
