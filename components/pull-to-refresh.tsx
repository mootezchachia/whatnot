"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  className?: string
}

export function PullToRefresh({ children, onRefresh, threshold = 80, className }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(false)
  const startY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (window.scrollY > 0 || isRefreshing) return

      const currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY.current)

      if (distance > 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, threshold * 1.5))
        setCanRefresh(distance >= threshold)
      }
    },
    [threshold, isRefreshing],
  )

  const handleTouchEnd = useCallback(async () => {
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
    setCanRefresh(false)
    startY.current = 0
  }, [canRefresh, isRefreshing, onRefresh])

  // Add touch event listeners
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const refreshProgress = Math.min(pullDistance / threshold, 1)
  const refreshOpacity = Math.min(pullDistance / (threshold * 0.5), 1)

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Pull to refresh indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-10"
        style={{
          transform: `translateY(${Math.max(0, pullDistance - 60)}px)`,
          opacity: refreshOpacity,
        }}
      >
        <div className="bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg border">
          <RefreshCw
            className={cn(
              "h-5 w-5 text-primary transition-transform duration-200",
              isRefreshing && "animate-spin",
              canRefresh && !isRefreshing && "rotate-180",
            )}
            style={{
              transform: `rotate(${refreshProgress * 180}deg)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${pullDistance * 0.5}px)`,
          transition: pullDistance === 0 ? "transform 0.3s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  )
}
