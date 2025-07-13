import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Get API key from environment variables
const apiKey = process.env.GOOGLE_API_KEY

if (!apiKey) {
  console.error('GOOGLE_API_KEY is not set in environment variables')
  throw new Error('GOOGLE_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { query, documents } = body

    if (!query) {
      console.error('Query is missing')
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    if (!documents || !Array.isArray(documents)) {
      console.error('Documents array is missing or invalid')
      return NextResponse.json({ error: 'Documents array is required' }, { status: 400 })
    }

    console.log('Processing search with:', { query, documentCount: documents.length })
    console.log('Document contents:', documents.map(doc => ({ name: doc.name, content: doc.text || doc.name })))

    // Parse JSON content from documents and create context
    const context = documents.map((doc: any) => {
      let parsedContent
      try {
        // Try to parse the content as JSON
        parsedContent = JSON.parse(doc.text || doc.name)
      } catch (e) {
        // If not JSON, use as plain text
        parsedContent = {
          fileName: doc.name,
          content: doc.text || doc.name,
          fileType: doc.type || 'unknown'
        }
      }
      
      return `Document JSON:
${JSON.stringify(parsedContent, null, 2)}
---`
    }).join('\n\n')

    console.log('Context created, calling Gemini...')
    console.log('Full context being sent to Gemini:', context)

    // Use Gemini Flash model to answer the query
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are a helpful assistant that answers questions about uploaded documents. Use the provided JSON context to answer as accurately as possible. If the context is insufficient, say so.

The context contains JSON objects with the following structure:
- fileName: The name of the uploaded file
- fileType: The MIME type of the file
- fileSize: Size of the file in bytes
- content: The actual content extracted from the file
- extractedAt: Timestamp when content was extracted

Context:
${context}

Question: ${query}

Please analyze the JSON content and provide a detailed answer based on the document content. Parse the JSON structure and extract meaningful information about the document. If it's a question bank, describe the types of questions and subjects covered. If it's a report, describe the sections and key findings. Be specific and informative about what the document contains.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const answer = response.text()

    console.log('Gemini response received')

    const searchResult = {
      question: query,
      answer: answer,
      confidence: 95, // Simulated confidence
      sources: documents.map((doc: any) => ({
        document: doc.name,
        relevance: Math.floor(Math.random() * 20) + 80 // Simulated relevance
      }))
    }

    console.log('Returning search result')
    return NextResponse.json(searchResult)

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: `Failed to process search query: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 