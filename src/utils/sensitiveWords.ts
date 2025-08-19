import { SensitiveWordResult } from '../types';

// 敏感词汇库（基于 Facebook 广告发布准则）
const SENSITIVE_WORDS = {
  // 黑五类及高风险品类
  forbidden: [
    '壮阳', '壮阳药', '性功能', '延时药', '伟哥', '万艾可', '勃起', '阳痿', '早泄',
    '减肥', '瘦身', '燃脂', '减脂', '瘦腿', '瘦腰', '瘦脸', '瘦手臂', '瘦肚子',
    '丰胸', '隆胸', '美胸', '增大', '增粗', '丰臀',
    '祛斑', '去斑', '祛皱', '去皱', '美白针', '美白丸', '美白', '祛痘', '去痘',
    '电子烟', 'vape', 'e-cigarette', '烟油', '烟弹',
    '成人用品', '情趣用品', '性用品', '避孕套', '润滑液',
    '低投资高回报', '稳赚不赔', '稳赚', '高收益', '高回报', '零风险', '快速致富',
    '股票', '炒股', '证券', '期货', '外汇', '现货', '配资', '网赚', '兼职', '副业', '日赚', '月入', '年入',
    '博彩', '彩票', '赌博', '赌场', '下注', '赢钱', '赢钱秘籍',
  ],
  
  // 医疗健康相关敏感词（违反医疗广告政策）
  health: [
    '治愈', '治疗', '康复', '疗效', '神奇', '奇迹', '包治百病', '根治', '特效药',
    'cure', 'heal', 'miracle', 'magic', 'treatment', 'recovery', 'panacea', 'wonder drug'
  ],
  
  // 金融投资相关敏感词（违反金融广告政策）
  finance: [
    '保证', '担保', '稳赚', '零风险', '高回报', '快速致富', '投资回报', '理财收益',
    'guarantee', 'risk-free', 'get rich quick', 'high returns', 'investment returns'
  ],
  
  // 歧视性语言（违反反歧视政策）
  discrimination: [
    '歧视', '种族', '性别歧视', '年龄歧视', '外貌歧视', '地域歧视',
    'discrimination', 'racist', 'sexist', 'ageist', 'lookist'
  ],
  
  // 夸大宣传（违反真实性政策）
  exaggeration: [
    '最好', '最棒', '第一', '唯一', '绝对', '完美', '无与伦比', '史无前例',
    'best', 'perfect', 'number one', 'only', 'absolute', 'unparalleled', 'unprecedented'
  ],
  
  // 紧迫感销售（违反压力销售政策）
  urgency: [
    '限时', '最后机会', '马上', '立即', '错过就没有', '抢购', '秒杀',
    'limited time', 'last chance', 'act now', 'don\'t miss out', 'flash sale'
  ],
  
  // 个人属性相关（违反个人属性政策）
  personal_attributes: [
    '你看起来', '你的年龄', '你的体重', '你的外貌', '你的收入', '你的学历',
    'you look', 'your age', 'your weight', 'your appearance', 'your income', 'your education'
  ],
  
  // 政治相关内容（违反政治广告政策）
  political: [
    '政治', '选举', '投票', '政党', '候选人', '政府',
    'political', 'election', 'vote', 'party', 'candidate', 'government'
  ],
  
  // 成人内容（违反成人内容政策）
  adult: [
    '成人', '色情', '性', '裸露', '性感',
    'adult', 'porn', 'sex', 'nude', 'sexy'
  ],
  
  // 暴力内容（违反暴力内容政策）
  violence: [
    '暴力', '武器', '枪支', '爆炸', '恐怖',
    'violence', 'weapon', 'gun', 'explosion', 'terror'
  ],
  
  // 虚假信息（违反虚假信息政策）
  misinformation: [
    '虚假', '谣言', '阴谋论', '伪科学',
    'fake', 'rumor', 'conspiracy', 'pseudoscience'
  ]
};

// 替代词汇建议
const REPLACEMENT_SUGGESTIONS = {
  // 医疗健康替代词
  '治愈': '改善',
  '治疗': '帮助',
  '康复': '恢复',
  '疗效': '效果',
  '神奇': '出色',
  '奇迹': '惊喜',
  '包治百病': '多效合一',
  '根治': '改善',
  '特效药': '有效产品',
  'cure': 'improve',
  'heal': 'help',
  'miracle': 'amazing',
  'magic': 'excellent',
  'treatment': 'solution',
  'recovery': 'improvement',
  'panacea': 'effective solution',
  'wonder drug': 'effective product',
  
  // 金融投资替代词
  '保证': '承诺',
  '担保': '确保',
  '稳赚': '稳定收益',
  '零风险': '低风险',
  '高回报': '良好回报',
  '快速致富': '增加收入',
  '投资回报': '收益',
  '理财收益': '收益',
  'guarantee': 'promise',
  'risk-free': 'low-risk',
  'get rich quick': 'increase income',
  'high returns': 'good returns',
  'investment returns': 'returns',
  
  // 夸大宣传替代词
  '最好': '优秀',
  '最棒': '出色',
  '第一': '领先',
  '唯一': '独特',
  '绝对': '非常',
  '完美': '理想',
  '无与伦比': '卓越',
  '史无前例': '创新',
  'best': 'excellent',
  'perfect': 'ideal',
  'number one': 'leading',
  'only': 'unique',
  'absolute': 'very',
  'unparalleled': 'outstanding',
  'unprecedented': 'innovative',
  
  // 紧迫感替代词
  '限时': '特别',
  '最后机会': '难得机会',
  '马上': '尽快',
  '立即': '及时',
  '错过就没有': '不要错过',
  '抢购': '购买',
  '秒杀': '特价',
  'limited time': 'special',
  'last chance': 'rare opportunity',
  'act now': 'act soon',
  'don\'t miss out': 'don\'t miss',
  'flash sale': 'special offer',
  
  // 个人属性替代词
  '你看起来': '看起来',
  '你的年龄': '年龄',
  '你的体重': '体重',
  '你的外貌': '外貌',
  '你的收入': '收入',
  '你的学历': '学历',
  'you look': 'look',
  'your age': 'age',
  'your weight': 'weight',
  'your appearance': 'appearance',
  'your income': 'income',
  'your education': 'education'
};

/**
 * 检测文本中的敏感词汇
 * @param text 待检测的文本
 * @returns 敏感词检测结果
 */
export const detectSensitiveWords = (text: string): SensitiveWordResult => {
  const detectedWords: string[] = [];
  const suggestions: string[] = [];
  
  // 转换为小写进行检测
  const lowerText = text.toLowerCase();
  
  // 检测各类敏感词
  Object.values(SENSITIVE_WORDS).flat().forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      detectedWords.push(word);
      
      // 添加替代建议
      const replacement = REPLACEMENT_SUGGESTIONS[word as keyof typeof REPLACEMENT_SUGGESTIONS];
      if (replacement) {
        suggestions.push(`将"${word}"替换为"${replacement}"`);
      }
    }
  });
  
  return {
    hasSensitiveWords: detectedWords.length > 0,
    detectedWords,
    suggestions
  };
};

/**
 * 获取敏感词分类说明
 * @param category 敏感词分类
 * @returns 分类说明
 */
export const getSensitiveCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    health: '医疗健康相关词汇可能违反Facebook医疗广告政策',
    finance: '金融投资相关词汇可能违反Facebook金融广告政策',
    discrimination: '歧视性语言可能违反Facebook反歧视政策',
    exaggeration: '夸大宣传词汇可能违反Facebook真实性政策',
    urgency: '紧迫感词汇可能违反Facebook压力销售政策',
    personal_attributes: '个人属性相关词汇可能违反Facebook个人属性政策',
    political: '政治相关内容可能违反Facebook政治广告政策',
    adult: '成人内容可能违反Facebook成人内容政策',
    violence: '暴力内容可能违反Facebook暴力内容政策',
    misinformation: '虚假信息可能违反Facebook虚假信息政策'
  };
  
  return descriptions[category] || '可能违反Facebook广告政策';
};

