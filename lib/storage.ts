export interface Document {
  id: string
  name: string
  size: number
  type: string
  uploadDate: Date
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  stage?: string
  estimatedTime?: string
  confidence?: number
  priority: 'high' | 'normal' | 'low'
  content?: string // For storing extracted text
}

export interface Activity {
  id: string
  type: 'upload' | 'query' | 'search' | 'processing'
  user: string
  action: string
  document: string
  time: Date
}

export interface DashboardStats {
  documentsProcessed: number
  queriesAnswered: number
  storageUsed: number
  avgProcessingTime: number
}

class DocumentStorage {
  private readonly DOCUMENTS_KEY = 'documind_documents'
  private readonly ACTIVITIES_KEY = 'documind_activities'
  private readonly STATS_KEY = 'documind_stats'

  // Document operations
  getDocuments(): Document[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.DOCUMENTS_KEY)
    if (!stored) return []
    
    const documents = JSON.parse(stored)
    return documents.map((doc: any) => ({
      ...doc,
      uploadDate: new Date(doc.uploadDate)
    }))
  }

  addDocument(document: Omit<Document, 'id' | 'uploadDate'>): Document {
    const newDocument: Document = {
      ...document,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      uploadDate: new Date()
    }

    const documents = this.getDocuments()
    documents.push(newDocument)
    localStorage.setItem(this.DOCUMENTS_KEY, JSON.stringify(documents))

    // Add activity
    this.addActivity({
      type: 'upload',
      user: 'You',
      action: `Uploaded ${document.name}`,
      document: document.name,
      time: new Date()
    })

    return newDocument
  }

  updateDocument(id: string, updates: Partial<Document>): void {
    const documents = this.getDocuments()
    const index = documents.findIndex(doc => doc.id === id)
    
    if (index !== -1) {
      documents[index] = { ...documents[index], ...updates }
      localStorage.setItem(this.DOCUMENTS_KEY, JSON.stringify(documents))
    }
  }

  removeDocument(id: string): void {
    const documents = this.getDocuments()
    const filtered = documents.filter(doc => doc.id !== id)
    localStorage.setItem(this.DOCUMENTS_KEY, JSON.stringify(filtered))
  }

  clearAllDocuments(): void {
    localStorage.removeItem(this.DOCUMENTS_KEY)
  }

  // Activity operations
  getActivities(): Activity[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.ACTIVITIES_KEY)
    if (!stored) return []
    
    const activities = JSON.parse(stored)
    return activities.map((activity: any) => ({
      ...activity,
      time: new Date(activity.time)
    }))
  }

  addActivity(activity: Omit<Activity, 'id'>): Activity {
    const newActivity: Activity = {
      ...activity,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const activities = this.getActivities()
    activities.unshift(newActivity) // Add to beginning
    
    // Keep only last 50 activities
    const limited = activities.slice(0, 50)
    localStorage.setItem(this.ACTIVITIES_KEY, JSON.stringify(limited))

    return newActivity
  }

  // Stats operations
  getStats(): DashboardStats {
    if (typeof window === 'undefined') {
      return {
        documentsProcessed: 0,
        queriesAnswered: 0,
        storageUsed: 0,
        avgProcessingTime: 0
      }
    }

    const stored = localStorage.getItem(this.STATS_KEY)
    if (!stored) {
      return {
        documentsProcessed: 0,
        queriesAnswered: 0,
        storageUsed: 0,
        avgProcessingTime: 0
      }
    }

    return JSON.parse(stored)
  }

  updateStats(updates: Partial<DashboardStats>): void {
    const currentStats = this.getStats()
    const newStats = { ...currentStats, ...updates }
    localStorage.setItem(this.STATS_KEY, JSON.stringify(newStats))
  }

  // Utility methods
  getStorageUsed(): number {
    const documents = this.getDocuments()
    return documents.reduce((total, doc) => total + doc.size, 0)
  }

  getDocumentsProcessed(): number {
    const documents = this.getDocuments()
    return documents.filter(doc => doc.status === 'completed').length
  }

  getAvgProcessingTime(): number {
    const documents = this.getDocuments()
    const completedDocs = documents.filter(doc => doc.status === 'completed')
    
    if (completedDocs.length === 0) return 0
    
    // Simulate average processing time based on file size
    const totalTime = completedDocs.reduce((total, doc) => {
      // Rough estimate: 1 minute per MB
      return total + (doc.size / (1024 * 1024))
    }, 0)
    
    return totalTime / completedDocs.length
  }

  // Initialize with some sample data if empty
  initializeSampleData(): void {
    const documents = this.getDocuments()
    const activities = this.getActivities()
    
    if (documents.length === 0 && activities.length === 0) {
      // Add sample documents
      const sampleDocuments: Omit<Document, 'id' | 'uploadDate'>[] = [
        {
          name: 'Financial_Report_Q3_2024.pdf',
          size: 2.4 * 1024 * 1024, // 2.4MB
          type: 'application/pdf',
          status: 'completed',
          progress: 100,
          stage: 'Ready',
          confidence: 94,
          priority: 'high'
        },
        {
          name: 'Legal_Contracts_Batch.zip',
          size: 8.7 * 1024 * 1024, // 8.7MB
          type: 'application/zip',
          status: 'processing',
          progress: 65,
          stage: 'OCR Processing',
          estimatedTime: '3 min remaining',
          priority: 'normal'
        }
      ]

      sampleDocuments.forEach(doc => this.addDocument(doc))

      // Add sample activities
      const sampleActivities: Omit<Activity, 'id'>[] = [
        {
          type: 'query',
          user: 'John Doe',
          action: 'Asked about quarterly revenue trends',
          document: 'Financial_Report_Q3_2024.pdf',
          time: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
        },
        {
          type: 'upload',
          user: 'Sarah Chen',
          action: 'Uploaded new contract documents',
          document: 'Legal_Contracts_Batch.zip',
          time: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
        }
      ]

      sampleActivities.forEach(activity => this.addActivity(activity))
    }
  }
}

export const documentStorage = new DocumentStorage() 