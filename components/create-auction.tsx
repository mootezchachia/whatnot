"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Calendar, DollarSign, Gavel } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = ["Electronics", "Fashion", "Art", "Collectibles", "Jewelry", "Home", "Sports", "Books"]

const durations = [
  { label: "1 Day", value: 1 },
  { label: "3 Days", value: 3 },
  { label: "5 Days", value: 5 },
  { label: "7 Days", value: 7 },
  { label: "10 Days", value: 10 },
]

export function CreateAuction() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    startingBid: "",
    reservePrice: "",
    buyNowPrice: "",
    duration: 7,
    hasReserve: false,
    hasBuyNow: false,
    shipping: "",
    returns: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating auction:", formData)
    router.push("/auctions")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Create Auction</h1>
          <p className="text-muted-foreground">List your item for auction</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Details */}
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter item title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div>
              <Label>Category</Label>
              <div className="flex gap-2 flex-wrap mt-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={formData.category === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, category })}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                placeholder="e.g., New, Like New, Good, Fair"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Upload photos of your item</p>
              <p className="text-sm text-muted-foreground mb-4">Add up to 12 photos</p>
              <Button variant="outline" type="button">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="startingBid">Starting Bid</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startingBid"
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                  value={formData.startingBid}
                  onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasReserve"
                checked={formData.hasReserve}
                onCheckedChange={(checked) => setFormData({ ...formData, hasReserve: checked as boolean })}
              />
              <Label htmlFor="hasReserve">Set reserve price (minimum price to sell)</Label>
            </div>

            {formData.hasReserve && (
              <div>
                <Label htmlFor="reservePrice">Reserve Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reservePrice"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={formData.reservePrice}
                    onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasBuyNow"
                checked={formData.hasBuyNow}
                onCheckedChange={(checked) => setFormData({ ...formData, hasBuyNow: checked as boolean })}
              />
              <Label htmlFor="hasBuyNow">Add "Buy It Now" option</Label>
            </div>

            {formData.hasBuyNow && (
              <div>
                <Label htmlFor="buyNowPrice">Buy It Now Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="buyNowPrice"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={formData.buyNowPrice}
                    onChange={(e) => setFormData({ ...formData, buyNowPrice: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Auction Duration</Label>
              <div className="flex gap-2 flex-wrap mt-2">
                {durations.map((duration) => (
                  <Badge
                    key={duration.value}
                    variant={formData.duration === duration.value ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, duration: duration.value })}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    {duration.label}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Returns */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Returns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shipping">Shipping Details</Label>
              <Input
                id="shipping"
                placeholder="e.g., Free shipping, $15 flat rate"
                value={formData.shipping}
                onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="returns">Return Policy</Label>
              <Input
                id="returns"
                placeholder="e.g., 30-day returns accepted"
                value={formData.returns}
                onChange={(e) => setFormData({ ...formData, returns: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" type="button">
            Save as Draft
          </Button>
          <Button className="flex-1" type="submit">
            <Gavel className="h-4 w-4 mr-2" />
            Start Auction
          </Button>
        </div>
      </form>
    </div>
  )
}
