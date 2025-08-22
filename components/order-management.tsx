"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "Sarah Mitchell",
      email: "sarah.m@email.com",
      avatar: "/user-avatar-sarah.png",
    },
    products: [{ name: "Designer Jacket", quantity: 1, price: 299 }],
    total: 299,
    status: "shipped",
    date: "2024-01-15",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Mike Rodriguez",
      email: "mike.r@email.com",
      avatar: "/user-avatar-mike.png",
    },
    products: [
      { name: "Premium Sneakers", quantity: 1, price: 189 },
      { name: "Silk Scarf", quantity: 2, price: 89 },
    ],
    total: 367,
    status: "processing",
    date: "2024-01-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Emma Lopez",
      email: "emma.l@email.com",
      avatar: "/user-avatar-emma.png",
    },
    products: [{ name: "Vintage Sunglasses", quantity: 1, price: 159 }],
    total: 159,
    status: "delivered",
    date: "2024-01-13",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    customer: {
      name: "David Chen",
      email: "david.c@email.com",
      avatar: "/user-avatar-david.png",
    },
    products: [{ name: "Designer Jacket", quantity: 1, price: 299 }],
    total: 299,
    status: "pending",
    date: "2024-01-15",
    shippingAddress: "321 Elm St, Miami, FL 33101",
  },
]

export function OrderManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [orders] = useState(mockOrders)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "shipped":
        return <Badge className="bg-yellow-100 text-yellow-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
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
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">{order.id}</span>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-right">
                  <div className="font-semibold">${order.total}</div>
                  <div className="text-sm text-muted-foreground">{order.date}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{order.customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">{order.shippingAddress}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-2">Items ({order.products.length})</h4>
                <div className="space-y-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {product.name} × {product.quantity}
                      </span>
                      <span>${product.price * product.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {order.status === "pending" && <Button size="sm">Accept Order</Button>}
                {order.status === "processing" && <Button size="sm">Mark as Shipped</Button>}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Contact Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
