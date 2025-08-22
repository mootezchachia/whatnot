"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumSubscription } from "@/components/premium-subscription"
import { VirtualGifts } from "@/components/virtual-gifts"
import { SponsoredContent } from "@/components/sponsored-content"
import { RevenueAnalytics } from "@/components/revenue-analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Gift, Target, BarChart3, DollarSign, TrendingUp } from "lucide-react"

export default function MonetizationPage() {
  const [currentPlan, setCurrentPlan] = useState<string>()
  const [userCoins, setUserCoins] = useState(150)
  const [userFollowers] = useState(25000)
  const [userCategories] = useState(["fashion", "lifestyle", "tech"])

  const handleSubscribe = (planId: string) => {
    setCurrentPlan(planId)
    console.log("Subscribed to plan:", planId)
  }

  const handleSendGift = (giftId: string, quantity: number) => {
    console.log("Sending gift:", giftId, "quantity:", quantity)
  }

  const handleBuyCoins = () => {
    setUserCoins(userCoins + 100)
    console.log("Bought more coins")
  }

  const handleApplySponsorship = (campaignId: string, proposal: any) => {
    console.log("Applied to campaign:", campaignId, proposal)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Monetization Hub</h1>
          <p className="text-muted-foreground">Maximize your earnings with premium features and revenue streams</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Monthly Earnings</span>
              </div>
              <p className="text-2xl font-bold text-green-600">$2,847</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Growth Rate</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">+23.5%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Plan Status</span>
              </div>
              <p className="text-lg font-bold text-purple-600">{currentPlan || "Free"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">Coins Balance</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">{userCoins}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Premium
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Virtual Gifts
            </TabsTrigger>
            <TabsTrigger value="sponsored" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Sponsorships
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <RevenueAnalytics />
          </TabsContent>

          <TabsContent value="subscription">
            <PremiumSubscription currentPlan={currentPlan} onSubscribe={handleSubscribe} />
          </TabsContent>

          <TabsContent value="gifts">
            <VirtualGifts
              creatorName="fashionista_jane"
              userCoins={userCoins}
              onSendGift={handleSendGift}
              onBuyCoins={handleBuyCoins}
            />
          </TabsContent>

          <TabsContent value="sponsored">
            <SponsoredContent
              userFollowers={userFollowers}
              userCategories={userCategories}
              onApply={handleApplySponsorship}
            />
          </TabsContent>

          <TabsContent value="tools">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monetization Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Affiliate Link Generator</h4>
                    <p className="text-sm text-muted-foreground">Create custom affiliate links for any product</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Generate Links
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Revenue Optimizer</h4>
                    <p className="text-sm text-muted-foreground">AI-powered suggestions to increase earnings</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Suggestions
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Tax Report Generator</h4>
                    <p className="text-sm text-muted-foreground">Generate tax reports for your earnings</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Payout Methods</h4>
                    <p className="text-sm text-muted-foreground">Manage your payment preferences</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Manage Payouts
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Tax Information</h4>
                    <p className="text-sm text-muted-foreground">Update your tax details</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Update Tax Info
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Earnings History</h4>
                    <p className="text-sm text-muted-foreground">View detailed earnings history</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
