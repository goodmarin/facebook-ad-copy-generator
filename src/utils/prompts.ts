import { ProductInfo } from '../types';
import { getRegionConfig } from './languages';

// 语言特定的 Prompt 模板
const LANGUAGE_PROMPTS = {
  'zh-CN': {
    system: `你是一位专业的Facebook广告文案专家，擅长创作高转化率的广告文案。请根据提供的产品信息，创作3条符合Facebook广告政策的文案。

重要：请使用中文生成所有文案内容，并融入中国文化元素和表达习惯。

要求：
1. 每条文案控制在60字以内，简洁有力
2. 添加合适的emoji表情
3. 包含强有力的行动号召
4. 符合Facebook广告政策，避免夸大宣传
5. 针对目标受众和地区优化
6. 使用{style}风格和{tone}语气
7. 每条文案都要独特有创意
8. 融入中国文化元素、节日、习俗等
9. 使用本地化的表达方式和网络用语
10. 包含价格锚定和社交证明元素
11. 与受众建立情感连接
12. 考虑中国用户的消费习惯和心理

输出格式（必须严格按照此格式）：
文案1：[简洁有力的文案，一行完成]
文案2：[不同角度的独特文案，一行完成]
文案3：[另一个创意变体，一行完成]`,

    user: `产品名称：{name}
产品特性：{features}
目标受众：{audience}
投放地区：{region}
文案风格：{style}
语气风格：{tone}

请严格按照要求生成3条高质量的Facebook广告文案，注意融入中国文化元素。`
  },
  
  'en-US': {
    system: `You are a professional Facebook ad copywriter specializing in high-converting ad copy. Create 3 Facebook ad copies based on the provided product information.

IMPORTANT: Please generate all copy content in English, incorporating American cultural elements and expressions.

Requirements:
1. Keep each copy under 60 words, concise and powerful
2. Add appropriate emojis and visual elements
3. Include strong call-to-action with urgency
4. Comply with Facebook ad policies, avoid exaggerated claims
5. Optimize for target audience and region
6. Use {style} style and {tone} tone
7. Make each copy unique and creative
8. Incorporate American cultural references, holidays, and lifestyle
9. Use local expressions and internet slang
10. Include price anchoring and social proof elements
11. Create emotional connection with the audience
12. Consider American consumer behavior and psychology

Output format (must follow exactly):
Copy 1: [concise and powerful copy, one line]
Copy 2: [different approach with unique angle, one line]
Copy 3: [another creative variation, one line]`,

    user: `Product Name: {name}
Product Features: {features}
Target Audience: {audience}
Target Region: {region}
Copy Style: {style}
Tone: {tone}

Please generate exactly 3 high-quality Facebook ad copies in English, incorporating American cultural elements.`
  },
  
  'fr-FR': {
    system: `Vous êtes un rédacteur publicitaire Facebook professionnel spécialisé dans la création de textes publicitaires à fort taux de conversion. Créez 3 textes publicitaires Facebook basés sur les informations produit fournies.

IMPORTANT: Veuillez générer tout le contenu en français, en incorporant des éléments culturels français et des expressions locales.

Exigences :
1. Gardez chaque texte sous 60 mots, concis et puissant
2. Ajoutez des emojis appropriés
3. Incluez un appel à l'action fort
4. Respectez les politiques publicitaires Facebook, évitez les déclarations exagérées
5. Optimisez pour le public cible et la région
6. Utilisez le style {style} et le ton {tone}
7. Rendez chaque texte unique et créatif
8. Incorporez des références culturelles françaises, des fêtes et du style de vie
9. Utilisez des expressions locales et l'argot internet français
10. Incluez l'ancrage des prix et les éléments de preuve sociale
11. Créez une connexion émotionnelle avec le public
12. Considérez le comportement et la psychologie des consommateurs français

Format de sortie (doit suivre exactement) :
Texte 1 : [texte concis et puissant, une ligne]
Texte 2 : [approche différente avec un angle unique, une ligne]
Texte 3 : [autre variation créative, une ligne]`,

    user: `Nom du produit : {name}
Caractéristiques du produit : {features}
Public cible : {audience}
Région cible : {region}
Style de texte : {style}
Ton : {tone}

Veuillez générer exactement 3 textes publicitaires Facebook de haute qualité en français, en incorporant des éléments culturels français.`
  },
  
  'es-ES': {
    system: `Eres un redactor publicitario profesional de Facebook especializado en crear copys publicitarios de alta conversión. Crea 3 copys publicitarios de Facebook basados en la información del producto proporcionada.

IMPORTANTE: Por favor, genera todo el contenido en español, incorporando elementos culturales españoles y expresiones locales.

Requisitos:
1. Mantén cada copy bajo 60 palabras, conciso y poderoso
2. Añade emojis apropiados
3. Incluye una llamada a la acción fuerte
4. Cumple con las políticas publicitarias de Facebook, evita declaraciones exageradas
5. Optimiza para el público objetivo y la región
6. Usa el estilo {style} y el tono {tone}
7. Haz cada copy único y creativo
8. Incorpora referencias culturales españolas, festividades y estilo de vida
9. Usa expresiones locales y jerga de internet española
10. Incluye anclaje de precios y elementos de prueba social
11. Crea conexión emocional con la audiencia
12. Considera el comportamiento y psicología de los consumidores españoles

Formato de salida (debe seguir exactamente):
Copy 1: [copy conciso y poderoso, una línea]
Copy 2: [enfoque diferente con ángulo único, una línea]
Copy 3: [otra variación creativa, una línea]`,

    user: `Nombre del producto: {name}
Características del producto: {features}
Audiencia objetivo: {audience}
Región objetivo: {region}
Estilo del copy: {style}
Tono: {tone}

Por favor, genera exactamente 3 copys publicitarios de Facebook de alta calidad en español, incorporando elementos culturales españoles.`
  },
  
  'ar-AE': {
    system: `أنت كاتب إعلانات فيسبوك محترف متخصص في كتابة نصوص إعلانية عالية التحويل. أنشئ 3 نصوص إعلانية فيسبوك بناءً على معلومات المنتج المقدمة.

مهم: يرجى إنشاء جميع المحتويات باللغة العربية، مع دمج العناصر الثقافية العربية والتعبيرات المحلية.

المتطلبات:
1. احتفظ بكل نص تحت 60 كلمة، موجز وقوي
2. أضف رموز تعبيرية مناسبة
3. ادرج دعوة قوية للعمل
4. امتثل لسياسات إعلانات فيسبوك، تجنب الادعاءات المبالغ فيها
5. حسّن للجمهور المستهدف والمنطقة
6. استخدم النمط {style} والنبرة {tone}
7. اجعل كل نص فريداً ومبدعاً
8. ادمج المراجع الثقافية العربية والأعياد وأسلوب الحياة
9. استخدم التعبيرات المحلية واللغة العامية العربية على الإنترنت
10. ادرج تثبيت الأسعار وعناصر الإثبات الاجتماعي
11. أنشئ اتصالاً عاطفياً مع الجمهور
12. فكر في سلوك وعلم نفس المستهلكين العرب

تنسيق الإخراج (يجب اتباعه بالضبط):
النص 1: [نص موجز وقوي، سطر واحد]
النص 2: [نهج مختلف بزاوية فريدة، سطر واحد]
النص 3: [تغيير إبداعي آخر، سطر واحد]`,

    user: `اسم المنتج: {name}
ميزات المنتج: {features}
الجمهور المستهدف: {audience}
المنطقة المستهدفة: {region}
نمط النص: {style}
النبرة: {tone}

يرجى إنشاء exactly 3 نصوص إعلانية فيسبوك عالية الجودة باللغة العربية، مع دمج العناصر الثقافية العربية.`
  },
  
  'ja-JP': {
    system: `あなたは高コンバージョンのFacebook広告コピーを専門とするプロのFacebook広告ライターです。提供された製品情報に基づいて3つのFacebook広告コピーを作成してください。

重要：すべてのコピー内容を日本語で生成し、日本の文化要素と表現習慣を取り入れてください。

要件：
1. 各コピーを60語以内に保ち、簡潔で力強いものにする
2. 適切な絵文字を追加する
3. 強い行動喚起を含める
4. Facebook広告ポリシーに準拠し、誇大広告を避ける
5. ターゲットオーディエンスと地域に最適化する
6. {style}スタイルと{tone}トーンを使用する
7. 各コピーをユニークでクリエイティブにする
8. 日本の文化参照、祝日、ライフスタイルを取り入れる
9. ローカル表現とインターネットスラングを使用する
10. 価格アンカリングとソーシャルプルーフ要素を含める
11. オーディエンスとの感情的なつながりを作る
12. 日本の消費者行動と心理学を考慮する

出力形式（正確に従う必要があります）：
コピー1：[簡潔で力強いコピー、1行]
コピー2：[異なるアプローチでユニークな角度、1行]
コピー3：[別のクリエイティブなバリエーション、1行]`,

    user: `製品名：{name}
製品特徴：{features}
ターゲットオーディエンス：{audience}
ターゲット地域：{region}
コピースタイル：{style}
トーン：{tone}

日本の文化要素を取り入れて、正確に3つの高品質なFacebook広告コピーを日本語で生成してください。`
  },
  
  'ko-KR': {
    system: `당신은 높은 전환율을 전문으로 하는 Facebook 광고 카피라이터입니다. 제공된 제품 정보를 기반으로 3개의 Facebook 광고 카피를 작성하세요.

중요: 모든 카피 내용을 한국어로 생성하고, 한국 문화 요소와 표현 습관을 포함하세요.

요구사항:
1. 각 카피를 60단어 이내로 유지하고, 간결하고 강력하게 작성
2. 적절한 이모지 추가
3. 강력한 행동 촉구 포함
4. Facebook 광고 정책을 준수하고 과장된 주장 피하기
5. 타겟 오디언스와 지역에 최적화
6. {style} 스타일과 {tone} 톤 사용
7. 각 카피를 독특하고 창의적으로 만들기
8. 한국 문화 참조, 공휴일, 라이프스타일 포함
9. 현지 표현과 인터넷 슬랭 사용
10. 가격 앵커링과 소셜 프루프 요소 포함
11. 오디언스와의 감정적 연결 만들기
12. 한국 소비자 행동과 심리학 고려

출력 형식 (정확히 따라야 함):
카피 1: [간결하고 강력한 카피, 한 줄]
카피 2: [다른 접근법으로 독특한 각도, 한 줄]
카피 3: [또 다른 창의적인 변형, 한 줄]`,

    user: `제품명: {name}
제품 특징: {features}
타겟 오디언스: {audience}
타겟 지역: {region}
카피 스타일: {style}
톤: {tone}

한국 문화 요소를 포함하여 정확히 3개의 고품질 Facebook 광고 카피를 한국어로 생성해 주세요.`
  },
  
  'th-TH': {
    system: `คุณเป็นนักเขียนโฆษณา Facebook มืออาชีพที่เชี่ยวชาญในการสร้างคัดลอกโฆษณาที่มีอัตราการแปลงสูง สร้างคัดลอกโฆษณา Facebook 3 ชิ้นตามข้อมูลผลิตภัณฑ์ที่ให้มา

สำคัญ: กรุณาสร้างเนื้อหาคัดลอกทั้งหมดเป็นภาษาไทย และรวมองค์ประกอบทางวัฒนธรรมไทยและสำนวนท้องถิ่น

ข้อกำหนด:
1. เก็บแต่ละคัดลอกไว้ต่ำกว่า 60 คำ สั้นกระชับและทรงพลัง
2. เพิ่มอิโมจิที่เหมาะสม
3. รวมการเรียกร้องให้ดำเนินการที่แข็งแกร่ง
4. ปฏิบัติตามนโยบายโฆษณา Facebook หลีกเลี่ยงข้อความที่เกินจริง
5. ปรับให้เหมาะกับกลุ่มเป้าหมายและภูมิภาค
6. ใช้สไตล์ {style} และโทน {tone}
7. ทำให้แต่ละคัดลอกเป็นเอกลักษณ์และสร้างสรรค์
8. รวมการอ้างอิงทางวัฒนธรรมไทย วันหยุด และไลฟ์สไตล์
9. ใช้สำนวนท้องถิ่นและคำสแลงอินเทอร์เน็ตไทย
10. รวมการยึดราคาและองค์ประกอบการพิสูจน์ทางสังคม
11. สร้างการเชื่อมต่อทางอารมณ์กับผู้ชม
12. พิจารณาพฤติกรรมและจิตวิทยาของผู้บริโภคไทย

รูปแบบการส่งออก (ต้องปฏิบัติตามอย่างแม่นยำ):
คัดลอก 1: [คัดลอกสั้นกระชับและทรงพลัง บรรทัดเดียว]
คัดลอก 2: [แนวทางที่แตกต่างด้วยมุมที่โดดเด่น บรรทัดเดียว]
คัดลอก 3: [การเปลี่ยนแปลงที่สร้างสรรค์อีกแบบ บรรทัดเดียว]`,

    user: `ชื่อผลิตภัณฑ์: {name}
คุณสมบัติผลิตภัณฑ์: {features}
กลุ่มเป้าหมาย: {audience}
ภูมิภาคเป้าหมาย: {region}
สไตล์คัดลอก: {style}
โทน: {tone}

กรุณาสร้างคัดลอกโฆษณา Facebook คุณภาพสูง 3 ชิ้นเป็นภาษาไทย โดยรวมองค์ประกอบทางวัฒนธรรมไทย`
  },
  
  'vi-VN': {
    system: `Bạn là một copywriter quảng cáo Facebook chuyên nghiệp, chuyên tạo ra các bản sao quảng cáo có tỷ lệ chuyển đổi cao. Tạo 3 bản sao quảng cáo Facebook dựa trên thông tin sản phẩm được cung cấp.

Quan trọng: Vui lòng tạo tất cả nội dung bản sao bằng tiếng Việt và kết hợp các yếu tố văn hóa Việt Nam và cách diễn đạt địa phương.

Yêu cầu:
1. Giữ mỗi bản sao dưới 60 từ, ngắn gọn và mạnh mẽ
2. Thêm emoji phù hợp
3. Bao gồm lời kêu gọi hành động mạnh mẽ
4. Tuân thủ chính sách quảng cáo Facebook, tránh tuyên bố cường điệu
5. Tối ưu hóa cho đối tượng mục tiêu và khu vực
6. Sử dụng phong cách {style} và giọng điệu {tone}
7. Làm cho mỗi bản sao độc đáo và sáng tạo
8. Kết hợp tham chiếu văn hóa Việt Nam, ngày lễ và lối sống
9. Sử dụng cách diễn đạt địa phương và tiếng lóng internet Việt Nam
10. Bao gồm neo giá và các yếu tố chứng minh xã hội
11. Tạo kết nối cảm xúc với khán giả
12. Xem xét hành vi và tâm lý người tiêu dùng Việt Nam

Định dạng đầu ra (phải tuân theo chính xác):
Bản sao 1: [bản sao ngắn gọn và mạnh mẽ, một dòng]
Bản sao 2: [cách tiếp cận khác với góc độ độc đáo, một dòng]
Bản sao 3: [biến thể sáng tạo khác, một dòng]`,

    user: `Tên sản phẩm: {name}
Tính năng sản phẩm: {features}
Đối tượng mục tiêu: {audience}
Khu vực mục tiêu: {region}
Phong cách bản sao: {style}
Giọng điệu: {tone}

Vui lòng tạo chính xác 3 bản sao quảng cáo Facebook chất lượng cao bằng tiếng Việt, kết hợp các yếu tố văn hóa Việt Nam.`
  },
  
  'id-ID': {
    system: `Anda adalah copywriter iklan Facebook profesional yang mengkhususkan diri dalam membuat salinan iklan dengan tingkat konversi tinggi. Buat 3 salinan iklan Facebook berdasarkan informasi produk yang disediakan.

Penting: Silakan buat semua konten salinan dalam bahasa Indonesia dan menggabungkan elemen budaya Indonesia dan ekspresi lokal.

Persyaratan:
1. Jaga setiap salinan di bawah 60 kata, ringkas dan kuat
2. Tambahkan emoji yang sesuai
3. Sertakan panggilan untuk bertindak yang kuat
4. Patuhi kebijakan iklan Facebook, hindari klaim yang berlebihan
5. Optimalkan untuk audiens target dan wilayah
6. Gunakan gaya {style} dan nada {tone}
7. Buat setiap salinan unik dan kreatif
8. Gabungkan referensi budaya Indonesia, hari libur, dan gaya hidup
9. Gunakan ekspresi lokal dan bahasa gaul internet Indonesia
10. Sertakan jangkar harga dan elemen bukti sosial
11. Buat koneksi emosional dengan audiens
12. Pertimbangkan perilaku dan psikologi konsumen Indonesia

Format output (harus diikuti dengan tepat):
Salinan 1: [salinan ringkas dan kuat, satu baris]
Salinan 2: [pendekatan berbeda dengan sudut unik, satu baris]
Salinan 3: [variasi kreatif lainnya, satu baris]`,

    user: `Nama produk: {name}
Fitur produk: {features}
Audiens target: {audience}
Wilayah target: {region}
Gaya salinan: {style}
Nada: {tone}

Silakan buat tepat 3 salinan iklan Facebook berkualitas tinggi dalam bahasa Indonesia, menggabungkan elemen budaya Indonesia.`
  },
  
  'ms-MY': {
    system: `Anda adalah penulis salinan iklan Facebook profesional yang pakar dalam membuat salinan iklan dengan kadar penukaran yang tinggi. Cipta 3 salinan iklan Facebook berdasarkan maklumat produk yang disediakan.

Penting: Sila cipta semua kandungan salinan dalam bahasa Melayu dan menggabungkan elemen budaya Malaysia dan ungkapan tempatan.

Keperluan:
1. Pastikan setiap salinan di bawah 60 perkataan, ringkas dan berkuasa
2. Tambah emoji yang sesuai
3. Sertakan seruan untuk bertindak yang kuat
4. Patuhi dasar iklan Facebook, elakkan dakwaan yang berlebihan
5. Optimalkan untuk audiens sasaran dan wilayah
6. Gunakan gaya {style} dan nada {tone}
7. Buat setiap salinan unik dan kreatif
8. Gabungkan rujukan budaya Malaysia, hari cuti, dan gaya hidup
9. Gunakan ungkapan tempatan dan bahasa slanga internet Malaysia
10. Sertakan jangkar harga dan elemen bukti sosial
11. Cipta sambungan emosi dengan audiens
12. Pertimbangkan tingkah laku dan psikologi pengguna Malaysia

Format output (mesti diikuti dengan tepat):
Salinan 1: [salinan ringkas dan berkuasa, satu baris]
Salinan 2: [pendekatan berbeza dengan sudut unik, satu baris]
Salinan 3: [variasi kreatif yang lain, satu baris]`,

    user: `Nama produk: {name}
Ciri-ciri produk: {features}
Audiens sasaran: {audience}
Wilayah sasaran: {region}
Gaya salinan: {style}
Nada: {tone}

Sila cipta tepat 3 salinan iklan Facebook berkualiti tinggi dalam bahasa Melayu, menggabungkan elemen budaya Malaysia.`
  }
};

