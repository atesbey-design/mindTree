import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { selectedNode, inputMessage } = await req.json();

    if (!selectedNode || !inputMessage) {
      return NextResponse.json({ error: 'Selected node and input message are required' }, { status: 400 });
    }

    const prompt = `"${selectedNode.label}" konusunda uzman birisin bu konuda sana sorularn soruları bir öğretmen gibi cevaplamalısın.Cevapların örnekler içermeli ve bu örnekler sayesinde kullanıcı öğrenmeli. Cevaplarında kod vs olmamalı. sasdece bilgi aktarımı olmalı.İngilizce cevap verme.Sorulan soru ${inputMessage} bu soruya cevap verirken kullanıcının bilgi seviyesine göre cevap vermelisin.Sadece soruya cevap ver ek bilgi verme.Asla ama asla kim olduğunu ve ne olduğunu anlatma. Öğretmen olduğunu da söyleme.`;

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
