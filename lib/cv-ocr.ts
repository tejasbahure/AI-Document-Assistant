"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"

const getApiKey = () => {
  if (typeof window === 'undefined') {
    // Server-side: return undefined, will be handled by client-side code
    return undefined
  }
  // Client-side: access from environment
  return process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
}

/**
 * Simulates a custom CV OCR, but uses Gemini's OCR under the hood.
 * @param fileOrBase64 File object (browser) or base64 string (Node/server)
 * @returns Promise<string> Extracted text
 */
export async function analyzeDocument(fileOrBase64: File | string): Promise<string> {
  const apiKey = getApiKey()
  
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not set in environment variables.")
  }

  const genAI = new GoogleGenerativeAI(apiKey)

  let base64: string

  if (typeof window !== 'undefined' && fileOrBase64 instanceof File) {
    // Browser: convert File to base64
    base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(",")[1])
      reader.onerror = reject
      reader.readAsDataURL(fileOrBase64)
    })
  } else if (typeof fileOrBase64 === 'string') {
    base64 = fileOrBase64
  } else {
    throw new Error("Invalid input: must be File or base64 string")
  }

  // Use Gemini's OCR (vision model)
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "image/png", // Accepts png, jpg, pdf, etc.
        data: base64,
      },
    },
    "Extract all readable text from this document. Return only the text, no explanations.",
  ])
  const response = await result.response
  return response.text()
} 