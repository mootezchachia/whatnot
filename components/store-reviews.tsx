"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface StoreReviewsProps {
  storeId: string
}

const mockStoreReviews = [
  {
    id: "1",
    user: {
      name: "Jessica K.",
      avatar: "/user-avatar-jessica.png",
    },
    rating: 5,
    date: "3 days ago",
    comment: "Amazing store! Fast shipping and excellent customer service. Will definitely shop here again.",
  },
  {
    id: "2",
    user: {
      name: "David M.",
      avatar: "/user-avatar-david.png",
    },
    rating: 5,
    date: "1 week ago",
    comment: "High quality products and great prices. The store owner is very responsive to questions.",
  },
  {
    id: "3",
    user: {
      name: "Lisa R.",
      avatar: "/user-avatar-lisa.png",
    },
    rating: 4,
    date: "2 weeks ago",
    comment: "Good selection of products. Packaging could be better but overall satisfied with my purchase.",
  },
]

export function StoreReviews({ storeId }: StoreReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockStoreReviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.user.name}</span>
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

                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
