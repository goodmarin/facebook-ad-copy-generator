// 产品信息接口
export interface ProductInfo {
  name: string;
  features: string;
  targetAudience: string;
  region: string;
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