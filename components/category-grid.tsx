"use client"

import { Button } from "@/components/ui/button"
import { Shirt, Home, Smartphone, Gamepad2, Heart, Car, Book, Music } from "lucide-react"

const categories = [
  { id: "fashion", name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600" },
  { id: "home", name: "Home", icon: Home, color: "bg-blue-100 text-blue-600" },
  { id: "tech", name: "Tech", icon: Smartphone, color: "bg-purple-100 text-purple-600" },
  { id: "gaming", name: "Gaming", icon: Gamepad2, color: "bg-green-100 text-green-600" },
  { id: "beauty", name: "Beauty", icon: Heart, color: "bg-red-100 text-red-600" },
  { id: "auto", name: "Auto", icon: Car, color: "bg-gray-100 text-gray-600" },
  { id: "books", name: "Books", icon: Book, color: "bg-yellow-100 text-yellow-600" },
  { id: "music", name: "Music", icon: Music, color: "bg-indigo-100 text-indigo-600" },
]

export function CategoryGrid() {
  return (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Categories</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <button
              key={category.id}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className={`p-3 rounded-full ${category.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
