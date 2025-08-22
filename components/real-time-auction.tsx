"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Gavel, TrendingUp, Users } from "lucide-react"

interface Bid {
  id: string
  bidderId: string
  bidderName: string
  bidderAvatar?: string
  amount: number
  timestamp: Date
}

interface AuctionData {
  id: string
  title: string
  description: string
  image: string
  startPrice: number
  currentBid: number
  minIncrement: number
  endsAt: Date
  status: "scheduled" | "live" | "extended" | "ended"
  bidCount: number
  viewerCount: number
  softExtendSeconds: number
}

interface RealTimeAuctionProps {
  auctionId: string
  initialData: AuctionData
  userId: string
  userName: string
}

export default function RealTimeAuction({ auctionId, initialData, userId, userName }: RealTimeAuctionProps) {
  const [auction, setAuction] = useState<AuctionData>(initialData)
  const [bids, setBids] = useState<Bid[]>([])
  const [bidAmount, setBidAmount] = useState("")
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [isConnected, setIsConnected] = useState(false)
  const [bidding, setBidding] = useState(false)

  const calculateTimeLeft = useCallback(() => {
    const now = new Date()
    const end = new Date(auction.endsAt)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) {
      setTimeLeft("ENDED")
      return
    }

    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    if (diff <= auction.softExtendSeconds * 1000) {
      setTimeLeft(`${seconds}s (EXTENDING)`)
    } else if (minutes > 0) {
      setTimeLeft(`${minutes}m ${seconds}s`)
    } else {
      setTimeLeft(`${seconds}s`)
    }
  }, [auction.endsAt, auction.softExtendSeconds])

  useEffect(() => {
    const connectToAuction = () => {
      setIsConnected(true)

      // Simulate real-time bid updates
      const interval = setInterval(() => {
        if (Math.random() > 0.7 && auction.status === "live") {
          const newBid: Bid = {
            id: Date.now().toString(),
            bidderId: `user_${Math.floor(Math.random() * 1000)}`,
            bidderName: `Bidder ${Math.floor(Math.random() * 100)}`,
            amount: auction.currentBid + auction.minIncrement + Math.floor(Math.random() * 500),
            timestamp: new Date(),
          }

          setBids((prev) => [newBid, ...prev.slice(0, 9)])
          setAuction((prev) => ({
            ...prev,
            currentBid: newBid.amount,
            bidCount: prev.bidCount + 1,
            // Soft extend if bid comes in near the end
            endsAt:
              new Date(prev.endsAt).getTime() - Date.now() <= prev.softExtendSeconds * 1000
                ? new Date(Date.now() + prev.softExtendSeconds * 1000)
                : prev.endsAt,
          }))
        }
      }, 3000)

      return () => {
        clearInterval(interval)
        setIsConnected(false)
      }
    }

    const cleanup = connectToAuction()
    return cleanup
  }, [auction.currentBid, auction.minIncrement, auction.softExtendSeconds, auction.status])

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const handlePlaceBid = async () => {
    const amount = Number.parseInt(bidAmount)
    const minBid = auction.currentBid + auction.minIncrement

    if (amount < minBid) {
      alert(`Minimum bid is $${(minBid / 100).toFixed(2)}`)
      return
    }

    setBidding(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newBid: Bid = {
        id: Date.now().toString(),
        bidderId: userId,
        bidderName: userName,
        amount: amount,
        timestamp: new Date(),
      }

      setBids((prev) => [newBid, ...prev.slice(0, 9)])
      setAuction((prev) => ({
        ...prev,
        currentBid: amount,
        bidCount: prev.bidCount + 1,
        // Soft extend logic
        endsAt:
          new Date(prev.endsAt).getTime() - Date.now() <= prev.softExtendSeconds * 1000
            ? new Date(Date.now() + prev.softExtendSeconds * 1000)
            : prev.endsAt,
      }))

      setBidAmount("")
    } catch (error) {
      alert("Failed to place bid. Please try again.")
    } finally {
      setBidding(false)
    }
  }

  const getStatusColor = () => {
    switch (auction.status) {
      case "live":
        return "bg-red-500"
      case "extended":
        return "bg-amber-500"
      case "ended":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Auction Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{auction.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor()} text-white`}>{auction.status.toUpperCase()}</Badge>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                {isConnected ? "Connected" : "Disconnected"}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">{auction.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">${(auction.currentBid / 100).toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Current Bid</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{timeLeft}</div>
                  <div className="text-sm text-gray-600">Time Left</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Gavel className="w-4 h-4" />
                  {auction.bidCount} bids
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {auction.viewerCount} watching
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bidding Section */}
      {auction.status === "live" || auction.status === "extended" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Place Your Bid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder={`Min: $${((auction.currentBid + auction.minIncrement) / 100).toFixed(2)}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1"
                min={(auction.currentBid + auction.minIncrement) / 100}
                step="0.01"
              />
              <Button
                onClick={handlePlaceBid}
                disabled={
                  bidding || !bidAmount || Number.parseInt(bidAmount) < auction.currentBid + auction.minIncrement
                }
                className="px-8"
              >
                {bidding ? "Bidding..." : "Place Bid"}
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Minimum bid: ${((auction.currentBid + auction.minIncrement) / 100).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ) : null}

      {/* Live Bid Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Bid Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {bids.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No bids yet. Be the first to bid!</p>
            ) : (
              bids.map((bid) => (
                <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={bid.bidderAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{bid.bidderName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{bid.bidderName}</div>
                      <div className="text-sm text-gray-600">{bid.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">${(bid.amount / 100).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
