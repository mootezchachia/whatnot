"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Heart, Gift } from "lucide-react"

interface LiveChatProps {
  streamId: string
}

interface ChatMessage {
  id: string
  user: {
    name: string
    avatar: string
    verified?: boolean
    badge?: string
  }
  message: string
  timestamp: Date
  type: "message" | "gift" | "follow" | "purchase"
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: { name: "Sarah_M", avatar: "/placeholder.svg?height=50&width=50", verified: true },
    message: "Love this jacket! Where can I buy it?",
    timestamp: new Date(Date.now() - 30000),
    type: "message",
  },
  {
    id: "2",
    user: { name: "Mike_R", avatar: "/placeholder.svg?height=50&width=50" },
    message: "Just followed! Great content 🔥",
    timestamp: new Date(Date.now() - 25000),
    type: "follow",
  },
  {
    id: "3",
    user: { name: "Emma_L", avatar: "/placeholder.svg?height=50&width=50", badge: "VIP" },
    message: "Sent a gift! 🎁",
    timestamp: new Date(Date.now() - 20000),
    type: "gift",
  },
  {
    id: "4",
    user: { name: "David_C", avatar: "/placeholder.svg?height=50&width=50" },
    message: "Just purchased the boots! Thanks for the demo",
    timestamp: new Date(Date.now() - 15000),
    type: "purchase",
  },
]

export function LiveChat({ streamId }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate new messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        "This looks amazing!",
        "How much is the jacket?",
        "Love your style!",
        "Just added to cart!",
        "When will you go live again?",
        "Great quality!",
      ]

      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: {
          name: `User_${Math.floor(Math.random() * 1000)}`,
          avatar: "/placeholder.svg?height=50&width=50",
        },
        message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date(),
        type: "message",
      }

      setMessages((prev) => [...prev, newMsg])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      message: newMessage,
      timestamp: new Date(),
      type: "message",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case "gift":
        return "bg-yellow-50 border-yellow-200"
      case "follow":
        return "bg-blue-50 border-blue-200"
      case "purchase":
        return "bg-green-50 border-green-200"
      default:
        return ""
    }
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "gift":
        return <Gift className="h-3 w-3 text-yellow-600" />
      case "follow":
        return <Heart className="h-3 w-3 text-blue-600" />
      case "purchase":
        return <Heart className="h-3 w-3 text-green-600 fill-current" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-96 border-t border-border">
      {/* Chat Header */}
      <div className="p-3 border-b border-border">
        <h3 className="font-semibold">Live Chat</h3>
        <p className="text-sm text-muted-foreground">{messages.length} messages</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`p-2 rounded-lg ${getMessageStyle(message.type)}`}>
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={message.user.avatar || "/placeholder.svg?height=50&width=50"} />
                <AvatarFallback className="text-xs">{message.user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-medium truncate">{message.user.name}</span>
                  {message.user.verified && (
                    <div className="h-3 w-3 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                  )}
                  {message.user.badge && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      {message.user.badge}
                    </Badge>
                  )}
                  {getMessageIcon(message.type)}
                </div>
                <p className="text-xs break-words">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Say something..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
