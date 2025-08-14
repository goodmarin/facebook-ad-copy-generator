// 🌍 智能语言重试生成工具

// 🌍 获取国家对应的母语
export const getNativeLanguageByRegion = (region: string): string => {
  const nativeLanguageMap: { [key: string]: string } = {
    'US': 'English', 'CA': 'English', 'GB': 'English', 'AU': 'English', 'NZ': 'English',
    'IN': 'English', 'SG': 'English', 'PH': 'English', 'ZA': 'English', 'IE': 'English',
    'JP': '日本語',
    'KR': '한국어',
    'CN': '中文', 'TW': '繁體中文', 'HK': '繁體中文',
    'TH': 'ไทย',
    'VN': 'Tiếng Việt',
    'MY': 'Bahasa Melayu', 'BN': 'Bahasa Melayu',
    'ID': 'Bahasa Indonesia',
    'MM': 'မြန်မာဘာသာ',
    'KH': 'ភាសាខ្មែរ',
    'LA': 'ພາສາລາວ',
    'DE': 'Deutsch', 'AT': 'Deutsch', 'CH': 'Deutsch',
    'FR': 'Français',
    'IT': 'Italiano',
    'ES': 'Español', 'MX': 'Español', 'AR': 'Español', 'CL': 'Español', 'CO': 'Español', 'PE': 'Español',
    'PT': 'Português', 'BR': 'Português',
    'NL': 'Nederlands', 'BE': 'Nederlands',
    'SE': 'Svenska',
    'NO': 'Norsk',
    'DK': 'Dansk',
    'FI': 'Suomi',
    'PL': 'Polski',
    'CZ': 'Čeština',
    'HU': 'Magyar',
    'RO': 'Română',
    'BG': 'Български',
    'HR': 'Hrvatski',
    'SI': 'Slovenščina',
    'SK': 'Slovenčina',
    'LT': 'Lietuvių',
    'LV': 'Latviešu',
    'EE': 'Eesti',
    'GR': 'Ελληνικά',
    'SA': 'العربية', 'AE': 'العربية', 'EG': 'العربية', 'QA': 'العربية', 'KW': 'العربية',
    'TR': 'Türkçe',
    'IL': 'עברית',
    'RU': 'Русский',
    'UA': 'Українська'
  };
  
  return nativeLanguageMap[region] || 'English';
};

// 🔍 验证语言准确性的函数
export const validateLanguageAccuracy = (copies: string[], expectedLanguage: string): boolean => {
  if (!copies || copies.length === 0) return false;
  
  for (const copy of copies) {
    if (!copy || copy.trim().length < 10) return false;
    
    // 检测中文字符（如果目标语言不是中文，则不应包含中文）
    const hasChinese = /[\u4e00-\u9fff]/.test(copy);
    if (hasChinese && !expectedLanguage.includes('中文')) {
      console.log(`❌ 发现中文字符，但目标语言是 ${expectedLanguage}`);
      return false;
    }
    
    // 根据不同语言进行特定验证
    switch (expectedLanguage) {
      case '한국어':
        if (!/[\uAC00-\uD7AF]/.test(copy)) {
          console.log(`❌ 韩语文案中未检测到韩文字符`);
          return false;
        }
        break;
      case '日本語':
        // 修改日语验证：检测平假名、片假名或日文汉字
        if (!/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(copy)) {
          console.log(`❌ 日语文案中未检测到日文字符`);
          return false;
        }
        // 额外检查：确保不是纯中文（至少要有一些假名）
        if (/^[\u4E00-\u9FAF\s\p{P}\p{S}]+$/u.test(copy.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ''))) {
          console.log(`❌ 日语文案疑似为纯中文，缺少假名`);
          return false;
        }
        break;
      case 'ไทย':
        if (!/[\u0E00-\u0E7F]/.test(copy)) {
          console.log(`❌ 泰语文案中未检测到泰文字符`);
          return false;
        }
        break;
      case 'ພາສາລາວ':
        if (!/[\u0E80-\u0EFF]/.test(copy)) {
          console.log(`❌ 老挝语文案中未检测到老挝文字符`);
          return false;
        }
        break;
      case 'ភាសាខ្មែរ':
        if (!/[\u1780-\u17FF]/.test(copy)) {
          console.log(`❌ 柬埔寨语文案中未检测到高棉文字符`);
          return false;
        }
        break;
      case 'မြန်မာဘာသာ':
        if (!/[\u1000-\u109F]/.test(copy)) {
          console.log(`❌ 缅甸语文案中未检测到缅甸文字符`);
          return false;
        }
        break;
      case 'English':
        // 英语验证：主要检查是否混入了其他语言字符
        if (/[\u4e00-\u9fff\uAC00-\uD7AF\u3040-\u309F\u30A0-\u30FF\u0E00-\u0E7F]/.test(copy)) {
          console.log(`❌ 英语文案中混入了其他语言字符`);
          return false;
        }
        break;
    }
  }
  
  return true;
};

