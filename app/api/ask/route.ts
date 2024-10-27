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

    const prompt = `"${selectedNode.label}" konusu hakkında detaylı ve kapsamlı bilgi vererek cevapla. Cevaplarında:
    - Konuyla ilgili somut ve günlük hayattan örnekler kullan
    - Karmaşık kavramları basit ve anlaşılır şekilde açıkla
    - Bilimsel ve teknik doğruluğu koru
    - Kullanıcının seviyesine uygun bir dil kullan
    - Örneklerle desteklenmiş, net ve özlü açıklamalar yap
    - Kod örnekleri verme, sadece kavramsal bilgi aktar
    - Türkçe dilinde cevap ver
    - Sadece sorulan "${inputMessage}" sorusuna odaklan ve konudan sapma
    - Kendinden bahsetme, kim olduğunu belirtme
    - Öğretici bir üslup kullan ama öğretmen/uzman olduğunu vurgulama`;

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
