"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onClose: (id: string) => void
}

export function EnhancedToast({ id, title, description, type = "info", duration = 5000, action, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressInterval)
          handleClose()
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [duration])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300)
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        colors[type],
      )}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />

      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{title}</h4>
          {description && <p className="text-sm opacity-90 mt-1">{description}</p>}

          {action && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-auto p-0 text-current hover:text-current/80"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-current hover:text-current/80"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Toast container and hook
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id, onClose: removeToast }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <EnhancedToast key={toast.id} {...toast} />
      ))}
    </div>
  )

  return { addToast, ToastContainer }
}
