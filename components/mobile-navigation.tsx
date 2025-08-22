"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Search, ShoppingBag, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavigationProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  cartCount?: number
  notificationCount?: number
}

export function MobileNavigation({
  activeTab = "home",
  onTabChange,
  cartCount = 0,
  notificationCount = 0,
}: MobileNavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Auto-hide navigation on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "discover", icon: Search, label: "Discover" },
    { id: "create", icon: Plus, label: "Create", special: true },
    { id: "shop", icon: ShoppingBag, label: "Shop", badge: cartCount },
    { id: "profile", icon: User, label: "Profile", badge: notificationCount },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "transition-transform duration-300 ease-in-out",
        "safe-area-inset-bottom", // Handle iPhone notch
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3",
                "min-h-[60px] min-w-[60px]", // Touch-friendly size
                "transition-all duration-200",
                item.special && "bg-primary text-primary-foreground hover:bg-primary/90",
                isActive && !item.special && "text-primary",
                "active:scale-95",
              )}
              onClick={() => onTabChange?.(item.id)}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", item.special && "h-6 w-6")} />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className={cn("text-xs font-medium", item.special && "text-xs")}>{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
