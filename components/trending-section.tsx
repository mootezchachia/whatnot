"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FlameIcon as Fire } from "lucide-react"

const trendingItems = [
  {
    id: 1,
    type: "hashtag",
    title: "#WinterFashion",
    posts: "2.3M",
    growth: "+15%",
  },
  {
    id: 2,
    type: "product",
    title: "Cozy Sweaters",
    sales: "1.2K",
    growth: "+28%",
  },
  {
    id: 3,
    type: "store",
    title: "Vintage Vibes",
    followers: "45K",
    growth: "+12%",
  },
  {
    id: 4,
    type: "category",
    title: "Home Decor",
    views: "890K",
    growth: "+22%",
  },
]

export function TrendingSection() {
  return (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Fire className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {trendingItems.map((item) => (
          <div key={item.id} className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {item.type}
              </Badge>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">{item.growth}</span>
              </div>
            </div>

            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {item.posts || item.sales || item.followers || item.views}
              {item.posts && " posts"}
              {item.sales && " sold today"}
              {item.followers && " new followers"}
              {item.views && " views"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
