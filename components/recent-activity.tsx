"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, Upload, Search } from "lucide-react"
import { useDocuments } from "@/hooks/use-documents"

export function RecentActivity() {
  const { activities } = useDocuments()

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'query':
        return MessageSquare
      case 'upload':
        return Upload
      case 'search':
        return Search
      case 'processing':
        return FileText
      default:
        return FileText
    }
  }

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case 'query':
        return 'text-blue-600'
      case 'upload':
        return 'text-emerald-600'
      case 'search':
        return 'text-purple-600'
      case 'processing':
        return 'text-amber-600'
      default:
        return 'text-slate-600'
    }
  }

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case 'query':
        return 'bg-blue-50'
      case 'upload':
        return 'bg-emerald-50'
      case 'search':
        return 'bg-purple-50'
      case 'processing':
        return 'bg-amber-50'
      default:
        return 'bg-slate-50'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  // Show only last 4 activities
  const recentActivities = activities.slice(0, 4)

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getActivityIconBg(activity.type)} flex-shrink-0`}>
                  <ActivityIcon className={`h-4 w-4 ${getActivityIconColor(activity.type)}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900">{activity.user}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{activity.action}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 truncate">{activity.document}</span>
                    <span className="text-xs text-slate-400 flex-shrink-0">{formatTimeAgo(activity.time)}</span>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 text-slate-500">
            <FileText className="mx-auto h-8 w-8 mb-2 text-slate-300" />
            <p className="text-sm">No recent activity</p>
            <p className="text-xs">Upload some documents to see activity here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
