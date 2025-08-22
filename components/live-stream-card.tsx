"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, ShoppingBag } from "lucide-react"
import Link from "next/link"

interface LiveStream {
  id: string
  title: string
  host: {
    name: string
    avatar: string
    verified: boolean
  }
  thumbnail: string
  viewers: number
  isLive: boolean
  category: string
  products: Array<{ name: string; price: number }>
}

interface LiveStreamCardProps {
  stream: LiveStream
}

export function LiveStreamCard({ stream }: LiveStreamCardProps) {
  const products = stream.products || []
  const hostName = stream.host?.name || "Unknown Host"

  return (
    <Link href={`/live/${stream.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={stream.thumbnail || "/placeholder.svg"}
              alt={stream.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Live Badge */}
            {stream.isLive && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-500 hover:bg-red-500 text-white">
                  <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                  LIVE
                </Badge>
              </div>
            )}

            {/* Category Badge */}
            <Badge variant="secondary" className="absolute top-3 right-3">
              {stream.category}
            </Badge>

            {/* Viewer Count */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
              <Eye className="h-3 w-3" />
              <span>{stream.viewers?.toLocaleString() || 0}</span>
            </div>

            {/* Product Count */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
              <ShoppingBag className="h-3 w-3" />
              <span>{products.length}</span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {stream.title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={stream.host?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{hostName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{hostName}</span>
                {stream.host?.verified && (
                  <div className="h-3 w-3 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Featured Products */}
            {products.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Featured:{" "}
                {products
                  .slice(0, 2)
                  .map((p) => p.name)
                  .join(", ")}
                {products.length > 2 && ` +${products.length - 2} more`}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default LiveStreamCard
