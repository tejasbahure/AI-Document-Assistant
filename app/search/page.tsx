import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SearchInterface } from "@/components/search-interface"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-6 p-6 bg-slate-50/50">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Smart Search & Query</h1>
            <p className="text-slate-600">
              Ask questions about your documents using natural language or perform advanced searches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SearchInterface />
            </div>
            <div>
              <SearchResults />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
