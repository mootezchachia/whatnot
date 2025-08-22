"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, UserPlus, ShoppingBag, Star } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Emma Wilson",
    avatar: "/fashion-influencer-avatar.png",
    content: "liked your post",
    time: "2m ago",
    isRead: false,
    image: "/stylish-jacket-product-photo.png",
  },
  {
    id: 2,
    type: "comment",
    user: "Style Maven",
    avatar: "/fashion-influencer-avatar.png",
    content: "commented: 'Love this look! Where did you get it?'",
    time: "5m ago",
    isRead: false,
    image: "/cozy-winter-sweater.png",
  },
  {
    id: 3,
    type: "follow",
    user: "Fashion Guru",
    avatar: "/fashion-influencer-avatar.png",
    content: "started following you",
    time: "1h ago",
    isRead: true,
  },
  {
    id: 4,
    type: "purchase",
    user: "Sarah Chen",
    avatar: "/fashion-influencer-avatar.png",
    content: "purchased your Vintage Handbag",
    time: "2h ago",
    isRead: true,
    image: "/vintage-designer-handbag.png",
  },
  {
    id: 5,
    type: "review",
    user: "Alex Johnson",
    avatar: "/fashion-influencer-avatar.png",
    content: "left a 5-star review on your store",
    time: "3h ago",
    isRead: true,
  },
]

export function NotificationsList() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "purchase":
        return <ShoppingBag className="h-4 w-4 text-primary" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Mark all read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
              notification.isRead ? "bg-background border-border" : "bg-muted/30 border-primary/20"
            }`}
          >
            <div className="relative">
              <img
                src={notification.avatar || "/placeholder.svg"}
                alt={notification.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border border-border">
                {getNotificationIcon(notification.type)}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{notification.user}</span> {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>

                {notification.image && (
                  <img
                    src={notification.image || "/placeholder.svg"}
                    alt="Notification content"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
              </div>

              {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
