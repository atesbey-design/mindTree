import { Node, Edge } from 'reactflow';

const colors = {
  primary: '#4ECDC4',
  accent: '#45B7D1',
  leaf: '#5CDB95',
};

export const initialNodes: Node[] = [
    {
      id: '1',
      type: 'custom',
      position: { x: 500, y: 300 },
      data: { label: 'Ana Konu: Türev', color: colors.primary, isLeaf: false, childLeafIds: ['2', '3', '4', '5'] },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 300, y: 100 },
      data: { label: "Türev'in Tanımı", color: colors.accent, isLeaf: false, childLeafIds: ['6', '7', '8'] },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 700, y: 100 },
      data: { label: 'Türev Kuralları', color: colors.accent, isLeaf: false, childLeafIds: ['9', '10', '11', '12'] },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 300, y: 500 },
      data: { label: 'Türev Uygulamaları', color: colors.accent, isLeaf: false, childLeafIds: ['13', '14', '15', '16'] },
    },
    {
      id: '5',
      type: 'custom',
      position: { x: 700, y: 500 },
      data: { label: 'İleri Türev Teknikleri', color: colors.accent, isLeaf: false, childLeafIds: ['17', '18', '19', '20'] },
    },
    {
      id: '6',
      type: 'custom',
      position: { x: 150, y: 50 },
      data: {
        label: 'Limit Yaklaşımı',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Örnek Sorular', completed: false },
          { label: 'Quiz', completed: false },
        ],
        tricks: ['Limiti kullanarak türevin tanımını öğrenin', 'h->0 limitini üzerinde durun'],
      },
    },
    {
      id: '7',
      type: 'custom',
      position: { x: 300, y: 50 },
      data: {
        label: 'Geometrik Yorum',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Grafik Çizimleri', completed: false },
          { label: 'Uygulama', completed: false },
        ],
        tricks: ['Türev, teğet eğimini temsil eder', 'Grafik üzerinde türevin anlamını anlayın'],
      },
    },
    {
      id: '8',
      type: 'custom',
      position: { x: 450, y: 50 },
      data: {
        label: 'Süreklilik ve Türevlenebilirlik',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Örnekler', completed: false },
          { label: 'Sorular', completed: false },
        ],
        tricks: ['Süreklilik, türevlenebilirlik için gereklidir', 'Köşeli ve kırıklı noktaları inceleyin'],
      },
    },
    {
      id: '9',
      type: 'custom',
      position: { x: 550, y: 50 },
      data: {
        label: 'Üstel Kural',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Uygulamalar', completed: false },
          { label: 'Alıştırmalar', completed: false },
        ],
        tricks: ['n*x^(n-1) formülünü kullanın', 'Farklı n değerleri için örnekler çözün'],
      },
    },
    {
      id: '10',
      type: 'custom',
      position: { x: 700, y: 50 },
      data: {
        label: 'Çarpım Kuralı',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Örnek Sorular', completed: false },
          { label: 'Pratik', completed: false },
        ],
        tricks: ["u'*v + u*v' formülünü hatırlayın", 'Çarpım halinde fonksiyonların türevi'],
      },
    },
    {
      id: '11',
      type: 'custom',
      position: { x: 850, y: 50 },
      data: {
        label: 'Bölüm Kuralı',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Uygulama', completed: false },
          { label: 'Sorular', completed: false },
        ],
        tricks: ["(u'*v - u*v') / v^2 formülünü kullanın", 'Payda ve payın türevlerini dikkatlice bulun'],
      },
    },
    {
      id: '12',
      type: 'custom',
      position: { x: 1000, y: 50 },
      data: {
        label: 'Zincir Kuralı',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Kompozit Fonksiyonlar', completed: false },
          { label: 'Alıştırmalar', completed: false },
        ],
        tricks: ['İç ve dış fonksiyonları ayırt edin', "dış'(iç) * iç' formülünü kullanın"],
      },
    },
    {
      id: '13',
      type: 'custom',
      position: { x: 150, y: 550 },
      data: {
        label: 'Tanjant ve Normal Doğruları',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Örnek Sorular', completed: false },
          { label: 'Alıştırmalar', completed: false },
        ],
        tricks: ['Teğet ve normal denklemlerini türev kullanarak bulun', 'Eğim kavramına hakim olun'],
      },
    },
    {
      id: '14',
      type: 'custom',
      position: { x: 300, y: 550 },
      data: {
        label: 'Değişim Oranları',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Gerçek Hayat Uygulamaları', completed: false },
          { label: 'Sorular', completed: false },
        ],
        tricks: ['Anlık değişim oranlarını hesaplayın', 'Problemlerde verilenleri dikkatle analiz edin'],
      },
    },
    {
      id: '15',
      type: 'custom',
      position: { x: 450, y: 550 },
      data: {
        label: 'Optimizasyon Problemleri',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Pratik Sorular', completed: false },
          { label: 'Çözüm Teknikleri', completed: false },
        ],
        tricks: ['Maksimum ve minimum değerleri bulma', 'Türevin işaretini inceleyin'],
      },
    },
    {
      id: '16',
      type: 'custom',
      position: { x: 600, y: 550 },
      data: {
        label: 'Doğrusal Hareket',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Fiziksel Uygulamalar', completed: false },
          { label: 'Sorular', completed: false },
        ],
        tricks: ['Hız ve ivme hesaplamaları', 'Konum fonksiyonlarının türevini alın'],
      },
    },
    {
      id: '17',
      type: 'custom',
      position: { x: 700, y: 550 },
      data: {
        label: 'Kapalı Fonksiyonların Türevi',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Örnekler', completed: false },
          { label: 'Uygulamalar', completed: false },
        ],
        tricks: ['Her iki tarafın türevini alın', 'Zincir kuralını uygulayın'],
      },
    },
    {
      id: '18',
      type: 'custom',
      position: { x: 850, y: 550 },
      data: {
        label: 'Logaritmik Türev',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Konu Anlatımı', completed: false },
          { label: 'Örnek Sorular', completed: false },
          { label: 'Pratik', completed: false },
        ],
        tricks: ['Doğal logaritma kullanarak türevi alın', 'Çarpım ve bölüm şeklindeki fonksiyonlar için kullanışlı'],
      },
    },
    {
      id: '19',
      type: 'custom',
      position: { x: 1000, y: 550 },
      data: {
        label: 'Parametrik Denklemlerin Türevi',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Alıştırmalar', completed: false },
          { label: 'Uygulamalar', completed: false },
        ],
        tricks: ["dx/dt ve dy/dt kullanarak dy/dx'i bulun", 'Parametrik ifadeleri dikkatlice türevleyin'],
      },
    },
    {
      id: '20',
      type: 'custom',
      position: { x: 1150, y: 550 },
      data: {
        label: 'Yüksek Mertebe Türevler',
        color: colors.leaf,
        isLeaf: true,
        content: [
          { label: 'Teori', completed: false },
          { label: 'Örnekler', completed: false },
          { label: 'Uygulamalar', completed: false },
        ],
        tricks: ['İkinci ve üçüncü türevleri hesaplayın', 'Fonksiyonların davranışını analiz edin'],
      },
    },
  ];
  