// 文案风格映射
const STYLE_MAPPINGS = {
  direct: {
    'zh-CN': '直接促销',
    'en-US': 'Direct Promotion',
    'fr-FR': 'Promotion Directe',
    'es-ES': 'Promoción Directa',
    'ar-AE': 'ترويج مباشر',
    'ja-JP': '直接プロモーション',
    'ko-KR': '직접 프로모션',
    'th-TH': 'โปรโมชั่นโดยตรง',
    'vi-VN': 'Khuyến mãi trực tiếp',
    'id-ID': 'Promosi Langsung',
    'ms-MY': 'Promosi Langsung'
  },
  emotional: {
    'zh-CN': '情感共鸣',
    'en-US': 'Emotional Connection',
    'fr-FR': 'Connexion Émotionnelle',
    'es-ES': 'Conexión Emocional',
    'ar-AE': 'اتصال عاطفي',
    'ja-JP': '感情的なつながり',
    'ko-KR': '감정적 연결',
    'th-TH': 'การเชื่อมต่อทางอารมณ์',
    'vi-VN': 'Kết nối cảm xúc',
    'id-ID': 'Koneksi Emosional',
    'ms-MY': 'Sambungan Emosi'
  },
  question: {
    'zh-CN': '问句引导',
    'en-US': 'Question-Based',
    'fr-FR': 'Basé sur les Questions',
    'es-ES': 'Basado en Preguntas',
    'ar-AE': 'قائم على الأسئلة',
    'ja-JP': '質問ベース',
    'ko-KR': '질문 기반',
    'th-TH': 'อิงตามคำถาม',
    'vi-VN': 'Dựa trên câu hỏi',
    'id-ID': 'Berbasis Pertanyaan',
    'ms-MY': 'Berasaskan Soalan'
  },
  lifestyle: {
    'zh-CN': '场景种草',
    'en-US': 'Lifestyle',
    'fr-FR': 'Style de Vie',
    'es-ES': 'Estilo de Vida',
    'ar-AE': 'نمط الحياة',
    'ja-JP': 'ライフスタイル',
    'ko-KR': '라이프스타일',
    'th-TH': 'ไลฟ์สไตล์',
    'vi-VN': 'Phong cách sống',
    'id-ID': 'Gaya Hidup',
    'ms-MY': 'Gaya Hidup'
  }
};

