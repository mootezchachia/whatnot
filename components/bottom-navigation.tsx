"use client"

import { Button } from "@/components/ui/button"
import { Home, Search, ShoppingBag, Radio, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("home")
  const router = useRouter()

  const tabs = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "discover", icon: Search, label: "Discover", path: "/discover" },
    { id: "shop", icon: ShoppingBag, label: "Shop", path: "/shop" },
    { id: "live", icon: Radio, label: "Live", path: "/live" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
    { id: "social", icon: User, label: "Social", path: "/social" },
    { id: "auctions", icon: ShoppingBag, label: "Auctions", path: "/auctions" },
  ]

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    setActiveTab(tab.id)
    router.push(tab.path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
