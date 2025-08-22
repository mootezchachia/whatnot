"use client"

import { AuctionCard } from "./auction-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedAuctionsProps {
  auctionId: string
}

const mockRelatedAuctions = [
  {
    id: "2",
    title: "Limited Edition Sneakers - Size 10",
    currentBid: 450,
    startingBid: 200,
    buyNowPrice: 800,
    bidCount: 18,
    timeLeft: 7200000,
    image: "/limited-sneakers-auction.png",
    seller: "SneakerHead",
    category: "Fashion",
    hasReserve: false,
    reserveMet: true,
    condition: "New",
    shipping: "$15",
  },
  {
    id: "6",
    title: "Professional Camera Lens - 85mm",
    currentBid: 890,
    startingBid: 400,
    buyNowPrice: 1500,
    bidCount: 27,
    timeLeft: 21600000,
    image: "/camera-lens-auction.png",
    seller: "PhotoPro",
    category: "Electronics",
    hasReserve: false,
    reserveMet: true,
    condition: "Excellent",
    shipping: "Free",
  },
]

export function RelatedAuctions({ auctionId }: RelatedAuctionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Similar Auctions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRelatedAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
