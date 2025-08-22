"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = ["All", "Electronics", "Fashion", "Art", "Collectibles", "Jewelry", "Home", "Sports"]

const sortOptions = [
  { label: "Ending Soon", value: "ending-soon" },
  { label: "Newly Listed", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Bids", value: "most-bids" },
]

const auctionTypes = [
  { label: "All Types", value: "all" },
  { label: "No Reserve", value: "no-reserve" },
  { label: "Reserve", value: "reserve" },
  { label: "Buy It Now", value: "buy-now" },
]

export function AuctionFilters() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSort, setSelectedSort] = useState("ending-soon")
  const [selectedType, setSelectedType] = useState("all")

  return (
    <div className="mb-6">
      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
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

      {/* Auction Types */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Auction Type</h3>
        <div className="flex gap-2 flex-wrap">
          {auctionTypes.map((type) => (
            <Badge
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </Badge>
          ))}
        </div>
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
        <span className="text-sm text-muted-foreground">156 auctions</span>
      </div>
    </div>
  )
}
