import { SocialFeed } from "@/components/social-feed"
import { SocialHeader } from "@/components/social-header"

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SocialHeader />
      <SocialFeed />
    </div>
  )
}
