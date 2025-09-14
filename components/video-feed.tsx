"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { VideoPlayer } from "./video-player"
import { ProductOverlay } from "./product-overlay"

const mockVideos = [
  {
    id: "1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
  },
  {
    id: "2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    creator: {
      name: "TechReviewer",
      avatar: "/tech-reviewer-avatar.png",
      verified: true,
      totalEarnings: 3200,
      reviewCount: 156,
    },
    products: [
      {
        id: "p3",
        name: "Wireless Earbuds Pro",
        price: 149,
        image: "/premium-wireless-earbuds-product-photo.jpg",
        position: { x: 50, y: 40 },
        commission: 20,
      },
    ],
    likes: 8900,
    comments: 156,
    shares: 45,
    description: "These earbuds changed my life! Sound quality is incredible 🎵 Full review in bio",
    type: "review" as const,
    rating: 4.8,
    reviewTitle: "Best Earbuds Under $150 - Honest Review",
    commissionEarned: 30,
  },
  {
    id: "3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    creator: {
      name: "BeautyQueen",
      avatar: "/beauty-influencer-avatar.jpg",
      verified: true,
      totalEarnings: 1890,
      reviewCount: 234,
    },
    products: [
      {
        id: "p4",
        name: "Luxury Foundation",
        price: 65,
        image: "/luxury-foundation-makeup-product.jpg",
        position: { x: 30, y: 25 },
        commission: 25,
      },
      {
        id: "p5",
        name: "Contour Palette",
        price: 42,
        image: "/contour-makeup-palette-product.jpg",
        position: { x: 70, y: 60 },
        commission: 18,
      },
    ],
    likes: 15600,
    comments: 892,
    shares: 156,
    description: "Get ready with me! Links to all products below ✨ #grwm #makeup #beauty",
    type: "tutorial" as const,
    commissionEarned: 67,
  },
  {
    id: "4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    creator: {
      name: "FitLifeCoach",
      avatar: "/fitness-coach-avatar.png",
      verified: true,
      totalEarnings: 2100,
      reviewCount: 78,
    },
    products: [
      {
        id: "p6",
        name: "Smart Fitness Watch",
        price: 299,
        image: "/smart-fitness-watch-product-photo.jpg",
        position: { x: 45, y: 35 },
        commission: 15,
      },
      {
        id: "p7",
        name: "Resistance Bands Set",
        price: 29,
        image: "/resistance-bands-workout-equipment.jpg",
        position: { x: 60, y: 65 },
        commission: 30,
      },
    ],
    likes: 7800,
    comments: 234,
    shares: 67,
    description: "My favorite workout gear! Use code FIT20 for 20% off 💪 #fitness #workout #gear",
    type: "unboxing" as const,
    commissionEarned: 53,
  },
]

function VideoFeed() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showProducts, setShowProducts] = useState(false)
  const [touchStart, setTouchStart] = useState<{ y: number; time: number } | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentVideo = mockVideos[currentVideoIndex]

  const handleScroll = useCallback(
    (direction: "up" | "down") => {
      if (direction === "down" && currentVideoIndex < mockVideos.length - 1) {
        setCurrentVideoIndex((prev) => prev + 1)
      } else if (direction === "up" && currentVideoIndex > 0) {
        setCurrentVideoIndex((prev) => prev - 1)
      }
      setShowProducts(false)
    },
    [currentVideoIndex],
  )

  const handleProductsToggle = useCallback(() => {
    setShowProducts((prev) => !prev)
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ y: touch.clientY, time: Date.now() })
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStart || isScrolling) return

      const touch = e.changedTouches[0]
      const deltaY = touchStart.y - touch.clientY
      const deltaTime = Date.now() - touchStart.time
      const velocity = Math.abs(deltaY) / deltaTime

      if (Math.abs(deltaY) > 50 && velocity > 0.3) {
        if (deltaY > 0) {
          handleScroll("down")
        } else {
          handleScroll("up")
        }
      }

      setTouchStart(null)
    },
    [touchStart, isScrolling, handleScroll],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchStart) return

      const touch = e.touches[0]
      const deltaY = Math.abs(touchStart.y - touch.clientY)

      if (deltaY > 10) {
        e.preventDefault()
        setIsScrolling(true)
      }
    },
    [touchStart],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handleScroll("up")
      if (e.key === "ArrowDown") handleScroll("down")
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: false })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
        container.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [handleTouchStart, handleTouchEnd, handleTouchMove, handleScroll])

  return (
    <div ref={containerRef} className="video-feed h-screen w-full">
      <VideoPlayer video={currentVideo} onProductsToggle={handleProductsToggle} onScroll={handleScroll} />
      {showProducts && <ProductOverlay products={currentVideo.products} />}
    </div>
  )
}

export default VideoFeed
