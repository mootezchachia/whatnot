"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, LinkIcon, Calendar, Star, ShoppingBag, Users } from "lucide-react"

export function UserProfile() {
  const [isFollowing, setIsFollowing] = useState(false)

  const user = {
    name: "Sarah Chen",
    username: "@sarahstyle",
    bio: "Fashion enthusiast & lifestyle creator ✨ Sharing my daily looks & favorite finds 💫",
    location: "Los Angeles, CA",
    website: "sarahstyle.com",
    joinDate: "March 2023",
    followers: 45600,
    following: 892,
    likes: 234500,
    posts: 156,
    rating: 4.9,
    totalSales: 1250,
    avatar: "/fashion-influencer-avatar.png",
    isVerified: true,
    badges: ["Top Seller", "Fashion Expert", "Verified Creator"],
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Info */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Star className="h-3 w-3 text-white fill-white" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">{user.username}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {user.badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-3">
        <p className="text-foreground leading-relaxed">{user.bio}</p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" />
            <span className="text-primary">{user.website}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 py-4 border-y border-border">
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">{user.posts}</div>
          <div className="text-sm text-muted-foreground">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">{(user.followers / 1000).toFixed(1)}K</div>
          <div className="text-sm text-muted-foreground">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">{user.following}</div>
          <div className="text-sm text-muted-foreground">Following</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">{(user.likes / 1000).toFixed(0)}K</div>
          <div className="text-sm text-muted-foreground">Likes</div>
        </div>
      </div>

      {/* Seller Stats */}
      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          Seller Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-bold text-foreground">{user.totalSales}</div>
            <div className="text-sm text-muted-foreground">Total Sales</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground flex items-center gap-1">
              {user.rating}
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant={isFollowing ? "outline" : "default"}
          className="flex-1"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          <Users className="h-4 w-4 mr-2" />
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Message
        </Button>
      </div>
    </div>
  )
}
