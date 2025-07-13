"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ClearStoragePage() {
  const router = useRouter()

  useEffect(() => {
    // Clear all document storage
    localStorage.removeItem('documind_documents')
    localStorage.removeItem('documind_activities')
    localStorage.removeItem('documind_stats')
    
    console.log('Storage cleared')
    
    // Redirect back to main page
    router.push('/')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Clearing Storage...</h1>
        <p>Redirecting to main page...</p>
      </div>
    </div>
  )
} 