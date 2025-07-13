"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Sparkles, Filter, Clock, BookOpen, TrendingUp } from "lucide-react"

const exampleQueries = [
  "What were the key financial highlights in Q3 2024?",
  "Find all contracts expiring in the next 6 months",
  "Summarize the main risks mentioned in legal documents",
  "What compliance requirements are mentioned across all documents?",
]

const recentSearches = [
  "revenue trends quarterly",
  "contract amendments 2024",
  "compliance requirements",
  "financial projections",
]

const suggestedTopics = [
  { name: "Financial Reports", count: 23 },
  { name: "Legal Contracts", count: 18 },
  { name: "Compliance", count: 12 },
  { name: "Research Papers", count: 8 },
]

export function SearchInterface() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) return
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => setIsProcessing(false), 2000)
  }

  const handleExampleQuery = (exampleQuery: string) => {
    setQuery(exampleQuery)
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
        <Tabs defaultValue="natural" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="natural">Natural Language</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
          </TabsList>

          <TabsContent value="natural" className="space-y-4">
            <div className="space-y-3">
              <Textarea
                placeholder="Ask a question about your documents... e.g., 'What are the main financial risks mentioned in our Q3 reports?'"
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

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-900">Example Queries</h4>
              <div className="grid grid-cols-1 gap-2">
                {exampleQueries.map((example, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start text-left h-auto p-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    onClick={() => handleExampleQuery(example)}
                  >
                    <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Keywords</label>
                <Input placeholder="Enter keywords..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Document Type</label>
                <Input placeholder="PDF, DOCX, etc." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Date Range</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Confidence Level</label>
                <Input placeholder="Min confidence %" />
              </div>
            </div>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters & Search
            </Button>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Searches
            </h4>
            <div className="space-y-1">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-xs text-slate-500 hover:text-slate-700"
                  onClick={() => setQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending Topics
            </h4>
            <div className="space-y-1">
              {suggestedTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-500 hover:text-slate-700 p-0 h-auto"
                    onClick={() => setQuery(topic.name)}
                  >
                    {topic.name}
                  </Button>
                  <Badge variant="outline" className="text-xs">
                    {topic.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
