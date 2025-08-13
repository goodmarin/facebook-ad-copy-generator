import { RegionConfig, StyleOption, ToneOption } from '../types';

// 支持的地区配置 - 全球扩展版
export const REGIONS: RegionConfig[] = [

  {
    code: 'JP',
    name: '日本',
    language: 'ja-JP',
    flag: '🇯🇵',
    direction: 'ltr'
  },
  {
    code: 'KR',
    name: '韩国',
    language: 'ko-KR',
    flag: '🇰🇷',
    direction: 'ltr'
  },
  {
    code: 'IN',
    name: '印度',
    language: 'en-IN',
    flag: '🇮🇳',
    direction: 'ltr'
  },
  {
    code: 'SG',
    name: '新加坡',
    language: 'en-SG',
    flag: '🇸🇬',
    direction: 'ltr'
  },
  {
    code: 'MY',
    name: '马来西亚',
    language: 'ms-MY',
    flag: '🇲🇾',
    direction: 'ltr'
  },
  {
    code: 'TH',
    name: '泰国',
    language: 'th-TH',
    flag: '🇹🇭',
    direction: 'ltr'
  },
  {
    code: 'VN',
    name: '越南',
    language: 'vi-VN',
    flag: '🇻🇳',
    direction: 'ltr'
  },
  {
    code: 'ID',
    name: '印度尼西亚',
    language: 'id-ID',
    flag: '🇮🇩',
    direction: 'ltr'
  },
  {
    code: 'PH',
    name: '菲律宾',
    language: 'en-PH',
    flag: '🇵🇭',
    direction: 'ltr'
  },
  {
    code: 'TW',
    name: '台湾',
    language: 'zh-TW',
    flag: '🇨🇳',
    direction: 'ltr'
  },
  {
    code: 'HK',
    name: '香港',
    language: 'zh-HK',
    flag: '🇭🇰',
    direction: 'ltr'
  },

  // 北美地区
  {
    code: 'US',
    name: '美国',
    language: 'en-US',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  {
    code: 'CA',
    name: '加拿大',
    language: 'en-CA',
    flag: '🇨🇦',
    direction: 'ltr'
  },
  {
    code: 'MX',
    name: '墨西哥',
    language: 'es-MX',
    flag: '🇲🇽',
    direction: 'ltr'
  },

  // 欧洲地区
  {
    code: 'GB',
    name: '英国',
    language: 'en-GB',
    flag: '🇬🇧',
    direction: 'ltr'
  },
  {
    code: 'DE',
    name: '德国',
    language: 'de-DE',
    flag: '🇩🇪',
    direction: 'ltr'
  },
  {
    code: 'FR',
    name: '法国',
    language: 'fr-FR',
    flag: '🇫🇷',
    direction: 'ltr'
  },
  {
    code: 'IT',
    name: '意大利',
    language: 'it-IT',
    flag: '🇮🇹',
    direction: 'ltr'
  },
  {
    code: 'ES',
    name: '西班牙',
    language: 'es-ES',
    flag: '🇪🇸',
    direction: 'ltr'
  },
  {
    code: 'NL',
    name: '荷兰',
    language: 'nl-NL',
    flag: '🇳🇱',
    direction: 'ltr'
  },
  {
    code: 'BE',
    name: '比利时',
    language: 'nl-BE',
    flag: '🇧🇪',
    direction: 'ltr'
  },
  {
    code: 'SE',
    name: '瑞典',
    language: 'sv-SE',
    flag: '🇸🇪',
    direction: 'ltr'
  },
  {
    code: 'NO',
    name: '挪威',
    language: 'no-NO',
    flag: '🇳🇴',
    direction: 'ltr'
  },
  {
    code: 'DK',
    name: '丹麦',
    language: 'da-DK',
    flag: '🇩🇰',
    direction: 'ltr'
  },
  {
    code: 'FI',
    name: '芬兰',
    language: 'fi-FI',
    flag: '🇫🇮',
    direction: 'ltr'
  },
  {
    code: 'CH',
    name: '瑞士',
    language: 'de-CH',
    flag: '🇨🇭',
    direction: 'ltr'
  },
  {
    code: 'AT',
    name: '奥地利',
    language: 'de-AT',
    flag: '🇦🇹',
    direction: 'ltr'
  },
  {
    code: 'PL',
    name: '波兰',
    language: 'pl-PL',
    flag: '🇵🇱',
    direction: 'ltr'
  },
  {
    code: 'CZ',
    name: '捷克',
    language: 'cs-CZ',
    flag: '🇨🇿',
    direction: 'ltr'
  },
  {
    code: 'HU',
    name: '匈牙利',
    language: 'hu-HU',
    flag: '🇭🇺',
    direction: 'ltr'
  },
  {
    code: 'RO',
    name: '罗马尼亚',
    language: 'ro-RO',
    flag: '🇷🇴',
    direction: 'ltr'
  },
  {
    code: 'BG',
    name: '保加利亚',
    language: 'bg-BG',
    flag: '🇧🇬',
    direction: 'ltr'
  },
  {
    code: 'HR',
    name: '克罗地亚',
    language: 'hr-HR',
    flag: '🇭🇷',
    direction: 'ltr'
  },
  {
    code: 'SI',
    name: '斯洛文尼亚',
    language: 'sl-SI',
    flag: '🇸🇮',
    direction: 'ltr'
  },
  {
    code: 'SK',
    name: '斯洛伐克',
    language: 'sk-SK',
    flag: '🇸🇰',
    direction: 'ltr'
  },
  {
    code: 'LT',
    name: '立陶宛',
    language: 'lt-LT',
    flag: '🇱🇹',
    direction: 'ltr'
  },
  {
    code: 'LV',
    name: '拉脱维亚',
    language: 'lv-LV',
    flag: '🇱🇻',
    direction: 'ltr'
  },
  {
    code: 'EE',
    name: '爱沙尼亚',
    language: 'et-EE',
    flag: '🇪🇪',
    direction: 'ltr'
  },
  {
    code: 'IE',
    name: '爱尔兰',
    language: 'en-IE',
    flag: '🇮🇪',
    direction: 'ltr'
  },
  {
    code: 'PT',
    name: '葡萄牙',
    language: 'pt-PT',
    flag: '🇵🇹',
    direction: 'ltr'
  },
  {
    code: 'GR',
    name: '希腊',
    language: 'el-GR',
    flag: '🇬🇷',
    direction: 'ltr'
  },

  // 中东地区
  {
    code: 'AE',
    name: '阿联酋',
    language: 'ar-AE',
    flag: '🇦🇪',
    direction: 'rtl'
  },
  {
    code: 'SA',
    name: '沙特阿拉伯',
    language: 'ar-SA',
    flag: '🇸🇦',
    direction: 'rtl'
  },
  {
    code: 'IL',
    name: '以色列',
    language: 'he-IL',
    flag: '🇮🇱',
    direction: 'rtl'
  },
  {
    code: 'TR',
    name: '土耳其',
    language: 'tr-TR',
    flag: '🇹🇷',
    direction: 'ltr'
  },
  {
    code: 'EG',
    name: '埃及',
    language: 'ar-EG',
    flag: '🇪🇬',
    direction: 'rtl'
  },
  {
    code: 'QA',
    name: '卡塔尔',
    language: 'ar-QA',
    flag: '🇶🇦',
    direction: 'rtl'
  },
  {
    code: 'KW',
    name: '科威特',
    language: 'ar-KW',
    flag: '🇰🇼',
    direction: 'rtl'
  },
  {
    code: 'BH',
    name: '巴林',
    language: 'ar-BH',
    flag: '🇧🇭',
    direction: 'rtl'
  },
  {
    code: 'OM',
    name: '阿曼',
    language: 'ar-OM',
    flag: '🇴🇲',
    direction: 'rtl'
  },

  // 南美地区
  {
    code: 'BR',
    name: '巴西',
    language: 'pt-BR',
    flag: '🇧🇷',
    direction: 'ltr'
  },
  {
    code: 'AR',
    name: '阿根廷',
    language: 'es-AR',
    flag: '🇦🇷',
    direction: 'ltr'
  },
  {
    code: 'CL',
    name: '智利',
    language: 'es-CL',
    flag: '🇨🇱',
    direction: 'ltr'
  },
  {
    code: 'CO',
    name: '哥伦比亚',
    language: 'es-CO',
    flag: '🇨🇴',
    direction: 'ltr'
  },
  {
    code: 'PE',
    name: '秘鲁',
    language: 'es-PE',
    flag: '🇵🇪',
    direction: 'ltr'
  },
  {
    code: 'VE',
    name: '委内瑞拉',
    language: 'es-VE',
    flag: '🇻🇪',
    direction: 'ltr'
  },
  {
    code: 'UY',
    name: '乌拉圭',
    language: 'es-UY',
    flag: '🇺🇾',
    direction: 'ltr'
  },
  {
    code: 'PY',
    name: '巴拉圭',
    language: 'es-PY',
    flag: '🇵🇾',
    direction: 'ltr'
  },
  {
    code: 'EC',
    name: '厄瓜多尔',
    language: 'es-EC',
    flag: '🇪🇨',
    direction: 'ltr'
  },

  // 大洋洲
  {
    code: 'AU',
    name: '澳大利亚',
    language: 'en-AU',
    flag: '🇦🇺',
    direction: 'ltr'
  },
  {
    code: 'NZ',
    name: '新西兰',
    language: 'en-NZ',
    flag: '🇳🇿',
    direction: 'ltr'
  },

  // 非洲地区
  {
    code: 'ZA',
    name: '南非',
    language: 'en-ZA',
    flag: '🇿🇦',
    direction: 'ltr'
  },
  {
    code: 'NG',
    name: '尼日利亚',
    language: 'en-NG',
    flag: '🇳🇬',
    direction: 'ltr'
  },
  {
    code: 'KE',
    name: '肯尼亚',
    language: 'en-KE',
    flag: '🇰🇪',
    direction: 'ltr'
  },
  {
    code: 'GH',
    name: '加纳',
    language: 'en-GH',
    flag: '🇬🇭',
    direction: 'ltr'
  },
  {
    code: 'MA',
    name: '摩洛哥',
    language: 'ar-MA',
    flag: '🇲🇦',
    direction: 'rtl'
  },
  {
    code: 'TN',
    name: '突尼斯',
    language: 'ar-TN',
    flag: '🇹🇳',
    direction: 'rtl'
  },
  {
    code: 'DZ',
    name: '阿尔及利亚',
    language: 'ar-DZ',
    flag: '🇩🇿',
    direction: 'rtl'
  }
];

// 文案风格选项
export const STYLE_OPTIONS: StyleOption[] = [
  {
    value: 'direct',
    label: '直接促销',
    description: '突出产品优势，强调性价比'
  },
  {
    value: 'emotional',
    label: '情感共鸣',
    description: '通过情感连接打动用户，建立信任'
  },
  {
    value: 'question',
    label: '问句引导',
    description: '用问题引发思考，激发购买欲望'
  },
  {
    value: 'lifestyle',
    label: '场景种草',
    description: '描述使用场景，让用户产生代入感'
  }
];

// 语气风格选项
export const TONE_OPTIONS: ToneOption[] = [
  {
    value: 'formal',
    label: '正式',
    description: '专业权威的语气，适合商务产品'
  },
  {
    value: 'casual',
    label: '活泼',
    description: '轻松友好的语气，适合年轻用户'
  },
  {
    value: 'humorous',
    label: '幽默',
    description: '有趣诙谐的语气，增加互动性'
  },
  {
    value: 'urgent',
    label: '紧迫',
    description: '强调限时优惠，促进快速决策'
  }
];

// 根据地区代码获取配置
export const getRegionConfig = (code: string): RegionConfig | undefined => {
  return REGIONS.find(region => region.code === code);
};

// 根据地区代码获取语言
export const getLanguageByRegion = (code: string): string => {
  const region = getRegionConfig(code);
  return region?.language || 'en-US';
};

// 根据地区代码获取文字方向
export const getDirectionByRegion = (code: string): 'ltr' | 'rtl' => {
  const region = getRegionConfig(code);
  return region?.direction || 'ltr';
}; 