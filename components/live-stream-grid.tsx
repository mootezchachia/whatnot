"use client"

import { LiveStreamCard } from "./live-stream-card"

const mockLiveStreams = [
  {
    id: "1",
    title: "Fashion Haul - New Winter Collection",
    host: {
      name: "StyleGuru",
      avatar: "/fashion-influencer-avatar.jpg",
      verified: true,
    },
    thumbnail: "/placeholder-37w16.png",
    viewers: 1247,
    isLive: true,
    category: "Fashion",
    products: [
      { name: "Designer Jacket", price: 299 },
      { name: "Winter Boots", price: 189 },
    ],
  },
  {
    id: "2",
    title: "Tech Review - Latest Gadgets",
    host: {
      name: "TechReviewer",
      avatar: "/tech-reviewer-avatar.png",
      verified: true,
    },
    thumbnail: "/placeholder-75fco.png",
    viewers: 892,
    isLive: true,
    category: "Tech",
    products: [
      { name: "Wireless Earbuds", price: 149 },
      { name: "Smart Watch", price: 299 },
    ],
  },
  {
    id: "3",
    title: "Beauty Tutorial - Makeup Essentials",
    host: {
      name: "BeautyQueen",
      avatar: "/beauty-influencer-avatar.jpg",
      verified: true,
    },
    thumbnail: "/placeholder-mfja9.png",
    viewers: 2156,
    isLive: true,
    category: "Beauty",
    products: [
      { name: "Makeup Palette", price: 79 },
      { name: "Skincare Set", price: 129 },
    ],
  },
  {
    id: "4",
    title: "Home Decor Ideas - Cozy Living",
    host: {
      name: "HomeDesigner",
      avatar: "/placeholder-azy85.png",
      verified: false,
    },
    thumbnail: "/placeholder.svg?height=300&width=400",
    viewers: 456,
    isLive: false,
    category: "Lifestyle",
    products: [
      { name: "Throw Pillows", price: 39 },
      { name: "Wall Art", price: 89 },
    ],
  },
]

export function LiveStreamGrid() {
  return (
    <div>
      {/* Live Now Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-xl font-bold">Live Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLiveStreams
            .filter((stream) => stream.isLive)
            .map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
        </div>
      </div>

      {/* Recent Streams */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLiveStreams
            .filter((stream) => !stream.isLive)
            .map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
        </div>
      </div>
    </div>
  )
}