export const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'a' },
    { id: 'e1-3', source: '1', target: '3', sourceHandle: 'a' },
    { id: 'e1-4', source: '1', target: '4', sourceHandle: 'a' },
    { id: 'e1-5', source: '1', target: '5', sourceHandle: 'a' },
    { id: 'e2-6', source: '2', target: '6', sourceHandle: 'a' },
    { id: 'e2-7', source: '2', target: '7', sourceHandle: 'a' },
    { id: 'e2-8', source: '2', target: '8', sourceHandle: 'a' },
    { id: 'e3-9', source: '3', target: '9', sourceHandle: 'a' },
    { id: 'e3-10', source: '3', target: '10', sourceHandle: 'a' },
    { id: 'e3-11', source: '3', target: '11', sourceHandle: 'a' },
    { id: 'e3-12', source: '3', target: '12', sourceHandle: 'a' },
    { id: 'e4-13', source: '4', target: '13', sourceHandle: 'a' },
    { id: 'e4-14', source: '4', target: '14', sourceHandle: 'a' },
    { id: 'e4-15', source: '4', target: '15', sourceHandle: 'a' },
    { id: 'e4-16', source: '4', target: '16', sourceHandle: 'a' },
    { id: 'e5-17', source: '5', target: '17', sourceHandle: 'a' },
    { id: 'e5-18', source: '5', target: '18', sourceHandle: 'a' },
    { id: 'e5-19', source: '5', target: '19', sourceHandle: 'a' },
    { id: 'e5-20', source: '5', target: '20', sourceHandle: 'a' },
  ];