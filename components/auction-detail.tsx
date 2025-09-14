"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Clock, Gavel, Heart, Share, ShoppingCart, Eye, Star, Truck } from "lucide-react"
import { useRouter } from "next/navigation"
import { AuctionVideoPlayer } from "./auction-video-player"

interface AuctionDetailProps {
  auctionId: string
}

const mockAuction = {
  id: "1",
  title: "Vintage Designer Watch - Rare Collection",
  description:
    "This is a rare vintage designer watch from the 1960s. In excellent condition with original box and papers. A true collector's piece that has been well-maintained and serviced regularly.",
  images: ["/placeholder-loqg1.png", "/placeholder-ejq1e.png", "/placeholder-riccc.png"],
  currentBid: 1250,
  startingBid: 500,
  buyNowPrice: 2000,
  bidCount: 23,
  timeLeft: 3600000, // 1 hour
  viewerCount: 342,
  seller: {
    name: "LuxuryCollector",
    avatar: "/placeholder-cblhr.png",
    rating: 4.9,
    feedback: 1247,
    verified: true,
  },
  category: "Jewelry",
  hasReserve: true,
  reserveMet: false,
  reservePrice: 1500,
  condition: "Excellent",
  shipping: "Free worldwide shipping",
  returns: "30-day return policy",
  watchers: 45,
  specifications: {
    Brand: "Vintage Luxury",
    Model: "Classic 1960",
    Movement: "Automatic",
    Case: "Stainless Steel",
    Diameter: "38mm",
    Water: "30m",
  },
}

export function AuctionDetail({ auctionId }: AuctionDetailProps) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(mockAuction.timeLeft)
  const [selectedImage, setSelectedImage] = useState(0)
  const [bidAmount, setBidAmount] = useState(mockAuction.currentBid + 25)
  const [isWatching, setIsWatching] = useState(false)
  const [showVideo, setShowVideo] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTimeLeft = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else {
      return `${minutes}m ${seconds}s`
    }
  }

  const handlePlaceBid = () => {
    // Handle bid placement
    console.log("Placing bid:", bidAmount)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsWatching(!isWatching)}>
                <Heart className={`h-5 w-5 ${isWatching ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images/Video */}
          <div>
            <div className="flex gap-2 mb-4">
              <Button variant={showVideo ? "default" : "outline"} size="sm" onClick={() => setShowVideo(true)}>
                Live Auction
              </Button>
              <Button variant={!showVideo ? "default" : "outline"} size="sm" onClick={() => setShowVideo(false)}>
                Product Images
              </Button>
            </div>

            {showVideo ? (
              <div className="h-96 mb-4">
                <AuctionVideoPlayer
                  auctionId={auctionId}
                  title={mockAuction.title}
                  currentBid={mockAuction.currentBid}
                  timeLeft={formatTimeLeft(timeLeft)}
                  bidderCount={mockAuction.bidCount}
                  viewerCount={mockAuction.viewerCount}
                  videoSrc="/placeholder-6woeu.png"
                />
              </div>
            ) : (
              <div className="relative mb-4">
                <img
                  src={mockAuction.images[selectedImage] || "/placeholder.svg"}
                  alt={mockAuction.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-red-500 hover:bg-red-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeLeft(timeLeft)}
                  </Badge>
                  {mockAuction.hasReserve && (
                    <Badge variant={mockAuction.reserveMet ? "default" : "destructive"}>
                      {mockAuction.reserveMet ? "Reserve Met" : "Reserve Not Met"}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 overflow-x-auto">
              {mockAuction.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                    setShowVideo(false)
                  }}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index && !showVideo ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Auction Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{mockAuction.title}</h1>

            {/* Current Bid */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-3xl font-bold text-primary">${mockAuction.currentBid}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Left</p>
                    <p className="text-xl font-semibold text-red-500">{formatTimeLeft(timeLeft)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span>{mockAuction.bidCount} bids</span>
                  <span>•</span>
                  <span>{mockAuction.watchers} watchers</span>
                  <span>•</span>
                  <span>{mockAuction.viewerCount} viewers</span>
                  <span>•</span>
                  <span>Starting: ${mockAuction.startingBid}</span>
                </div>

                {/* Bidding */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      min={mockAuction.currentBid + 25}
                      step={25}
                      className="flex-1"
                    />
                    <Button onClick={handlePlaceBid} className="px-6">
                      <Gavel className="h-4 w-4 mr-2" />
                      Place Bid
                    </Button>
                  </div>

                  {mockAuction.buyNowPrice && (
                    <Button variant="outline" className="w-full bg-transparent">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy It Now - ${mockAuction.buyNowPrice}
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsWatching(!isWatching)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isWatching ? "Watching" : "Watch"}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mockAuction.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{mockAuction.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{mockAuction.seller.name}</span>
                        {mockAuction.seller.verified && (
                          <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mockAuction.seller.rating}</span>
                        <span>({mockAuction.seller.feedback} feedback)</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{mockAuction.description}</p>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockAuction.shipping}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{mockAuction.returns}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(mockAuction.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
