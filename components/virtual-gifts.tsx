"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Gift, Star, Flame, Diamond, Crown, Sparkles, Zap } from "lucide-react"

interface VirtualGift {
  id: string
  name: string
  icon: React.ReactNode
  cost: number
  value: number
  rarity: "common" | "rare" | "epic" | "legendary"
  animation?: string
}

const virtualGifts: VirtualGift[] = [
  {
    id: "heart",
    name: "Heart",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    cost: 1,
    value: 0.01,
    rarity: "common",
  },
  {
    id: "star",
    name: "Star",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    cost: 5,
    value: 0.05,
    rarity: "common",
  },
  {
    id: "fire",
    name: "Fire",
    icon: <Flame className="h-6 w-6 text-orange-500" />,
    cost: 10,
    value: 0.1,
    rarity: "rare",
  },
  {
    id: "gift",
    name: "Gift Box",
    icon: <Gift className="h-6 w-6 text-green-500" />,
    cost: 25,
    value: 0.25,
    rarity: "rare",
  },
  {
    id: "diamond",
    name: "Diamond",
    icon: <Diamond className="h-6 w-6 text-blue-500" />,
    cost: 50,
    value: 0.5,
    rarity: "epic",
  },
  {
    id: "crown",
    name: "Crown",
    icon: <Crown className="h-6 w-6 text-purple-500" />,
    cost: 100,
    value: 1.0,
    rarity: "legendary",
  },
  {
    id: "sparkles",
    name: "Magic Sparkles",
    icon: <Sparkles className="h-6 w-6 text-pink-500" />,
    cost: 200,
    value: 2.0,
    rarity: "legendary",
  },
  {
    id: "lightning",
    name: "Lightning Bolt",
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    cost: 500,
    value: 5.0,
    rarity: "legendary",
  },
]

interface VirtualGiftsProps {
  creatorName: string
  userCoins: number
  onSendGift: (giftId: string, quantity: number) => void
  onBuyCoins: () => void
}

export function VirtualGifts({ creatorName, userCoins, onSendGift, onBuyCoins }: VirtualGiftsProps) {
  const [selectedGift, setSelectedGift] = useState<VirtualGift | null>(null)
  const [quantity, setQuantity] = useState(1)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 border-gray-300"
      case "rare":
        return "bg-blue-100 border-blue-300"
      case "epic":
        return "bg-purple-100 border-purple-300"
      case "legendary":
        return "bg-yellow-100 border-yellow-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalCost = selectedGift ? selectedGift.cost * quantity : 0
  const canAfford = totalCost <= userCoins

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">Send a Gift to @{creatorName}</h3>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-xs font-bold">C</span>
            </div>
            <span className="font-semibold">{userCoins} Coins</span>
          </div>
          <Button variant="outline" size="sm" onClick={onBuyCoins}>
            Buy More Coins
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {virtualGifts.map((gift) => (
          <Card
            key={gift.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedGift?.id === gift.id ? "ring-2 ring-primary" : ""
            } ${getRarityColor(gift.rarity)}`}
            onClick={() => setSelectedGift(gift)}
          >
            <CardContent className="p-4 text-center">
              <div className="mb-2">{gift.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{gift.name}</h4>
              <div className="space-y-1">
                <p className="text-xs font-bold">{gift.cost} coins</p>
                <Badge className={`text-xs ${getRarityBadgeColor(gift.rarity)}`}>{gift.rarity}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedGift && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedGift.icon}
              Send {selectedGift.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">Total Cost:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{totalCost} coins</span>
                <span className="text-sm text-muted-foreground">(${(selectedGift.value * quantity).toFixed(2)})</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => onSendGift(selectedGift.id, quantity)} disabled={!canAfford}>
              {canAfford ? `Send Gift` : "Not Enough Coins"}
            </Button>

            {!canAfford && (
              <p className="text-sm text-red-500 text-center">You need {totalCost - userCoins} more coins</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
