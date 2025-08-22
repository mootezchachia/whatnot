"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { VideoPlayer } from "./video-player"
import { ProductOverlay } from "./product-overlay"

const mockVideos = [
  {
    id: "1",
    videoUrl: "/fashion-model-vertical-video.png",
    creator: {
      name: "StyleGuru",
      avatar: "/fashion-influencer-avatar.png",
      verified: true,
    },
    products: [
      {
        id: "p1",
        name: "Designer Jacket",
        price: 299,
        image: "/stylish-jacket-product-photo.png",
        position: { x: 60, y: 30 },
      },
      {
        id: "p2",
        name: "Premium Sneakers",
        price: 189,
        image: "/trendy-sneakers-product-photo.png",
        position: { x: 40, y: 70 },
      },
    ],
    likes: 12500,
    comments: 340,
    shares: 89,
    description: "Perfect outfit for the weekend! Get the look 👇",
  },
  {
    id: "2",
    videoUrl: "/tech-reviewer-vertical-video.png",
    creator: {
      name: "TechReviewer",
      avatar: "/tech-reviewer-avatar.png",
      verified: true,
    },
    products: [
      {
        id: "p3",
        name: "Wireless Earbuds",
        price: 149,
        image: "/wireless-earbuds-product-photo.png",
        position: { x: 50, y: 40 },
      },
    ],
    likes: 8900,
    comments: 156,
    shares: 45,
    description: "These earbuds changed my life! Sound quality is incredible 🎵",
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
