import { RegionConfig } from '../types';

export interface UIRegionOption {
  value: string;
  label: string;
  desc: string;
}

export interface UIRegionGroup {
  name: string;
  regions: UIRegionOption[];
}

function getLanguageDisplay(languageCode?: string): string {
  if (!languageCode) return '本地化市场';
  const lang = languageCode.split('-')[0].toLowerCase();
  const map: Record<string, string> = {
    en: '英语',
    zh: '中文',
    ja: '日语',
    ko: '韩语',
    ms: '马来语',
    th: '泰语',
    vi: '越南语',
    id: '印尼语',
    tl: '塔加洛语',
    de: '德语',
    fr: '法语',
    it: '意大利语',
    es: '西班牙语',
    nl: '荷兰语',
    sv: '瑞典语',
    no: '挪威语',
    da: '丹麦语',
    fi: '芬兰语',
    pl: '波兰语',
    cs: '捷克语',
    hu: '匈牙利语',
    ro: '罗马尼亚语',
    bg: '保加利亚语',
    hr: '克罗地亚语',
    sl: '斯洛文尼亚语',
    sk: '斯洛伐克语',
    lt: '立陶宛语',
    lv: '拉脱维亚语',
    et: '爱沙尼亚语',
    pt: '葡萄牙语',
    ar: '阿拉伯语',
    tr: '土耳其语',
    he: '希伯来语',
    fa: '波斯语',
    ur: '乌尔都语',
    bn: '孟加拉语',
    si: '僧伽罗语',
    ne: '尼泊尔语',
    kk: '哈萨克语',
    mn: '蒙古语'
  };
  return `${map[lang] || '本地化'}市场`;
}

export function getAutoRegionGroups(regions: RegionConfig[]): UIRegionGroup[] {
  const byCode: Record<string, RegionConfig> = {};
  regions.forEach(r => { byCode[r.code] = r; });

  const toOption = (code: string): UIRegionOption | null => {
    const r = byCode[code];
    if (!r) return null;
    return {
      value: r.code,
      label: `${r.name}`.trim(),
      desc: getLanguageDisplay(r.language)
    };
  };

  const group: Record<string, string[]> = {
    '热门地区': ['US', 'JP', 'KR', 'SG', 'MY', 'TH', 'VN', 'GB', 'DE', 'FR', 'AU'],
    '东亚': ['JP', 'KR', 'TW', 'HK', 'MN'],
    '东南亚': ['SG', 'MY', 'TH', 'VN', 'ID', 'PH', 'MM', 'KH', 'LA', 'BN'],
    '南亚': ['IN', 'PK', 'BD', 'LK', 'NP', 'MV', 'BT'],
    '中东': ['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IL', 'TR', 'IR'],
    '北欧': ['SE', 'NO', 'DK', 'FI', 'EE', 'LV', 'LT', 'IS'],
    '西欧': ['GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'IE', 'PT', 'GR'],
    '东欧': ['PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK'],
    '北美': ['US', 'CA'],
    '拉丁美洲': [
      'MX', 'BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY',
      'CR', 'PA', 'GT', 'SV', 'HN', 'NI', 'DO', 'CU', 'JM', 'TT', 'BB', 'GY', 'SR', 'GF'
    ],
    '非洲': ['ZA', 'EG'],
    '大洋洲': ['AU', 'NZ']
  };

  const order = [
    '热门地区',
    '东亚', '东南亚', '南亚', '中东',
    '西欧', '北欧', '东欧',
    '北美', '拉丁美洲', '非洲', '大洋洲'
  ];

  const used = new Set<string>();

  const result: UIRegionGroup[] = order.map(name => {
    const codes = (group[name] || []).filter(c => byCode[c]);
    codes.forEach(c => used.add(c));
    const options = codes
      .map(toOption)
      .filter(Boolean) as UIRegionOption[];
    return { name, regions: options };
  });

  const remaining = regions
    .map(r => r.code)
    .filter(c => !used.has(c));
  if (remaining.length) {
    const options = remaining
      .map(toOption)
      .filter(Boolean) as UIRegionOption[];
    if (options.length) {
      result.push({ name: '其他地区', regions: options });
    }
  }

  return result.filter(g => g.regions.length > 0);
}


