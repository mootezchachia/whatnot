"use client"

import { AuctionCard } from "./auction-card"

const mockAuctions = [
  {
    id: "1",
    title: "Vintage Designer Watch - Rare Collection",
    currentBid: 1250,
    startingBid: 500,
    buyNowPrice: 2000,
    bidCount: 23,
    timeLeft: 3600000, // 1 hour in milliseconds
    image: "/vintage-watch-auction.png",
    seller: "LuxuryCollector",
    category: "Jewelry",
    hasReserve: true,
    reserveMet: false,
    condition: "Excellent",
    shipping: "Free",
  },
  {
    id: "2",
    title: "Limited Edition Sneakers - Size 10",
    currentBid: 450,
    startingBid: 200,
    buyNowPrice: 800,
    bidCount: 18,
    timeLeft: 7200000, // 2 hours
    image: "/limited-sneakers-auction.png",
    seller: "SneakerHead",
    category: "Fashion",
    hasReserve: false,
    reserveMet: true,
    condition: "New",
    shipping: "$15",
  },
  {
    id: "3",
    title: "Original Art Painting - Abstract Modern",
    currentBid: 2800,
    startingBid: 1000,
    bidCount: 31,
    timeLeft: 86400000, // 24 hours
    image: "/abstract-art-auction.png",
    seller: "ArtistStudio",
    category: "Art",
    hasReserve: true,
    reserveMet: true,
    condition: "New",
    shipping: "$50",
  },
  {
    id: "4",
    title: "Gaming Console Bundle - Complete Set",
    currentBid: 680,
    startingBid: 300,
    buyNowPrice: 1200,
    bidCount: 42,
    timeLeft: 1800000, // 30 minutes
    image: "/gaming-console-auction.png",
    seller: "GameZone",
    category: "Electronics",
    hasReserve: false,
    reserveMet: true,
    condition: "Like New",
    shipping: "Free",
  },
  {
    id: "5",
    title: "Antique Jewelry Box - Victorian Era",
    currentBid: 320,
    startingBid: 150,
    bidCount: 12,
    timeLeft: 43200000, // 12 hours
    image: "/antique-jewelry-box.png",
    seller: "AntiqueDealer",
    category: "Collectibles",
    hasReserve: true,
    reserveMet: false,
    condition: "Good",
    shipping: "$25",
  },
  {
    id: "6",
    title: "Professional Camera Lens - 85mm",
    currentBid: 890,
    startingBid: 400,
    buyNowPrice: 1500,
    bidCount: 27,
    timeLeft: 21600000, // 6 hours
    image: "/camera-lens-auction.png",
    seller: "PhotoPro",
    category: "Electronics",
    hasReserve: false,
    reserveMet: true,
    condition: "Excellent",
    shipping: "Free",
  },
]

export function AuctionGrid() {
  return (
    <div>
      {/* Ending Soon */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-xl font-bold">Ending Soon</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAuctions
            .filter((auction) => auction.timeLeft < 7200000) // Less than 2 hours
            .map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
        </div>
      </div>

      {/* All Auctions */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </div>
  )
}
