import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { topic, educationLevel, difficulty } = await req.json();
    console.log(topic, educationLevel, difficulty);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    Lütfen aşağıdaki konu, eğitim seviyesi ve zorluk düzeyine göre bir zihin haritası oluşturun:

    Konu: ${topic}
    Eğitim Seviyesi: ${educationLevel}
    Zorluk Düzeyi: ${difficulty}

    Önemli noktalar:
    1. İlk node değeri kullanıcının girdiği konu olmalıdır ve merkeze yerleştirilmelidir.
    2. Diğer düğümler ana konunun etrafını sarmalıdır. Sadece altında değil, üstünde, sağında ve solunda da düğümler olmalıdır.
    3. Düğümler arasında boşluklar olmalıdır. Bu, zihin haritasının daha okunaklı ve gerçek bir ağa benzer görünmesini sağlayacaktır.
    4. Alt başlıklar ve detaylar, ana konudan dışa doğru yayılmalıdır.
    5. Sadece en dıştaki düğümler (yapraklar) quiz soruları içermelidir.
    6. Zihin haritası, gerçek bir ağaç yapısı gibi dallanmalı ve yayılmalıdır.

    Zihin haritasını aşağıdaki yapıya uygun olarak JSON formatında oluşturun:

    {
      "nodes": [
        {
          "id": "1",
          "type": "custom",
          "position": { "x": 400, "y": 300 },
          "data": {
            "label": "Ana Konu: Fizik",
            "color": "#FF5733",
            "isLeaf": false,
            "childLeafIds": ["2", "3", "4", "5"]
          }
        },
        {
          "id": "2",
          "type": "custom",
          "position": { "x": 200, "y": 150 },
          "data": {
            "label": "Dal: Mekanik",
            "color": "#33FF57",
            "isLeaf": false,
            "childLeafIds": ["6", "7"]
          }
        },
        {
          "id": "3",
          "type": "custom",
          "position": { "x": 600, "y": 150 },
          "data": {
            "label": "Dal: Elektromanyetizma",
            "color": "#33FF57",
            "isLeaf": false,
            "childLeafIds": ["8", "9"]
          }
        },
        {
          "id": "4",
          "type": "custom",
          "position": { "x": 200, "y": 450 },
          "data": {
            "label": "Dal: Termodinamik",
            "color": "#33FF57",
            "isLeaf": false,
            "childLeafIds": ["10", "11"]
          }
        },
        {
          "id": "5",
          "type": "custom",
          "position": { "x": 600, "y": 450 },
          "data": {
            "label": "Dal: Optik",
            "color": "#33FF57",
            "isLeaf": false,
            "childLeafIds": ["12", "13"]
          }
        },
        {
          "id": "6",
          "type": "custom",
          "position": { "x": 100, "y": 50 },
          "data": {
            "label": "Yaprak: Kuvvet ve Hareket",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Newton'un hareket yasaları nelerdir?", "Quiz 2: Momentum nedir?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "7",
          "type": "custom",
          "position": { "x": 300, "y": 50 },
          "data": {
            "label": "Yaprak: Enerji",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Kinetik enerji nedir?", "Quiz 2: Potansiyel enerji çeşitleri nelerdir?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "8",
          "type": "custom",
          "position": { "x": 500, "y": 50 },
          "data": {
            "label": "Yaprak: Elektrik",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Ohm yasası nedir?", "Quiz 2: Elektrik akımı nasıl ölçülür?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "9",
          "type": "custom",
          "position": { "x": 700, "y": 50 },
          "data": {
            "label": "Yaprak: Manyetizma",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Manyetik alan nedir?", "Quiz 2: Elektromanyetik indüksiyon nasıl gerçekleşir?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "10",
          "type": "custom",
          "position": { "x": 100, "y": 550 },
          "data": {
            "label": "Yaprak: Isı ve Sıcaklık",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Isı ve sıcaklık arasındaki fark nedir?", "Quiz 2: Özgül ısı nedir?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "11",
          "type": "custom",
          "position": { "x": 300, "y": 550 },
          "data": {
            "label": "Yaprak: Termodinamik Yasaları",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Termodinamiğin birinci yasası nedir?", "Quiz 2: Entropi nedir?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "12",
          "type": "custom",
          "position": { "x": 500, "y": 550 },
          "data": {
            "label": "Yaprak: Geometrik Optik",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Snell yasası nedir?", "Quiz 2: Merceklerin odak uzaklığı nasıl hesaplanır?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        },
        {
          "id": "13",
          "type": "custom",
          "position": { "x": 700, "y": 550 },
          "data": {
            "label": "Yaprak: Dalga Optiği",
            "content": [
              { "label": "Konu anlatımı", "completed": false },
              { "label": "Örnek Sorular", "completed": false },
              { "label": "Quiz", "completed": false }
            ],
            "quiz": ["Quiz 1: Işığın dalga özelliği nedir?", "Quiz 2: Girişim ve kırınım arasındaki fark nedir?"],
            "color": "#3357FF",
            "isLeaf": true
          }
        }
      ],
      "edges": [
        { "id": "e1-2", "source": "1", "target": "2", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e1-3", "source": "1", "target": "3", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e1-4", "source": "1", "target": "4", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e1-5", "source": "1", "target": "5", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e2-6", "source": "2", "target": "6", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e2-7", "source": "2", "target": "7", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e3-8", "source": "3", "target": "8", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e3-9", "source": "3", "target": "9", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e4-10", "source": "4", "target": "10", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e4-11", "source": "4", "target": "11", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e5-12", "source": "5", "target": "12", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } },
        { "id": "e5-13", "source": "5", "target": "13", "sourceHandle": "a", "type": "default", "markerEnd": { "type": "ArrowClosed", "color": "#000000" }, "style": { "stroke": "#000000", "strokeWidth": 2 } }
      ]
    }

    Lütfen sadece geçerli JSON verisini döndürün. Başka açıklama, yorum veya ek karakter eklemeyin. JSON'ın doğru biçimlendirildiğinden ve tüm değerlerin uygun türlerde olduğundan emin olun.`;

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