import { NotificationsList } from "@/components/notifications-list"
import { NotificationsHeader } from "@/components/notifications-header"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <NotificationsHeader />
      <NotificationsList />
    </div>
  )
}
