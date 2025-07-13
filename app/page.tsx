import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { ProcessingStatus } from "@/components/processing-status"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-6 p-6 bg-slate-50/50">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back to DocuMind AI. Here's what's happening with your documents.</p>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProcessingStatus />
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
