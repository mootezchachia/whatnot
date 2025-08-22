"use client"

import { ProductCard } from "./product-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface RelatedProductsProps {
  productId: string
}

const mockRelatedProducts = [
  {
    id: "2",
    name: "Premium Sneakers",
    price: 189,
    image: "/trendy-sneakers-product-photo.png",
    rating: 4.6,
    reviews: 89,
    isLiked: false,
    store: "FootwearPro",
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: 149,
    originalPrice: 199,
    image: "/wireless-earbuds-product-photo.png",
    rating: 4.9,
    reviews: 256,
    isLiked: true,
    badge: "Sale",
    store: "TechReviewer Store",
  },
]

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const [products, setProducts] = useState(mockRelatedProducts)

  const toggleLike = (id: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, isLiked: !product.isLiked } : product)),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onToggleLike={() => toggleLike(product.id)} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
