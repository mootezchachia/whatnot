"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Eye, ShoppingCart, Video, Star } from "lucide-react"

interface CommissionData {
  totalEarnings: number
  monthlyEarnings: number
  pendingPayouts: number
  totalViews: number
  conversionRate: number
  topPerformingVideos: Array<{
    id: string
    title: string
    earnings: number
    views: number
    conversions: number
  }>
}

interface CommissionTrackerProps {
  data: CommissionData
}

export function CommissionTracker({ data }: CommissionTrackerProps) {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-green-600">${data.totalEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">This Month</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">${data.monthlyEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Total Views</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{data.totalViews.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Conversion</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{data.conversionRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payouts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pending Payouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">${data.pendingPayouts.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Will be paid on the 15th</p>
            </div>
            <Button>Request Payout</Button>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">$25 minimum payout threshold</p>
        </CardContent>
      </Card>

      {/* Top Performing Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Top Performing Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topPerformingVideos.map((video, index) => (
              <div key={video.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{video.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <ShoppingCart className="h-3 w-3" />
                      {video.conversions} sales
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${video.earnings.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Top Earner
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
