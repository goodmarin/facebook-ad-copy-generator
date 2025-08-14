// 产品信息接口
export interface ProductInfo {
  name: string;
  features: string;
  targetAudience: string;
  regions: string[]; // 改为数组支持多地区
  style: string;
  tone: string;
}

// 地区配置接口
export interface RegionConfig {
  code: string;
  name: string;
  language: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

// 文案风格接口
export interface StyleOption {
  value: string;
  label: string;
  description: string;
}

// 语气风格接口
export interface ToneOption {
  value: string;
  label: string;
  description: string;
}

// 生成的文案接口
export interface GeneratedCopy {
  id: string;
  content: string;
  style: string;
  tone: string;
  region: string;
  timestamp: Date;
}

// OpenAI API 响应接口
export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// 敏感词检测结果接口
export interface SensitiveWordResult {
  hasSensitiveWords: boolean;
  detectedWords: string[];
  suggestions: string[];
}

// 效果预测结果接口
export interface EffectPrediction {
  ctr: string;        // 预估点击率，如 "3.2%"
  rating: string;     // 效果评分，如 "★★★☆☆"
  suggestion: string; // 优化建议
}

// 效果预测API响应接口
export interface EffectPredictionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// 语言生成重试状态接口
export interface LanguageRetryAttempt {
  attempt: number;
  language: string;
  success: boolean;
  errorMessage?: string;
}

// 语言生成结果接口
export interface LanguageGenerationResult {
  copies: string[];
  finalLanguage: string;
  retryHistory: LanguageRetryAttempt[];
  fallbackToEnglish: boolean;
}

// 缓存条目接口
export interface CacheEntry {
  key: string;
  data: Array<{text: string, region: string, regionName: string}>;
  timestamp: number;
  expiry: number; // 过期时间戳
}

// 缓存配置接口
export interface CacheConfig {
  maxEntries: number;
  ttl: number; // 生存时间(毫秒)
} 