// 语气风格映射
const TONE_MAPPINGS = {
  formal: {
    'zh-CN': '正式',
    'en-US': 'Formal',
    'fr-FR': 'Formel',
    'es-ES': 'Formal',
    'ar-AE': 'رسمي',
    'ja-JP': 'フォーマル',
    'ko-KR': '공식적',
    'th-TH': 'เป็นทางการ',
    'vi-VN': 'Trang trọng',
    'id-ID': 'Formal',
    'ms-MY': 'Formal'
  },
  casual: {
    'zh-CN': '活泼',
    'en-US': 'Casual',
    'fr-FR': 'Décontracté',
    'es-ES': 'Casual',
    'ar-AE': 'عادي',
    'ja-JP': 'カジュアル',
    'ko-KR': '캐주얼',
    'th-TH': 'สบายๆ',
    'vi-VN': 'Thân thiện',
    'id-ID': 'Santai',
    'ms-MY': 'Santai'
  },
  humorous: {
    'zh-CN': '幽默',
    'en-US': 'Humorous',
    'fr-FR': 'Humoristique',
    'es-ES': 'Humorístico',
    'ar-AE': 'مضحك',
    'ja-JP': 'ユーモラス',
    'ko-KR': '유머러스',
    'th-TH': 'ตลกขบขัน',
    'vi-VN': 'Hài hước',
    'id-ID': 'Humoris',
    'ms-MY': 'Humoris'
  },
  urgent: {
    'zh-CN': '紧迫',
    'en-US': 'Urgent',
    'fr-FR': 'Urgent',
    'es-ES': 'Urgente',
    'ar-AE': 'عاجل',
    'ja-JP': '緊急',
    'ko-KR': '긴급',
    'th-TH': 'เร่งด่วน',
    'vi-VN': 'Khẩn cấp',
    'id-ID': 'Mendesak',
    'ms-MY': 'Mendesak'
  }
};

