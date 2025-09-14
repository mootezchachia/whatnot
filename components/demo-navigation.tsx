"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Play, Users, Gavel, ShoppingBag, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DemoNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home Feed", badge: "Live" },
    { href: "/demo", icon: Play, label: "Demo", badge: "Investor" },
    { href: "/live/demo-stream", icon: Users, label: "Live Shopping", badge: "Active" },
    { href: "/auctions/1", icon: Gavel, label: "Auctions", badge: "Bidding" },
    { href: "/discover", icon: ShoppingBag, label: "Discover", badge: null },
    { href: "/analytics", icon: BarChart3, label: "Analytics", badge: "Pro" },
  ]

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-white/20">
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start text-white hover:bg-black/40"
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
