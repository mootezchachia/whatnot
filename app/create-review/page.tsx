"use client"

import { useState } from "react"
import { VideoReviewCreator } from "@/components/video-review-creator"
import { CommissionTracker } from "@/components/commission-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, TrendingUp } from "lucide-react"

// Mock data
const mockCommissionData = {
  totalEarnings: 1247.5,
  monthlyEarnings: 342.8,
  pendingPayouts: 89.25,
  totalViews: 45230,
  conversionRate: 3.2,
  topPerformingVideos: [
    {
      id: "1",
      title: "Honest Review: iPhone 15 Pro Max",
      earnings: 156.4,
      views: 12500,
      conversions: 23,
    },
    {
      id: "2",
      title: "Unboxing the Latest MacBook Air",
      earnings: 134.2,
      views: 9800,
      conversions: 18,
    },
    {
      id: "3",
      title: "Best Skincare Products Under $50",
      earnings: 98.75,
      views: 8200,
      conversions: 15,
    },
  ],
}

const trendingProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "/modern-smartphone.png",
    store: "Apple Store",
    commission: 3,
    trending: true,
  },
  {
    id: "2",
    name: "Nike Air Jordan 1",
    price: 170,
    image: "/stylish-sneakers.png",
    store: "Nike",
    commission: 8,
    trending: true,
  },
  {
    id: "3",
    name: "MacBook Air M3",
    price: 1099,
    image: "/silver-macbook-pro.png",
    store: "Apple Store",
    commission: 2.5,
    trending: true,
  },
]

export default function CreateReviewPage() {
  const [showCreator, setShowCreator] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateReview = (product: any) => {
    setSelectedProduct(product)
    setShowCreator(true)
  }

  const handleSubmitReview = (reviewData: any) => {
    console.log("Review submitted:", reviewData)
    setShowCreator(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">Create video reviews and earn commissions</p>
        </div>

        {/* Commission Tracker */}
        <div className="mb-8">
          <CommissionTracker data={mockCommissionData} />
        </div>

        {/* Product Search & Trending */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Search Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Products to Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => setShowCreator(true)} className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Review Without Product
              </Button>
            </CardContent>
          </Card>

          {/* Trending Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.store}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold">${product.price}</span>
                        <span className="text-xs text-green-600">{product.commission}% commission</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleCreateReview(product)}>
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Review Creator Modal */}
      {showCreator && (
        <VideoReviewCreator
          product={selectedProduct}
          onClose={() => {
            setShowCreator(false)
            setSelectedProduct(null)
          }}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  )
}
