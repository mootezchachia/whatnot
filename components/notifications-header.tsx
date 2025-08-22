"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export function NotificationsHeader() {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold text-foreground">Notifications</h1>

        <Button variant="ghost" size="sm">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