// 💬 英文文案本土化函数
export const localizeEnglishCopies = (englishCopies: string[], region: string, targetLanguage: string): string[] => {
  console.log(`🌍 开始本土化英文文案到 ${targetLanguage}...`);
  
  // 为每条英文文案添加本土化元素
  const localizedCopies = englishCopies.map(copy => {
    let localizedCopy = copy;
    
    // 根据目标地区添加合适的emoji和表达方式
    switch (region) {
      case 'JP':
        localizedCopy = addJapaneseLocalization(copy);
        break;
      case 'KR':
        localizedCopy = addKoreanLocalization(copy);
        break;
      case 'TH':
        localizedCopy = addThaiLocalization(copy);
        break;
      case 'VN':
        localizedCopy = addVietnameseLocalization(copy);
        break;
      case 'LA':
        localizedCopy = addLaoLocalization(copy);
        break;
      case 'KH':
        localizedCopy = addCambodianLocalization(copy);
        break;
      case 'MM':
        localizedCopy = addMyanmarLocalization(copy);
        break;
      default:
        // 通用本土化：添加地区友好的表达
        localizedCopy = addGeneralLocalization(copy, region);
    }
    
    return localizedCopy;
  });
  
  console.log(`✅ 英文文案本土化完成`);
  return localizedCopies;
};

// 🇯🇵 日本本土化
const addJapaneseLocalization = (copy: string): string => {
  return copy
    .replace(/\!/g, '！') // 使用全角感叹号
    .replace(/amazing/gi, 'すごい')
    .replace(/great/gi, '素晴らしい') 
    .replace(/check it out/gi, 'チェックしてみて')
    + ' 🌸';
};

// 🇰🇷 韩国本土化
const addKoreanLocalization = (copy: string): string => {
  return copy
    .replace(/amazing/gi, '대박')
    .replace(/great/gi, '완전 좋아')
    .replace(/check it out/gi, '한번 봐봐')
    + ' 💜';
};

// 🇹🇭 泰国本土化
const addThaiLocalization = (copy: string): string => {
  return copy
    .replace(/amazing/gi, 'เจ๋งมาก')
    .replace(/great/gi, 'เยี่ยม')
    .replace(/check it out/gi, 'มาดูกัน')
    + ' 🙏';
};

// 🇻🇳 越南本土化
const addVietnameseLocalization = (copy: string): string => {
  return copy
    .replace(/amazing/gi, 'tuyệt vời')
    .replace(/great/gi, 'rất tốt')
    .replace(/check it out/gi, 'hãy xem')
    + ' 🇻🇳';
};

// 🇱🇦 老挝本土化
const addLaoLocalization = (copy: string): string => {
  return copy
    .replace(/amazing/gi, 'ງາມຫຼາຍ')
    .replace(/great/gi, 'ດີຫຼາຍ')
    .replace(/check it out/gi, 'ມາເບິ່ງກັນ')
    + ' 🙏🇱🇦';
};

// 🇰🇭 柬埔寨本土化
const addCambodianLocalization = (copy: string): string => {
  return copy
    .replace(/amazing/gi, 'អស្ចារ្យ')
    .replace(/great/gi, 'ល្អណាស់')
    .replace(/check it out/gi, 'មកមើលបាន')
    + ' 🇰🇭';
};

// 🇲🇲 缅甸本土化
const addMyanmarLocalization = (copy: string): string => {
  return copy
    .replace(/amazing/gi, 'အံ့သြဖွယ်')
    .replace(/great/gi, 'အရမ်းကောင်း')
    .replace(/check it out/gi, 'ကြည့်ရှုပါ')
    + ' 🇲🇲';
};

// 🌍 通用本土化
const addGeneralLocalization = (copy: string, region: string): string => {
  const regionEmojis: { [key: string]: string } = {
    'US': '🇺🇸', 'CA': '🇨🇦', 'GB': '🇬🇧', 'AU': '🇦🇺',
    'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸',
    'BR': '🇧🇷', 'MX': '🇲🇽', 'AR': '🇦🇷'
  };
  
  return copy + ` ${regionEmojis[region] || '🌍'}`;
};
