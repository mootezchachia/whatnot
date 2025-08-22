"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Heart,
  Share,
  MoreVertical,
  Eye,
  Gift,
  ShoppingBag,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Users,
  Crown,
} from "lucide-react"
import { useRouter } from "next/navigation"
import CoHostManager from "./co-host-manager"
import MulticastDashboard from "./multicast-dashboard"

interface LiveStreamPlayerProps {
  streamId: string
}

const mockStream = {
  id: "1",
  title: "Fashion Haul - New Winter Collection",
  host: {
    name: "StyleGuru",
    avatar: "/fashion-influencer-avatar.png",
    verified: true,
    followers: 12500,
  },
  viewers: 1247,
  likes: 8934,
  isLive: true,
  duration: "45:32",
  category: "Fashion",
  hasCoHosts: true,
  coHostCount: 2,
  isMulticasting: true,
  multicastPlatforms: ["YouTube", "Facebook"],
}

export function LiveStreamPlayer({ streamId }: LiveStreamPlayerProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [viewerCount, setViewerCount] = useState(mockStream.viewers)
  const [showCoHostPanel, setShowCoHostPanel] = useState(false)
  const [showMulticastPanel, setShowMulticastPanel] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <img src="/live-fashion-stream.png" alt="Live stream" className="w-full h-full object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 hover:bg-red-500 text-white">
                <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                LIVE
              </Badge>
              <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                <Eye className="h-3 w-3" />
                <span>{viewerCount.toLocaleString()}</span>
              </div>
              {mockStream.hasCoHosts && (
                <Badge variant="secondary" className="bg-purple-500/80 text-white">
                  <Users className="h-3 w-3 mr-1" />+{mockStream.coHostCount}
                </Badge>
              )}
              {mockStream.isMulticasting && (
                <Badge variant="secondary" className="bg-blue-500/80 text-white">
                  <Share className="h-3 w-3 mr-1" />
                  {mockStream.multicastPlatforms.length}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mockStream.hasCoHosts && (
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setShowCoHostPanel(!showCoHostPanel)}
              >
                <Users className="h-5 w-5" />
              </Button>
            )}
            {mockStream.isMulticasting && (
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setShowMulticastPanel(!showMulticastPanel)}
              >
                <Share className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/50 text-white hover:bg-black/70">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/50 text-white hover:bg-black/70">
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Host Info */}
      <div className="absolute top-20 left-4 right-4 z-10">
        <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={mockStream.host.avatar || "/placeholder.svg"} />
              <AvatarFallback>{mockStream.host.name[0]}</AvatarFallback>
            </Avatar>
            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{mockStream.host.name}</span>
              {mockStream.host.verified && (
                <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
              <Badge variant="secondary" className="text-xs bg-amber-500/80 text-white">
                Host
              </Badge>
            </div>
            <p className="text-sm text-white/80">{mockStream.host.followers.toLocaleString()} followers</p>
          </div>
          <Button
            size="sm"
            variant={isFollowing ? "outline" : "default"}
            className={isFollowing ? "bg-white/20 text-white border-white/30" : ""}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      {/* Co-Host Management Panel */}
      {showCoHostPanel && (
        <div className="absolute top-32 right-4 z-20">
          <CoHostManager />
        </div>
      )}

      {/* Multicast Dashboard Panel */}
      {showMulticastPanel && (
        <div className="absolute top-32 left-4 z-20">
          <MulticastDashboard />
        </div>
      )}

      {/* Stream Title */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        <h1 className="text-xl font-bold text-white mb-2">{mockStream.title}</h1>
        {mockStream.isMulticasting && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-white/80">Also streaming on:</span>
            {mockStream.multicastPlatforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs bg-blue-500/80 text-white">
                {platform}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              {(mockStream.likes + (isLiked ? 1 : 0)).toLocaleString()}
            </Button>

            <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70">
              <Gift className="h-4 w-4 mr-1" />
              Gift
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/50 text-white hover:bg-black/70">
              <Share className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/50 text-white hover:bg-black/70">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Product Showcase */}
      <div className="absolute right-4 bottom-32 z-10">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 animate-pulse">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Shop Now
        </Button>
      </div>
    </div>
  )
}
