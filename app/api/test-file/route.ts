import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Test file API called')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Testing file:', file.name, file.type, file.size)

    // Try to read the file content
    const arrayBuffer = await file.arrayBuffer()
    const textDecoder = new TextDecoder('utf-8')
    const content = textDecoder.decode(arrayBuffer)
    
    console.log('File content length:', content.length)
    console.log('First 500 characters:', content.substring(0, 500))

    return NextResponse.json({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      contentLength: content.length,
      first500Chars: content.substring(0, 500),
      success: true
    })

  } catch (error) {
    console.error('Test file API error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 })
  }
} 