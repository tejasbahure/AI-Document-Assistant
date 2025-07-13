import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export async function POST(request: NextRequest) {
  try {
    console.log('Simple API route called')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.error('No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Processing file:', file.name, file.type, file.size)

    // Save file to temp directory
    const tempPath = join(tmpdir(), `upload-${Date.now()}-${file.name}`)
    console.log('Temp file path:', tempPath)
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(tempPath, buffer)
    console.log('File saved to temp directory')

    let extractedContent = ''
    let contentType = 'unknown'

    try {
      if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        // Read text files directly
        const content = await readFile(tempPath, 'utf-8')
        extractedContent = content
        contentType = 'text'
        console.log('Text file content extracted, length:', content.length)
      } else {
        // For other files, just return file info
        extractedContent = `File: ${file.name}
Type: ${file.type}
Size: ${file.size} bytes

This file type requires additional processing for content extraction.
For Word documents, install mammoth.js
For PDFs, install pdf-parse
For images, install tesseract.js`
        contentType = 'other'
        console.log('Other file type processed')
      }

      // Clean up temp file
      await unlink(tempPath)
      console.log('Temp file cleaned up')

      const result = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        content: extractedContent,
        contentType: contentType,
        extractedAt: new Date().toISOString(),
        note: contentType === 'text' ? 'Real content extracted' : 'File info only'
      }

      console.log('Returning result with content length:', extractedContent.length)
      return NextResponse.json(result)

    } catch (error) {
      // Clean up temp file on error
      try {
        await unlink(tempPath)
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError)
      }
      throw error
    }

  } catch (error) {
    console.error('Content extraction error:', error)
    return NextResponse.json(
      { error: `Failed to extract content: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 