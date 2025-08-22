"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "like" | "cart" | "share" | "bookmark"
  isActive?: boolean
  className?: string
  count?: number
}

export function AnimatedButton({
  children,
  onClick,
  variant = "like",
  isActive = false,
  className,
  count,
}: AnimatedButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showCount, setShowCount] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    if (variant === "like" && !isActive) {
      setShowCount(true)
    }
    onClick?.()

    setTimeout(() => setIsAnimating(false), 600)
    if (showCount) {
      setTimeout(() => setShowCount(false), 2000)
    }
  }

  const getAnimationClass = () => {
    if (!isAnimating) return ""

    switch (variant) {
      case "like":
        return "animate-heart-beat"
      case "cart":
        return "animate-bounce-in"
      case "share":
        return "animate-pulse"
      case "bookmark":
        return "animate-bounce"
      default:
        return "animate-pulse"
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "transition-all duration-300 hover:scale-110",
          isActive && "text-primary",
          getAnimationClass(),
          className,
        )}
        onClick={handleClick}
      >
        {children}
      </Button>

      {showCount && count && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 animate-bounce-in">
          +{count}
        </div>
      )}
    </div>
  )
}

export function FloatingActionButton({
  onClick,
  icon: Icon,
  label,
  className,
}: {
  onClick: () => void
  icon: any
  label: string
  className?: string
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        "animate-float hover:animate-pulse-glow",
        "transition-all duration-300 hover:scale-110",
        "z-50",
        className,
      )}
      size="icon"
    >
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export function ProgressiveImage({
  src,
  alt,
  className,
  placeholder = "/placeholder.svg",
}: {
  src: string
  alt: string
  className?: string
  placeholder?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && !isError && <div className="absolute inset-0 shimmer-loading" />}

      <img
        src={isError ? placeholder : src}
        alt={alt}
        className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  )
}
