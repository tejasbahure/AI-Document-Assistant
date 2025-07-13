"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles } from "lucide-react"

export function SearchInterface({ onSearch, isProcessing }: { onSearch: (query: string) => void, isProcessing: boolean }) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (!query.trim()) return
    onSearch(query)
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          AI-Powered Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Textarea
            placeholder="Ask a question about your documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px] resize-none"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Query complexity:</span>
              <Badge variant="outline" className="text-xs">
                {query.length > 100 ? "Complex" : query.length > 50 ? "Moderate" : "Simple"}
              </Badge>
            </div>

            <Button
              onClick={handleSearch}
              disabled={!query.trim() || isProcessing}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
