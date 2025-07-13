"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, AlertCircle, CheckCircle, Clock, FileText } from "lucide-react"
import { useDocuments } from "@/hooks/use-documents"

export function ProcessingStatus() {
  const { documents } = useDocuments()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "uploading":
        return <Clock className="h-4 w-4 text-amber-600" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      error: "bg-red-50 text-red-700 border-red-200",
      uploading: "bg-amber-50 text-amber-700 border-amber-200",
    }

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Show only last 4 documents
  const recentDocuments = documents.slice(0, 4)

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Document Processing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentDocuments.length > 0 ? (
          recentDocuments.map((job) => (
            <div key={job.id} className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50/50">
              <div className="flex-shrink-0">{getStatusIcon(job.status)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-slate-900 truncate">{job.name}</h4>
                  {getStatusBadge(job.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{job.stage || 'Uploading...'}</span>
                    {job.estimatedTime && <span>{job.estimatedTime}</span>}
                    {job.confidence && <span>Confidence: {job.confidence}%</span>}
                    <span className="text-slate-500">{formatFileSize(job.size)}</span>
                  </div>

                  {(job.status === "processing" || job.status === "uploading") && (
                    <Progress value={job.progress} className="h-2" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {job.status === "completed" && (
                  <>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                      <Download className="h-3 w-3" />
                    </Button>
                  </>
                )}
                {job.status === "error" && (
                  <Button size="sm" variant="outline" className="text-xs px-3 bg-transparent">
                    Retry
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <FileText className="mx-auto h-8 w-8 mb-2 text-slate-300" />
            <p className="text-sm">No documents processing</p>
            <p className="text-xs">Upload some documents to see processing status</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
