import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface SearchResult {
  question: string
  answer: string
  confidence?: number
  sources?: { document: string; page?: number; relevance?: number }[]
}

export function SearchResults({ results = [], isLoading }: { results?: SearchResult[]; isLoading: boolean }) {
  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Search Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && <div className="text-slate-500">Analyzing documents and searching...</div>}
          {!isLoading && results.length === 0 && <div className="text-slate-500">No results yet. Ask a question above!</div>}
          {results.map((result, idx) => (
            <div key={idx} className="space-y-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900 text-sm leading-relaxed">{result.question}</h4>
                {result.confidence !== undefined && (
                  <Badge variant="outline" className="text-xs">
                    Confidence: {result.confidence}%
                  </Badge>
                )}
              </div>
              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{result.answer}</p>
                {result.sources && result.sources.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-slate-600">Sources:</h5>
                    {result.sources.map((source, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <span className="text-slate-600 truncate">{source.document}</span>
                        {source.page && <Badge variant="outline" className="text-xs">p.{source.page}</Badge>}
                        {source.relevance && <span className="text-slate-500">{source.relevance}%</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
