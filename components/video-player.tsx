"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, ShoppingBag, MoreVertical, Play, Star, DollarSign, VideoIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  image: string
  position: { x: number; y: number }
  commission?: number
}

interface Creator {
  name: string
  avatar: string
  verified: boolean
  totalEarnings?: number
  reviewCount?: number
}

interface Video {
  id: string
  videoUrl: string
  creator: Creator
  products: Product[]
  likes: number
  comments: number
  shares: number
  description: string
  type?: "regular" | "review" | "unboxing" | "tutorial"
  rating?: number
  reviewTitle?: string
  isSponsored?: boolean
  commissionEarned?: number
}

interface VideoPlayerProps {
  video: Video
  onProductsToggle: () => void
  onScroll: (direction: "up" | "down") => void
  onCreateReview?: (productId: string) => void
}

export function VideoPlayer({ video, onProductsToggle, onScroll, onCreateReview }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [video.id])

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="relative h-full w-full bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center" onClick={handlePlayPause}>
          {!isPlaying && (
            <div className="rounded-full bg-black/50 p-4">
              <Play className="h-12 w-12 text-white" fill="white" />
            </div>
          )}
        </div>
      </div>

      {video.type && video.type !== "regular" && (
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
            {video.type === "review" && <Star className="h-3 w-3 mr-1" />}
            {video.type === "unboxing" && <ShoppingBag className="h-3 w-3 mr-1" />}
            {video.type === "tutorial" && <VideoIcon className="h-3 w-3 mr-1" />}
            {video.type.charAt(0).toUpperCase() + video.type.slice(1)}
          </Badge>
        </div>
      )}

      {video.isSponsored && (
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-black/50 text-white border-white/20">
            Sponsored
          </Badge>
        </div>
      )}

      {/* Product Tags */}
      {video.products.map((product) => (
        <div key={product.id}>
          <button
            className="absolute animate-pulse"
            style={{
              left: `${product.position.x}%`,
              top: `${product.position.y}%`,
            }}
            onClick={onProductsToggle}
          >
            <div className="flex items-center gap-2 rounded-full bg-black/80 px-3 py-2 shadow-lg backdrop-blur-sm">
              <ShoppingBag className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">${product.price}</span>
              {product.commission && (
                <Badge variant="secondary" className="text-xs px-1 py-0 bg-green-600 text-white border-green-700">
                  {product.commission}%
                </Badge>
              )}
            </div>
          </button>

          {onCreateReview && (
            <button
              className="absolute"
              style={{
                left: `${product.position.x}%`,
                top: `${product.position.y + 8}%`,
              }}
              onClick={() => onCreateReview(product.id)}
            >
              <div className="flex items-center gap-1 rounded-full bg-green-500/90 px-2 py-1 shadow-lg backdrop-blur-sm">
                <VideoIcon className="h-3 w-3 text-white" />
                <span className="text-xs font-medium text-white">Review</span>
              </div>
            </button>
          )}
        </div>
      ))}

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={video.creator.avatar || "/placeholder.svg"} />
            <AvatarFallback>{video.creator.name[0]}</AvatarFallback>
          </Avatar>
          {video.creator.verified && <div className="h-3 w-3 rounded-full bg-primary" />}
          {video.creator.totalEarnings && (
            <div className="text-xs text-white bg-green-500 px-2 py-1 rounded-full">${video.creator.totalEarnings}</div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={handleLike}
        >
          <Heart className={cn("h-6 w-6", isLiked && "fill-primary text-primary")} />
        </Button>
        <div className="text-center text-xs text-white">{(video.likes + (isLiked ? 1 : 0)).toLocaleString()}</div>

        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="text-center text-xs text-white">{video.comments.toLocaleString()}</div>

        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40">
          <Share className="h-6 w-6" />
        </Button>
        <div className="text-center text-xs text-white">{video.shares}</div>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={onProductsToggle}
        >
          <ShoppingBag className="h-6 w-6" />
        </Button>

        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-semibold text-white">@{video.creator.name}</span>
          {video.creator.verified && (
            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          )}
          {video.type === "review" && video.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm font-medium">{video.rating}/5</span>
            </div>
          )}
        </div>

        {video.type === "review" && video.reviewTitle && (
          <h3 className="text-white font-semibold mb-2">{video.reviewTitle}</h3>
        )}

        <p className="text-white text-sm leading-relaxed mb-4">{video.description}</p>

        {video.products.length > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={onProductsToggle}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Shop Now ({video.products.length} items)
            </Button>
            {video.commissionEarned && (
              <Badge variant="secondary" className="bg-green-700 text-white border-green-800">
                <DollarSign className="h-3 w-3 mr-1" />
                Earned ${video.commissionEarned}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicators */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={() => onScroll("up")}
        >
          ↑
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={() => onScroll("down")}
        >
          ↓
        </Button>
      </div>
    </div>
  )
}

export default VideoPlayer
