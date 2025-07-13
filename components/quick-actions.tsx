import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Search, FileText, BarChart3, Settings, HelpCircle } from "lucide-react"

const quickActions = [
  {
    title: "Upload Documents",
    description: "Add new documents for processing",
    icon: Upload,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/upload",
  },
  {
    title: "Smart Search",
    description: "Query your document library",
    icon: Search,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/search",
  },
  {
    title: "View Library",
    description: "Browse all documents",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/library",
  },
  {
    title: "Analytics",
    description: "View usage insights",
    icon: BarChart3,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/analytics",
  },
  {
    title: "Settings",
    description: "Configure your workspace",
    icon: Settings,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    href: "/settings",
  },
  {
    title: "Help Center",
    description: "Get support and tutorials",
    icon: HelpCircle,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    href: "/help",
  },
]

export function QuickActions() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            variant="ghost"
            className="w-full justify-start gap-3 h-auto p-3 hover:bg-slate-50"
            asChild
          >
            <a href={action.href}>
              <div className={`p-2 rounded-lg ${action.bgColor} flex-shrink-0`}>
                <action.icon className={`h-4 w-4 ${action.color}`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">{action.title}</div>
                <div className="text-xs text-slate-500">{action.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
