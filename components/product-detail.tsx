"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star, ShoppingCart, Share, ArrowLeft, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductDetailProps {
  productId: string
}

const mockProduct = {
  id: "1",
  name: "Designer Jacket - Premium Quality",
  price: 299,
  originalPrice: 399,
  images: ["/stylish-jacket-product-photo.png", "/jacket-detail-1.png", "/jacket-detail-2.png"],
  rating: 4.8,
  reviews: 124,
  description:
    "This premium designer jacket combines style and comfort. Made from high-quality materials with attention to detail. Perfect for any occasion.",
  features: [
    "Premium fabric blend",
    "Water-resistant coating",
    "Multiple pockets",
    "Adjustable fit",
    "Machine washable",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Black", "Navy", "Gray", "Brown"],
  store: {
    name: "StyleGuru Store",
    rating: 4.9,
    followers: "12.5K",
    verified: true,
  },
  shipping: "Free shipping on orders over $50",
  returns: "30-day return policy",
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const discountPercentage = Math.round(
    ((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-5 w-5 ${isLiked ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Product Images */}
        <div className="mb-6">
          <div className="relative mb-4">
            <img
              src={mockProduct.images[selectedImage] || "/placeholder.svg"}
              alt={mockProduct.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4 bg-destructive">-{discountPercentage}%</Badge>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {mockProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{mockProduct.name}</h1>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{mockProduct.rating}</span>
              <span className="text-muted-foreground">({mockProduct.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-primary">${mockProduct.price}</span>
            <span className="text-lg text-muted-foreground line-through">${mockProduct.originalPrice}</span>
            <Badge variant="destructive">Save ${mockProduct.originalPrice - mockProduct.price}</Badge>
          </div>

          <p className="text-muted-foreground mb-4">{mockProduct.description}</p>
        </div>

        {/* Size Selection */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="flex gap-2 flex-wrap">
              {mockProduct.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Selection */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="flex gap-2 flex-wrap">
              {mockProduct.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quantity */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium text-lg w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Store Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{mockProduct.store.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{mockProduct.store.rating}</span>
                  <span>•</span>
                  <span>{mockProduct.store.followers} followers</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Visit Store
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              Add to Cart
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
