import React, { useEffect, useState } from 'react';
import { AppleNavigation } from '../components/AppleNavigation';
import { AppleGenerator } from '../components/AppleGenerator';
import { AppleFooter } from '../components/AppleFooter';
import { TimeDisplay } from '../components/TimeDisplay';
import { CountdownTimer } from '../components/CountdownTimer';
import { EmojiEnhancer, generateEmojiPromptRules } from '../utils/enhancedEmojiRules';
import { checkForbiddenCategory } from '../utils/sensitiveWords';
import { checkPolicyViolations, PolicyCheckResult } from '../utils/policyChecker';
import { getLanguageByRegion, getRegionConfig } from '../utils/languages';

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
    const cfg = getRegionConfig(regionCode);
    return cfg?.name || regionCode;
  };

  const cleanCopyText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // 移除无效或多余的符号，保持纯文本输出
      .replace(/[\[\]{}<>|【】「」『』]/g, ' ')
      .replace(/[~^_=\\]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const isTextInTargetLanguage = (text: string, languageCode: string): boolean => {
    const lang = (languageCode || '').toLowerCase();

    // 非中文语言一律禁止出现中文字符（日本語除外，因含汉字）
    if (!lang.startsWith('zh') && !lang.startsWith('ja')) {
      if (/[\u4e00-\u9fff]/.test(text)) return false;
    }

    // 计算脚本覆盖率：目标脚本字符数 / 所有字母型字符数
    const count = (re: RegExp) => (text.match(re) || []).length;
    const letterCount = count(/[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u0E00-\u0E7F\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FFF\uAC00-\uD7AF]/g);

    const ensureCoverage = (scriptRe: RegExp, minRatio = 0.8) => {
      const scriptCnt = count(scriptRe);
      if (letterCount === 0) return false;
      return scriptCnt >= 1 && scriptCnt / letterCount >= minRatio;
    };

    if (lang.startsWith('th')) return ensureCoverage(/[\u0E00-\u0E7F]/g, 0.8);
    if (lang.startsWith('ko')) return ensureCoverage(/[\uAC00-\uD7AF]/g, 0.8);
    if (lang.startsWith('ar') || lang.startsWith('fa') || lang.startsWith('ur')) return ensureCoverage(/[\u0600-\u06FF]/g, 0.8);
    if (lang.startsWith('he')) return ensureCoverage(/[\u0590-\u05FF]/g, 0.8);
    if (lang.startsWith('bg') || lang.startsWith('ru') || lang.startsWith('uk')) return ensureCoverage(/[\u0400-\u04FF]/g, 0.8);
    if (lang.startsWith('lo')) return ensureCoverage(/[\u0E80-\u0EFF]/g, 0.8);
    if (lang.startsWith('ja')) {
      // 日语需包含平假名/片假名，允许汉字
      const hasKana = /[\u3040-\u30FF\u31F0-\u31FF]/.test(text);
      return hasKana;
    }

    // 拉丁字母系语言：确保不存在其它主要非拉丁脚本
    const hasNonLatinScript = /[\u0E00-\u0E7F\uAC00-\uD7AF\u0600-\u06FF\u0400-\u04FF\u0590-\u05FF]/.test(text);
    if (hasNonLatinScript) return false;

    // 进一步通过特征词/变音符判断
    if (lang.startsWith('vi')) return /[ăâđêôơư]/i.test(text) || /[áàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(text);
    if (lang.startsWith('es')) return /[áéíóúñ¡¿]/i.test(text) || /\b(el|la|de|que|y|para|con|los|las)\b/i.test(text);
    if (lang.startsWith('pt')) return /[áâãàéêíóôõúç]/i.test(text) || /\b(o|a|de|que|e|para|com|os|as)\b/i.test(text);
    if (lang.startsWith('fr')) return /[àâçéèêëîïôûùüÿœæ]/i.test(text) || /\b(le|la|de|que|et|pour|avec|les|des)\b/i.test(text);
    if (lang.startsWith('de')) return /[äöüß]/i.test(text) || /\b(der|die|das|und|für|mit|den|dem|des)\b/i.test(text);
    if (lang.startsWith('it')) return /[àèéìíîòóùú]/i.test(text) || /\b(il|lo|la|e|di|che|per|con|gli|le)\b/i.test(text);
    if (lang.startsWith('nl')) return /\b(de|het|een|en|voor|met)\b/i.test(text);
    if (lang.startsWith('tr')) return /[çğıöşü]/i.test(text) || /\b(ve|için|ile|bir)\b/i.test(text);
    if (lang.startsWith('sv')) return /[åäö]/i.test(text);
    if (lang.startsWith('no')) return /[æøå]/i.test(text);
    if (lang.startsWith('da')) return /[æøå]/i.test(text);
    if (lang.startsWith('fi')) return /\b(ja|että|mutta|kun|jos|tai)\b/i.test(text);
    if (lang.startsWith('pl')) return /[ąćęłńóśźż]/i.test(text);
    if (lang.startsWith('cs')) return /[áčďéěíňóřšťúůýž]/i.test(text);
    if (lang.startsWith('hu')) return /[áéíóöőúüű]/i.test(text);
    if (lang.startsWith('ro')) return /[ăâîșț]/i.test(text);
    if (lang.startsWith('hr')) return /[čćđšž]/i.test(text);
    if (lang.startsWith('sl')) return /[čšž]/i.test(text);
    if (lang.startsWith('sk')) return /[áäčďéíľĺňóôŕšťúýž]/i.test(text);
    if (lang.startsWith('lt')) return /[ąčęėįšųūž]/i.test(text);
    if (lang.startsWith('lv')) return /[āčēģīķļņōŗšūž]/i.test(text);
    if (lang.startsWith('et')) return /[äöõü]/i.test(text);
    if (lang.startsWith('en')) return /[a-z]/i.test(text);

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
      // 英语系
      'en-US': 'English', 'en-GB': 'English', 'en-CA': 'English', 'en-AU': 'English', 'en-SG': 'English', 'en-PH': 'English', 'en-IN': 'English', 'en-IE': 'English', 'en-ZA': 'English', 'en-NG': 'English', 'en-KE': 'English', 'en-GH': 'English', 'en-NZ': 'English',
      // 东亚/东南亚
      'ja-JP': 'Japanese', 'ko-KR': 'Korean', 'zh-TW': 'Chinese (Traditional)', 'zh-HK': 'Chinese (Traditional)',
      'th-TH': 'Thai', 'vi-VN': 'Vietnamese', 'id-ID': 'Indonesian', 'ms-MY': 'Malay', 'lo-LA': 'Lao',
      // 欧洲主要语种
      'de-DE': 'German', 'de-CH': 'German', 'de-AT': 'German',
      'fr-FR': 'French',
      'it-IT': 'Italian',
      'es-ES': 'Spanish', 'es-MX': 'Spanish', 'es-AR': 'Spanish', 'es-CL': 'Spanish', 'es-CO': 'Spanish', 'es-PE': 'Spanish', 'es-VE': 'Spanish', 'es-UY': 'Spanish', 'es-PY': 'Spanish', 'es-EC': 'Spanish',
      'nl-NL': 'Dutch', 'nl-BE': 'Dutch',
      'sv-SE': 'Swedish', 'no-NO': 'Norwegian', 'da-DK': 'Danish', 'fi-FI': 'Finnish',
      'pl-PL': 'Polish', 'cs-CZ': 'Czech', 'hu-HU': 'Hungarian', 'ro-RO': 'Romanian', 'bg-BG': 'Bulgarian', 'hr-HR': 'Croatian', 'sl-SI': 'Slovenian', 'sk-SK': 'Slovak', 'lt-LT': 'Lithuanian', 'lv-LV': 'Latvian', 'et-EE': 'Estonian',
      'el-GR': 'Greek',
      // 中东/北非
      'ar-SA': 'Arabic', 'ar-AE': 'Arabic', 'ar-EG': 'Arabic', 'ar-QA': 'Arabic', 'ar-KW': 'Arabic', 'ar-BH': 'Arabic', 'ar-OM': 'Arabic', 'ar-MA': 'Arabic', 'ar-TN': 'Arabic', 'ar-DZ': 'Arabic',
      'he-IL': 'Hebrew', 'tr-TR': 'Turkish',
      // 葡语
      'pt-BR': 'Portuguese (Brazilian)', 'pt-PT': 'Portuguese'
    };

    const targetLanguage = languageMap[language] || (language.startsWith('ar-') ? 'Arabic' : language.startsWith('pt-') ? 'Portuguese' : language.startsWith('es-') ? 'Spanish' : language.startsWith('de-') ? 'German' : language.startsWith('nl-') ? 'Dutch' : language.startsWith('en-') ? 'English' : 'English');
    const emojiRules = generateEmojiPromptRules(region);

    const chineseBanLine = targetLanguage === 'Chinese (Traditional)' || targetLanguage === 'Chinese' || targetLanguage === 'Japanese' ? '' : '\n- Absolutely NO Chinese characters (汉字)';
    const prompt = `Create 3 Facebook ad copies for ${region} market in ${targetLanguage}.

Product: ${productInfo.name}
Features: ${productInfo.features}
Target Audience: ${productInfo.targetAudience}
Style: ${productInfo.style}
Promotion: ${productInfo.promotion}

${emojiRules}

Requirements:
- 100% ${targetLanguage}; do not mix any other languages${chineseBanLine}
- 120-180 characters each copy
- Include compelling call-to-action
- Make it engaging and conversion-focused
- Each copy must use different emoji combinations (4-6 emojis per copy)
- Format: Copy 1: [content] | Copy 2: [content] | Copy 3: [content]
- IMPORTANT: If the user requests regeneration, produce copies that are substantially different from any previous batch by varying tone, structure, hooks and emoji sets.
${diversitySeed ? `\nRegeneration context: diversity seed = ${diversitySeed}. Ensure this batch is substantially different from previous batches by varying tone, structure, hooks, vocabulary, and emoji sets.` : ''}`;

    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      if (!apiKey) {
        return generateFallbackCopies(productInfo, region);
      }
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
    let lang = getLanguageByRegion(region);
    // 归一化别名，保证语言与国家一致
    const aliasMap: { [key: string]: string } = {
      'de-CH': 'de-DE', 'de-AT': 'de-DE',
      'nl-BE': 'nl-NL',
      'pt-PT': 'pt-BR',
      'es-AR': 'es-ES', 'es-CL': 'es-ES', 'es-CO': 'es-ES', 'es-PE': 'es-ES', 'es-VE': 'es-ES', 'es-UY': 'es-ES', 'es-PY': 'es-ES', 'es-EC': 'es-ES',
      'ar-AE': 'ar-SA', 'ar-EG': 'ar-SA', 'ar-QA': 'ar-SA', 'ar-KW': 'ar-SA', 'ar-BH': 'ar-SA', 'ar-OM': 'ar-SA', 'ar-MA': 'ar-SA', 'ar-TN': 'ar-SA', 'ar-DZ': 'ar-SA',
      'en-GB': 'en-US', 'en-CA': 'en-US', 'en-AU': 'en-US', 'en-SG': 'en-US', 'en-PH': 'en-US', 'en-IN': 'en-US', 'en-IE': 'en-US', 'en-ZA': 'en-US', 'en-NG': 'en-US', 'en-KE': 'en-US', 'en-GH': 'en-US', 'en-NZ': 'en-US'
    };
    if (aliasMap[lang]) lang = aliasMap[lang];
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
      'de-CH': { cta: 'Jetzt kaufen', bullets: (p) => [
        `${p.name} - ${p.features} | Perfekt für ${p.targetAudience}`,
        `Nur für kurze Zeit`,
        `Garantierte Qualität`
      ]},
      'de-AT': { cta: 'Jetzt kaufen', bullets: (p) => [
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
      'nl-BE': { cta: 'Koop nu', bullets: (p) => [
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
      'ar-EG': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-QA': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-KW': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-BH': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-OM': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-MA': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-TN': { cta: 'اشترِ الآن', bullets: (p) => [
        `${p.name} - ${p.features} | مثالي لـ ${p.targetAudience}`,
        `عرض محدود`,
        `جودة موثوقة`
      ]},
      'ar-DZ': { cta: 'اشترِ الآن', bullets: (p) => [
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


