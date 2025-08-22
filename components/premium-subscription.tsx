"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Crown, Star, Zap, Check } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "monthly" | "yearly"
  features: string[]
  popular?: boolean
  color: string
  icon: React.ReactNode
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "creator-pro",
    name: "Creator Pro",
    price: 9.99,
    interval: "monthly",
    features: [
      "Advanced analytics dashboard",
      "Priority customer support",
      "Custom branding options",
      "Higher commission rates (+2%)",
      "Early access to new features",
      "Unlimited video uploads",
    ],
    color: "bg-blue-500",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "creator-elite",
    name: "Creator Elite",
    price: 19.99,
    interval: "monthly",
    features: [
      "Everything in Creator Pro",
      "Dedicated account manager",
      "Custom affiliate links",
      "Advanced A/B testing tools",
      "White-label options",
      "Revenue optimization AI",
      "Exclusive brand partnerships",
    ],
    popular: true,
    color: "bg-purple-500",
    icon: <Crown className="h-5 w-5" />,
  },
  {
    id: "business",
    name: "Business",
    price: 49.99,
    interval: "monthly",
    features: [
      "Everything in Creator Elite",
      "Multi-user team access",
      "Advanced API access",
      "Custom integrations",
      "Priority listing in marketplace",
      "Advanced fraud protection",
      "Unlimited sponsored content",
    ],
    color: "bg-amber-500",
    icon: <Zap className="h-5 w-5" />,
  },
]

interface PremiumSubscriptionProps {
  currentPlan?: string
  onSubscribe: (planId: string) => void
}

export function PremiumSubscription({ currentPlan, onSubscribe }: PremiumSubscriptionProps) {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly")

  const getDiscountedPrice = (price: number) => {
    return billingInterval === "yearly" ? price * 10 : price // 2 months free on yearly
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Unlock Premium Features</h2>
        <p className="text-muted-foreground">Choose the perfect plan to maximize your earnings</p>

        <div className="flex items-center justify-center gap-4">
          <span className={billingInterval === "monthly" ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
          <Switch
            checked={billingInterval === "yearly"}
            onCheckedChange={(checked) => setBillingInterval(checked ? "yearly" : "monthly")}
          />
          <span className={billingInterval === "yearly" ? "font-semibold" : "text-muted-foreground"}>
            Yearly
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <div
                className={`w-12 h-12 rounded-full ${plan.color} flex items-center justify-center text-white mx-auto mb-4`}
              >
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  ${getDiscountedPrice(plan.price).toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">/{billingInterval}</span>
                </div>
                {billingInterval === "yearly" && (
                  <div className="text-sm text-muted-foreground line-through">${(plan.price * 12).toFixed(2)}/year</div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={currentPlan === plan.id ? "outline" : "default"}
                onClick={() => onSubscribe(plan.id)}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : "Upgrade Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include a 7-day free trial. Cancel anytime.</p>
      </div>
    </div>
  )
}
