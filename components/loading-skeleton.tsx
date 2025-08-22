"use client"

import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "default" | "card" | "avatar" | "text" | "button"
  lines?: number
}

export function LoadingSkeleton({ className, variant = "default", lines = 1 }: LoadingSkeletonProps) {
  const baseClasses = "shimmer-loading rounded animate-pulse"

  const variants = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    avatar: "h-12 w-12 rounded-full",
    text: "h-4",
    button: "h-10 w-24",
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={cn(baseClasses, variants.text, i === lines - 1 ? "w-3/4" : "w-full", className)} />
        ))}
      </div>
    )
  }

  return <div className={cn(baseClasses, variants[variant], className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <LoadingSkeleton variant="card" />
      <LoadingSkeleton variant="text" lines={2} />
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-6 w-20" />
        <LoadingSkeleton variant="button" />
      </div>
    </div>
  )
}

export function VideoCardSkeleton() {
  return (
    <div className="space-y-3">
      <LoadingSkeleton className="aspect-[9/16] w-full" />
      <div className="flex items-center gap-3">
        <LoadingSkeleton variant="avatar" />
        <div className="flex-1">
          <LoadingSkeleton variant="text" lines={2} />
        </div>
      </div>
    </div>
  )
}
