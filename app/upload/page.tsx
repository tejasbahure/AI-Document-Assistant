import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { DocumentUpload } from "@/components/document-upload"
import { UploadQueue } from "@/components/upload-queue"

export default function UploadPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-6 p-6 bg-slate-50/50">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Upload Documents</h1>
            <p className="text-slate-600">Upload and process your documents with AI-powered OCR and analysis.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DocumentUpload />
            <UploadQueue />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
