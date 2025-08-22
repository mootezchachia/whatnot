"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Mic, MicOff, Video, VideoOff, Crown, DollarSign } from "lucide-react"

interface CoHost {
  id: string
  name: string
  avatar: string
  isActive: boolean
  audioEnabled: boolean
  videoEnabled: boolean
  role: "host" | "co-host"
  salesContribution: number
}

export function CoHostManager() {
  const [coHosts, setCoHosts] = useState<CoHost[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      isActive: true,
      audioEnabled: true,
      videoEnabled: true,
      role: "host",
      salesContribution: 1250.0,
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      isActive: true,
      audioEnabled: true,
      videoEnabled: false,
      role: "co-host",
      salesContribution: 890.5,
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      isActive: false,
      audioEnabled: false,
      videoEnabled: false,
      role: "co-host",
      salesContribution: 0,
    },
  ])

  const toggleAudio = (hostId: string) => {
    setCoHosts((prev) =>
      prev.map((host) => (host.id === hostId ? { ...host, audioEnabled: !host.audioEnabled } : host)),
    )
  }

  const toggleVideo = (hostId: string) => {
    setCoHosts((prev) =>
      prev.map((host) => (host.id === hostId ? { ...host, videoEnabled: !host.videoEnabled } : host)),
    )
  }

  const totalSales = coHosts.reduce((sum, host) => sum + host.salesContribution, 0)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Co-hosts ({coHosts.filter((h) => h.isActive).length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Revenue Split Summary */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Total Sales: ${totalSales.toFixed(2)}</span>
          </div>
          <p className="text-xs text-green-700">Revenue split based on contribution</p>
        </div>

        {/* Co-host List */}
        <div className="space-y-3">
          {coHosts.map((host) => (
            <div key={host.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={host.avatar || "/placeholder.svg"} alt={host.name} />
                  <AvatarFallback>{host.name[0]}</AvatarFallback>
                </Avatar>
                {host.role === "host" && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-amber-500" />}
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    host.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{host.name}</p>
                  <Badge variant={host.role === "host" ? "default" : "secondary"} className="text-xs">
                    {host.role}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Sales: ${host.salesContribution.toFixed(2)}</p>
              </div>

              {host.isActive && (
                <div className="flex gap-1">
                  <Button
                    variant={host.audioEnabled ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleAudio(host.id)}
                  >
                    {host.audioEnabled ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant={host.videoEnabled ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleVideo(host.id)}
                  >
                    {host.videoEnabled ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stream Layout Options */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">Stream Layout</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="h-12 flex flex-col gap-1 bg-transparent">
              <div className="w-6 h-3 bg-current opacity-20 rounded-sm" />
              <span className="text-xs">Single</span>
            </Button>
            <Button variant="outline" size="sm" className="h-12 flex flex-col gap-1 bg-transparent">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-current opacity-20 rounded-sm" />
                <div className="w-3 h-3 bg-current opacity-20 rounded-sm" />
              </div>
              <span className="text-xs">Split</span>
            </Button>
            <Button variant="outline" size="sm" className="h-12 flex flex-col gap-1 bg-transparent">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-current opacity-20 rounded-sm" />
                <div className="w-2 h-2 bg-current opacity-20 rounded-sm" />
                <div className="w-2 h-2 bg-current opacity-20 rounded-sm" />
                <div className="w-2 h-2 bg-current opacity-20 rounded-sm" />
              </div>
              <span className="text-xs">Grid</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CoHostManager
