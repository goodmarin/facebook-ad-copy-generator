// 本地语言检测工具 - 替代部分AI自检

// 语言特征检测规则
const languagePatterns: Record<string, RegExp[]> = {
  '한국어': [
    /[ㄱ-ㅎㅏ-ㅣ가-힣]/g, // 韩文字符
    /이에요|입니다|하세요|습니다/g, // 韩语常见词尾
    /그리고|하지만|또한|그래서/g, // 韩语连接词
  ],
  '日本語': [
    /[ひらがな]|[カタカナ]|[一-龯]/g, // 日文字符 
    /です|ます|ました|でした/g, // 日语敬语词尾
    /そして|しかし|また|だから/g, // 日语连接词
  ],
  'English': [
    /\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/gi, // 英语常见词
    /\b[a-zA-Z]+\b/g, // 纯英文单词
  ],
  '中文': [
    /[\u4e00-\u9fff]/g, // 中文字符
    /的|了|在|是|有|和|与|或者|但是/g, // 中文常见词
  ],
  'Español': [
    /\b(el|la|los|las|un|una|de|en|por|para|con|y|o|pero)\b/gi, // 西语常见词
    /ción|mente|ando|endo/gi, // 西语词尾特征
  ],
  'Français': [
    /\b(le|la|les|un|une|de|du|des|et|ou|mais|dans|sur|pour|avec)\b/gi, // 法语常见词
    /tion|ment|ement/gi, // 法语词尾特征
  ],
  'Deutsch': [
    /\b(der|die|das|ein|eine|und|oder|aber|in|auf|für|mit|von|zu)\b/gi, // 德语常见词
    /ung|heit|keit|lich/gi, // 德语词尾特征
  ],
  'Italiano': [
    /\b(il|la|lo|gli|le|un|una|di|in|per|con|e|o|ma)\b/gi, // 意语常见词
    /zione|mente|ando|endo/gi, // 意语词尾特征
  ],
  'Português': [
    /\b(o|a|os|as|um|uma|de|em|para|com|e|ou|mas)\b/gi, // 葡语常见词
    /ção|mente|ando|endo/gi, // 葡语词尾特征
  ],
  'Русский': [
    /[а-яё]/gi, // 俄语字符
    /\b(и|в|на|с|за|по|от|до|для|что|как)\b/gi, // 俄语常见词
  ],
  'العربية': [
    /[\u0600-\u06FF]/g, // 阿拉伯语字符
    /\b(في|على|من|إلى|مع|هذا|هذه|التي|الذي)\b/g, // 阿语常见词
  ],
  'हिन्दी': [
    /[\u0900-\u097F]/g, // 印地语字符
    /\b(और|या|में|से|को|के|की|का|है|हैं)\b/g, // 印地语常见词
  ],
  'Bahasa': [
    /\b(dan|atau|yang|dengan|untuk|dari|ke|di|pada|adalah)\b/gi, // 印尼语/马来语常见词
  ],
  'ไทย': [
    /[\u0E00-\u0E7F]/g, // 泰语字符
    /\b(และ|หรือ|ใน|กับ|สำหรับ|จาก|ไป|ที่|เป็น|มี)\b/g, // 泰语常见词
  ],
  'Tiếng Việt': [
    /\b(và|hoặc|trong|với|cho|từ|đến|tại|là|có)\b/gi, // 越南语常见词
    /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/gi, // 越南语特殊字符
  ]
};

// 检测文本的主要语言
export function detectLanguage(text: string): string {
  const scores: Record<string, number> = {};
  
  for (const [language, patterns] of Object.entries(languagePatterns)) {
    let score = 0;
    
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches) {
        score += matches.length;
      }
    }
    
    // 根据文本长度归一化分数
    scores[language] = score / text.length * 100;
  }
  
  // 找到分数最高的语言
  let maxScore = 0;
  let detectedLanguage = 'English'; // 默认英语
  
  for (const [language, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLanguage = language;
    }
  }
  
  return detectedLanguage;
}

// 检查文案语言是否与期望语言一致
export function isLanguageConsistent(copies: string[], expectedLanguage: string): {
  isConsistent: boolean;
  detectedLanguages: string[];
  confidence: number;
} {
  const detectedLanguages = copies.map(copy => detectLanguage(copy));
  const consistentCount = detectedLanguages.filter(lang => lang === expectedLanguage).length;
  const confidence = consistentCount / copies.length;
  
  return {
    isConsistent: confidence >= 0.8, // 80%以上一致性认为通过
    detectedLanguages,
    confidence
  };
}

// 获取地区的母语
export function getNativeLanguageByRegion(region: string): string {
  const nativeLanguageMap: Record<string, string> = {
    // 热门地区
    'US': 'English', 'CA': 'English', 'GB': 'English', 'AU': 'English', 'NZ': 'English', 'IE': 'English',
    'JP': '日本語', 'KR': '한국어', 'SG': 'English', 'MY': 'Bahasa', 'TH': 'ไทย', 'VN': 'Tiếng Việt',
    
    // 东南亚
    'ID': 'Bahasa', 'PH': 'English', 'MM': 'မြန်မာ', 'KH': 'ខ្មែរ', 'LA': 'ລາວ', 'BN': 'Bahasa',
    
    // 欧洲地区
    'DE': 'Deutsch', 'FR': 'Français', 'IT': 'Italiano', 'ES': 'Español', 'NL': 'Nederlands',
    'BE': 'Français', 'CH': 'Deutsch', 'AT': 'Deutsch', 'SE': 'Svenska', 'NO': 'Norsk', 'DK': 'Dansk', 'FI': 'Suomi',
    'PL': 'Polski', 'CZ': 'Čeština', 'HU': 'Magyar', 'RO': 'Română', 'BG': 'Български', 'HR': 'Hrvatski',
    'SI': 'Slovenščina', 'SK': 'Slovenčina', 'LT': 'Lietuvių', 'LV': 'Latviešu', 'EE': 'Eesti', 'PT': 'Português', 'GR': 'Ελληνικά',
    
    // 美洲地区  
    'MX': 'Español', 'BR': 'Português', 'AR': 'Español', 'CL': 'Español', 'CO': 'Español', 'PE': 'Español', 'VE': 'Español',
    
    // 其他地区
    'IN': 'हिन्दी', 'TW': '中文', 'HK': '中文', 'ZA': 'English',
    'EG': 'العربية', 'SA': 'العربية', 'AE': 'العربية', 'QA': 'العربية', 'KW': 'العربية', 'BH': 'العربية',
    'TR': 'Türkçe', 'IR': 'فارسی', 'PK': 'اردو', 'BD': 'বাংলা', 'RU': 'Русский'
  };
  
  return nativeLanguageMap[region] || 'English';
}

// 检查是否需要AI自检的关键地区(非英语且复杂语言)
export function needsAICheck(region: string): boolean {
  const criticalRegions = ['KR', 'JP', 'CN', 'TW', 'HK', 'TH', 'VN', 'AR', 'RU', 'IN'];
  return criticalRegions.includes(region);
}