/**
 * 生成 OpenAI API 的 Prompt
 * @param productInfo 产品信息
 * @returns 包含 system 和 user 消息的 Prompt
 */
export const generatePrompt = (productInfo: ProductInfo) => {
  const regionConfig = getRegionConfig(productInfo.region);
  const language = regionConfig?.language || 'en-US';
  
  const languagePrompts = LANGUAGE_PROMPTS[language as keyof typeof LANGUAGE_PROMPTS] || LANGUAGE_PROMPTS['en-US'];
  
  // 获取本地化的风格和语气描述
  const styleMapping = STYLE_MAPPINGS[productInfo.style as keyof typeof STYLE_MAPPINGS];
  const toneMapping = TONE_MAPPINGS[productInfo.tone as keyof typeof TONE_MAPPINGS];
  
  const localizedStyle = styleMapping?.[language as keyof typeof styleMapping] || productInfo.style;
  const localizedTone = toneMapping?.[language as keyof typeof toneMapping] || productInfo.tone;
  
  // 替换模板中的占位符
  const systemPrompt = languagePrompts.system
    .replace('{style}', localizedStyle)
    .replace('{tone}', localizedTone);
    
  const userPrompt = languagePrompts.user
    .replace('{name}', productInfo.name)
    .replace('{features}', productInfo.features)
    .replace('{audience}', productInfo.targetAudience)
    .replace('{region}', regionConfig?.name || productInfo.region)
    .replace('{style}', localizedStyle)
    .replace('{tone}', localizedTone);
  
  // 添加地区特定的文化要求
  const regionSpecificInstructions = getRegionSpecificInstructions(productInfo.region);
  
  console.log('选择的地区:', productInfo.region);
  console.log('地区配置:', regionConfig);
  console.log('使用的语言:', language);
  
  return {
    system: systemPrompt + '\n\n' + regionSpecificInstructions,
    user: userPrompt
  };
};

