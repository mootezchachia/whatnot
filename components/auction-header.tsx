"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, Gavel, TrendingUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function AuctionHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Auctions</h1>
          </div>
          <Link href="/auctions/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Auction
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">234 Live Auctions</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">$45,678 Total Bids Today</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  )
}
