"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, MoreVertical, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const mockProducts = [
  {
    id: "1",
    name: "Designer Jacket",
    price: 299,
    stock: 15,
    status: "active",
    image: "/stylish-jacket-product-photo.png",
    sales: 24,
    views: 1250,
  },
  {
    id: "2",
    name: "Premium Sneakers",
    price: 189,
    stock: 8,
    status: "active",
    image: "/trendy-sneakers-product-photo.png",
    sales: 18,
    views: 890,
  },
  {
    id: "3",
    name: "Silk Scarf Collection",
    price: 89,
    stock: 0,
    status: "out_of_stock",
    image: "/silk-scarf-product.png",
    sales: 32,
    views: 1580,
  },
  {
    id: "4",
    name: "Vintage Sunglasses",
    price: 159,
    stock: 22,
    status: "draft",
    image: "/vintage-sunglasses-product.png",
    sales: 0,
    views: 45,
  },
]

export function ProductManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [products] = useState(mockProducts)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
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
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your store inventory</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Price: ${product.price}</span>
                    <span>Stock: {product.stock}</span>
                    <span>Sales: {product.sales}</span>
                    <span>Views: {product.views}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(product.status)}

                  <div className="flex gap-1">
                    <Link href={`/shop/${product.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
