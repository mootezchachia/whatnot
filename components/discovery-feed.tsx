"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { LiveStreamCard } from "@/components/live-stream-card"
import { AuctionCard } from "@/components/auction-card"
import { VideoCard } from "@/components/video-card"
import { StoreCard } from "@/components/store-card"

const feedItems = [
  {
    id: 1,
    type: "product",
    data: {
      id: 1,
      name: "Trendy Oversized Jacket",
      price: 89.99,
      originalPrice: 129.99,
      image: "/stylish-jacket-product-photo.png",
      rating: 4.8,
      reviews: 234,
      store: "Fashion Forward",
      isLiked: false,
      discount: 31,
    },
  },
  {
    id: 2,
    type: "live",
    data: {
      id: 1,
      title: "Flash Sale: Up to 70% Off!",
      host: "Sarah Chen",
      viewers: 1234,
      thumbnail: "/fashion-model-vertical-video.png",
      isLive: true,
      category: "Fashion",
    },
  },
  {
    id: 3,
    type: "auction",
    data: {
      id: 1,
      title: "Vintage Designer Handbag",
      currentBid: 245.0,
      timeLeft: "2h 15m",
      image: "/vintage-designer-handbag.png",
      bidCount: 23,
      category: "Luxury",
    },
  },
  {
    id: 4,
    type: "video",
    data: {
      id: 1,
      thumbnail: "/fashion-model-vertical-video.png",
      likes: 12500,
      comments: 89,
      shares: 234,
      creator: "Style Guru",
      products: [
        { name: "Denim Jacket", price: 79.99 },
        { name: "White Sneakers", price: 129.99 },
      ],
    },
  },
  {
    id: 5,
    type: "store",
    data: {
      id: 1,
      name: "Urban Threads",
      description: "Trendy streetwear for the modern generation",
      image: "/urban-fashion-logo.png",
      followers: 45600,
      rating: 4.9,
      productCount: 234,
      isFollowing: false,
    },
  },
]

export function DiscoveryFeed() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: "All" },
    { id: "products", label: "Products" },
    { id: "live", label: "Live" },
    { id: "auctions", label: "Auctions" },
    { id: "videos", label: "Videos" },
    { id: "stores", label: "Stores" },
  ]

  const filteredItems =
    activeFilter === "all"
      ? feedItems
      : feedItems.filter((item) => {
          if (activeFilter === "products") return item.type === "product"
          if (activeFilter === "live") return item.type === "live"
          if (activeFilter === "auctions") return item.type === "auction"
          if (activeFilter === "videos") return item.type === "video"
          if (activeFilter === "stores") return item.type === "store"
          return true
        })

  const renderFeedItem = (item: any) => {
    switch (item.type) {
      case "product":
        return <ProductCard key={item.id} product={item.data} />
      case "live":
        return <LiveStreamCard key={item.id} stream={item.data} />
      case "auction":
        return <AuctionCard key={item.id} auction={item.data} />
      case "video":
        return <VideoCard key={item.id} video={item.data} />
      case "store":
        return <StoreCard key={item.id} store={item.data} />
      default:
        return null
    }
  }

  return (
    <div className="px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Discover</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter.id)}
            className="whitespace-nowrap"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-2 gap-4">{filteredItems.map(renderFeedItem)}</div>
    </div>
  )
}
