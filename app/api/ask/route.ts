import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Initialize the model (using the gemini-pro model)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ completion: text });
  } catch (error) {
    console.error('Error in ask route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
