"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, ShoppingCart, DollarSign, Users, Star, Plus, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

const dashboardStats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Orders",
    value: "89",
    change: "+8.2%",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Products",
    value: "24",
    change: "+2",
    icon: Package,
    trend: "up",
  },
  {
    title: "Followers",
    value: "1,247",
    change: "+15.3%",
    icon: Users,
    trend: "up",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah M.",
    product: "Designer Jacket",
    amount: "$299",
    status: "shipped",
    date: "2 hours ago",
  },
  {
    id: "ORD-002",
    customer: "Mike R.",
    product: "Premium Sneakers",
    amount: "$189",
    status: "processing",
    date: "5 hours ago",
  },
  {
    id: "ORD-003",
    customer: "Emma L.",
    product: "Silk Scarf",
    amount: "$89",
    status: "delivered",
    date: "1 day ago",
  },
]

export function SellerDashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, StyleGuru!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/seller/orders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{order.id}</span>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • {order.product}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/seller/products">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                  <Package className="h-6 w-6" />
                  <span className="text-sm">Manage Products</span>
                </Button>
              </Link>
              <Link href="/seller/orders">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-sm">View Orders</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <Star className="h-6 w-6" />
                <span className="text-sm">Reviews</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
