"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Users, Eye, Clock } from "lucide-react"

interface SponsoredCampaign {
  id: string
  brand: string
  title: string
  description: string
  budget: number
  cpm: number
  targetAudience: string[]
  duration: number
  requirements: string[]
  status: "active" | "pending" | "completed"
  applications: number
  estimatedReach: number
}

const availableCampaigns: SponsoredCampaign[] = [
  {
    id: "1",
    brand: "Nike",
    title: "Air Jordan Launch Campaign",
    description: "Promote the new Air Jordan collection with authentic reviews and styling content",
    budget: 50000,
    cpm: 15,
    targetAudience: ["Fashion", "Sports", "Lifestyle"],
    duration: 30,
    requirements: ["Min 10K followers", "Fashion/Sports content", "High engagement rate"],
    status: "active",
    applications: 45,
    estimatedReach: 500000,
  },
  {
    id: "2",
    brand: "Apple",
    title: "iPhone 15 Pro Review Series",
    description: "Create honest reviews and tutorials showcasing iPhone 15 Pro features",
    budget: 75000,
    cpm: 20,
    targetAudience: ["Tech", "Lifestyle", "Photography"],
    duration: 21,
    requirements: ["Min 25K followers", "Tech content experience", "Professional video quality"],
    status: "active",
    applications: 23,
    estimatedReach: 750000,
  },
  {
    id: "3",
    brand: "Sephora",
    title: "Holiday Beauty Collection",
    description: "Showcase holiday makeup looks using our new collection",
    budget: 30000,
    cpm: 12,
    targetAudience: ["Beauty", "Fashion", "Lifestyle"],
    duration: 45,
    requirements: ["Beauty content focus", "Min 5K followers", "Regular posting schedule"],
    status: "active",
    applications: 67,
    estimatedReach: 300000,
  },
]

interface SponsoredContentProps {
  userFollowers: number
  userCategories: string[]
  onApply: (campaignId: string, proposal: any) => void
}

export function SponsoredContent({ userFollowers, userCategories, onApply }: SponsoredContentProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<SponsoredCampaign | null>(null)
  const [proposal, setProposal] = useState({
    message: "",
    deliverables: "",
    timeline: "",
    rate: "",
  })

  const isEligible = (campaign: SponsoredCampaign) => {
    const hasMinFollowers = userFollowers >= 5000 // Basic requirement
    const hasMatchingCategory = campaign.targetAudience.some((audience) =>
      userCategories.includes(audience.toLowerCase()),
    )
    return hasMinFollowers && hasMatchingCategory
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleApply = () => {
    if (selectedCampaign) {
      onApply(selectedCampaign.id, proposal)
      setSelectedCampaign(null)
      setProposal({ message: "", deliverables: "", timeline: "", rate: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Brand Partnership Opportunities</h2>
        <p className="text-muted-foreground">Apply for sponsored content campaigns and earn premium rates</p>
      </div>

      <div className="grid gap-6">
        {availableCampaigns.map((campaign) => (
          <Card key={campaign.id} className={`${!isEligible(campaign) ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{campaign.brand}</h3>
                    <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-muted-foreground">{campaign.title}</h4>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${campaign.budget.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{campaign.description}</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-semibold">${campaign.cpm} CPM</p>
                    <p className="text-xs text-muted-foreground">Per 1K views</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-semibold">{campaign.duration} days</p>
                    <p className="text-xs text-muted-foreground">Campaign duration</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-semibold">{campaign.estimatedReach.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Est. reach</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold">Target Audience:</h5>
                <div className="flex flex-wrap gap-2">
                  {campaign.targetAudience.map((audience) => (
                    <Badge key={audience} variant="outline">
                      {audience}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold">Requirements:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {campaign.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    <Users className="h-4 w-4 inline mr-1" />
                    {campaign.applications} applications
                  </span>
                </div>

                <Button onClick={() => setSelectedCampaign(campaign)} disabled={!isEligible(campaign)}>
                  {isEligible(campaign) ? "Apply Now" : "Not Eligible"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Apply for {selectedCampaign.brand} Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Proposal Message</label>
                <Textarea
                  placeholder="Tell the brand why you're perfect for this campaign..."
                  value={proposal.message}
                  onChange={(e) => setProposal({ ...proposal, message: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deliverables</label>
                <Textarea
                  placeholder="What will you deliver? (e.g., 3 TikTok videos, 2 Instagram posts...)"
                  value={proposal.deliverables}
                  onChange={(e) => setProposal({ ...proposal, deliverables: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeline</label>
                  <Select
                    value={proposal.timeline}
                    onValueChange={(value) => setProposal({ ...proposal, timeline: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Rate ($)</label>
                  <Input
                    type="number"
                    placeholder="Enter your rate"
                    value={proposal.rate}
                    onChange={(e) => setProposal({ ...proposal, rate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedCampaign(null)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleApply} className="flex-1">
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
