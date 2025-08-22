"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Users, MessageCircle, Share, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface StoreProfileProps {
  storeId: string
}

const mockStore = {
  id: "1",
  name: "StyleGuru Store",
  description:
    "Premium fashion and lifestyle products curated by style experts. We bring you the latest trends and timeless classics.",
  avatar: "/store-avatar-styleguru.png",
  banner: "/store-banner-styleguru.png",
  rating: 4.9,
  reviews: 1247,
  followers: 12500,
  products: 89,
  verified: true,
  joined: "2022",
  location: "New York, USA",
  responseTime: "Within 2 hours",
  categories: ["Fashion", "Accessories", "Lifestyle"],
  achievements: ["Top Seller", "Fast Shipping", "Excellent Service"],
}

export function StoreProfile({ storeId }: StoreProfileProps) {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-semibold">Store Profile</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-48">
        <img src={mockStore.banner || "/placeholder.svg"} alt="Store banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Store Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src={mockStore.avatar || "/placeholder.svg"} />
                <AvatarFallback>{mockStore.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{mockStore.name}</h1>
                  {mockStore.verified && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockStore.rating}</span>
                    <span className="text-muted-foreground">({mockStore.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{mockStore.followers.toLocaleString()} followers</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {mockStore.achievements.map((achievement) => (
                    <Badge key={achievement} variant="secondary" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{mockStore.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockStore.products}</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockStore.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                variant={isFollowing ? "outline" : "default"}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Users className="h-4 w-4 mr-2" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Store Stats */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Joined</div>
                <div className="font-medium">{mockStore.joined}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Response Time</div>
                <div className="font-medium">{mockStore.responseTime}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{mockStore.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="flex gap-2 flex-wrap">
              {mockStore.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
