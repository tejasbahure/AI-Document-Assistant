import { useState, useEffect } from 'react'
import { documentStorage, Document, Activity } from '@/lib/storage'

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize sample data if empty
    documentStorage.initializeSampleData()
    
    // Load initial data
    const loadData = () => {
      const docs = documentStorage.getDocuments()
      const acts = documentStorage.getActivities()
      setDocuments(docs)
      setActivities(acts)
      setIsLoading(false)
    }

    loadData()

    // Set up interval to refresh data
    const interval = setInterval(loadData, 2000) // Refresh every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const addDocument = (document: Omit<Document, 'id' | 'uploadDate'>) => {
    const newDoc = documentStorage.addDocument(document)
    setDocuments(prev => [...prev, newDoc])
    return newDoc
  }

  const updateDocument = (id: string, updates: Partial<Document>) => {
    documentStorage.updateDocument(id, updates)
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...updates } : doc
    ))
  }

  const removeDocument = (id: string) => {
    documentStorage.removeDocument(id)
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = documentStorage.addActivity(activity)
    setActivities(prev => [newActivity, ...prev.slice(0, 49)]) // Keep only 50 activities
    return newActivity
  }

  return {
    documents,
    activities,
    isLoading,
    addDocument,
    updateDocument,
    removeDocument,
    addActivity
  }
} 