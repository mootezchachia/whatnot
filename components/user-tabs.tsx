"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid3X3, Video, ShoppingBag, Heart } from "lucide-react"
import { UserPosts } from "@/components/user-posts"
import { UserVideos } from "@/components/user-videos"
import { UserProducts } from "@/components/user-products"
import { UserLikes } from "@/components/user-likes"

export function UserTabs() {
  const [activeTab, setActiveTab] = useState("posts")

  const tabs = [
    { id: "posts", icon: Grid3X3, label: "Posts" },
    { id: "videos", icon: Video, label: "Videos" },
    { id: "products", icon: ShoppingBag, label: "Products" },
    { id: "likes", icon: Heart, label: "Likes" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <UserPosts />
      case "videos":
        return <UserVideos />
      case "products":
        return <UserProducts />
      case "likes":
        return <UserLikes />
      default:
        return <UserPosts />
    }
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-none border-b-2 ${
                isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="px-4">{renderTabContent()}</div>
    </div>
  )
}
