"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, Camera, Settings, Zap, Users, Share, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = ["Fashion", "Beauty", "Tech", "Lifestyle", "Gaming", "Food", "Sports", "Art"]

export function CreateLiveStream() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: null as File | null,
  })
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [coHosts, setCoHosts] = useState<string[]>([])
  const [newCoHost, setNewCoHost] = useState("")
  const [multicastEnabled, setMulticastEnabled] = useState(false)
  const [multicastPlatforms, setMulticastPlatforms] = useState({
    youtube: { enabled: false, streamKey: "" },
    facebook: { enabled: false, streamKey: "" },
    twitch: { enabled: false, streamKey: "" },
    instagram: { enabled: false, streamKey: "" },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle stream creation
    console.log("Creating stream:", { ...formData, coHosts, multicastPlatforms })
    router.push("/live/1") // Redirect to mock stream
  }

  const addCoHost = () => {
    if (newCoHost.trim() && !coHosts.includes(newCoHost.trim())) {
      setCoHosts([...coHosts, newCoHost.trim()])
      setNewCoHost("")
    }
  }

  const removeCoHost = (host: string) => {
    setCoHosts(coHosts.filter((h) => h !== host))
  }

  const updateMulticastPlatform = (platform: string, field: string, value: string | boolean) => {
    setMulticastPlatforms((prev) => ({
      ...prev,
      [platform]: { ...prev[platform as keyof typeof prev], [field]: value },
    }))
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Create Live Stream</h1>
          <p className="text-muted-foreground">Set up your live shopping session</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stream Details */}
        <Card>
          <CardHeader>
            <CardTitle>Stream Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Stream Title</Label>
              <Input
                id="title"
                placeholder="Enter your stream title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you'll be showcasing..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Co-hosting
            </CardTitle>
            <p className="text-sm text-muted-foreground">Invite other sellers to join your stream</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter username or email..."
                value={newCoHost}
                onChange={(e) => setNewCoHost(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCoHost())}
              />
              <Button type="button" onClick={addCoHost} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {coHosts.length > 0 && (
              <div className="space-y-2">
                <Label>Co-hosts ({coHosts.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {coHosts.map((host) => (
                    <Badge key={host} variant="secondary" className="flex items-center gap-1">
                      {host}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeCoHost(host)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Co-hosts can help manage products, interact with viewers, and share revenue from sales during the
                stream.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Multicasting
            </CardTitle>
            <p className="text-sm text-muted-foreground">Stream simultaneously to multiple platforms</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Multicasting</Label>
                <p className="text-sm text-muted-foreground">Broadcast to other platforms simultaneously</p>
              </div>
              <Switch checked={multicastEnabled} onCheckedChange={setMulticastEnabled} />
            </div>

            {multicastEnabled && (
              <div className="space-y-4 pt-4 border-t">
                {Object.entries(multicastPlatforms).map(([platform, config]) => (
                  <div key={platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="capitalize">{platform}</Label>
                      <Switch
                        checked={config.enabled}
                        onCheckedChange={(checked) => updateMulticastPlatform(platform, "enabled", checked)}
                      />
                    </div>
                    {config.enabled && (
                      <Input
                        placeholder={`${platform} stream key`}
                        value={config.streamKey}
                        onChange={(e) => updateMulticastPlatform(platform, "streamKey", e.target.value)}
                        type="password"
                      />
                    )}
                  </div>
                ))}

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Multicasting may affect stream quality. Ensure you have sufficient bandwidth
                    for multiple streams.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Thumbnail Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Stream Thumbnail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Upload a thumbnail for your stream</p>
              <Button variant="outline" type="button">
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stream Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Stream Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Camera Quality</p>
                  <p className="text-sm text-muted-foreground">HD 1080p</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Stream Quality</p>
                  <p className="text-sm text-muted-foreground">Auto (recommended)</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Adjust
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products to Feature */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <p className="text-sm text-muted-foreground">Select products to showcase during your stream</p>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" type="button">
              Select Products from Your Store
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" type="button">
            Save as Draft
          </Button>
          <Button className="flex-1" type="submit">
            <Zap className="h-4 w-4 mr-2" />
            Go Live Now
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateLiveStream
