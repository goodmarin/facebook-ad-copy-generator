// Facebook广告政策检测工具

export interface PolicyViolation {
  word: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
  description: string;
}

export interface PolicyCheckResult {
  violations: PolicyViolation[];
  riskLevel: 'high' | 'medium' | 'low' | 'safe';
  suggestions: string[];
  summary: string;
}

// 违反Facebook广告政策的词汇库
const POLICY_VIOLATIONS: { [key: string]: PolicyViolation } = {
  // 金融投资类
  '股票': {
    word: '股票',
    category: 'financial',
    severity: 'high',
    suggestion: 'investment products',
    description: '股票投资可能涉及金融风险，需要特殊许可'
  },
  '一夜暴富': {
    word: '一夜暴富',
    category: 'financial',
    severity: 'high',
    suggestion: 'wealth building',
    description: '承诺快速致富可能误导消费者'
  },
  '高回报': {
    word: '高回报',
    category: 'financial',
    severity: 'high',
    suggestion: 'good returns',
    description: '承诺高回报可能违反金融广告规定'
  },
  '低投资': {
    word: '低投资',
    category: 'financial',
    severity: 'medium',
    suggestion: 'affordable investment',
    description: '需要明确说明投资风险'
  },
  '投资': {
    word: '投资',
    category: 'financial',
    severity: 'medium',
    suggestion: 'financial products',
    description: '投资类产品需要特殊许可'
  },
  '理财': {
    word: '理财',
    category: 'financial',
    severity: 'medium',
    suggestion: 'financial planning',
    description: '理财服务需要相关资质'
  },
  '基金': {
    word: '基金',
    category: 'financial',
    severity: 'high',
    suggestion: 'investment funds',
    description: '基金产品需要特殊许可'
  },
  '期货': {
    word: '期货',
    category: 'financial',
    severity: 'high',
    suggestion: 'futures trading',
    description: '期货交易需要特殊许可'
  },
  '外汇': {
    word: '外汇',
    category: 'financial',
    severity: 'high',
    suggestion: 'foreign exchange',
    description: '外汇交易需要特殊许可'
  },
  '比特币': {
    word: '比特币',
    category: 'crypto',
    severity: 'high',
    suggestion: 'digital currency',
    description: '加密货币交易需要特殊许可'
  },
  '区块链': {
    word: '区块链',
    category: 'crypto',
    severity: 'medium',
    suggestion: 'blockchain technology',
    description: '区块链相关产品需要谨慎'
  },

  // 健康医疗类
  '减肥': {
    word: '减肥',
    category: 'health',
    severity: 'medium',
    suggestion: 'weight management',
    description: '减肥产品需要相关认证'
  },
  '丰胸': {
    word: '丰胸',
    category: 'health',
    severity: 'high',
    suggestion: 'body enhancement',
    description: '丰胸产品可能违反医疗广告规定'
  },
  '壮阳': {
    word: '壮阳',
    category: 'health',
    severity: 'high',
    suggestion: 'men\'s health',
    description: '壮阳产品可能违反医疗广告规定'
  },
  '治疗': {
    word: '治疗',
    category: 'health',
    severity: 'high',
    suggestion: 'health improvement',
    description: '医疗治疗需要相关资质'
  },
  '治愈': {
    word: '治愈',
    category: 'health',
    severity: 'high',
    suggestion: 'health support',
    description: '承诺治愈可能违反医疗广告规定'
  },
  '特效药': {
    word: '特效药',
    category: 'health',
    severity: 'high',
    suggestion: 'health supplements',
    description: '特效药需要相关认证'
  },

  // 博彩类
  '博彩': {
    word: '博彩',
    category: 'gambling',
    severity: 'high',
    suggestion: 'entertainment',
    description: '博彩内容需要特殊许可'
  },
  '赌博': {
    word: '赌博',
    category: 'gambling',
    severity: 'high',
    suggestion: 'gaming',
    description: '赌博内容需要特殊许可'
  },
  '彩票': {
    word: '彩票',
    category: 'gambling',
    severity: 'high',
    suggestion: 'lottery games',
    description: '彩票需要特殊许可'
  },

  // 成人内容类
  '成人': {
    word: '成人',
    category: 'adult',
    severity: 'high',
    suggestion: 'mature content',
    description: '成人内容需要特殊许可'
  },
  '色情': {
    word: '色情',
    category: 'adult',
    severity: 'high',
    suggestion: 'adult entertainment',
    description: '色情内容需要特殊许可'
  },
  '性': {
    word: '性',
    category: 'adult',
    severity: 'medium',
    suggestion: 'intimate',
    description: '性相关内容需要谨慎'
  },

  // 政治类
  '政治': {
    word: '政治',
    category: 'political',
    severity: 'high',
    suggestion: 'social issues',
    description: '政治内容需要特殊许可'
  },
  '选举': {
    word: '选举',
    category: 'political',
    severity: 'high',
    suggestion: 'voting',
    description: '选举相关内容需要特殊许可'
  },

  // 误导性词汇
  '免费': {
    word: '免费',
    category: 'misleading',
    severity: 'medium',
    suggestion: 'complimentary',
    description: '免费承诺需要明确说明条件'
  },
  '限时': {
    word: '限时',
    category: 'misleading',
    severity: 'low',
    suggestion: 'special offer',
    description: '限时优惠需要明确时间'
  },
  '最后机会': {
    word: '最后机会',
    category: 'misleading',
    severity: 'medium',
    suggestion: 'special opportunity',
    description: '最后机会可能误导消费者'
  },
  '独家': {
    word: '独家',
    category: 'misleading',
    severity: 'low',
    suggestion: 'exclusive',
    description: '独家需要证明真实性'
  },
  '保证': {
    word: '保证',
    category: 'misleading',
    severity: 'medium',
    suggestion: 'commitment',
    description: '保证承诺需要明确说明'
  },
  '100%': {
    word: '100%',
    category: 'misleading',
    severity: 'medium',
    suggestion: 'high quality',
    description: '100%承诺需要证明'
  },
  '绝对': {
    word: '绝对',
    category: 'misleading',
    severity: 'medium',
    suggestion: 'definitely',
    description: '绝对承诺需要证明'
  }
};

