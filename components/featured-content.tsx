"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Clock } from "lucide-react"

export function FeaturedContent() {
  return (
    <div className="px-4 py-6">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-black/50 text-white border-white/30">
              Featured Event
            </Badge>
            <Badge variant="secondary" className="bg-red-500 text-white border-red-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            </Badge>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Black Friday Mega Sale</h2>
            <p className="text-white/90">Up to 80% off on trending fashion items</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>12.5K watching</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Ends in 2h 30m</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Play className="h-4 w-4 mr-2" />
              Watch Live
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-black/30 bg-black/50">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
