"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = ["All", "Fashion", "Electronics", "Beauty", "Home", "Sports", "Books", "Toys"]

const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Rating", value: "rating" },
]

export function ProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSort, setSelectedSort] = useState("popular")

  return (
    <div className="mb-6">
      {/* Categories */}
      <div className="mb-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-1">
            {sortOptions.map((option) => (
              <Badge
                key={option.value}
                variant={selectedSort === option.value ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedSort(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
        <span className="text-sm text-muted-foreground">1,234 products</span>
      </div>
    </div>
  )
}
