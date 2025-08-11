import { useState } from 'react';
import { OutputDisplay } from './components/OutputDisplay';
import { CountdownTimer } from './components/CountdownTimer';
import { Logo } from './components/Logo';
import { Navigation } from './components/Navigation';
import { NewsCarousel } from './components/NewsCarousel';

function App() {
  const [productInfo, setProductInfo] = useState({
    name: '',
    features: '',
    targetAudience: '',
    regions: [] as string[] // 改为数组
  });
  const [copies, setCopies] = useState<Array<{text: string, region: string, regionName: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllRegions, setShowAllRegions] = useState(false);

  // 根据地区获取语言和文案风格
  const getLanguageAndStyle = (region: string) => {
    const regionConfig: { [key: string]: { language: string; style: string; culture: string } } = {
      'CN': { language: '中文', style: '亲切友好，强调实用性和性价比', culture: '注重家庭和实用价值' },
      'US': { language: 'English', style: 'confident and aspirational', culture: 'emphasize innovation and personal achievement' },
      'JP': { language: '日本語', style: '丁寧で品質重視', culture: '細部への注意と品質を重視' },
      'KR': { language: '한국어', style: '트렌디하고 스타일리시', culture: '트렌드와 미용에中점' },
      'IN': { language: 'English', style: 'value-focused and practical', culture: 'emphasize cost-effectiveness and family values' },
      'SG': { language: 'English', style: 'professional and efficient', culture: 'emphasize quality and convenience' },
      'MY': { language: 'Bahasa Melayu', style: 'friendly and inclusive', culture: 'emphasize community and tradition' },
      'TH': { language: 'ไทย', style: 'warm and respectful', culture: 'emphasize family and social harmony' },
      'VN': { language: 'Tiếng Việt', style: 'direct and value-conscious', culture: 'emphasize family and education' },
      'ID': { language: 'Bahasa Indonesia', style: 'friendly and community-oriented', culture: 'emphasize social connection' },
      'PH': { language: 'English', style: 'warm and family-oriented', culture: 'emphasize family values and community' },
      'TW': { language: '繁體中文', style: '精緻優雅，注重品質', culture: '注重細節和品質追求' },
      'HK': { language: '繁體中文', style: '時尚前衛，追求卓越', culture: '注重效率和品質' },
      'CA': { language: 'English', style: 'inclusive and diverse', culture: 'emphasize multiculturalism and quality of life' },
      'MX': { language: 'Español', style: 'warm and family-oriented', culture: 'emphasize family and tradition' },
      'GB': { language: 'English', style: 'sophisticated and understated', culture: 'emphasize tradition and quality' },
      'DE': { language: 'Deutsch', style: 'precise and quality-focused', culture: 'emphasize engineering and reliability' },
      'FR': { language: 'Français', style: 'elegant and sophisticated', culture: 'emphasize style and refinement' },
      'IT': { language: 'Italiano', style: 'passionate and stylish', culture: 'emphasize beauty and tradition' },
      'ES': { language: 'Español', style: 'warm and social', culture: 'emphasize family and social connection' },
      'NL': { language: 'Nederlands', style: 'practical and direct', culture: 'emphasize efficiency and quality' },
      'AU': { language: 'English', style: 'laid-back and friendly', culture: 'emphasize lifestyle and outdoor activities' },
      'NZ': { language: 'English', style: 'adventure-seeking and natural', culture: 'emphasize nature and sustainability' },
      'BR': { language: 'Português', style: 'warm and social', culture: 'emphasize family and celebration' },
      'AR': { language: 'Español', style: 'passionate and expressive', culture: 'emphasize family and social life' }
    };
    return regionConfig[region] || regionConfig['CN'];
  };

  // 生成文案函数 - 支持多地区本土化
  const generateCopies = async (productInfo: any) => {
    const allCopies: Array<{text: string, region: string, regionName: string}> = [];
    
    // 为每个选择的地区生成文案
    for (const region of productInfo.regions) {
      const config = getLanguageAndStyle(region);
      
      console.log(`📝 为地区 ${region} 生成本土化文案，语言: ${config.language}`);

      // 使用DeepSeek API生成本土化文案
      const regionCopies = await generateLocalizedCopiesWithAI(productInfo, region, config);

      // 为每条文案添加地区信息
      const regionNames: { [key: string]: string } = {
        'CN': '中国大陆', 'US': '美国', 'JP': '日本', 'KR': '韩国', 'IN': '印度', 'SG': '新加坡', 'MY': '马来西亚', 'TH': '泰国',
        'VN': '越南', 'ID': '印度尼西亚', 'PH': '菲律宾', 'TW': '台湾', 'HK': '香港', 'CA': '加拿大', 'MX': '墨西哥', 'GB': '英国',
        'DE': '德国', 'FR': '法国', 'IT': '意大利', 'ES': '西班牙', 'NL': '荷兰', 'AU': '澳大利亚', 'NZ': '新西兰', 'BR': '巴西', 'AR': '阿根廷'
      };
      const regionName = regionNames[region] || '全球';
      
      regionCopies.forEach((copy: string) => {
        allCopies.push({
          text: copy,
          region: region,
          regionName: regionName
        });
      });
    }

    return allCopies;
  };

  // 使用DeepSeek API生成本土化文案的函数
  const generateLocalizedCopiesWithAI = async (productInfo: any, region: string, config: any) => {
    const { language, style, culture } = config;
    
    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-674b29e0b86846bca55195b66eb3e3aa';
      
      const prompt = `请为以下产品生成3条Facebook广告文案，要求：

1. 使用${language}语言
2. 文案风格：${style}
3. 文化特点：${culture}
4. 每条文案都要有吸引力，包含情感共鸣和明确的行动召唤
5. 文案长度控制在100-150字之间
6. 要针对${productInfo.targetAudience}这个目标受众

产品信息：
- 产品名称：${productInfo.name}
- 产品特性：${productInfo.features}

请严格按照以下格式返回，每条文案用换行分隔：
文案1：[内容]
文案2：[内容]
文案3：[内容]`;

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的Facebook广告文案创作专家，擅长为不同地区和文化背景创作本土化的广告文案。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('AI未返回有效内容');
      }

      // 解析返回的文案
      const lines = content.split('\n').filter((line: string) => line.trim());
      const copies = lines
        .filter((line: string) => line.includes('文案') || line.includes('：') || line.includes(':'))
        .map((line: string) => {
          // 提取文案内容
          const match = line.match(/文案\d+[：:]\s*(.+)/);
          return match ? match[1].trim() : line.trim();
        })
        .filter((copy: string) => copy.length > 10); // 过滤掉太短的内容

      // 如果AI生成失败，使用备用模板
      if (copies.length === 0) {
        console.warn(`AI生成失败，使用备用模板 for ${region}`);
        return generateFallbackCopies(productInfo, region, config);
      }

      return copies.slice(0, 3); // 确保只返回3条文案

    } catch (error) {
      console.error(`生成文案失败 for ${region}:`, error);
      // 使用备用模板
      return generateFallbackCopies(productInfo, region, config);
    }
  };

  // 备用文案生成函数
  const generateFallbackCopies = (productInfo: any, region: string, config: any) => {
    const { language, style, culture } = config;
    const templates = getLocalizedTemplates(region, language);
    
    return templates.map(template => {
      return template
        .replace('{product}', productInfo.name)
        .replace('{features}', productInfo.features)
        .replace('{audience}', productInfo.targetAudience)
        .replace('{style}', style)
        .replace('{culture}', culture);
    });
  };

  // 获取本土化文案模板
  const getLocalizedTemplates = (region: string, _language: string) => {
    const templates: { [key: string]: string[] } = {
      'CN': [
        '🚀 {product} - 改变你的生活方式！{features}，专为{audience}设计。立即体验科技与生活的完美融合！',
        '💎 发现{product}的独特魅力！{features}让你在{audience}中脱颖而出。限时特价，错过就没有了！',
        '🔥 热销爆款！{product}凭借{features}成为{audience}的首选。现在购买享受专属优惠，快来抢购吧！'
      ],
      'US': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'JP': [
        '🚀 {product}で人生を変えよう！{features}、{audience}のために設計されました。テクノロジーとライフスタイルの完璧な融合を体験しよう！',
        '💎 {product}の独特な魅力を発見！{features}で{audience}の中で際立とう。期間限定オファー、お見逃しなく！',
        '🔥 人気商品！{product}は{features}で{audience}の第一選択肢に。今すぐ特別割引をゲット！'
      ],
      'KR': [
        '🚀 {product}로 인생을 바꿔보세요! {features}, {audience}를 위해 설계되었습니다. 기술과 라이프스타일의 완벽한 융합을 경험하세요!',
        '💎 {product}의 독특한 매력을 발견하세요! {features}로 {audience} 중에서 돋보이세요. 한정 시간 특가, 놓치지 마세요!',
        '🔥 인기 상품! {product}는 {features}로 {audience}의 첫 번째 선택이 됩니다. 지금 특별 할인을 받으세요!'
      ],
      'MY': [
        '🚀 Tukar hidup anda dengan {product}! {features} direka untuk {audience}. Alami gabungan sempurna teknologi dan gaya hidup!',
        '💎 Temui keunikan {product}! {features} membantu anda menonjol dalam kalangan {audience}. Tawaran terhad, jangan lepaskan!',
        '🔥 Jualan panas! {product} dengan {features} menjadi pilihan pertama {audience}. Dapatkan diskaun eksklusif sekarang!'
      ],
      'TH': [
        '🚀 เปลี่ยนชีวิตของคุณด้วย {product}! {features} ออกแบบมาเพื่อ {audience} สัมผัสการผสมผสานที่สมบูรณ์แบบของเทคโนโลยีและไลฟ์สไตล์!',
        '💎 ค้นพบเสน่ห์ที่ไม่เหมือนใครของ {product}! {features} ช่วยให้คุณโดดเด่นในหมู่ {audience} ข้อเสนอจำกัดเวลา อย่าพลาด!',
        '🔥 ขายดี! {product} ด้วย {features} กลายเป็นตัวเลือกแรกสำหรับ {audience} รับส่วนลดพิเศษตอนนี้!'
      ],
      'VN': [
        '🚀 Thay đổi cuộc sống của bạn với {product}! {features} được thiết kế cho {audience}. Trải nghiệm sự kết hợp hoàn hảo giữa công nghệ và lối sống!',
        '💎 Khám phá sức hấp dẫn độc đáo của {product}! {features} giúp bạn nổi bật giữa {audience}. Ưu đãi có hạn, đừng bỏ lỡ!',
        '🔥 Bán chạy! {product} với {features} trở thành lựa chọn đầu tiên cho {audience}. Nhận ưu đãi đặc biệt ngay bây giờ!'
      ],
      'ID': [
        '🚀 Ubah hidup Anda dengan {product}! {features} dirancang untuk {audience}. Rasakan perpaduan sempurna teknologi dan gaya hidup!',
        '💎 Temukan pesona unik {product}! {features} membantu Anda menonjol di antara {audience}. Penawaran terbatas, jangan lewatkan!',
        '🔥 Laris manis! {product} dengan {features} menjadi pilihan pertama {audience}. Dapatkan diskon eksklusif sekarang!'
      ],
      'PH': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'TW': [
        '🚀 {product} - 改變你的生活方式！{features}，專為{audience}設計。立即體驗科技與生活的完美融合！',
        '💎 發現{product}的獨特魅力！{features}讓你在{audience}中脫穎而出。限時特價，錯過就沒有了！',
        '🔥 熱銷爆款！{product}憑藉{features}成為{audience}的首選。現在購買享受專屬優惠，快來搶購吧！'
      ],
      'HK': [
        '🚀 {product} - 改變你的生活方式！{features}，專為{audience}設計。立即體驗科技與生活的完美融合！',
        '💎 發現{product}的獨特魅力！{features}讓你在{audience}中脫穎而出。限時特價，錯過就沒有了！',
        '🔥 熱銷爆款！{product}憑藉{features}成為{audience}的首選。現在購買享受專屬優惠，快來搶購吧！'
      ],
      'SG': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'IN': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'CA': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'GB': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'AU': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'NZ': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'DE': [
        '🚀 Verwandeln Sie Ihr Leben mit {product}! {features} entwickelt für {audience}. Erleben Sie die perfekte Verschmelzung von Technologie und Lifestyle!',
        '💎 Entdecken Sie den einzigartigen Charme von {product}! {features} helfen Ihnen, sich unter {audience} hervorzuheben. Begrenztes Angebot, nicht verpassen!',
        '🔥 Heißer Verkauf! {product} mit {features} wird zur ersten Wahl für {audience}. Holen Sie sich jetzt exklusive Rabatte!'
      ],
      'FR': [
        '🚀 Transformez votre vie avec {product}! {features} conçu pour {audience}. Vivez la fusion parfaite de technologie et de style de vie!',
        '💎 Découvrez le charme unique de {product}! {features} vous aident à vous démarquer parmi {audience}. Offre limitée, ne manquez pas!',
        '🔥 Vente chaude! {product} avec {features} devient le premier choix pour {audience}. Obtenez des réductions exclusives maintenant!'
      ],
      'IT': [
        '🚀 Trasforma la tua vita con {product}! {features} progettato per {audience}. Vivi la perfetta fusione di tecnologia e stile di vita!',
        '💎 Scopri il fascino unico di {product}! {features} ti aiutano a distinguerti tra {audience}. Offerta limitata, non perdere!',
        '🔥 Vendita calda! {product} con {features} diventa la prima scelta per {audience}. Ottieni sconti esclusivi ora!'
      ],
      'ES': [
        '🚀 ¡Transforma tu vida con {product}! {features} diseñado para {audience}. ¡Experimenta la fusión perfecta de tecnología y estilo de vida!',
        '💎 ¡Descubre el encanto único de {product}! {features} te ayudan a destacar entre {audience}. ¡Oferta limitada, no te lo pierdas!',
        '🔥 ¡Venta caliente! {product} con {features} se convierte en la primera opción para {audience}. ¡Obtén descuentos exclusivos ahora!'
      ],
      'NL': [
        '🚀 Transformeer je leven met {product}! {features} ontworpen voor {audience}. Ervaar de perfecte fusie van technologie en levensstijl!',
        '💎 Ontdek de unieke charme van {product}! {features} helpen je op te vallen onder {audience}. Beperkte aanbieding, mis het niet!',
        '🔥 Hete verkoop! {product} met {features} wordt de eerste keuze voor {audience}. Krijg nu exclusieve kortingen!'
      ],
      'MX': [
        '🚀 ¡Transforma tu vida con {product}! {features} diseñado para {audience}. ¡Experimenta la fusión perfecta de tecnología y estilo de vida!',
        '💎 ¡Descubre el encanto único de {product}! {features} te ayudan a destacar entre {audience}. ¡Oferta limitada, no te lo pierdas!',
        '🔥 ¡Venta caliente! {product} con {features} se convierte en la primera opción para {audience}. ¡Obtén descuentos exclusivos ahora!'
      ],
      'BR': [
        '🚀 Transforme sua vida com {product}! {features} projetado para {audience}. Experimente a fusão perfeita de tecnologia e estilo de vida!',
        '💎 Descubra o charme único de {product}! {features} ajudam você a se destacar entre {audience}. Oferta limitada, não perca!',
        '🔥 Venda quente! {product} com {features} se torna a primeira escolha para {audience}. Obtenha descontos exclusivos agora!'
      ],
      'AR': [
        '🚀 ¡Transforma tu vida con {product}! {features} diseñado para {audience}. ¡Experimenta la fusión perfecta de tecnología y estilo de vida!',
        '💎 ¡Descubre el encanto único de {product}! {features} te ayudan a destacar entre {audience}. ¡Oferta limitada, no te lo pierdas!',
        '🔥 ¡Venta caliente! {product} con {features} se convierte en la primera opción para {audience}. ¡Obtén descuentos exclusivos ahora!'
      ]
    };

    return templates[region] || templates['US']; // 默认使用英语模板
  };

  // 主要的生成处理函数
  const handleGenerate = async () => {
    console.log('🎯 表单提交，产品信息:', productInfo);
    
    // 检查必填字段
    if (!productInfo.name || !productInfo.features || !productInfo.targetAudience || productInfo.regions.length === 0) {
      console.error('❌ 必填字段未填写完整:', {
        name: productInfo.name,
        features: productInfo.features,
        targetAudience: productInfo.targetAudience,
        regions: productInfo.regions
      });
      alert('请填写所有必填字段并至少选择一个投放地区');
      return;
    }

    setIsLoading(true);
    console.log('🚀 开始生成文案...');

    try {
      const generatedCopies = await generateCopies(productInfo);
      console.log('✅ 文案生成完成:', generatedCopies);
      setCopies(generatedCopies);
    } catch (error) {
      console.error('❌ 生成文案时出错:', error);
      alert('生成文案时出现错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    setProductInfo(prev => ({
      ...prev,
      regions: checked 
        ? [...prev.regions, region]
        : prev.regions.filter(r => r !== region)
    }));
  };

  // 地区分组配置
  const regionGroups = [
    {
      name: '热门地区',
      regions: [
        { value: 'CN', label: '🇨🇳 中国大陆', desc: '中文市场' },
        { value: 'US', label: '🇺🇸 美国', desc: '英语市场' },
        { value: 'JP', label: '🇯🇵 日本', desc: '日语市场' },
        { value: 'KR', label: '🇰🇷 韩国', desc: '韩语市场' },
        { value: 'SG', label: '🇸🇬 新加坡', desc: '英语市场' },
        { value: 'MY', label: '🇲🇾 马来西亚', desc: '马来语市场' }
      ]
    },
    {
      name: '东南亚',
      regions: [
        { value: 'TH', label: '🇹🇭 泰国', desc: '泰语市场' },
        { value: 'VN', label: '🇻🇳 越南', desc: '越南语市场' },
        { value: 'ID', label: '🇮🇩 印度尼西亚', desc: '印尼语市场' },
        { value: 'PH', label: '🇵🇭 菲律宾', desc: '英语市场' }
      ]
    },
    {
      name: '欧美地区',
      regions: [
        { value: 'GB', label: '🇬🇧 英国', desc: '英语市场' },
        { value: 'CA', label: '🇨🇦 加拿大', desc: '英语市场' },
        { value: 'DE', label: '🇩🇪 德国', desc: '德语市场' },
        { value: 'FR', label: '🇫🇷 法国', desc: '法语市场' },
        { value: 'IT', label: '🇮🇹 意大利', desc: '意大利语市场' },
        { value: 'ES', label: '🇪🇸 西班牙', desc: '西班牙语市场' },
        { value: 'NL', label: '🇳🇱 荷兰', desc: '荷兰语市场' }
      ]
    },
    {
      name: '其他地区',
      regions: [
        { value: 'IN', label: '🇮🇳 印度', desc: '英语市场' },
        { value: 'TW', label: '🇨🇳 台湾', desc: '繁体中文市场' },
        { value: 'HK', label: '🇭🇰 香港', desc: '繁体中文市场' },
        { value: 'MX', label: '🇲🇽 墨西哥', desc: '西班牙语市场' },
        { value: 'AU', label: '🇦🇺 澳大利亚', desc: '英语市场' },
        { value: 'NZ', label: '🇳🇿 新西兰', desc: '英语市场' },
        { value: 'BR', label: '🇧🇷 巴西', desc: '葡萄牙语市场' },
        { value: 'AR', label: '🇦🇷 阿根廷', desc: '西班牙语市场' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* AMZ123风格的导航栏 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 左侧Logo */}
            <div className="flex items-center">
              <Logo size="md" />
            </div>
            
            {/* 中间导航菜单 */}
            <Navigation className="hidden lg:flex" />
            
            {/* 右侧按钮和新闻 */}
            <div className="flex items-center space-x-4">
              {/* 跨境快讯 */}
              <div className="hidden xl:block w-80">
                <NewsCarousel />
              </div>
              
              {/* 按钮组 */}
              <div className="flex items-center space-x-2">
                <a 
                  href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  立即开户
                </a>
                <a 
                  href="https://cheetahgo.cmcm.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  猎豹学院
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      


      {/* 倒计时功能 - 移到页首 */}
      <CountdownTimer />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8" id="generator">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Product Info Input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">产品信息</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
                {/* 产品名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品名称 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.name}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="例如：智能无线耳机"
                    required
                  />
                </div>

                {/* 产品特性 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品特性 *
                  </label>
                  <textarea
                    value={productInfo.features}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, features: e.target.value }))}
                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                     rows={4}
                    placeholder="描述产品的主要特点和优势，例如：主动降噪、长续航、快速充电"
                    required
                  />
                </div>

                {/* 受众人群 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标受众 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="例如：年轻上班族、音乐爱好者、运动健身人群"
                    required
                  />
                </div>

                {/* 投放地区 - 优化为分组显示 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投放地区 * (可多选)
                  </label>
                  <div className="space-y-4">
                    {/* 热门地区 - 始终显示 */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">🔥 热门地区</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {regionGroups[0].regions.map((region) => (
                          <label key={region.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={productInfo.regions.includes(region.value)}
                              onChange={(e) => handleRegionChange(region.value, e.target.checked)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{region.label}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 其他地区 - 可展开/收起 */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowAllRegions(!showAllRegions)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {showAllRegions ? '收起其他地区' : '展开所有地区'}
                        <svg className={`ml-1 w-4 h-4 transition-transform ${showAllRegions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showAllRegions && (
                        <div className="mt-3 space-y-3">
                          {regionGroups.slice(1).map((group) => (
                            <div key={group.name}>
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">{group.name}</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {group.regions.map((region) => (
                                  <label key={region.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input
                                      type="checkbox"
                                      checked={productInfo.regions.includes(region.value)}
                                      onChange={(e) => handleRegionChange(region.value, e.target.checked)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <div className="ml-2">
                                      <div className="text-sm font-medium text-gray-900">{region.label}</div>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {productInfo.regions.length === 0 && (
                    <p className="text-xs text-red-600 mt-1">请至少选择一个投放地区</p>
                  )}
                  {productInfo.regions.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">已选择 {productInfo.regions.length} 个地区</p>
                  )}
                </div>

                {/* 生成按钮 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      AI 生成中...
                    </span>
                  ) : (
                    <>🚀 生成爆款文案 + 效果预测</>
                  )}
                </button>
              </form>

              {/* 功能说明 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">🎯 智能功能</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>✅ AI 智能生成多条文案</li>
                  <li>✅ 支持多地区多语言</li>
                  <li>✅ 自动效果预测分析</li>
                  <li>✅ 实时优化建议</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Generated Results */}
          <div className="lg:col-span-2">
            <OutputDisplay
              copies={copies}
              regions={productInfo.regions}
              isLoading={isLoading}
              error={null}
            />
          </div>
        </div>
      </div>



      {/* Regions Section */}
      <div className="bg-gray-50 py-16" id="regions">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🌍 支持地区</h2>
            <p className="text-lg text-gray-600">覆盖全球主要市场，支持多语言广告投放</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {regionGroups.flatMap(group => group.regions).map((region) => (
              <div key={region.value} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{region.label.split(' ')[0]}</div>
                <div className="text-sm font-medium text-gray-900">{region.label.split(' ').slice(1).join(' ')}</div>
                <div className="text-xs text-gray-500">{region.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 倒计时信息栏 - 复制GitHub Pages的倒计时功能 */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">
              2025年第32周
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <span>距2026年还有</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded font-bold">145</span>
                <span>天</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>距黑五还有</span>
                <span className="bg-red-500 px-2 py-1 rounded font-bold">112</span>
                <span>天</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>距网络星期一还有</span>
                <span className="bg-blue-500 px-2 py-1 rounded font-bold">115</span>
                <span>天</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>距圣诞节还有</span>
                <span className="bg-green-500 px-2 py-1 rounded font-bold">139</span>
                <span>天</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>距春节还有</span>
                <span className="bg-red-500 px-2 py-1 rounded font-bold">174</span>
                <span>天</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>距情人节还有</span>
                <span className="bg-red-500 px-2 py-1 rounded font-bold">190</span>
                <span>天</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - 复制GitHub Pages的完整页脚 */}
      <div className="bg-gray-900 text-white py-12" id="footer">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 猎豹服务 */}
            <div>
              <h3 className="text-xl font-bold mb-4">猎豹服务</h3>
              <ul className="text-gray-400 space-y-2">
                <li><a href="https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• Facebook广告</a></li>
                <li><a href="https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• TikTok广告</a></li>
                <li><a href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• 客户自助平台</a></li>
                <li><a href="https://cheetahgo.cmcm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• 9号艺术工作室</a></li>
              </ul>
            </div>
            
            {/* 联系我们 */}
            <div>
              <h3 className="text-xl font-bold mb-4">联系我们</h3>
              <ul className="text-gray-400 space-y-2">
                <li>咨询热线: 400-603-7779</li>
                <li>咨询邮箱: adoverseas@cmcm.com</li>
                <li>总部地址: 北京市朝阳区三间房南里7号万东科技文创园11号楼</li>
              </ul>
            </div>
            
            {/* 官方公众号 */}
            <div>
              <h3 className="text-xl font-bold mb-4">官方公众号</h3>
              <div className="bg-white p-2 rounded-lg inline-block">
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-orange-500 rounded mx-auto mb-1"></div>
                    <div className="text-xs text-gray-600">CMCM</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 关于我们 */}
            <div>
              <h3 className="text-xl font-bold mb-4">关于我们</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                专业的Facebook广告文案生成工具,基于React + Tailwind CSS + DeepSeek构建,为广告主提供高质量的文案创作服务。与猎豹移动深度合作,助力企业出海营销。
              </p>
            </div>
          </div>
          
          {/* 版权信息 */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 爆款文案生成器 - 与猎豹移动深度合作，助力企业出海营销</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;