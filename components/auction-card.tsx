"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gavel, Clock, Eye, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Auction {
  id: string
  title: string
  currentBid: number
  startingBid: number
  buyNowPrice?: number
  bidCount: number
  timeLeft: number
  image: string
  seller: string
  category: string
  hasReserve: boolean
  reserveMet: boolean
  condition: string
  shipping: string
}

interface AuctionCardProps {
  auction: Auction
}

export function AuctionCard({ auction }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState(auction.timeLeft)
  const [isWatched, setIsWatched] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTimeLeft = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  const getTimeLeftColor = () => {
    if (timeLeft < 3600000) return "text-red-500" // Less than 1 hour
    if (timeLeft < 7200000) return "text-yellow-500" // Less than 2 hours
    return "text-green-500"
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/auctions/${auction.id}`}>
            <img
              src={auction.image || "/placeholder.svg"}
              alt={auction.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <Badge variant="secondary" className="text-xs">
              {auction.category}
            </Badge>
            {auction.hasReserve && (
              <Badge variant={auction.reserveMet ? "default" : "destructive"} className="text-xs">
                {auction.reserveMet ? "Reserve Met" : "Reserve"}
              </Badge>
            )}
          </div>

          {/* Watch Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={() => setIsWatched(!isWatched)}
          >
            <Heart className={`h-4 w-4 ${isWatched ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </Button>

          {/* Time Left */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            <Clock className="h-3 w-3" />
            <span className={getTimeLeftColor()}>{formatTimeLeft(timeLeft)}</span>
          </div>

          {/* Bid Count */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            <Eye className="h-3 w-3" />
            <span>{auction.bidCount} bids</span>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/auctions/${auction.id}`}>
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {auction.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Current Bid</p>
              <p className="text-xl font-bold text-primary">${auction.currentBid}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Starting Bid</p>
              <p className="text-sm font-medium">${auction.startingBid}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">by {auction.seller}</span>
            <span className="text-sm text-muted-foreground">{auction.condition}</span>
          </div>

          <div className="flex gap-2">
            <Link href={`/auctions/${auction.id}`} className="flex-1">
              <Button size="sm" className="w-full">
                <Gavel className="h-3 w-3 mr-2" />
                Place Bid
              </Button>
            </Link>
            {auction.buyNowPrice && (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <ShoppingCart className="h-3 w-3 mr-2" />
                Buy ${auction.buyNowPrice}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
