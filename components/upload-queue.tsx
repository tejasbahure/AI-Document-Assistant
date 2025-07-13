"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Trash2, Clock, AlertCircle } from "lucide-react"
import { useDocuments } from "@/hooks/use-documents"

export function UploadQueue() {
  const { documents, updateDocument, removeDocument } = useDocuments()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      case "normal":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "low":
        return "bg-slate-50 text-slate-700 border-slate-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
      case "uploading":
        return <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
      case "completed":
        return <div className="h-2 w-2 bg-emerald-500 rounded-full" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleRemoveDocument = (id: string) => {
    removeDocument(id)
  }

  const handleRetryDocument = (id: string) => {
    updateDocument(id, {
      status: 'uploading',
      progress: 0,
      stage: 'Retrying upload...'
    })
  }

  // Show only last 4 documents
  const recentDocuments = documents.slice(0, 4)

  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900">Processing Queue</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Play className="h-3 w-3 mr-1" />
            Resume All
          </Button>
          <Button size="sm" variant="outline">
            <Pause className="h-3 w-3 mr-1" />
            Pause All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentDocuments.length > 0 ? (
          recentDocuments.map((item) => (
            <div key={item.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{formatFileSize(item.size)}</span>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {item.status === "processing" && (
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Pause className="h-3 w-3" />
                    </Button>
                  )}
                  {item.status === "uploading" && (
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Pause className="h-3 w-3" />
                    </Button>
                  )}
                  {item.status === "error" && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleRetryDocument(item.id)}
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveDocument(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">{item.stage || 'Uploading...'}</span>
                  {item.estimatedTime && <span className="text-slate-500">{item.estimatedTime}</span>}
                </div>

                {(item.status === "processing" || item.status === "uploading") && (
                  <Progress value={item.progress} className="h-2" />
                )}

                {item.status === "error" && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    Upload failed. The document may be corrupted or in an unsupported format.
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Clock className="mx-auto h-8 w-8 mb-2 text-slate-300" />
            <p className="text-sm">No documents in queue</p>
            <p className="text-xs">Upload some documents to see them here</p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Queue Status</span>
            <span className="font-medium text-slate-900">
              {recentDocuments.length} items • {recentDocuments.filter(d => d.status === 'processing').length} processing • {recentDocuments.filter(d => d.status === 'uploading').length} uploading • {recentDocuments.filter(d => d.status === 'error').length} error
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
