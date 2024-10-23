import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { topic, educationLevel, difficulty } = await req.json();
    console.log(topic, educationLevel, difficulty);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    Lütfen aşağıdaki konu, eğitim seviyesi ve zorluk düzeyine göre bir zihin haritası oluşturun kesinlikle template veri olmasın:
    
    Konu: ${topic}
    Eğitim Seviyesi: ${educationLevel}
    Zorluk Düzeyi: ${difficulty}
    
    Önemli noktalar:
    1. İlk node değeri kullanıcının girdiği konu olmalıdır ve merkeze yerleştirilmelidir.
    2. Diğer düğümler ana konunun etrafını sarmalıdır. Sadece altında değil, üstünde, sağında ve solunda da düğümler olmalıdır.
    3. Düğümler arasında boşluklar olmalıdır. Bu, zihin haritasının daha okunaklı ve gerçek bir ağa benzer görünmesini sağlayacaktır.
    
    4. Alt başlıklar ve detaylar, ana konudan dışa doğru yayılmalıdır.
    5. Sadece en dıştaki düğümler (yapraklar) içerik ve ipuçları içermelidir.
    6. Zihin haritası, gerçek bir ağaç yapısı gibi dallanmalı ve yayılmalıdır.

    7.Verilerin gerçekten de bir zihin haritası olması gerekiyor.Kullanıcının girdiği konu ve seçtiği eğitim seviyesine göre bir zihin haritası oluşturulmalıdır.Asla template data veya mock data dönderme gerçek datalar dönder.
    8. Ana nodenin color değeri colors.mainNode olmalıdır.
    9.Ana düğüme bağlı olan düğümlerin color değeri colors.secondaryNode olmalıdır.
    10.leaf olan düğümlerin rengi colors.leaf olmalıdır.
    11.Ana node dışıda kalan bütün nodlerin birbiriyle uzaklığı yatayda 150px dikeyde 150px olmalıdır. Ana nodenin üstünde altında sağında solunda her yerinde nodeler sarsın sadece altında olmasın. ana nodeye bağlı olan leafların arasında yatayda 150px dikeyde 150px olmalıdır.
    
    Node içeriği aşağıdaki  şekildeki yapıya uygun  olmalıdır. dal ve yaprakta verilen veriler konuyla direkt ilişkili olmalıdır temp data kullanma.VERİLERİN TEMPLATE VERİ OLMASIN MOCK VERİ OLMASIN ANA  KONU NEYSE ONUN ALTINDA BULUNABİLECEK KONULARI VE BUNLARIN İÇERİİSİNDE BULUNABİLECK-TRİCKLER İPUCLARINI İÇERSİN:

    
    const initialNodes: Node[] = [
      {
        id: '1',
        type: 'custom',
        position: { x: 400, y: 5 },
        data: { label: 'Ana Konu: Fizik', color: colors.primary, isLeaf: false, childLeafIds: ['2', '3', '4'] },
      },
      {
        id: '2',
        type: 'custom',
        position: { x: 100, y: 150 },
        data: { label: 'Dal: Mekanik', color: colors.accent, isLeaf: false, childLeafIds: ['5', '6'] },
      },
      {
        id: '3',
        type: 'custom',
        position: { x: 400, y: 150 },
        data: { label: 'Dal: Optik', color: colors.accent, isLeaf: false, childLeafIds: ['7', '8'] },
      },
      {
        id: '4',
        type: 'custom',
        position: { x: 700, y: 150 },
        data: { label: 'Dal: Termodinamik', color: colors.accent, isLeaf: false, childLeafIds: ['9', '10'] },
      },
      {
        id: '5',
        type: 'custom',
        position: { x: 50, y: 300 },
        data: {
          label: 'Yaprak: Hareket Yasaları',
          content: [
            { label: 'Konu Anlatımı', completed: false },
            { label: 'Örnek Sorular', completed: false },
            { label: 'Quiz', completed: false },
          ],
          tricks: ['Newton\'un üç hareket yasasını öğrenin', 'F=ma formülünü kavrayın'],
          color: colors.leaf,
          isLeaf: true,
        },
      },
      // Diğer düğümler...
    ];
    
    const initialEdges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2', sourceHandle: 'a' },
      { id: 'e1-3', source: '1', target: '3', sourceHandle: 'a' },
      { id: 'e1-4', source: '1', target: '4', sourceHandle: 'a' },
      { id: 'e2-5', source: '2', target: '5', sourceHandle: 'a' },
      // Diğer kenarlar...
    ];
    
    Lütfen sadece geçerli JSON veri formatınad  döndürün ve json veride sadece nodes ve edges verilerini döndürün. Başka açıklama, yorum veya ek karakter eklemeyin. Kodun doğru biçimlendirildiğinden ve tüm değerlerin uygun türlerde olduğundan emin olun.
    `;
    
    const result = await model.generateContent(prompt);
    console.log("result", result.response?.candidates?.[0]?.content?.parts?.[0]?.text);
    const response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    
    // Remove ```json and ``` from the response
    const cleanedResponse = response?.replace(/^```json\s*|\s*```$/g, '').trim();
    console.log("cleanedResponse", cleanedResponse);
    
    if (!cleanedResponse) {
      throw new Error('No valid response from the model');
    }
    
    // JSON'ı parse etmeden önce kontrol et
    if (!cleanedResponse.trim().startsWith('{') || !cleanedResponse.trim().endsWith('}')) {
      throw new Error('Invalid JSON structure');
    }

    const mindmapData = JSON.parse(cleanedResponse);

    // Veri yapısını doğrula
    if (!mindmapData.nodes || !mindmapData.edges || !Array.isArray(mindmapData.nodes) || !Array.isArray(mindmapData.edges)) {
      throw new Error('Invalid mindmap data structure');
    }

    return NextResponse.json(mindmapData);
  } catch (error: unknown) {
    console.error('Error generating mindmap:', error);
    return NextResponse.json({ error: 'Failed to generate mindmap', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}