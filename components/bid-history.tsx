"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface BidHistoryProps {
  auctionId: string
}

const mockBidHistory = [
  {
    id: "1",
    bidder: "b***r",
    amount: 1250,
    time: "2 minutes ago",
    isWinning: true,
    isAutoBid: false,
  },
  {
    id: "2",
    bidder: "c***k",
    amount: 1225,
    time: "5 minutes ago",
    isWinning: false,
    isAutoBid: true,
  },
  {
    id: "3",
    bidder: "a***m",
    amount: 1200,
    time: "8 minutes ago",
    isWinning: false,
    isAutoBid: false,
  },
  {
    id: "4",
    bidder: "b***r",
    amount: 1175,
    time: "12 minutes ago",
    isWinning: false,
    isAutoBid: false,
  },
  {
    id: "5",
    bidder: "d***n",
    amount: 1150,
    time: "18 minutes ago",
    isWinning: false,
    isAutoBid: true,
  },
  {
    id: "6",
    bidder: "c***k",
    amount: 1125,
    time: "25 minutes ago",
    isWinning: false,
    isAutoBid: false,
  },
]

export function BidHistory({ auctionId }: BidHistoryProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Bid History ({mockBidHistory.length} bids)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockBidHistory.map((bid, index) => (
            <div
              key={bid.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                bid.isWinning ? "bg-green-50 border border-green-200" : "bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{bid.bidder[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bid.bidder}</span>
                    {bid.isWinning && <Badge className="bg-green-100 text-green-800 text-xs">Winning</Badge>}
                    {bid.isAutoBid && (
                      <Badge variant="outline" className="text-xs">
                        Auto
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{bid.time}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${bid.isWinning ? "text-green-600" : "text-foreground"}`}>
                  ${bid.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
