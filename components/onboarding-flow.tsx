"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Sparkles, ShoppingBag, Video, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to TikTok Shop!",
    description: "Discover, shop, and earn through social commerce",
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    content: (
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-float">
          <Sparkles className="h-12 w-12 text-white" />
        </div>
        <p className="text-muted-foreground">
          Join millions of creators and shoppers in the ultimate social commerce experience
        </p>
      </div>
    ),
  },
  {
    id: "discover",
    title: "Discover Amazing Products",
    description: "Shop directly from videos and live streams",
    icon: <ShoppingBag className="h-8 w-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <p className="text-muted-foreground text-center">Tap on product tags in videos to shop instantly</p>
      </div>
    ),
  },
  {
    id: "create",
    title: "Create & Earn",
    description: "Make video reviews and earn commissions",
    icon: <Video className="h-8 w-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-600">Earn up to 15% commission</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Create authentic product reviews and earn money from every sale
          </p>
        </div>
      </div>
    ),
  },
]

interface OnboardingFlowProps {
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      }, 150)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsAnimating(false)
      }, 150)
    }
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100
  const step = onboardingSteps[currentStep]

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in-scale">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              {currentStep + 1} of {onboardingSteps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Skip
            </Button>
          </div>

          <Progress value={progress} className="h-2" />

          <div
            className={cn("transition-all duration-300", isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100")}
          >
            <div className="mb-4">{step.icon}</div>
            <CardTitle className="text-xl">{step.title}</CardTitle>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div
            className={cn("transition-all duration-300", isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100")}
          >
            {step.content}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
