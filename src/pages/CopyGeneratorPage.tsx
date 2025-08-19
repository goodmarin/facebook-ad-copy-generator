import React, { useEffect, useState } from 'react';
import { AppleNavigation } from '../components/AppleNavigation';
import { AppleGenerator } from '../components/AppleGenerator';
import { AppleFooter } from '../components/AppleFooter';
import { TimeDisplay } from '../components/TimeDisplay';
import { CountdownTimer } from '../components/CountdownTimer';
import { EmojiEnhancer, generateEmojiPromptRules } from '../utils/enhancedEmojiRules';
import { checkForbiddenCategory } from '../utils/sensitiveWords';
import { checkPolicyViolations, PolicyCheckResult } from '../utils/policyChecker';
import { getLanguageByRegion } from '../utils/languages';

interface ProductInfo {
  name: string;
  features: string;
  targetAudience: string;
  regions: string[];
  style: string;
  promotion: string;
}

export const CopyGeneratorPage: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: '',
    features: '',
    targetAudience: '',
    regions: [],
    style: 'confident',
    promotion: 'discount'
  });

  const [copies, setCopies] = useState<Array<{ text: string; region: string; regionName: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegionError, setShowRegionError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForbiddenProduct, setIsForbiddenProduct] = useState(false);
  const [policyCheckResult, setPolicyCheckResult] = useState<PolicyCheckResult | null>(null);

  const getRegionChineseName = (regionCode: string): string => {
    const regionNames: { [key: string]: string } = {
      'US': '美国', 'JP': '日本', 'KR': '韩国', 'IN': '印度', 'SG': '新加坡',
      'MY': '马来西亚', 'TH': '泰国', 'VN': '越南', 'ID': '印度尼西亚', 'PH': '菲律宾',
      'TW': '台湾', 'HK': '香港', 'CA': '加拿大', 'MX': '墨西哥', 'GB': '英国',
      'DE': '德国', 'FR': '法国', 'IT': '意大利', 'ES': '西班牙', 'NL': '荷兰',
      'AU': '澳大利亚', 'NZ': '新西兰', 'BR': '巴西', 'AR': '阿根廷'
    };
    return regionNames[regionCode] || regionCode;
  };

  const cleanCopyText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .trim();
  };

  const isTextInTargetLanguage = (text: string, languageCode: string): boolean => {
    const lang = (languageCode || '').toLowerCase();
    if (lang.startsWith('en')) return /[a-z]/i.test(text);
    if (lang.startsWith('ja')) return /[\u3040-\u30ff\uff66-\uff9f]/.test(text);
    if (lang.startsWith('ko')) return /[\uac00-\ud7af]/.test(text);
    if (lang.startsWith('zh')) return /[\u4e00-\u9fff]/.test(text);
    if (lang.startsWith('es')) return /[áéíóúñ¡¿]/i.test(text) || /\b(el|la|de|que|y|para|con|los|las)\b/i.test(text);
    if (lang.startsWith('pt')) return /[áâãàéêíóôõúç]/i.test(text) || /\b(o|a|de|que|e|para|com|os|as)\b/i.test(text);
    if (lang.startsWith('fr')) return /[àâçéèêëîïôûùüÿœæ]/i.test(text) || /\b(le|la|de|que|et|pour|avec|les|des)\b/i.test(text);
    if (lang.startsWith('de')) return /[äöüß]/i.test(text) || /\b(der|die|das|und|für|mit|den|dem|des)\b/i.test(text);
    if (lang.startsWith('it')) return /[àèéìíîòóùú]/i.test(text) || /\b(il|lo|la|e|di|che|per|con|gli|le)\b/i.test(text);
    if (lang.startsWith('nl')) return /\b(de|het|een|en|voor|met)\b/i.test(text);
    if (lang.startsWith('tr')) return /[çğıöşü]/i.test(text) || /\b(ve|için|ile|bir)\b/i.test(text);
    if (lang.startsWith('ar')) return /[\u0600-\u06ff]/.test(text);
    if (lang.startsWith('th')) return /[\u0e00-\u0e7f]/.test(text);
    if (lang.startsWith('vi')) return /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(text);
    if (lang.startsWith('id')) return /\b(dan|yang|untuk|dengan|di|ke|dari)\b/i.test(text);
    if (lang.startsWith('ms')) return /\b(dan|yang|untuk|dengan|di|ke|dari)\b/i.test(text);
    if (lang.startsWith('sv')) return /[åäö]/i.test(text);
    if (lang.startsWith('no')) return /[æøå]/i.test(text);
    if (lang.startsWith('da')) return /[æøå]/i.test(text);
    if (lang.startsWith('fi')) return /\b(ja|että|mutta|kun|jos|tai)\b/i.test(text);
    if (lang.startsWith('pl')) return /[ąćęłńóśźż]/i.test(text);
    if (lang.startsWith('cs')) return /[áčďéěíňóřšťúůýž]/i.test(text);
    if (lang.startsWith('hu')) return /[áéíóöőúüű]/i.test(text);
    if (lang.startsWith('ro')) return /[ăâîșț]/i.test(text);
    if (lang.startsWith('bg')) return /[\u0400-\u04ff]/.test(text);
    if (lang.startsWith('hr')) return /[čćđšž]/i.test(text);
    if (lang.startsWith('sl')) return /[čšž]/i.test(text);
    if (lang.startsWith('sk')) return /[áäčďéíľĺňóôŕšťúýž]/i.test(text);
    if (lang.startsWith('lt')) return /[ąčęėįšųūž]/i.test(text);
    if (lang.startsWith('lv')) return /[āčēģīķļņōŗšūž]/i.test(text);
    if (lang.startsWith('et')) return /[äöõü]/i.test(text);
    if (lang.startsWith('he')) return /[\u0590-\u05ff]/.test(text);
    if (lang.startsWith('fa')) return /[\u0600-\u06ff]/.test(text);
    if (lang.startsWith('ur')) return /[\u0600-\u06ff]/.test(text);
    return true;
  };

  const generateCopy = async () => {
    if (!productInfo.name || !productInfo.features || !productInfo.targetAudience) {
      setError('请填写完整的产品信息');
      return;
    }

    if (productInfo.regions.length === 0) {
      setShowRegionError(true);
      setTimeout(() => setShowRegionError(false), 3000);
      return;
    }

    setIsLoading(true);
    setCopies([]); // 清空上一次的结果，确保重新生成时从第一条开始显示
    setError(null);
    setIsForbiddenProduct(false);
    setPolicyCheckResult(null);

    try {
      // 多样性种子：用于引导模型在每一轮生成时产生不同的结果
      const diversitySeed = Math.random().toString(36).slice(2, 10);
      const productText = `${productInfo.name} ${productInfo.features} ${productInfo.targetAudience}`;
      const isForbidden = checkForbiddenCategory(productText);
      if (isForbidden) {
        setIsForbiddenProduct(true);
      }

      const policyResult = checkPolicyViolations(productText);
      setPolicyCheckResult(policyResult);

      const allCopies: Array<{ text: string; region: string; regionName: string }> = [];

      let index = 0;
      const regions = [...productInfo.regions];
      const concurrency = Math.min(2, regions.length);
      const runNext = async (): Promise<void> => {
        const current = index++;
        if (current >= regions.length) return;
        const region = regions[current];
        // 传入多样性种子，增强与上一批的差异
        const regionCopies = await generateLocalizedCopiesWithAI(productInfo, region, diversitySeed);
        const regionEmojiEnhancer = new EmojiEnhancer();
        const newItems: Array<{ text: string; region: string; regionName: string }> = [];
        regionCopies.forEach((copyText, idx) => {
          let processedCopy = cleanCopyText(copyText);
          processedCopy = regionEmojiEnhancer.enhanceCopy(processedCopy, region, idx);
          const item = { text: processedCopy, region, regionName: getRegionChineseName(region) };
          newItems.push(item);
          allCopies.push(item);
        });
        // 即时更新 UI，提升感知速度
        if (newItems.length > 0) {
          setCopies(prev => [...prev, ...newItems]);
        }
        regionEmojiEnhancer.reset();
        await runNext();
      };

      await Promise.all(Array.from({ length: Math.min(concurrency, regions.length) }, () => runNext()));
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成文案时出错，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalizedCopiesWithAI = async (productInfo: ProductInfo, region: string, diversitySeed?: string): Promise<string[]> => {
    const language = getLanguageByRegion(region);
    const languageMap: { [key: string]: string } = {
      'en-US': 'English',
      'en-GB': 'English',
      'en-CA': 'English',
      'en-AU': 'English',
      'en-SG': 'English',
      'en-PH': 'English',
      'en-IN': 'English',
      'ja-JP': 'Japanese',
      'ko-KR': 'Korean',
      'zh-TW': 'Chinese (Traditional)',
      'zh-HK': 'Chinese (Traditional)',
      'es-ES': 'Spanish',
      'es-MX': 'Spanish',
      'pt-BR': 'Portuguese (Brazilian)',
      'fr-FR': 'French',
      'de-DE': 'German',
      'it-IT': 'Italian',
      'nl-NL': 'Dutch',
      'ar-SA': 'Arabic',
      'ar-AE': 'Arabic',
      'tr-TR': 'Turkish',
      'th-TH': 'Thai',
      'lo-LA': 'Lao',
      'vi-VN': 'Vietnamese',
      'id-ID': 'Indonesian',
      'ms-MY': 'Malay'
    };

    const targetLanguage = languageMap[language] || 'English';
    const emojiRules = generateEmojiPromptRules(region);

    const prompt = `Create 3 Facebook ad copies for ${region} market in ${targetLanguage}.

Product: ${productInfo.name}
Features: ${productInfo.features}
Target Audience: ${productInfo.targetAudience}
Style: ${productInfo.style}
Promotion: ${productInfo.promotion}

${emojiRules}

Requirements:
- 100% ${targetLanguage}, no Chinese characters if not applicable
- 120-180 characters each copy
- Include compelling call-to-action
- Make it engaging and conversion-focused
- Each copy must use different emoji combinations (4-6 emojis per copy)
- Format: Copy 1: [content] | Copy 2: [content] | Copy 3: [content]
- IMPORTANT: If the user requests regeneration, produce copies that are substantially different from any previous batch by varying tone, structure, hooks and emoji sets.
${diversitySeed ? `\nRegeneration context: diversity seed = ${diversitySeed}. Ensure this batch is substantially different from previous batches by varying tone, structure, hooks, vocabulary, and emoji sets.` : ''}`;

    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-674b29e0b86846bca55195b66eb3e3aa';
      const requestBody = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a creative ${targetLanguage} Facebook ad copywriter. Generate 100% ${targetLanguage} content only. Use relevant emojis naturally, create emotional connections and include compelling calls-to-action. Make each copy unique and memorable.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.9,
        top_p: 0.95,
        presence_penalty: 0.1,
        frequency_penalty: 0.3
      } as const;

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        return generateFallbackCopies(productInfo, region);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      if (!content) {
        throw new Error('AI未返回有效内容');
      }

      let copies = content
        .split(/copy\s*\d+[：:]\s*/i)
        .slice(1)
        .map((copy: string) => copy.trim().replace(/^[|:]\s*/, '').replace(/\s*[|:]\s*.*$/, ''))
        .filter((copy: string) => copy.length >= 20 && copy.length <= 500)
        .slice(0, 3);

      // 语言校验与修正
      copies = copies.filter((c: string) => isTextInTargetLanguage(c, language));
      if (copies.length < 3) {
        return generateFallbackCopies(productInfo, region);
      }
      return copies.slice(0, 3);
    } catch (e) {
      return generateFallbackCopies(productInfo, region);
    }
  };

  const generateFallbackCopies = (productInfo: ProductInfo, region: string): string[] => {
    const lang = getLanguageByRegion(region);
    const languageMap: { [key: string]: { cta: string; bullets: (p: ProductInfo) => string[] } } = {
      'lo-LA': { cta: 'ຊື້ຕອນນີ້', bullets: (p) => [
        `${p.name} - ${p.features} | ເໝາະສໍາລັບ ${p.targetAudience}`,
        `ໂປຣໂມຊັນຈໍາກັດ ຢ່າພາດ!`,
        `ຄຸນນະພາບທີ່ເຊື່ອຖືໄດ້`
      ]},
      'ja-JP': { cta: '今すぐチェック', bullets: (p) => [
        `${p.name}：${p.features}。${p.targetAudience}に最適。`,
        `期間限定オファー。逃さないで！`,
        `品質と体験を両立。`
      ]},
      'ko-KR': { cta: '지금 확인하기', bullets: (p) => [
        `${p.name} - ${p.features} | ${p.targetAudience}에 딱 맞는 선택`,
        `한정 할인 진행 중!`,
        `만족도 높은 사용감`
      ]},
      'zh-TW': { cta: '立即搶購', bullets: (p) => [
        `${p.name}｜${p.features}｜為${p.targetAudience}量身打造`,
        `限時優惠，把握機會`,
        `品質保證，口碑推薦`
      ]},
      'zh-HK': { cta: '立即選購', bullets: (p) => [
        `${p.name}・${p.features}・專為${p.targetAudience}設計`,
        `限時優惠，唔好錯過`,
        `品質體驗，信心之選`
      ]},
      'th-TH': { cta: 'สั่งซื้อเลย', bullets: (p) => [
        `${p.name} - ${p.features} เหมาะสำหรับ ${p.targetAudience}`,
        `โปรโมชั่นพิเศษจำนวนจำกัด`,
        `รับประกันคุณภาพและความคุ้มค่า`
      ]},
      'vi-VN': { cta: 'Mua ngay', bullets: (p) => [
        `${p.name} - ${p.features} | Dành cho ${p.targetAudience}`,
        `Ưu đãi giới hạn thời gian`,
        `Chất lượng đáng tin cậy`
      ]},
      'id-ID': { cta: 'Beli sekarang', bullets: (p) => [
        `${p.name} - ${p.features} | Cocok untuk ${p.targetAudience}`,
        `Promo terbatas, jangan lewatkan`,
        `Kualitas terjamin`
      ]},
      'ms-MY': { cta: 'Beli sekarang', bullets: (p) => [
        `${p.name} - ${p.features} | Sesuai untuk ${p.targetAudience}`,
        `Promosi terhad, rebut sekarang`,
        `Kualiti dijamin`
      ]},
      'es-ES': { cta: 'Compra ahora', bullets: (p) => [
        `${p.name}: ${p.features}. Ideal para ${p.targetAudience}.`,
        `Oferta por tiempo limitado`,
        `Calidad y experiencia superior`
      ]},
      'es-MX': { cta: 'Compra ahora', bullets: (p) => [
        `${p.name}: ${p.features}. Ideal para ${p.targetAudience}.`,
        `Promoción por tiempo limitado`,
        `Calidad garantizada`
      ]},
      'pt-BR': { cta: 'Compre agora', bullets: (p) => [
        `${p.name} - ${p.features} | Perfeito para ${p.targetAudience}`,
        `Oferta por tempo limitado`,
        `Qualidade garantida`
      ]},
      'fr-FR': { cta: 'Acheter maintenant', bullets: (p) => [
        `${p.name} - ${p.features} | Idéal pour ${p.targetAudience}`,
        `Offre à durée limitée`,
        `Qualité et expérience premium`
      ]},
      'de-DE': { cta: 'Jetzt kaufen', bullets: (p) => [
        `${p.name} - ${p.features} | Perfekt für ${p.targetAudience}`,
        `Nur für kurze Zeit`,
        `Garantierte Qualität`
      ]},
      'it-IT': { cta: 'Acquista ora', bullets: (p) => [
        `${p.name} - ${p.features} | Perfetto per ${p.targetAudience}`,
        `Offerta a tempo limitato`,
        `Qualità garantita`
      ]},
      'nl-NL': { cta: 'Koop nu', bullets: (p) => [
        `${p.name} - ${p.features} | Ideaal voor ${p.targetAudience}`,
        `Aanbieding voor beperkte tijd`,
        `Gegarandeerde kwaliteit`
      ]},
      'tr-TR': { cta: 'Hemen satın al', bullets: (p) => [
        `${p.name} - ${p.features} | ${p.targetAudience} için mükemmel`,
        `Sınırlı süreli fırsat`,
        `Garantili kalite`
      ]},
      'ar-SA': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض لفترة محدودة`,
        `جودة مضمونة`
      ]},
      'ar-AE': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'en-US': { cta: 'Shop now', bullets: (p) => [
        `${p.name} — ${p.features}. Built for ${p.targetAudience}.`,
        `Limited-time offer`,
        `Trusted quality`
      ]}
    };
    const pick = languageMap[lang] || languageMap['en-US'];
    const [b1, b2, b3] = pick.bullets(productInfo);
    return [
      `${b1} ${pick.cta} ➜`,
      `${b2} ${pick.cta} ➜`,
      `${b3} ${pick.cta} ➜`
    ];
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppleNavigation />
      <section className="pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            {/* 节日营销倒计时 */}
            <div className="w-full whitespace-nowrap">
              <CountdownTimer />
            </div>
            {/* 全球时间（允许换行以避免滚动条） */}
            <div className="w-full whitespace-normal">
              <TimeDisplay />
            </div>
          </div>
        </div>
      </section>

      <AppleGenerator
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        copies={copies}
        isLoading={isLoading}
        onGenerate={generateCopy}
        showRegionError={showRegionError}
        setShowRegionError={setShowRegionError}
        error={error}
        isForbiddenProduct={isForbiddenProduct}
        policyCheckResult={policyCheckResult}
      />

      <AppleFooter />
    </div>
  );
};

export default CopyGeneratorPage;


