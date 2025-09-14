"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Volume2, VolumeX, Maximize, Eye, Gavel, Timer } from "lucide-react"

interface AuctionVideoPlayerProps {
  auctionId: string
  title: string
  currentBid: number
  timeLeft: string
  bidderCount: number
  viewerCount: number
  videoSrc: string
}

export function AuctionVideoPlayer({
  auctionId,
  title,
  currentBid,
  timeLeft,
  bidderCount,
  viewerCount,
  videoSrc,
}: AuctionVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      if (videoSrc && videoSrc.includes(".mp4")) {
        video.load()
        video.play().catch((error) => {
          console.log("[v0] Video autoplay failed:", error)
          setIsPlaying(false)
        })
      } else {
        console.log("[v0] Using placeholder image instead of video")
        setIsPlaying(false)
      }
    }
  }, [videoSrc])

  return (
    <div className="relative h-full bg-black rounded-lg overflow-hidden">
      {/* Auction Video */}
      {videoSrc && videoSrc.includes(".mp4") ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onLoadStart={() => console.log("[v0] Video loading started")}
          onCanPlay={() => console.log("[v0] Video can play")}
          onError={(e) => console.log("[v0] Video error:", e)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <img
            src={videoSrc || "/placeholder.svg?height=400&width=600&query=live auction stream"}
            alt="Live Auction Stream"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Live Auction Badge */}
      <div className="absolute top-4 left-4">
        <Badge className="bg-red-500 hover:bg-red-500 text-white">
          <Gavel className="h-3 w-3 mr-1" />
          LIVE AUCTION
        </Badge>
      </div>

      {/* Viewer Count */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
          <Eye className="h-3 w-3" />
          <span>{viewerCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center" onClick={handlePlayPause}>
        {!isPlaying && (
          <div className="rounded-full bg-black/50 p-4">
            <Play className="h-12 w-12 text-white" fill="white" />
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
              onClick={handleMuteToggle}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 text-white hover:bg-black/70">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Auction Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">${currentBid.toLocaleString()}</div>
              <div className="text-xs text-white/70">Current Bid</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-400 flex items-center gap-1">
                <Timer className="h-4 w-4" />
                {timeLeft}
              </div>
              <div className="text-xs text-white/70">Time Left</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-400">{bidderCount}</div>
              <div className="text-xs text-white/70">Bidders</div>
            </div>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6">Place Bid</Button>
        </div>
      </div>
    </div>
  )
}
