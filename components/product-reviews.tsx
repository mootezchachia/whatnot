"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp } from "lucide-react"

interface ProductReviewsProps {
  productId: string
}

const mockReviews = [
  {
    id: "1",
    user: {
      name: "Sarah M.",
      avatar: "/user-avatar-1.png",
      verified: true,
    },
    rating: 5,
    date: "2 days ago",
    comment: "Amazing quality! The jacket fits perfectly and looks exactly like in the video. Highly recommend!",
    helpful: 12,
    images: ["/review-image-1.png"],
  },
  {
    id: "2",
    user: {
      name: "Mike R.",
      avatar: "/user-avatar-2.png",
      verified: false,
    },
    rating: 4,
    date: "1 week ago",
    comment: "Good quality jacket, but sizing runs a bit small. Order one size up!",
    helpful: 8,
  },
  {
    id: "3",
    user: {
      name: "Emma L.",
      avatar: "/user-avatar-3.png",
      verified: true,
    },
    rating: 5,
    date: "2 weeks ago",
    comment: "Love this jacket! Perfect for the season and great value for money.",
    helpful: 15,
  },
]

export function ProductReviews({ productId }: ProductReviewsProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Customer Reviews</span>
          <Button variant="outline" size="sm">
            Write Review
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.user.name}</span>
                    {review.user.verified && (
                      <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm mb-3">{review.comment}</p>

                  {review.images && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Review ${index + 1}`}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}

                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
