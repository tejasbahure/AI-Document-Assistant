import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink, Copy, Download, ThumbsUp, ThumbsDown } from "lucide-react"

const searchResults = [
  {
    id: "1",
    question: "What were the key financial highlights in Q3 2024?",
    answer:
      "Based on the Q3 2024 financial reports, the key highlights include: Revenue increased by 15% to $2.4M, gross profit margin improved to 68%, and operating expenses were reduced by 8% compared to Q2.",
    confidence: 94,
    sources: [
      { document: "Q3_Financial_Report.pdf", page: 3, relevance: 98 },
      { document: "Executive_Summary_Q3.pdf", page: 1, relevance: 87 },
    ],
    timestamp: "2 minutes ago",
    saved: false,
  },
  {
    id: "2",
    question: "Find contracts expiring in next 6 months",
    answer:
      "I found 7 contracts expiring within the next 6 months: 3 vendor agreements (March 2024), 2 service contracts (April 2024), and 2 licensing agreements (May 2024).",
    confidence: 89,
    sources: [
      { document: "Vendor_Contracts_2024.pdf", page: 12, relevance: 95 },
      { document: "Service_Agreements.pdf", page: 8, relevance: 91 },
    ],
    timestamp: "5 minutes ago",
    saved: true,
  },
]

export function SearchResults() {
  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Search Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {searchResults.map((result) => (
            <div key={result.id} className="space-y-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-slate-900 text-sm leading-relaxed">{result.question}</h4>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 flex-shrink-0">
                    <Star className={`h-3 w-3 ${result.saved ? "fill-amber-400 text-amber-400" : "text-slate-400"}`} />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Confidence: {result.confidence}%
                  </Badge>
                  <span className="text-xs text-slate-500">{result.timestamp}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed">{result.answer}</p>

                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-slate-600">Sources:</h5>
                  {result.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 truncate">{source.document}</span>
                        <Badge variant="outline" className="text-xs">
                          p.{source.page}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">{source.relevance}%</span>
                        <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-900">Related Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "What were the main expenses in Q3?",
            "Compare Q3 performance to Q2",
            "Show revenue breakdown by department",
          ].map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-slate-600 hover:text-slate-900 h-auto p-2"
            >
              {suggestion}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
