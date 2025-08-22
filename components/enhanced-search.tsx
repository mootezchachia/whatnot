"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X, Clock, TrendingUp, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchSuggestion {
  id: string
  text: string
  type: "recent" | "trending" | "suggestion"
  count?: number
}

const mockSuggestions: SearchSuggestion[] = [
  { id: "1", text: "iPhone 15 Pro", type: "trending", count: 1200 },
  { id: "2", text: "Nike Air Jordan", type: "trending", count: 890 },
  { id: "3", text: "skincare routine", type: "recent" },
  { id: "4", text: "wireless earbuds", type: "recent" },
  { id: "5", text: "MacBook Air M3", type: "suggestion" },
  { id: "6", text: "gaming setup", type: "suggestion" },
]

interface EnhancedSearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  onFilterToggle?: () => void
  className?: string
}

export function EnhancedSearch({
  placeholder = "Search products, creators, or videos...",
  onSearch,
  onFilterToggle,
  className,
}: EnhancedSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter((s) => s.text.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions(mockSuggestions)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      setRecentSearches((prev) => [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 5))
      setQuery("")
      setIsOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.text)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "recent":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "trending":
        return <TrendingUp className="h-4 w-4 text-primary" />
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query)
            }
          }}
          placeholder={placeholder}
          className="pl-10 pr-20 h-12 rounded-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuery("")}>
              <X className="h-4 w-4" />
            </Button>
          )}

          {onFilterToggle && (
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onFilterToggle}>
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 animate-slide-up shadow-lg">
          <CardContent className="p-0">
            {recentSearches.length > 0 && (
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Recent Searches</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleSearch(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {getSuggestionIcon(suggestion.type)}
                  <span className="flex-1">{suggestion.text}</span>
                  {suggestion.count && (
                    <Badge variant="outline" className="text-xs">
                      {suggestion.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
