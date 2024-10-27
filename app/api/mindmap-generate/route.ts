import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { topic, educationLevel, difficulty } = await req.json();
    console.log(topic, educationLevel, difficulty);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = 
    `Lütfen aşağıdaki konu, eğitim seviyesi ve zorluk düzeyine göre bir zihin haritası oluşturun. Kesinlikle template veri olmasın, gerçek verilere dayalı olsun:
    
    Konu: ${topic}
    Eğitim Seviyesi: ${educationLevel}
    Zorluk Düzeyi: ${difficulty}
    
    ### Önemli Noktalar:
    1. **Ana Node:** Kullanıcının girdiği konu ana node olarak merkeze yerleştirilmeli ve rengi **#4169E1** olmalıdır.
    2. **Child Node'lar:** Ana node'un altında, yan yana boşluklu şekilde sıralanmalı ve rengi **#FFD93D** olmalıdır. Her child node arasında yatayda **150px** boşluk, dikeyde ise **150px** boşluk bırakılmalıdır.
    3. **Leaf Node'ler:** Her child node'un altında, yan yana boşluklu şekilde sıralanmalı ve rengi **#4ECDC4** olmalıdır. Leaf node'ler arasında yatayda **350px**, dikeyde **350px** boşluk bırakılmalıdır.
    4. **Pozisyonlandırma:** Hiçbir node veya leaf üst üste binmemeli. Pozisyonlar, aşağıda belirtilen matematiksel modele göre hesaplanmalıdır.
    5. **Dinamik Düzenleme:** Node ve leaf sayısı önceden bilinmediği için pozisyon hesaplamaları dinamik olarak yapılmalı.
    6. **Node Boyutları:** Her node'un genişliği **300px**, yüksekliği ise **200px** olarak belirlenmelidir.
    7. **Veri Yapısı:** Node'lar ve edge'ler aşağıdaki yapıya uygun olmalıdır. Düğümlerin içerikleri konuyla direkt ilişkili olmalı, template veya mock veri kullanılmamalıdır.
    8.Leaf nodelerde kesinlikle content ve tricks kullanılmalıdır. Content alanı o konu ile ilerleyişini takip eden bir yapıda olmalıdır. Tricks alanı ise o konu ile ilgili kısa ve öz bilgileri içermelidir. 

    ### Matematiksel Modelleme:
    - **Ana Node:** Pozisyonu sayfanın üst merkezinde olacak şekilde (örneğin, x=400, y=100).
    - **Child Node'lar:** Ana node'un altına, yatayda eşit aralıklarla dağıtılacak şekilde yerleştirilmeli. Her child node arasındaki yatay boşluk **150px**, dikey boşluk **150px** olmalıdır.
    - **Leaf Node'ler:** Her child node'un altında, yatayda eşit aralıklarla dağıtılacak şekilde yerleştirilmeli. Leaf node'ler arasındaki yatay boşluk **350px**, dikey boşluk **350px** olmalıdır.
    - **Pozisyon Hesaplama Fonksiyonu:**
    
    const calculateNodePositions = (nodes) => {
        // Temel konfigürasyon
        const config = {
            levelHeight: 450,    // Seviyeler arası dikey mesafe
            nodeWidth: 600,      // Node genişliği
            nodeHeight: 400,     // Node yüksekliği
            horizontalGapChild: 550, // Child node'lar arası yatay boşluk
            horizontalGapLeaf: 850   // Leaf node'ler arası yatay boşluk
        };

        const calculatePositions = (nodeId, level = 0, horizontalIndex = 0) => {
            const node = nodes.find(n => n.id === nodeId);
            if (!node) return null;

            // Child node'ları bul
            const children = nodes.filter(n => 
                node.data.childLeafIds && node.data.childLeafIds.includes(n.id)
            );

            // Yatay pozisyon hesaplama
            const totalWidth = (children.length - 1) * config.horizontalGapChild;
            const startX = 400 - (totalWidth / 2); // Ana node'un x pozisyonu 400 olarak varsayılmıştır

            // Node'un yeni pozisyonu
            const newPosition = {
                x: startX + (horizontalIndex * config.horizontalGapChild),
                y: 100 + (level * config.levelHeight) // Ana node'un y pozisyonu 100 olarak varsayılmıştır
            };

            // Child node'ların pozisyonlarını hesapla
            const childPositions = children.map((child, index) => 
                calculatePositions(
                    child.id,
                    level + 1,
                    index
                )
            );

            // Leaf node'lerin pozisyonlarını hesapla
            children.forEach(child => {
                const leafChildren = nodes.filter(n => 
                    n.data.childLeafIds && n.data.childLeafIds.includes(child.id)
                );
                leafChildren.forEach((leaf, leafIndex) => {
                    const leafTotalWidth = (leafChildren.length - 1) * config.horizontalGapLeaf;
                    const leafStartX = newPosition.x - (leafTotalWidth / 2);
                    leaf.position = {
                        x: leafStartX + (leafIndex * config.horizontalGapLeaf),
                        y: newPosition.y + config.levelHeight
                    };
                });
            });

            return {
                ...node,
                position: newPosition,
                children: childPositions.filter(Boolean)
            };
        };

        // Başlangıç olarak ana node'un pozisyonunu hesapla
        const mainNode = nodes.find(n => n.id === '1'); // Ana node'un id'si '1' olarak varsayılmıştır
        if (mainNode) {
            mainNode.position = { x: 400, y: 100 };
            calculatePositions(mainNode.id);
        }

        return nodes;
    };

    ### **Örnek JSON Yapısı:**
    {
        "nodes": [
            {
                "id": "1",
                "type": "custom",
                "position": { "x": 400, "y": 100 },
                "data": {
                    "label": "Ana Konu: Fizik",
                    "color": "#4169E1",
                    "isLeaf": false,
                    "childLeafIds": ["2", "3", "4"]
                }
                    "tri
            },
            {
                "id": "2",
                "type": "custom",
                "position": { "x": 250, "y": 250 },
                "data": {
                    "label": "Dal: Mekanik",
                    "color": "#FFD93D",
                    "isLeaf": false,
                    "childLeafIds": ["5", "6"]
                }
            },
            {
                "id": "3",
                "type": "custom",
                "position": { "x": 400, "y": 250 },
                "data": {
                    "label": "Dal: Optik",
                    "color": "#FFD93D",
                    "isLeaf": false,
                    "childLeafIds": ["7", "8"]
                }
            },
            {
                "id": "4",
                "type": "custom",
                "position": { "x": 550, "y": 250 },
                "data": {
                    "label": "Dal: Termodinamik",
                    "color": "#FFD93D",
                    "isLeaf": false,
                    "childLeafIds": ["9", "10"]
                }
            },
            {
                "id": "5",
                "type": "custom",

                "position": { "x": 50, "y": 400 },
                "content": [
                    { label: 'Konu Anlatımı', completed: false },
                    { label: 'Örnek Sorular', completed: false },
                    { label: 'Quiz', completed: false }
                ],
                  
                "data": {
                    "label": "Yaprak: Hareket Yasaları",
                    "color": "#4ECDC4",
                    "isLeaf": true,
                    "tricks": ["F=m.a", "Kuvvet kütle ile doğru orantılıdır.", 
                    "v=u+at", "Hız, ilk hız ile ivme ile doğru orantılıdır.", 
                    "s=ut+1/2at^2", "Yer değiştirme, ilk hız, ivme ve zamanın karesiyle doğru orantılıdır.", 
                    "v^2=u^2+2as", "Hızın karesi, ilk hızın karesi ile ivme ile doğru orantılıdır."]
                }
            },
            {
                "id": "6",
                "type": "custom",
                "position": { "x": 350, "y": 400 },
                "data": {
                    "label": "Yaprak: Kuvvet ve Kütle",
                    "color": "#4ECDC4",
                    "isLeaf": true,
                    "content": [
                        { label: 'Konu Anlatımı', completed: false },
                        { label: 'Örnek Sorular', completed: false },
                        { label: 'Quiz', completed: false }
                    ],
                    "tricks": ["F=m.a", "Kuvvet kütle ile doğru orantılıdır.", 
                    "v=u+at", "Hız, ilk hız ile ivme ile doğru orantılıdır.", 
                    "s=ut+1/2at^2", "Yer değiştirme, ilk hız, ivme ve zamanın karesiyle doğru orantılıdır.", 
                    "v^2=u^2+2as", "Hızın karesi, ilk hızın karesi ile ivme ile doğru orantılıdır."]
                      
                }
            }
        ],
        "edges": [
            { "id": "e1-2", "source": "1", "target": "2", "sourceHandle": "a" },
            { "id": "e1-3", "source": "1", "target": "3", "sourceHandle": "a" },
            { "id": "e1-4", "source": "1", "target": "4", "sourceHandle": "a" },
            { "id": "e2-5", "source": "2", "target": "5", "sourceHandle": "a" },
            { "id": "e2-6", "source": "2", "target": "6", "sourceHandle": "a" },
            { "id": "e3-7", "source": "3", "target": "7", "sourceHandle": "a" },
            { "id": "e3-8", "source": "3", "target": "8", "sourceHandle": "a" },
            { "id": "e4-9", "source": "4", "target": "9", "sourceHandle": "a" },
            { "id": "e4-10", "source": "4", "target": "10", "sourceHandle": "a" }
        ]
    }

    ### **Talimatlar:**
    - **Pozisyon Hesaplamaları:** Yukarıda belirtilen matematiksel modellemeyi kullanarak her node'un x ve y koordinatlarını hesaplayın. Bu, node'ların ve leaf'lerin üst üste binmesini önleyecektir.
    - **Dinamik Sayı Yönetimi:** Node ve leaf sayısı değişken olduğu için, pozisyon hesaplamaları dinamik olarak yapılmalıdır. calculateNodePositions fonksiyonu bu dinamikliği sağlayacak şekilde yapılandırılmıştır.
    - **Renkler:** Ana node için **#4169E1**, child node'lar için **#FFD93D**, leaf node'ler için **#4ECDC4** renkleri kullanılmalıdır.
    - **Boyutlar:** Her node'un genişliği **300px**, yüksekliği ise **200px** olarak belirlenmiştir. Pozisyon hesaplamalarında bu boyutlar göz önünde bulundurulmalıdır.
    - **Gerçek Veriler:** Lütfen gerçek verilere dayalı olarak zihin haritasını oluşturun. Template veya mock veri kullanmayın.`

    
    const fastModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let result = await fastModel.generateContent(prompt);
    console.log("result", result.response?.candidates?.[0]?.content?.parts?.[0]?.text);
    let response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Remove ```json and ``` from the response
    let cleanedResponse = response?.replace(/^```json\s*|\s*```$/g, '').trim();

    
    if (!cleanedResponse?.trim().startsWith('{') || !cleanedResponse?.trim().endsWith('}')) {
      const fixPrompt = `
      Lütfen aşağıdaki veriyi geçerli JSON formatına dönüştür. Sadece nodes ve edges içeren bir JSON objesi olmalı.
      Örnek format:
      {
        "nodes": [
          {
            "id": "1",
            "type": "custom",
            "position": { "x": 400, "y": 5 },
            "data": {
              "label": "Ana Konu",
              "color": "#4169E1",
              "isLeaf": false,
              "childLeafIds": ["2", "3"]
            }
          }
        ],
        "edges": [
          {
            "id": "e1-2",
            "source": "1",
            "target": "2",
            "sourceHandle": "a"
          }
        ]
      }

      Dönüştürülecek veri:
      ${cleanedResponse}
      `;

      result = await model.generateContent(fixPrompt);
      response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      cleanedResponse = response?.replace(/^```json\s*|\s*```$/g, '').trim();
    }
    
    if (!cleanedResponse) {
      throw new Error('No valid response from the model');
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