"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, ShoppingCart, Gift, Target } from "lucide-react"

interface RevenueData {
  totalRevenue: number
  monthlyGrowth: number
  revenueStreams: {
    commissions: number
    sponsorships: number
    gifts: number
    subscriptions: number
  }
  monthlyData: Array<{
    month: string
    commissions: number
    sponsorships: number
    gifts: number
    subscriptions: number
  }>
  topPerformers: Array<{
    type: string
    title: string
    revenue: number
    growth: number
  }>
}

const mockRevenueData: RevenueData = {
  totalRevenue: 12847.5,
  monthlyGrowth: 23.5,
  revenueStreams: {
    commissions: 5420.3,
    sponsorships: 4200.0,
    gifts: 1827.2,
    subscriptions: 1400.0,
  },
  monthlyData: [
    { month: "Jan", commissions: 1200, sponsorships: 800, gifts: 300, subscriptions: 200 },
    { month: "Feb", commissions: 1400, sponsorships: 1000, gifts: 350, subscriptions: 200 },
    { month: "Mar", commissions: 1800, sponsorships: 1200, gifts: 400, subscriptions: 300 },
    { month: "Apr", commissions: 2200, sponsorships: 1500, gifts: 450, subscriptions: 400 },
    { month: "May", commissions: 2800, sponsorships: 2000, gifts: 500, subscriptions: 500 },
    { month: "Jun", commissions: 3200, sponsorships: 2200, gifts: 600, subscriptions: 600 },
  ],
  topPerformers: [
    { type: "Video Review", title: "iPhone 15 Pro Honest Review", revenue: 1247.8, growth: 45.2 },
    { type: "Sponsored Post", title: "Nike Air Jordan Collection", revenue: 980.5, growth: 32.1 },
    { type: "Live Stream", title: "Beauty Products Haul", revenue: 756.3, growth: 28.7 },
  ],
}

export function RevenueAnalytics() {
  const revenueStreamData = [
    { name: "Commissions", value: mockRevenueData.revenueStreams.commissions, color: "#3b82f6" },
    { name: "Sponsorships", value: mockRevenueData.revenueStreams.sponsorships, color: "#8b5cf6" },
    { name: "Gifts", value: mockRevenueData.revenueStreams.gifts, color: "#f59e0b" },
    { name: "Subscriptions", value: mockRevenueData.revenueStreams.subscriptions, color: "#10b981" },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold text-green-600">${mockRevenueData.totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+{mockRevenueData.monthlyGrowth}% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Commissions</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              ${mockRevenueData.revenueStreams.commissions.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">42% of total revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Sponsorships</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              ${mockRevenueData.revenueStreams.sponsorships.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">33% of total revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">Virtual Gifts</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              ${mockRevenueData.revenueStreams.gifts.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">14% of total revenue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockRevenueData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="commissions" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="sponsorships" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="gifts" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="subscriptions" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueStreamData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueStreamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Streams Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockRevenueData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="commissions" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="sponsorships" stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="gifts" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="subscriptions" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-4">
            {revenueStreamData.map((stream) => (
              <Card key={stream.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{stream.name}</h4>
                    <span className="text-lg font-bold" style={{ color: stream.color }}>
                      ${stream.value.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(stream.value / mockRevenueData.totalRevenue) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {((stream.value / mockRevenueData.totalRevenue) * 100).toFixed(1)}% of total revenue
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRevenueData.topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{performer.title}</h4>
                      <Badge variant="outline" className="text-xs mt-1">
                        {performer.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${performer.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">+{performer.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
