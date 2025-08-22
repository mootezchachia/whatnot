"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"

const mockProducts = [
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
    id: "2",
    name: "Premium Sneakers",
    price: 189,
    image: "/trendy-sneakers-product-photo.png",
    rating: 4.6,
    reviews: 89,
    isLiked: true,
    badge: "New",
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
    isLiked: false,
    badge: "Sale",
    store: "TechReviewer Store",
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 299,
    image: "/smart-watch-product.png",
    rating: 4.7,
    reviews: 178,
    isLiked: false,
    store: "GadgetHub",
  },
  {
    id: "5",
    name: "Leather Handbag",
    price: 159,
    originalPrice: 229,
    image: "/leather-handbag-product.png",
    rating: 4.5,
    reviews: 92,
    isLiked: true,
    badge: "Limited",
    store: "LuxuryBags Co",
  },
  {
    id: "6",
    name: "Gaming Headset",
    price: 79,
    image: "/gaming-headset-product.png",
    rating: 4.4,
    reviews: 145,
    isLiked: false,
    store: "GameZone",
  },
]

export function ProductGrid() {
  const [products, setProducts] = useState(mockProducts)

  const toggleLike = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, isLiked: !product.isLiked } : product)),
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onToggleLike={() => toggleLike(product.id)} />
      ))}
    </div>
  )
}
