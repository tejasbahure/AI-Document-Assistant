"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ImageIcon, File, X, CheckCircle } from "lucide-react"
import { useDocuments } from "@/hooks/use-documents"

interface UploadFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "completed" | "error"
}

export function DocumentUpload() {
  const { addDocument } = useDocuments()
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadFile[] = fileList.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Process each file
    newFiles.forEach((file) => {
      processFile(file)
    })
  }

  const processFile = (file: UploadFile) => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === file.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100)
            const newStatus = newProgress === 100 ? "completed" : "uploading"

            if (newProgress === 100) {
              clearInterval(interval)
              
              // Save to localStorage when upload is complete
              addDocument({
                name: f.name,
                size: f.size,
                type: f.type,
                status: 'completed',
                progress: 100,
                stage: 'Ready',
                confidence: Math.floor(Math.random() * 20) + 80, // Random confidence 80-100%
                priority: 'normal'
              })
            }

            return { ...f, progress: newProgress, status: newStatus }
          }
          return f
        }),
      )
    }, 500)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return FileText
    if (type.includes("image")) return ImageIcon
    return File
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Upload Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-slate-300 hover:border-slate-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Drop files here or click to upload</h3>
          <p className="text-sm text-slate-500 mb-4">Support for PDF, PNG, JPG, TIFF, DOCX files up to 50MB each</p>
          <Button
            onClick={() => document.getElementById("file-input")?.click()}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Choose Files
          </Button>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.tiff,.docx"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Uploading Files</h4>
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <FileIcon className="h-8 w-8 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900 truncate">{file.name}</span>
                      <div className="flex items-center gap-2">
                        {file.status === "completed" && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                        <Badge variant="outline" className="text-xs">
                          {formatFileSize(file.size)}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => removeFile(file.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {file.status === "uploading" && (
                      <div className="space-y-1">
                        <Progress value={file.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Uploading...</span>
                          <span>{Math.round(file.progress)}%</span>
                        </div>
                      </div>
                    )}
                    {file.status === "completed" && <span className="text-xs text-emerald-600">Upload completed</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
