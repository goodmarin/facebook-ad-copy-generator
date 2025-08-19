import React, { useState, useEffect, useRef, useMemo } from 'react';
import { OutputDisplay } from './OutputDisplay';
import { PolicyCheckResult } from '../utils/policyChecker';
import { REGIONS } from '../utils/languages';
import { getAutoRegionGroups } from '../utils/regionGrouping';

interface ProductInfo {
  name: string;
  features: string;
  targetAudience: string;
  regions: string[];
  style: string;
  promotion: string;
}

interface AppleGeneratorProps {
  productInfo: ProductInfo;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductInfo>>;
  copies: Array<{text: string, region: string, regionName: string}>;
  isLoading: boolean;
  onGenerate: () => void;
  showRegionError: boolean;
  setShowRegionError: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  isForbiddenProduct?: boolean;
  policyCheckResult?: PolicyCheckResult | null;
}

export const AppleGenerator: React.FC<AppleGeneratorProps> = ({ 
  productInfo, 
  setProductInfo, 
  copies, 
  isLoading, 
  onGenerate,
  showRegionError,
  setShowRegionError,
  error,
  isForbiddenProduct,
  policyCheckResult
}) => {
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [regionSearchTerm, setRegionSearchTerm] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showQuickTemplates, setShowQuickTemplates] = useState(false);
  
  // 左右列等高对齐（实时）
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!leftCardRef.current || !rightCardRef.current) return;
    
    const syncHeights = () => {
      if (!leftCardRef.current || !rightCardRef.current) return;
      // 先清除以获得内容自然高度
      leftCardRef.current.style.minHeight = '';
      rightCardRef.current.style.minHeight = '';
      const leftH = leftCardRef.current.getBoundingClientRect().height;
      const rightH = rightCardRef.current.getBoundingClientRect().height;
      const maxH = Math.max(leftH, rightH);
      leftCardRef.current.style.minHeight = `${maxH}px`;
      rightCardRef.current.style.minHeight = `${maxH}px`;
    };
    
    const ro = new ResizeObserver(syncHeights);
    ro.observe(leftCardRef.current);
    ro.observe(rightCardRef.current);
    
    // 同步一次
    syncHeights();
    
    // 监听窗口尺寸变化
    window.addEventListener('resize', syncHeights);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeights);
    };
  }, [copies, isLoading, productInfo.regions, showRegionDropdown, showQuickTemplates]);

  // 🚀 快速模版数据
  const quickTemplates = [
    {
      id: 'smart-watch',
      name: '🎯 智能手表',
      data: {
        name: '智能健康手表',
        features: '心率监测、睡眠追踪、运动模式、防水设计、长续航',
        targetAudience: '健身爱好者、年轻上班族、健康意识用户',
        style: 'energetic',
        promotion: 'flash'
      }
    },
    {
      id: 'wireless-earbuds',
      name: '🎵 无线耳机',
      data: {
        name: '高品质无线耳机',
        features: '主动降噪、HiFi音质、快速充电、智能触控、舒适佩戴',
        targetAudience: '音乐爱好者、通勤族、学生群体',
        style: 'modern',
        promotion: 'discount'
      }
    },
    {
      id: 'skincare',
      name: '🌸 护肤产品',
      data: {
        name: '天然护肤精华',
        features: '深层滋润、抗氧化、温和不刺激、天然成分、快速吸收',
        targetAudience: '注重护肤的女性、敏感肌人群、追求天然的用户',
        style: 'elegant',
        promotion: 'seasonal'
      }
    },
    {
      id: 'fitness-equipment',
      name: '💪 健身器材',
      data: {
        name: '家用智能健身器材',
        features: '多功能训练、智能指导、节省空间、静音设计、专业级品质',
        targetAudience: '健身爱好者、居家运动者、忙碌的上班族',
        style: 'confident',
        promotion: 'bundle'
      }
    },
    {
      id: 'smartphone',
      name: '📱 智能手机',
      data: {
        name: '5G智能手机',
        features: '高清摄像、快速充电、大容量存储、流畅性能、时尚设计',
        targetAudience: '年轻用户、摄影爱好者、科技达人',
        style: 'modern',
        promotion: 'new'
      }
    },
    {
      id: 'coffee',
      name: '☕ 咖啡产品',
      data: {
        name: '精品咖啡豆',
        features: '单一产区、新鲜烘焙、浓郁香味、精选品质、多种口味',
        targetAudience: '咖啡爱好者、品质生活追求者、办公室人群',
        style: 'lifestyle',
        promotion: 'loyalty'
      }
    }
  ];

  // 应用快速模版
  const applyQuickTemplate = (template: typeof quickTemplates[0]) => {
    setProductInfo(prev => ({
      ...prev,
      ...template.data,
      regions: prev.regions // 保留已选择的地区
    }));
    setShowQuickTemplates(false);
  };

  // 基础地区数据（热门分组等，保留原有展示顺序）
  const baseRegionGroups = [
    {
      name: '🔥 热门地区',
      regions: [
        { value: 'US', label: '美国', desc: '全球最大消费市场' },
        { value: 'JP', label: '日本', desc: '高消费亚洲市场' },
        { value: 'KR', label: '韩国', desc: '时尚潮流引领者' },
        { value: 'SG', label: '新加坡', desc: '东南亚门户' },
        { value: 'GB', label: '英国', desc: '欧洲重要市场' },
        { value: 'DE', label: '德国', desc: '欧洲经济强国' },
        { value: 'FR', label: '法国', desc: '时尚消费中心' },
        { value: 'AU', label: '澳大利亚', desc: '大洋洲主要市场' }
      ]
    },
    {
      name: '🌏 亚太地区',
      regions: [
        { value: 'IN', label: '印度', desc: '快速增长市场' },
        { value: 'MY', label: '马来西亚', desc: '多元文化市场' },
        { value: 'TH', label: '泰国', desc: '东南亚消费中心' },
        { value: 'VN', label: '越南', desc: '新兴消费市场' },
        { value: 'ID', label: '印度尼西亚', desc: '人口大国' },
        { value: 'PH', label: '菲律宾', desc: '群岛消费市场' },
        { value: 'TW', label: '台湾', desc: '繁体中文市场' },
        { value: 'HK', label: '香港', desc: '国际金融中心' }
      ]
    },
    {
      name: '🌍 欧洲地区',
      regions: [
        { value: 'IT', label: '意大利', desc: '时尚设计之都' },
        { value: 'ES', label: '西班牙', desc: '伊比利亚市场' },
        { value: 'NL', label: '荷兰', desc: '欧洲物流中心' },
        { value: 'SE', label: '瑞典', desc: '北欧创新市场' },
        { value: 'NO', label: '挪威', desc: '高消费北欧' },
        { value: 'DK', label: '丹麦', desc: '设计创意中心' }
      ]
    },
    {
      name: '🌎 美洲地区',
      regions: [
        { value: 'CA', label: '加拿大', desc: '北美重要市场' },
        { value: 'MX', label: '墨西哥', desc: '拉美门户市场' },
        { value: 'BR', label: '巴西', desc: '南美最大市场' },
        { value: 'AR', label: '阿根廷', desc: '南美消费中心' }
      ]
    }
  ];

  // 自动分组（融合基础展示组 + 按 REGIONS 更细分的区域）
  const regionGroups = useMemo(() => {
    const autoGroups = getAutoRegionGroups(REGIONS);
    // 将基础组放到顶部，随后拼接自动组中未出现的剩余组，避免重复
    const baseCodes = new Set(baseRegionGroups.flatMap(g => g.regions.map(r => r.value)));
    const merged = [...baseRegionGroups];
    autoGroups.forEach(g => {
      const filtered = g.regions.filter(r => !baseCodes.has(r.value));
      if (filtered.length) {
        merged.push({ name: g.name, regions: filtered });
      }
    });
    return merged;
  }, []);

  // 获取已选择地区的显示文本
  const getSelectedRegionsText = () => {
    if (productInfo.regions.length === 0) {
      return '请选择投放地区';
    }
    if (productInfo.regions.length === 1) {
      const region = regionGroups.flatMap(g => g.regions).find(r => r.value === productInfo.regions[0]);
      return region?.label || productInfo.regions[0];
    }
    return `已选择 ${productInfo.regions.length} 个地区`;
  };

  // 过滤地区数据
  const getFilteredRegionGroups = () => {
    if (!regionSearchTerm) return regionGroups;
    
    return regionGroups.map(group => ({
      ...group,
      regions: group.regions.filter(region => 
        region.label.toLowerCase().includes(regionSearchTerm.toLowerCase()) ||
        region.desc.toLowerCase().includes(regionSearchTerm.toLowerCase())
      )
    })).filter(group => group.regions.length > 0);
  };

  // 处理地区选择
  const handleRegionToggle = (regionValue: string) => {
    setProductInfo(prev => ({
      ...prev,
      regions: prev.regions.includes(regionValue)
        ? prev.regions.filter(r => r !== regionValue)
        : [...prev.regions, regionValue]
    }));
    setShowRegionError(false);
  };

  // 删除单个已选地区
  const handleRemoveRegion = (regionValue: string) => {
    setProductInfo(prev => ({
      ...prev,
      regions: prev.regions.filter(r => r !== regionValue)
    }));
  };

  // 根据地区编码获取名称
  const getRegionLabel = (value: string) => {
    const region = regionGroups.flatMap(g => g.regions).find(r => r.value === value);
    return region ? region.label : value;
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (productInfo.regions.length === 0) {
      setShowRegionError(true);
      return;
    }
    
    onGenerate();
  };

  // 处理点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('region-dropdown');
      const templateDropdown = document.getElementById('template-dropdown');
      const button = event.target as HTMLElement;
      
      // 关闭地区下拉菜单
      if (dropdown && !dropdown.contains(button) && !button.closest('[data-region-toggle]')) {
        setShowRegionDropdown(false);
        setRegionSearchTerm('');
      }
      
      // 关闭快速模版下拉菜单
      if (templateDropdown && !templateDropdown.contains(button) && !button.closest('[data-template-toggle]')) {
        setShowQuickTemplates(false);
      }
    };

    if (showRegionDropdown || showQuickTemplates) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showRegionDropdown, showQuickTemplates]);

  // 让下拉在到达顶部/底部时将滚动传递给页面，避免“僵硬”感
  useEffect(() => {
    const attachScrollChain = (container: HTMLElement | null) => {
      if (!container) return () => {};

      const shouldChain = (el: HTMLElement, deltaY: number) => {
        const scrollTop = el.scrollTop;
        const maxScrollTop = el.scrollHeight - el.clientHeight;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop >= maxScrollTop - 1;
        return (deltaY < 0 && atTop) || (deltaY > 0 && atBottom);
      };

      const onWheel = (e: WheelEvent) => {
        if (shouldChain(container, e.deltaY)) {
          e.preventDefault();
          window.scrollBy({ top: e.deltaY, behavior: 'auto' });
        }
      };

      let startY = 0;
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches && e.touches.length > 0) {
          startY = e.touches[0].clientY;
        }
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!e.touches || e.touches.length === 0) return;
        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY; // 与 wheel 的正负保持一致（向上滑为正）
        if (shouldChain(container, deltaY)) {
          e.preventDefault();
          window.scrollBy({ top: deltaY, behavior: 'auto' });
        }
      };

      container.addEventListener('wheel', onWheel, { passive: false });
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      container.addEventListener('touchmove', onTouchMove, { passive: false });

      return () => {
        container.removeEventListener('wheel', onWheel as EventListener);
        container.removeEventListener('touchstart', onTouchStart as EventListener);
        container.removeEventListener('touchmove', onTouchMove as EventListener);
      };
    };

    const cleanups: Array<() => void> = [];
    if (showQuickTemplates) {
      cleanups.push(attachScrollChain(document.getElementById('template-dropdown')));
    }
    if (showRegionDropdown) {
      // 将滚动链路绑定到内部可滚动的列表容器，避免外层容器拦截导致无法向上滚动
      cleanups.push(attachScrollChain(document.getElementById('region-dropdown-list')));
    }

    return () => {
      cleanups.forEach(fn => fn && fn());
    };
  }, [showQuickTemplates, showRegionDropdown]);

  return (
    <section id="generator" className="py-14 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            开始创作
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 爆款文案</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            只需几步简单操作，AI 即可为您生成专业的Facebook广告文案
          </p>
        </div>

        <div className="grid lg:grid-cols-[40%_60%] gap-8 items-stretch">
          {/* 输入表单 */}
          <div ref={leftCardRef} className={`bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative ${(showQuickTemplates || showRegionDropdown) ? 'overflow-visible' : 'overflow-hidden'} flex flex-col`}>
            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">产品信息</h3>
                
                {/* 🚀 快速模版按钮 */}
                <div className="relative">
                  <button
                    type="button"
                    data-template-toggle
                    onClick={() => setShowQuickTemplates(!showQuickTemplates)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span className="mr-2">⚡</span>
                    快速模版
                    <svg className={`ml-2 w-4 h-4 transition-transform ${showQuickTemplates ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 快速模版下拉菜单 */}
                  {showQuickTemplates && (
                    <div id="template-dropdown" className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-40 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-800">选择产品模版</h4>
                        <p className="text-xs text-gray-600 mt-1">快速填充产品信息，开始创作</p>
                      </div>
                      <div className="p-2">
                        {quickTemplates.map((template) => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => applyQuickTemplate(template)}
                            className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                          >
                            <div className="flex items-start">
                              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{template.name.split(' ')[0]}</span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {template.name.substring(2)}
                                </div>
                                <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {template.data.features}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  目标：{template.data.targetAudience.split('、')[0]}等
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 产品名称 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  产品名称 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={productInfo.name}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                      focusedField === 'name' 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="例如：智能无线耳机"
                    required
                  />
                </div>
              </div>

              {/* 产品特性 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  产品特性 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={productInfo.features}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, features: e.target.value }))}
                    onFocus={() => setFocusedField('features')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none resize-none ${
                      focusedField === 'features' 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    rows={4}
                    placeholder="描述产品的主要特点和优势，例如：主动降噪、长续航、快速充电"
                    required
                  />
                </div>
              </div>

              {/* 目标受众 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  目标受众 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                    onFocus={() => setFocusedField('audience')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                      focusedField === 'audience' 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="例如：年轻上班族、音乐爱好者、运动健身人群"
                    required
                  />
                </div>
              </div>

              {/* 投放地区 */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-gray-700">
                  投放地区 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    data-region-toggle
                    onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 hover:bg-white text-left flex items-center justify-between ${
                      showRegionDropdown
                        ? 'border-blue-500 shadow-lg shadow-blue-500/25 bg-white'
                        : productInfo.regions.length === 0 && showRegionError
                        ? 'border-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={productInfo.regions.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                      {getSelectedRegionsText()}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${showRegionDropdown ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 下拉菜单 */}
                  {showRegionDropdown && (
                    <div id="region-dropdown" className="absolute z-40 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-hidden">
                      {/* 搜索框 */}
                      <div className="p-4 border-b border-gray-100">
                        <input
                          type="text"
                          placeholder="搜索地区..."
                          value={regionSearchTerm}
                          onChange={(e) => setRegionSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* 地区列表 */}
                      <div id="region-dropdown-list" className="max-h-80 overflow-y-auto">
                        {getFilteredRegionGroups().map((group, groupIndex) => (
                          <div key={group.name} className={groupIndex > 0 ? 'border-t border-gray-100' : ''}>
                            <div className="px-4 py-3 bg-gray-50">
                              <h4 className="text-sm font-semibold text-gray-700">{group.name}</h4>
                            </div>
                            <div className="p-2">
                              {group.regions.map((region) => (
                                <label key={region.value} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={productInfo.regions.includes(region.value)}
                                    onChange={() => handleRegionToggle(region.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{region.label}</div>
                                    <div className="text-xs text-gray-500">{region.desc}</div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {showRegionError && productInfo.regions.length === 0 && (
                  <p className="text-sm text-red-500">请至少选择一个投放地区</p>
                )}

                {/* 已选地区标签显示，可单独删除 */}
                {productInfo.regions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {productInfo.regions.map(code => (
                      <span key={code} className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                        <span className="mr-1">{getRegionLabel(code)}</span>
                        <button
                          type="button"
                          aria-label={`移除${getRegionLabel(code)}`}
                          onClick={() => handleRemoveRegion(code)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 文案风格和促销方式 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    文案风格
                  </label>
                  <select
                    value={productInfo.style}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, style: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200"
                  >
                    <option value="confident">自信专业</option>
                    <option value="friendly">亲切友好</option>
                    <option value="energetic">活力四射</option>
                    <option value="elegant">优雅精致</option>
                    <option value="modern">现代时尚</option>
                    <option value="casual">轻松随意</option>
                    <option value="luxury">奢华高端</option>
                    <option value="humorous">幽默风趣</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    促销方式
                  </label>
                  <select
                    value={productInfo.promotion}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, promotion: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200"
                  >
                    <option value="discount">限时折扣</option>
                    <option value="bundle">组合优惠</option>
                    <option value="flash">闪购促销</option>
                    <option value="new">新品首发</option>
                    <option value="seasonal">季节特惠</option>
                    <option value="loyalty">会员专享</option>
                    <option value="none">无促销</option>
                  </select>
                </div>
              </div>

              {/* 生成按钮 */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    AI 正在生成中...
                  </div>
                ) : (
                  '🚀 生成文案+效果预估'
                )}
              </button>
            </form>
          </div>

          {/* 输出结果 - 使用完整的7.0版本OutputDisplay组件 */}
          <div ref={rightCardRef} className="bg-white rounded-3xl shadow-2xl p-2 relative overflow-hidden flex flex-col min-h-[600px]">
            {/* 背景装饰 */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-16 -translate-x-16"></div>
            
            <div className="relative flex-1 flex flex-col">
              <OutputDisplay
                copies={copies}
                regions={productInfo.regions}
                isLoading={isLoading}
                error={error}
                isForbiddenProduct={isForbiddenProduct}
                policyCheckResult={policyCheckResult}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