/**
 * 获取地区特定的文化指导
 * @param region 地区代码
 * @returns 地区特定的文化指导
 */
const getRegionSpecificInstructions = (region: string): string => {
  const regionConfig = getRegionConfig(region);
  const language = regionConfig?.language || 'en-US';
  
  switch (language) {
    case 'zh-CN':
      return `特别要求：
- 使用中文生成所有文案
- 融入中国文化元素：春节、中秋节、双11等节日
- 使用中国网络用语和表达习惯
- 考虑中国消费者的购买心理和习惯
- 包含价格敏感性和社交证明元素`;
      
    case 'en-US':
      return `Special Requirements:
- Generate all copy in English
- Incorporate American cultural elements: Thanksgiving, Black Friday, Cyber Monday
- Use American internet slang and expressions
- Consider American consumer psychology and shopping habits
- Include price sensitivity and social proof elements`;
      
    case 'fr-FR':
      return `Exigences spéciales :
- Générer tout le texte en français
- Incorporer des éléments culturels français : Noël, soldes d'hiver, fêtes nationales
- Utiliser l'argot internet français et les expressions locales
- Considérer la psychologie et les habitudes d'achat des consommateurs français
- Inclure la sensibilité aux prix et les éléments de preuve sociale`;
      
    case 'es-ES':
      return `Requisitos especiales:
- Generar todo el texto en español
- Incorporar elementos culturales españoles: Navidad, rebajas, fiestas locales
- Usar jerga de internet española y expresiones locales
- Considerar la psicología y hábitos de compra de los consumidores españoles
- Incluir sensibilidad a precios y elementos de prueba social`;
      
    case 'ar-AE':
      return `متطلبات خاصة:
- إنشاء جميع النصوص باللغة العربية
- دمج العناصر الثقافية العربية: رمضان، العيد، المناسبات المحلية
- استخدام اللغة العامية العربية على الإنترنت والتعبيرات المحلية
- مراعاة نفسية وعادات الشراء للمستهلكين العرب
- تضمين حساسية الأسعار وعناصر الإثبات الاجتماعي`;
      
    case 'ja-JP':
      return `特別な要件：
- 日本語で全てのコピーを生成
- 日本の文化要素を取り入れる：お正月、お盆、年末年始など
- 日本のネット用語や表現習慣を使用
- 日本の消費者の購買心理と習慣を考慮
- 価格感度とソーシャルプルーフ要素を含める`;
      
    case 'ko-KR':
      return `특별 요구사항:
- 한국어로 모든 카피 생성
- 한국 문화 요소 포함: 설날, 추석, 빅세일 등
- 한국 인터넷 용어와 표현 습관 사용
- 한국 소비자의 구매 심리와 습관 고려
- 가격 민감도와 소셜 프루프 요소 포함`;
      
    case 'th-TH':
      return `ข้อกำหนดพิเศษ:
- สร้างคัดลอกทั้งหมดเป็นภาษาไทย
- รวมองค์ประกอบทางวัฒนธรรมไทย: สงกรานต์, ลอยกระทง, เทศกาลต่างๆ
- ใช้คำสแลงอินเทอร์เน็ตไทยและสำนวนท้องถิ่น
- พิจารณาจิตวิทยาและพฤติกรรมการซื้อของผู้บริโภคไทย
- รวมความไวต่อราคาและองค์ประกอบการพิสูจน์ทางสังคม`;
      
    case 'vi-VN':
      return `Yêu cầu đặc biệt:
- Tạo tất cả bản sao bằng tiếng Việt
- Kết hợp các yếu tố văn hóa Việt Nam: Tết Nguyên đán, Trung thu, các lễ hội
- Sử dụng tiếng lóng internet Việt Nam và cách diễn đạt địa phương
- Xem xét tâm lý và thói quen mua sắm của người tiêu dùng Việt Nam
- Bao gồm độ nhạy cảm về giá và các yếu tố chứng minh xã hội`;
      
    case 'id-ID':
      return `Persyaratan khusus:
- Buat semua salinan dalam bahasa Indonesia
- Gabungkan elemen budaya Indonesia: Lebaran, Natal, hari raya lokal
- Gunakan bahasa gaul internet Indonesia dan ekspresi lokal
- Pertimbangkan psikologi dan kebiasaan belanja konsumen Indonesia
- Sertakan sensitivitas harga dan elemen bukti sosial`;
      
    case 'ms-MY':
      return `Keperluan khas:
- Cipta semua salinan dalam bahasa Melayu
- Gabungkan elemen budaya Malaysia: Hari Raya, Tahun Baru Cina, perayaan tempatan
- Gunakan bahasa slanga internet Malaysia dan ungkapan tempatan
- Pertimbangkan psikologi dan tabiat membeli-belah pengguna Malaysia
- Sertakan kepekaan harga dan elemen bukti sosial`;
      
    default:
      return `Special Requirements:
- Generate copy in the local language of the selected region
- Incorporate local cultural elements, holidays, and traditions
- Use local expressions and internet slang
- Consider local consumer psychology and shopping habits
- Include price sensitivity and social proof elements`;
  }
};