// 检测文本中的政策违规词汇
export const checkPolicyViolations = (text: string): PolicyCheckResult => {
  const violations: PolicyViolation[] = [];
  const foundWords = new Set<string>();

  // 检查每个违规词汇
  Object.values(POLICY_VIOLATIONS).forEach(violation => {
    if (text.includes(violation.word) && !foundWords.has(violation.word)) {
      violations.push(violation);
      foundWords.add(violation.word);
    }
  });

  // 计算风险等级
  const highCount = violations.filter(v => v.severity === 'high').length;
  const mediumCount = violations.filter(v => v.severity === 'medium').length;
  const lowCount = violations.filter(v => v.severity === 'low').length;

  let riskLevel: 'high' | 'medium' | 'low' | 'safe';
  if (highCount > 0) {
    riskLevel = 'high';
  } else if (mediumCount > 2 || lowCount > 5) {
    riskLevel = 'medium';
  } else if (mediumCount > 0 || lowCount > 0) {
    riskLevel = 'low';
  } else {
    riskLevel = 'safe';
  }

  // 生成建议
  const suggestions = violations.map(v => `将"${v.word}"替换为"${v.suggestion}"`);

  // 生成摘要
  let summary = '';
  if (riskLevel === 'high') {
    summary = `⚠️ 高风险：检测到${highCount}个高风险词汇，建议修改后再投放`;
  } else if (riskLevel === 'medium') {
    summary = `⚠️ 中风险：检测到${mediumCount}个中风险词汇，建议优化文案`;
  } else if (riskLevel === 'low') {
    summary = `⚠️ 低风险：检测到${lowCount}个低风险词汇，建议注意`;
  } else {
    summary = '✅ 安全：未检测到违反政策的词汇';
  }

  return {
    violations,
    riskLevel,
    suggestions,
    summary
  };
};

// 获取所有违规词汇（用于翻译）
export const getAllViolationWords = (): string[] => {
  return Object.keys(POLICY_VIOLATIONS);
};

// 检查产品信息
export const checkProductInfo = (productInfo: any): PolicyCheckResult => {
  const allText = [
    productInfo.name || '',
    productInfo.features || '',
    productInfo.targetAudience || ''
  ].join(' ');

  return checkPolicyViolations(allText);
};
