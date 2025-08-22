"use client"

import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Trendy Oversized Jacket",
    price: 89.99,
    originalPrice: 129.99,
    image: "/stylish-jacket-product-photo.png",
    rating: 4.8,
    reviews: 234,
    store: "Sarah's Style",
    isLiked: false,
    discount: 31,
  },
  {
    id: 2,
    name: "Cozy Winter Sweater",
    price: 59.99,
    originalPrice: 89.99,
    image: "/cozy-winter-sweater.png",
    rating: 4.7,
    reviews: 156,
    store: "Sarah's Style",
    isLiked: true,
    discount: 33,
  },
]

export function UserProducts() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