/**
 * 检查特定类型的敏感词
 * @param text 待检测文本
 * @param category 敏感词类型
 * @returns 是否包含该类型敏感词
 */
export const checkSensitiveCategory = (text: string, category: keyof typeof SENSITIVE_WORDS): boolean => {
  const lowerText = text.toLowerCase();
  return SENSITIVE_WORDS[category].some(word => 
    lowerText.includes(word.toLowerCase())
  );
};

/**
 * 获取Facebook广告政策参考链接
 */
export const getFacebookPolicyLink = (): string => {
  return 'https://www.facebook.com/business/help/488043719226449?id=434838534925385';
}; 

/**
 * 根据违规类别返回对应的Facebook广告政策链接（尽量直达具体章节）
 * 目前已覆盖的直达链接：
 * - gambling: 博彩与赌博
 * 其他类别暂时回退到总览页
 */
export const getFacebookPolicyLinkByCategory = (category?: string): string => {
  const mapping: Record<string, string> = {
    // 博彩与赌博
    gambling: 'https://www.facebook.com/business/help/345214789920228?id=434838534925385',
    // 个人属性与隐私
    personal_attributes: 'https://www.facebook.com/business/help/2557868957763449?id=434838534925385',
    // 骇人听闻/耸动内容（映射到暴力/血腥等内容政策简介）
    violence: 'https://www.facebook.com/business/help/304110064285796?id=434838534925385',
    // 健康与养生
    health: 'https://www.facebook.com/business/help/2489235377779939?id=434838534925385',
    // 歧视行为
    discrimination: 'https://www.facebook.com/business/help/136164207100893',
    // 住房/就业/金融（HEC）
    housing_employment_credit: 'https://www.facebook.com/business/help/399587795372584',
    hec: 'https://www.facebook.com/business/help/399587795372584',
    financial: 'https://www.facebook.com/business/help/399587795372584',
    finance: 'https://www.facebook.com/business/help/399587795372584',
    // 不合理商业行为
    unfair_business: 'https://www.facebook.com/business/help/2895682587380674?id=434838534925385',
    // 药物与制药（总览）
    pharmaceuticals: 'https://www.facebook.com/business/help/432240224665596?id=434838534925385',
    drugs: 'https://www.facebook.com/business/help/432240224665596?id=434838534925385',
    // 交友
    dating: 'https://www.facebook.com/business/help/765622867361201',
    // 加密货币
    cryptocurrency: 'https://www.facebook.com/business/help/438252513416690?id=595195347635322',
    crypto: 'https://www.facebook.com/business/help/438252513416690?id=595195347635322',
    // 戒毒/酒精成瘾治疗
    addiction_treatment: 'https://www.facebook.com/business/help/383110896305204?id=434838534925385',
    rehab: 'https://www.facebook.com/business/help/383110896305204?id=434838534925385',
    // 处方药
    prescription_drugs: 'https://www.facebook.com/business/help/263390265553560?id=434838534925385',
    // 特定网域限制
    domain_restrictions: 'https://www.facebook.com/business/help/733029810936140?id=434838534925385'
  };
  if (!category) return getFacebookPolicyLink();
  return mapping[category] || getFacebookPolicyLink();
};

/**
 * 检查是否包含黑五类及高风险品类
 * @param text 待检测文本
 * @returns 是否包含黑五类
 */
export const checkForbiddenCategory = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return SENSITIVE_WORDS.forbidden.some(word => lowerText.includes(word.toLowerCase()));
}; 