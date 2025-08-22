"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Camera, Star, DollarSign, Tag, Upload, X } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  store: string
  commission: number
}

interface VideoReviewCreatorProps {
  product?: Product
  onClose: () => void
  onSubmit: (reviewData: any) => void
}

export function VideoReviewCreator({ product, onClose, onSubmit }: VideoReviewCreatorProps) {
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    const reviewData = {
      productId: product?.id,
      rating,
      title,
      description,
      tags,
      videoFile,
      commission: product?.commission || 0,
      type: "review",
    }
    onSubmit(reviewData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Create Video Review</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Product Info */}
          {product && (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.store}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  <Badge variant="secondary" className="text-xs">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {product.commission}% commission
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Video Recording/Upload */}
          <div className="space-y-4">
            <h3 className="font-semibold">Video Content</h3>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              {!videoFile ? (
                <div className="space-y-4">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Record or upload your product review</p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setIsRecording(!isRecording)}
                        className={isRecording ? "bg-red-500 text-white" : ""}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Video
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Video ready for upload</p>
                  <p className="text-xs text-muted-foreground">{videoFile.name}</p>
                  <Button variant="outline" size="sm" onClick={() => setVideoFile(null)}>
                    Remove Video
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="p-1">
                  <Star
                    className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Review Title</label>
            <Input
              placeholder="Give your review a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Share your honest thoughts about this product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tags..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} size="sm">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Commission Info */}
          {product && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-600">Earn Commission</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                You'll earn {product.commission}% commission (${((product.price * product.commission) / 100).toFixed(2)}
                ) for every sale generated from your review!
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!title || !description || !videoFile}
            >
              Publish Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
