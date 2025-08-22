"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MobileOptimizedLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MobileOptimizedLayout({ children, className }: MobileOptimizedLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setScreenHeight(window.innerHeight)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  return (
    <div
      className={cn("w-full", isMobile ? "min-h-screen" : "min-h-screen", className)}
      style={{
        minHeight: isMobile ? `${screenHeight}px` : "100vh",
      }}
    >
      {children}
    </div>
  )
}
