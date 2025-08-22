"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Share, Activity, Eye, Wifi, WifiOff, Settings } from "lucide-react"

interface Platform {
  id: string
  name: string
  icon: string
  connected: boolean
  viewers: number
  quality: "HD" | "SD" | "LOW"
  bandwidth: number
  status: "streaming" | "connecting" | "error" | "offline"
}

export function MulticastDashboard() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "youtube",
      name: "YouTube",
      icon: "🔴",
      connected: true,
      viewers: 1247,
      quality: "HD",
      bandwidth: 85,
      status: "streaming",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      connected: true,
      viewers: 892,
      quality: "HD",
      bandwidth: 78,
      status: "streaming",
    },
    {
      id: "twitch",
      name: "Twitch",
      icon: "💜",
      connected: false,
      viewers: 0,
      quality: "SD",
      bandwidth: 0,
      status: "offline",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📷",
      connected: true,
      viewers: 634,
      quality: "SD",
      bandwidth: 65,
      status: "connecting",
    },
  ])

  const totalViewers = platforms.reduce((sum, platform) => sum + platform.viewers, 0)
  const connectedPlatforms = platforms.filter((p) => p.connected).length
  const avgBandwidth =
    platforms.filter((p) => p.connected).reduce((sum, p) => sum + p.bandwidth, 0) / connectedPlatforms || 0

  const togglePlatform = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? {
              ...platform,
              connected: !platform.connected,
              status: !platform.connected ? "connecting" : "offline",
              viewers: !platform.connected ? Math.floor(Math.random() * 500) + 100 : 0,
            }
          : platform,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "streaming":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "HD":
        return "text-green-600"
      case "SD":
        return "text-yellow-600"
      case "LOW":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share className="h-5 w-5" />
          Multicast Dashboard
        </CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {totalViewers.toLocaleString()} total viewers
          </span>
          <span className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            {connectedPlatforms}/4 platforms active
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold">{totalViewers.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Viewers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{avgBandwidth.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Avg Bandwidth</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{connectedPlatforms}</p>
            <p className="text-xs text-muted-foreground">Active Streams</p>
          </div>
        </div>

        {/* Platform List */}
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-2xl">{platform.icon}</span>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(platform.status)}`}
                  />
                </div>
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{platform.status}</p>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {platform.connected && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>{platform.viewers.toLocaleString()} viewers</span>
                      <span className={getQualityColor(platform.quality)}>{platform.quality}</span>
                    </div>
                    <Progress value={platform.bandwidth} className="h-2" />
                    <p className="text-xs text-muted-foreground">Bandwidth: {platform.bandwidth}%</p>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={platform.connected ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePlatform(platform.id)}
                  className="flex items-center gap-1"
                >
                  {platform.connected ? (
                    <>
                      <Wifi className="h-3 w-3" />
                      Connected
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3" />
                      Connect
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bandwidth Warning */}
        {avgBandwidth > 80 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>High bandwidth usage detected.</strong> Consider reducing stream quality or disconnecting some
              platforms to maintain stability.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MulticastDashboard
