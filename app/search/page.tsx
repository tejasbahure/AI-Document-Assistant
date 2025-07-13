"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SearchInterface } from "@/components/search-interface"
import { SearchResults, SearchResult } from "@/components/search-results"
import { useDocuments } from "@/hooks/use-documents"
import { useState } from "react"

export default function SearchPage() {
  const { documents } = useDocuments()
  const [results, setResults] = useState<SearchResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleSearch(query: string) {
    setIsProcessing(true)
    try {
      // Prepare document data for the API with actual content
      const docData = documents.map(doc => ({
        name: doc.name,
        text: doc.content || doc.name, // Use actual content if available, fallback to filename
        type: doc.type
      }))

      console.log('Sending search request:', { query, documents: docData })

      // Call the secure API route
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          documents: docData
        })
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`Search request failed: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('Search result:', result)
      setResults([result])
    } catch (e) {
      console.error("Search error:", e)
      setResults([{ 
        question: query, 
        answer: `Sorry, there was an error analyzing your documents: ${e instanceof Error ? e.message : 'Unknown error'}` 
      }])
    }
    setIsProcessing(false)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-6 p-6 bg-slate-50/50">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Smart Search & Query</h1>
            <p className="text-slate-600">
              Ask questions about your documents using natural language.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SearchInterface onSearch={handleSearch} isProcessing={isProcessing} />
            </div>
            <div>
              <SearchResults results={results} isLoading={isProcessing} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
