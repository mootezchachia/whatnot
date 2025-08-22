import { UserProfile } from "@/components/user-profile"
import { UserTabs } from "@/components/user-tabs"
import { ProfileHeader } from "@/components/profile-header"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <ProfileHeader />
      <UserProfile />
      <UserTabs />
    </div>
  )
}
