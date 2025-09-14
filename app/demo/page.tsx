"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/video-player"
import { LiveStreamPlayer } from "@/components/live-stream-player"
import { AuctionVideoPlayer } from "@/components/auction-video-player"
import { ProductOverlay } from "@/components/product-overlay"
import { Play, ShoppingBag, Users, Gavel, TrendingUp, DollarSign } from "lucide-react"

const demoVideo = {
  id: "demo-1",
  videoUrl: "/fashion-model-showcasing-designer-jacket-and-sneak.jpg",
  creator: {
    name: "StyleGuru",
    avatar: "/fashion-influencer-avatar.jpg",
    verified: true,
    totalEarnings: 2450,
    reviewCount: 89,
  },
  products: [
    {
      id: "p1",
      name: "Designer Jacket",
      price: 299,
      image: "/stylish-designer-jacket-product-photo.jpg",
      position: { x: 60, y: 30 },
      commission: 15,
    },
    {
      id: "p2",
      name: "Premium Sneakers",
      price: 189,
      image: "/trendy-premium-sneakers-product-photo.jpg",
      position: { x: 40, y: 70 },
      commission: 12,
    },
  ],
  likes: 12500,
  comments: 340,
  shares: 89,
  description: "Perfect outfit for the weekend! Get the look 👇 #fashion #style #ootd",
  type: "regular" as const,
  isSponsored: true,
  commissionEarned: 45,
}

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<"shoppable" | "live" | "auction">("shoppable")
  const [showProducts, setShowProducts] = useState(false)

  const handleProductsToggle = () => {
    setShowProducts(!showProducts)
  }

  const handleScroll = (direction: "up" | "down") => {
    // Demo scroll functionality
    console.log("[v0] Demo scroll:", direction)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">TikTok Shop App</h1>
            <p className="text-xl text-white/80 mb-6">Next-Generation Social Commerce Platform</p>
            <div className="flex justify-center gap-4">
              <Badge className="bg-green-500 text-white px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Live Demo Ready
              </Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue Generating
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Demo Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeDemo === "shoppable" ? "default" : "outline"}
            onClick={() => setActiveDemo("shoppable")}
            className="px-6 py-3"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Shoppable Videos
          </Button>
          <Button
            variant={activeDemo === "live" ? "default" : "outline"}
            onClick={() => setActiveDemo("live")}
            className="px-6 py-3"
          >
            <Users className="h-4 w-4 mr-2" />
            Live Shopping
          </Button>
          <Button
            variant={activeDemo === "auction" ? "default" : "outline"}
            onClick={() => setActiveDemo("auction")}
            className="px-6 py-3"
          >
            <Gavel className="h-4 w-4 mr-2" />
            Live Auctions
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Demo */}
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Play className="h-5 w-5" />
                {activeDemo === "shoppable" && "Interactive Shoppable Video"}
                {activeDemo === "live" && "Live Shopping Stream"}
                {activeDemo === "auction" && "Live Auction Experience"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-96 lg:h-[600px] bg-black rounded-lg overflow-hidden">
                {activeDemo === "shoppable" && (
                  <>
                    <VideoPlayer video={demoVideo} onProductsToggle={handleProductsToggle} onScroll={handleScroll} />
                    {showProducts && <ProductOverlay products={demoVideo.products} />}
                  </>
                )}
                {activeDemo === "live" && <LiveStreamPlayer streamId="demo-live" />}
                {activeDemo === "auction" && (
                  <AuctionVideoPlayer
                    auctionId="demo-auction"
                    title="Vintage Designer Watch - Live Auction"
                    currentBid={1250}
                    timeLeft="23m 45s"
                    bidderCount={23}
                    viewerCount={342}
                    videoSrc="/auction-livestream-showing-luxury-watch-being-auct.jpg"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Key Features Demonstrated</CardTitle>
              </CardHeader>
              <CardContent>
                {activeDemo === "shoppable" && (
                  <div className="space-y-4 text-white/80">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Interactive Product Tags</h4>
                        <p className="text-sm">
                          Clickable product overlays with real-time pricing and commission tracking
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Creator Monetization</h4>
                        <p className="text-sm">Commission tracking, earnings display, and sponsored content support</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Social Engagement</h4>
                        <p className="text-sm">Likes, comments, shares with real-time interaction tracking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Content Types</h4>
                        <p className="text-sm">Reviews, unboxings, tutorials with specialized UI elements</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeDemo === "live" && (
                  <div className="space-y-4 text-white/80">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Real-time Streaming</h4>
                        <p className="text-sm">Live viewer count, real-time engagement, and host verification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Co-hosting Features</h4>
                        <p className="text-sm">Multi-host support with revenue sharing and collaborative streaming</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Multicasting</h4>
                        <p className="text-sm">Simultaneous streaming to YouTube, Facebook, and other platforms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Live Commerce</h4>
                        <p className="text-sm">Real-time product showcase with instant purchase capabilities</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeDemo === "auction" && (
                  <div className="space-y-4 text-white/80">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Live Bidding</h4>
                        <p className="text-sm">Real-time bid updates with countdown timers and bid history</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Auction Management</h4>
                        <p className="text-sm">Reserve prices, buy-now options, and seller verification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Live Video Integration</h4>
                        <p className="text-sm">Video streaming during auctions with interactive bidding overlay</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white">Viewer Engagement</h4>
                        <p className="text-sm">Live viewer count, bidder tracking, and social interactions</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">40+</div>
                    <div className="text-sm text-white/70">Features Implemented</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-white/70">Video Commerce Types</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">100%</div>
                    <div className="text-sm text-white/70">Mobile Optimized</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">Ready</div>
                    <div className="text-sm text-white/70">For Production</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border-green-400/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ready for Investment</h3>
                <p className="text-white/80 mb-4">
                  Complete social commerce platform with advanced video features, monetization tools, and scalable
                  architecture.
                </p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8">
                  View Full Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
