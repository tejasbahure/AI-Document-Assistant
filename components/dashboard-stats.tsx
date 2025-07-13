"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Database, Clock } from "lucide-react"
import { documentStorage, DashboardStats } from "@/lib/storage"
import { useDocuments } from "@/hooks/use-documents"

export function DashboardStats() {
  const { documents, activities } = useDocuments()
  const [stats, setStats] = useState<DashboardStats>({
    documentsProcessed: 0,
    queriesAnswered: 0,
    storageUsed: 0,
    avgProcessingTime: 0
  })

  useEffect(() => {
    // Calculate real stats from documents and activities
    const documentsProcessed = documents.filter(doc => doc.status === 'completed').length
    const queriesAnswered = activities.filter(activity => activity.type === 'query').length
    const storageUsed = documents.reduce((total, doc) => total + doc.size, 0)
    const avgProcessingTime = documentStorage.getAvgProcessingTime()

    setStats({
      documentsProcessed,
      queriesAnswered,
      storageUsed,
      avgProcessingTime
    })
  }, [documents, activities])

  const formatStorageSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (minutes: number) => {
    if (minutes < 1) return "< 1 min"
    if (minutes < 60) return `${minutes.toFixed(1)} min`
    const hours = minutes / 60
    return `${hours.toFixed(1)} hours`
  }

  const statsData = [
    {
      title: "Documents Processed",
      value: stats.documentsProcessed.toString(),
      change: "+12% from last month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Queries Answered",
      value: stats.queriesAnswered.toString(),
      change: "+8% from last month",
      icon: MessageSquare,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Storage Used",
      value: formatStorageSize(stats.storageUsed),
      change: "68% of 1.2TB limit",
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Avg. Processing Time",
      value: formatTime(stats.avgProcessingTime),
      change: "-15% improvement",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <Card key={stat.title} className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
