"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TouchOptimizedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
  hapticFeedback?: boolean
}

export function TouchOptimizedButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  hapticFeedback = true,
}: TouchOptimizedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = () => {
    setIsPressed(true)
    if (hapticFeedback && "vibrate" in navigator) {
      navigator.vibrate(10) // Light haptic feedback
    }
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
  }

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick()
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        // Enhanced touch targets for mobile
        "min-h-[44px] min-w-[44px]",
        "active:scale-95 transition-transform duration-100",
        isPressed && "scale-95",
        className,
      )}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
