// 🚀 增强版Emoji规则系统 v7.0
// 📊 密度提升：每个文案强制使用4-6个emoji（提升400-600%）
// 🎨 多样性保证：3条文案使用完全不同的emoji组合

export interface EmojiConfig {
  density: number; // 每个文案最小emoji数量
  maxDensity: number; // 每个文案最大emoji数量
  diversityLevel: 'high' | 'medium' | 'low';
  regionSpecific: boolean;
}

export interface RegionEmojiSet {
  primary: string[]; // 主要emoji
  secondary: string[]; // 次要emoji
  cultural: string[]; // 文化特色emoji
  business: string[]; // 商业相关emoji
}

// 🌍 地区文化特色emoji映射表
export const REGION_EMOJI_SETS: Record<string, RegionEmojiSet> = {
  // 🇺🇸 美国 - 通用商业化风格
  'US': {
    primary: ['🚀', '💎', '⭐', '🎯', '💪', '🔥'],
    secondary: ['✨', '🎉', '💡', '🎊', '⚡', '🌟'],
    cultural: ['🇺🇸', '🦅', '🗽', '🏛️', '🎭', '🏈'],
    business: ['💰', '📈', '🏆', '💼', '🎁', '🛍️']
  },

  // 🇯🇵 日本 - 可爱精致风格
  'JP': {
    primary: ['🌸', '✨', '💖', '🎀', '🌺', '💫'],
    secondary: ['🎌', '🍡', '🍱', '⛩️', '🗾', '🎋'],
    cultural: ['🇯🇵', '🏯', '🍜', '🥢', '👘', '🎎'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇰🇷 韩国 - 时尚潮流风格
  'KR': {
    primary: ['💜', '✨', '🌟', '💫', '🔮', '🎵'],
    secondary: ['🎨', '🎪', '🎭', '🎸', '🎤', '💄'],
    cultural: ['🇰🇷', '🥢', '🍜', '🏔️', '🌊', '🍃'],
    business: ['💎', '👑', '💍', '🛍️', '💳', '🎁']
  },

  // 🇸🇬 新加坡 - 多元现代风格
  'SG': {
    primary: ['🌟', '🚀', '💎', '⭐', '🔥', '✨'],
    secondary: ['🏙️', '🌺', '🌸', '🎋', '🎪', '🎨'],
    cultural: ['🇸🇬', '🦁', '🏢', '🌴', '🌊', '🍜'],
    business: ['💰', '📈', '🏆', '💼', '🎁', '🛍️']
  },

  // 🇲🇾 马来西亚 - 热带友好风格
  'MY': {
    primary: ['🌺', '🌴', '☀️', '🌊', '🎉', '✨'],
    secondary: ['🦋', '🌸', '🌼', '🎪', '🎨', '🎭'],
    cultural: ['🇲🇾', '🏛️', '🕌', '🌴', '🐅', '🍜'],
    business: ['🎁', '🛍️', '💳', '📦', '🏪', '💝']
  },

  // 🇹🇭 泰国 - 热情活力风格
  'TH': {
    primary: ['🌺', '🙏', '✨', '🎉', '🌟', '💫'],
    secondary: ['🐘', '🌸', '🎪', '🎭', '🎨', '🦋'],
    cultural: ['🇹🇭', '🏛️', '🕌', '🌴', '🥭', '🍜'],
    business: ['🎁', '🛍️', '💝', '📦', '🏪', '💳']
  },

  // 🇻🇳 越南 - 自然和谐风格
  'VN': {
    primary: ['🌸', '🌺', '☀️', '✨', '🎉', '🌟'],
    secondary: ['🦋', '🌼', '🌴', '🎪', '🎨', '🐲'],
    cultural: ['🇻🇳', '🏛️', '🌾', '🍜', '🥢', '⛩️'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇮🇩 印尼 - 多彩活跃风格
  'ID': {
    primary: ['🌺', '🌴', '🎉', '✨', '🌟', '☀️'],
    secondary: ['🦋', '🌸', '🎪', '🎭', '🎨', '🌊'],
    cultural: ['🇮🇩', '🏛️', '🕌', '🌴', '🐅', '🍜'],
    business: ['🎁', '🛍️', '💳', '📦', '🏪', '💝']
  },

  // 🇵🇭 菲律宾 - 阳光快乐风格
  'PH': {
    primary: ['☀️', '🌊', '🌺', '🎉', '✨', '🌟'],
    secondary: ['🏝️', '🌴', '🦋', '🌸', '🎪', '🎨'],
    cultural: ['🇵🇭', '🏖️', '🌴', '🥭', '🍜', '⛪'],
    business: ['🎁', '🛍️', '💳', '📦', '🏪', '💝']
  },

  // 🇲🇲 缅甸 - 传统宁静风格
  'MM': {
    primary: ['🌸', '🙏', '✨', '🌺', '💫', '🌟'],
    secondary: ['🏛️', '⛩️', '🌼', '🦋', '🎨', '🌴'],
    cultural: ['🇲🇲', '🏛️', '🕌', '⛩️', '🌾', '🍜'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇰🇭 柬埔寨 - 古典神秘风格
  'KH': {
    primary: ['🏛️', '✨', '🌸', '🙏', '💫', '🌟'],
    secondary: ['⛩️', '🌺', '🦋', '🌼', '🎨', '🌴'],
    cultural: ['🇰🇭', '🏛️', '⛩️', '🌾', '🍜', '🥢'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇱🇦 老挝 - 自然平和风格
  'LA': {
    primary: ['🌸', '🙏', '✨', '🌺', '💫', '🌟'],
    secondary: ['🏛️', '⛩️', '🌼', '🦋', '🌴', '🌾'],
    cultural: ['🇱🇦', '🏛️', '⛩️', '🌾', '🍜', '🥢'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇧🇳 文莱 - 奢华精品风格
  'BN': {
    primary: ['💎', '👑', '✨', '🌟', '💫', '🔮'],
    secondary: ['🏛️', '🕌', '🌺', '🌸', '🎨', '🦋'],
    cultural: ['🇧🇳', '🕌', '🏛️', '🌴', '⛩️', '🍜'],
    business: ['💰', '💎', '👑', '🛍️', '💳', '🎁']
  },

  // 🇨🇳 中国 - 传统现代融合
  'CN': {
    primary: ['🔥', '💎', '🌟', '✨', '🎉', '🚀'],
    secondary: ['🏮', '🎋', '🌸', '🎪', '🎨', '💫'],
    cultural: ['🇨🇳', '🏯', '🏮', '🐲', '🎋', '🥢'],
    business: ['💰', '📈', '🏆', '💼', '🎁', '🛍️']
  },

  // 🇭🇰 香港 - 国际都市风格
  'HK': {
    primary: ['🌟', '💎', '🚀', '✨', '🔥', '⭐'],
    secondary: ['🏙️', '🌊', '🎪', '🎨', '💫', '🎉'],
    cultural: ['🇭🇰', '🏢', '🌊', '🎋', '🍜', '🥢'],
    business: ['💰', '📈', '🏆', '💼', '🎁', '🛍️']
  },

  // 🇹🇼 台湾 - 温馨创新风格
  'TW': {
    primary: ['✨', '🌟', '💖', '🎉', '🌸', '💫'],
    secondary: ['🎋', '🌺', '🎪', '🎨', '🦋', '🌼'],
    cultural: ['🇹🇼', '🏔️', '🌊', '🎋', '🍜', '🥢'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇦🇺 澳大利亚 - 自由活力风格
  'AU': {
    primary: ['🌟', '🚀', '☀️', '🌊', '✨', '🔥'],
    secondary: ['🦘', '🐨', '🏖️', '🏄', '🎪', '🎨'],
    cultural: ['🇦🇺', '🦘', '🐨', '🏖️', '🌊', '☀️'],
    business: ['💰', '📈', '🏆', '💼', '🎁', '🛍️']
  },

  // 🇳🇿 新西兰 - 纯净自然风格
  'NZ': {
    primary: ['🌟', '🌿', '🌊', '✨', '☀️', '💫'],
    secondary: ['🏔️', '🐑', '🦋', '🌸', '🌺', '🎨'],
    cultural: ['🇳🇿', '🏔️', '🐑', '🌊', '🌿', '🥝'],
    business: ['🎁', '💝', '🛍️', '📦', '🏪', '💳']
  },

  // 🇲🇴 澳门 - 东西交融风格
  'MO': {
    primary: ['💎', '🌟', '✨', '🎉', '🔥', '⭐'],
    secondary: ['🏛️', '🎪', '🎨', '💫', '🌸', '🎋'],
    cultural: ['🇲🇴', '🏛️', '⛪', '🍜', '🥢', '🎭'],
    business: ['💰', '💎', '🏆', '🛍️', '💳', '🎁']
  },

  // 默认通用风格
  'default': {
    primary: ['🚀', '✨', '🌟', '💎', '🔥', '⭐'],
    secondary: ['🎉', '💡', '🎯', '💪', '🎊', '⚡'],
    cultural: ['🌍', '🎭', '🎨', '🎪', '🎵', '🎸'],
    business: ['💰', '📈', '🏆', '💼', '🎁', '🛍️']
  }
};

// 🎯 Emoji类别分类器
export const EMOJI_CATEGORIES = {
  emotions: ['😊', '😍', '🥰', '😎', '🤩', '😇', '🙂', '😋', '😌', '💝'],
  celebration: ['🎉', '🎊', '🥳', '🎈', '🎆', '🎇', '✨', '🌟', '⭐', '💫'],
  business: ['💰', '💎', '📈', '🏆', '💼', '🎯', '🚀', '⚡', '🔥', '💪'],
  nature: ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🍀', '🌿', '🌳', '🌲'],
  technology: ['🚀', '⚡', '💡', '🔥', '✨', '🌟', '💫', '⭐', '🎯', '💎'],
  lifestyle: ['🎁', '🛍️', '💳', '📦', '🏪', '💝', '🎀', '👑', '💍', '🔮'],
  sports: ['🏆', '🥇', '🎖️', '🏅', '⚽', '🏀', '🎾', '🏐', '🏈', '⚾'],
  food: ['🍜', '🍱', '🥢', '🍡', '🥭', '🍎', '🍓', '🍰', '🎂', '🍫'],
  travel: ['✈️', '🏖️', '🏝️', '🌊', '🏔️', '🗾', '🏛️', '⛩️', '🕌', '⛪'],
  music: ['🎵', '🎶', '🎤', '🎸', '🎹', '🎺', '🎻', '🥁', '🎧', '🎼']
};

// 🎨 智能Emoji选择器配置
export const SMART_EMOJI_CONFIG: EmojiConfig = {
  density: 4,        // 最少4个emoji
  maxDensity: 6,     // 最多6个emoji
  diversityLevel: 'high',
  regionSpecific: true
};

// 🔍 Emoji多样性验证器
export class EmojiDiversityValidator {
  private usedEmojis: Set<string> = new Set();

  // 检查emoji是否已使用
  isUsed(emoji: string): boolean {
    return this.usedEmojis.has(emoji);
  }

  // 标记emoji为已使用
  markAsUsed(emoji: string): void {
    this.usedEmojis.add(emoji);
  }

  // 重置使用记录
  reset(): void {
    this.usedEmojis.clear();
  }

  // 获取未使用的emoji
  getUnusedEmojis(emojiList: string[]): string[] {
    return emojiList.filter(emoji => !this.isUsed(emoji));
  }

  // 计算多样性分数
  getDiversityScore(): number {
    return this.usedEmojis.size;
  }
}

// 🎯 智能Emoji选择器
export class SmartEmojiSelector {
  private validator = new EmojiDiversityValidator();
  private config: EmojiConfig;

  constructor(config: EmojiConfig = SMART_EMOJI_CONFIG) {
    this.config = config;
  }

  // 为指定地区选择emoji集合
  selectEmojiSet(region: string, copyIndex: number): string[] {
    const regionSet = REGION_EMOJI_SETS[region] || REGION_EMOJI_SETS['default'];
    const selectedEmojis: string[] = [];

    // 根据文案索引选择不同的emoji类别组合
    const categories = this.getCategoryRotation(copyIndex);
    
    categories.forEach(category => {
      const categoryEmojis = this.getCategoryEmojis(category, regionSet);
      const unusedEmojis = this.validator.getUnusedEmojis(categoryEmojis);
      
      if (unusedEmojis.length > 0) {
        const selectedEmoji = this.randomSelect(unusedEmojis);
        selectedEmojis.push(selectedEmoji);
        this.validator.markAsUsed(selectedEmoji);
      }
    });

    // 如果emoji数量不足，从未使用的emoji中补充
    while (selectedEmojis.length < this.config.density) {
      const allEmojis = [...regionSet.primary, ...regionSet.secondary, ...regionSet.business];
      const unusedEmojis = this.validator.getUnusedEmojis(allEmojis);
      
      if (unusedEmojis.length === 0) {
        this.validator.reset(); // 如果所有emoji都用完了，重置使用记录
        break;
      }
      
      const selectedEmoji = this.randomSelect(unusedEmojis);
      selectedEmojis.push(selectedEmoji);
      this.validator.markAsUsed(selectedEmoji);
    }

    return selectedEmojis.slice(0, this.config.maxDensity);
  }

  // 获取类别轮换策略
  private getCategoryRotation(copyIndex: number): string[] {
    const rotations = [
      ['primary', 'business', 'secondary', 'cultural'], // 第1条文案
      ['cultural', 'primary', 'business', 'secondary'], // 第2条文案
      ['business', 'secondary', 'primary', 'cultural']  // 第3条文案
    ];
    
    return rotations[copyIndex] || rotations[0];
  }

  // 获取指定类别的emoji
  private getCategoryEmojis(category: string, regionSet: RegionEmojiSet): string[] {
    switch (category) {
      case 'primary': return regionSet.primary;
      case 'secondary': return regionSet.secondary;
      case 'cultural': return regionSet.cultural;
      case 'business': return regionSet.business;
      default: return regionSet.primary;
    }
  }

  // 随机选择
  private randomSelect<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // 重置选择器状态
  reset(): void {
    this.validator.reset();
  }

  // 获取使用统计
  getUsageStats(): { usedCount: number; diversityScore: number } {
    return {
      usedCount: this.validator.getDiversityScore(),
      diversityScore: this.validator.getDiversityScore()
    };
  }
}

// 🔧 Emoji增强处理器
export class EmojiEnhancer {
  private selector: SmartEmojiSelector;

  constructor(config: EmojiConfig = SMART_EMOJI_CONFIG) {
    this.selector = new SmartEmojiSelector(config);
  }

  // 智能增强文案的emoji
  enhanceCopy(copy: string, region: string, copyIndex: number): string {
    // 计算当前文案中的emoji数量
    const currentEmojiCount = this.countEmojis(copy);
    const targetEmojiCount = SMART_EMOJI_CONFIG.density;

    // 如果emoji数量已经足够，直接返回
    if (currentEmojiCount >= targetEmojiCount) {
      return copy;
    }

    // 选择需要添加的emoji
    const neededEmojis = targetEmojiCount - currentEmojiCount;
    const selectedEmojis = this.selector.selectEmojiSet(region, copyIndex).slice(0, neededEmojis);

    // 智能插入emoji到文案中
    return this.insertEmojisIntelligently(copy, selectedEmojis);
  }

  // 计算文案中的emoji数量
  private countEmojis(text: string): number {
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]/gu;
    const matches = text.match(emojiRegex);
    return matches ? matches.length : 0;
  }

  // 智能插入emoji到文案中
  private insertEmojisIntelligently(copy: string, emojis: string[]): string {
    if (emojis.length === 0) return copy;

    let enhancedCopy = copy;

    // 策略1: 在文案开头添加1-2个emoji
    if (emojis.length > 0) {
      enhancedCopy = `${emojis[0]} ${enhancedCopy}`;
      emojis.shift();
    }

    // 策略2: 在文案结尾添加1-2个emoji
    if (emojis.length > 0) {
      enhancedCopy = `${enhancedCopy} ${emojis[emojis.length - 1]}`;
      emojis.pop();
    }

    // 策略3: 在句子间隔插入剩余emoji
    if (emojis.length > 0) {
      const sentences = enhancedCopy.split(/[。！？.!?]/);
      let emojiIndex = 0;

      for (let i = 0; i < sentences.length - 1 && emojiIndex < emojis.length; i++) {
        if (sentences[i].trim()) {
          sentences[i] += ` ${emojis[emojiIndex]}`;
          emojiIndex++;
        }
      }

      enhancedCopy = sentences.join('');
    }

    return enhancedCopy.trim();
  }

  // 重置增强器状态
  reset(): void {
    this.selector.reset();
  }

  // 获取增强统计
  getEnhancementStats(): { usedCount: number; diversityScore: number } {
    return this.selector.getUsageStats();
  }
}

// 🎯 AI提示词emoji规则生成器
export function generateEmojiPromptRules(region: string): string {
  const regionSet = REGION_EMOJI_SETS[region] || REGION_EMOJI_SETS['default'];
  const allEmojis = [...regionSet.primary, ...regionSet.secondary, ...regionSet.cultural, ...regionSet.business];
  
  return `
🎯 Emoji使用规则（强制执行）：
- 每条文案必须包含4-6个emoji，不得少于4个
- 必须从以下emoji库中选择：${allEmojis.join(' ')}
- 三条文案必须使用完全不同的emoji组合
- 优先使用地区特色emoji：${regionSet.cultural.join(' ')}
- 商业场景优先使用：${regionSet.business.join(' ')}
- 禁止使用任何未列出的emoji
- emoji应自然融入文案，不显突兀
`;
}

// 🔍 Emoji验证器
export function validateEmojiCompliance(copies: string[], _region: string): {
  isCompliant: boolean;
  violations: string[];
  suggestions: string[];
} {
  const violations: string[] = [];
  const suggestions: string[] = [];

  copies.forEach((copy, index) => {
    const emojiCount = (copy.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]/gu) || []).length;
    
    if (emojiCount < SMART_EMOJI_CONFIG.density) {
      violations.push(`文案${index + 1}的emoji数量不足：${emojiCount}个，需要至少${SMART_EMOJI_CONFIG.density}个`);
      suggestions.push(`为文案${index + 1}添加${SMART_EMOJI_CONFIG.density - emojiCount}个emoji`);
    }
  });

  return {
    isCompliant: violations.length === 0,
    violations,
    suggestions
  };
}

// 导出默认配置
export default {
  REGION_EMOJI_SETS,
  EMOJI_CATEGORIES,
  SMART_EMOJI_CONFIG,
  EmojiDiversityValidator,
  SmartEmojiSelector,
  EmojiEnhancer,
  generateEmojiPromptRules,
  validateEmojiCompliance
};