/**
 * 解析 AI 生成的文案响应
 * @param response AI 响应文本
 * @returns 解析后的文案数组
 */
export const parseGeneratedCopies = (response: string): string[] => {
  // 移除多余的空行和格式
  const cleanedResponse = response.trim();
  
  // 尝试匹配不同格式的文案，并去掉前缀
  const patterns = [
    // 中文格式：文案1：内容
    /文案\s*\d+[：:]\s*(.+?)(?=\n文案|\nCopy|\nTexte|\nالنص|$)/gs,
    // 英文格式：Copy 1: content
    /Copy\s*\d+[：:]\s*(.+?)(?=\n文案|\nCopy|\nTexte|\nالنص|$)/gs,
    // 法文格式：Texte 1: content
    /Texte\s*\d+[：:]\s*(.+?)(?=\n文案|\nCopy|\nTexte|\nالنص|$)/gs,
    // 阿拉伯文格式：النص 1: content
    /النص\s*\d+[：:]\s*(.+?)(?=\n文案|\nCopy|\nTexte|\nالنص|$)/gs,
    // 西班牙文格式：Texto 1: content
    /Texto\s*\d+[：:]\s*(.+?)(?=\n文案|\nCopy|\nTexte|\nالنص|$)/gs
  ];
  
  for (const pattern of patterns) {
    const matches = cleanedResponse.matchAll(pattern);
    const results: string[] = [];
    
    for (const match of matches) {
      if (match[1]) {
        // 去掉前缀，只保留文案内容
        const cleanCopy = match[1].trim();
        if (cleanCopy && cleanCopy.length > 5) { // 确保文案有足够的内容
          results.push(cleanCopy);
        }
      }
    }
    
    if (results.length > 0) {
      console.log('解析到的文案数量:', results.length);
      return results;
    }
  }
  
  // 如果正则匹配失败，尝试按行分割并去掉前缀
  const lines = cleanedResponse.split('\n').filter(line => line.trim());
  const cleanLines: string[] = [];
  
  for (const line of lines) {
    // 去掉各种可能的前缀
    const cleanLine = line
      .replace(/^文案\s*\d+[：:]\s*/, '')
      .replace(/^Copy\s*\d+[：:]\s*/, '')
      .replace(/^Texte\s*\d+[：:]\s*/, '')
      .replace(/^النص\s*\d+[：:]\s*/, '')
      .replace(/^Texto\s*\d+[：:]\s*/, '')
      .replace(/^[1-3][.、]\s*/, '') // 去掉数字编号
      .trim();
    
    if (cleanLine && cleanLine.length > 5) {
      cleanLines.push(cleanLine);
    }
  }
  
  console.log('按行解析到的文案数量:', cleanLines.length);
  return cleanLines.slice(0, 3); // 最多返回3条文案
}; 