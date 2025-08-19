import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Target, 
  Sparkles, 
  Check, 
  ChevronDown,
  Settings,
  RefreshCw,
  Lightbulb,
  Search,
  X,
  Shield,
  TrendingUp
} from 'lucide-react';
import { OutputDisplay } from './OutputDisplay';
import { REGIONS } from '../utils/languages';
import { getAutoRegionGroups } from '../utils/regionGrouping';


interface AppleStyleGeneratorProps {
  onNavigateBack: () => void;
  productInfo: any;
  setProductInfo: (info: any) => void;
  onGenerate: () => void;
  copies: Array<{text: string, region: string, regionName: string}>;
  isLoading: boolean;
  policyCheckResult: any;
  // 增强功能
  showRegionDropdown?: boolean;
  setShowRegionDropdown?: (show: boolean) => void;
  regionSearchTerm?: string;
  setRegionSearchTerm?: (term: string) => void;
  showRegionError?: boolean;
  setShowRegionError?: (show: boolean) => void;
  // 快速模式
  fastMode?: boolean;
  setFastMode?: (mode: boolean) => void;
}

const AppleStyleGenerator: React.FC<AppleStyleGeneratorProps> = ({

  productInfo,
  setProductInfo,
  onGenerate,
  copies,
  isLoading,
  policyCheckResult,
  // 增强功能
  showRegionDropdown = false,
  setShowRegionDropdown,
  regionSearchTerm = '',
  setRegionSearchTerm,
  // 快速模式
  fastMode = false,
  setFastMode,

}) => {

  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');


  
  // 地区选择相关状态 - 使用props传入的状态
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 处理可选参数
  const handleSetShowRegionDropdown = (show: boolean) => {
    if (setShowRegionDropdown) {
      setShowRegionDropdown(show);
    }
  };

  const handleSetRegionSearchTerm = (term: string) => {
    if (setRegionSearchTerm) {
      setRegionSearchTerm(term);
    }
  };





  // 地区分组配置 - 使用共享自动分组，确保与 REGIONS 同步
  const regionGroups = useMemo(() => getAutoRegionGroups(REGIONS), []);

  // 完善的文案风格选项
  const styles = [
    { value: 'confident', label: '自信型', description: '强调产品优势和品牌实力，展现领导地位' },
    { value: 'friendly', label: '亲和型', description: '温暖友好，贴近用户生活，建立信任感' },
    { value: 'professional', label: '专业型', description: '严谨专业，突出技术优势和权威性' },
    { value: 'creative', label: '创意型', description: '新颖独特，激发用户好奇心和探索欲' },
    { value: 'elegant', label: '优雅型', description: '精致高端，营造奢华品质感受' },
    { value: 'energetic', label: '活力型', description: '充满活力，激发用户行动力和热情' },
    { value: 'minimalist', label: '极简型', description: '简洁明了，突出核心价值和功能' },
    { value: 'emotional', label: '情感型', description: '触动情感，建立深层次的情感连接' }
  ];

  // 完善的促销方式选项
  const promotions = [
    { value: 'discount', label: '折扣优惠', icon: '💰', desc: '价格优势吸引用户' },
    { value: 'limited', label: '限时抢购', icon: '⏰', desc: '营造紧迫感促成转化' },
    { value: 'free_trial', label: '免费试用', icon: '🎁', desc: '降低用户尝试门槛' },
    { value: 'bundle', label: '套餐组合', icon: '📦', desc: '提升客单价和价值感' },
    { value: 'premium', label: '高端品质', icon: '✨', desc: '强调品质和专业性' },
    { value: 'new', label: '新品上市', icon: '🆕', desc: '突出新颖性和独特性' },
    { value: 'sale', label: '清仓特卖', icon: '🔥', desc: '强调优惠力度和稀缺性' },
    { value: 'gift', label: '赠品促销', icon: '🎁', desc: '增加附加价值吸引力' }
  ];

  // 地区选择相关功能 - 保持与原版本一致
  const getSelectedRegionsText = () => {
    if (productInfo.regions.length === 0) {
      return '请选择投放地区';
    }
    if (productInfo.regions.length === 1) {
      const region = productInfo.regions[0];
      const regionData = regionGroups.flatMap(group => group.regions).find(r => r.value === region);
      return regionData ? regionData.label : '未知地区';
    }
    
    if (productInfo.regions.length <= 3) {
      const selectedRegions = productInfo.regions.map((region: string) => {
        const regionData = regionGroups.flatMap(group => group.regions).find(r => r.value === region);
        return regionData ? regionData.label.split(' ')[1] : '未知地区';
      });
      return selectedRegions.join('、');
    } else {
      return `已选择${productInfo.regions.length}个地区`;
    }
  };

  const handleRegionToggle = (region: string) => {
    setProductInfo((prev: any) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r: string) => r !== region)
        : [...prev.regions, region]
    }));
  };

  const removeRegion = (regionToRemove: string) => {
    setProductInfo((prev: any) => ({
      ...prev,
      regions: prev.regions.filter((r: string) => r !== regionToRemove)
    }));
  };

  const clearAllRegions = () => {
    setProductInfo((prev: any) => ({
      ...prev,
      regions: []
    }));
  };

  const getFilteredRegionGroups = () => {
    if (!regionSearchTerm.trim()) {
      return regionGroups;
    }
    
    const searchTerm = regionSearchTerm.toLowerCase();
    return regionGroups.map(group => ({
      ...group,
      regions: group.regions.filter(region => 
        region.label.toLowerCase().includes(searchTerm) ||
        region.desc.toLowerCase().includes(searchTerm) ||
        region.value.toLowerCase().includes(searchTerm)
      )
    })).filter(group => group.regions.length > 0);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleSetShowRegionDropdown(false);
        handleSetRegionSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative flex flex-col">


      <div className="relative z-10 flex flex-1 h-0">
        {/* 左侧配置面板 - Apple风格，独立滚动 */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 flex-1">
            {/* 标签页切换 - Apple风格 */}
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl">
              {[
                { key: 'basic', label: '基础设置', icon: Target },
                { key: 'advanced', label: '高级选项', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 基础设置 */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* 产品名称 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    产品名称
                  </label>
                  <input
                    type="text"
                    value={productInfo.name}
                    onChange={(e) => setProductInfo({...productInfo, name: e.target.value})}
                    placeholder="输入您的产品名称"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* 产品特性 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    产品特性
                  </label>
                  <textarea
                    value={productInfo.features}
                    onChange={(e) => setProductInfo({...productInfo, features: e.target.value})}
                    placeholder="描述产品的主要特性和优势"
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                {/* 目标受众 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    目标受众
                  </label>
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo({...productInfo, targetAudience: e.target.value})}
                    placeholder="例如：25-35岁的职场女性"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* 投放地区 - Apple风格下拉选择 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    投放地区 <span className="text-blue-600">({productInfo.regions.length}个已选择)</span>
                  </label>
                  
                  {/* 下拉选择器 */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => handleSetShowRegionDropdown(!showRegionDropdown)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all flex items-center justify-between"
                    >
                      <span className="text-gray-700">{getSelectedRegionsText()}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transform transition-transform ${showRegionDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* 下拉菜单 - Apple风格 */}
                    {showRegionDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden">
                        {/* 搜索框 */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="搜索国家/地区..."
                              value={regionSearchTerm}
                              onChange={(e) => handleSetRegionSearchTerm(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        {/* 地区列表 */}
                        <div className="max-h-80 overflow-y-auto">
                          {getFilteredRegionGroups().map((group) => (
                            <div key={group.name} className="p-2">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">
                                {group.name}
                              </div>
                              <div className="space-y-1">
                                {group.regions.map((region) => (
                                  <button
                                    key={region.value}
                                    type="button"
                                    onClick={() => handleRegionToggle(region.value)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors text-left ${
                                      productInfo.regions.includes(region.value)
                                        ? 'bg-blue-50 border border-blue-200'
                                        : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <span className="text-lg">{region.label.split(' ')[0]}</span>
                                    <div className="flex-1">
                                      <span className={`text-sm font-medium ${
                                        productInfo.regions.includes(region.value) ? 'text-blue-700' : 'text-gray-900'
                                      }`}>{region.label.split(' ')[1]}</span>
                                      <span className="text-xs text-gray-500 ml-2">{region.desc}</span>
                                    </div>
                                    {productInfo.regions.includes(region.value) && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* 快速操作按钮 */}
                        <div className="p-4 border-t border-gray-100 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const hotRegions = regionGroups[0].regions.map(r => r.value);
                              setProductInfo({
                                ...productInfo,
                                regions: [...new Set([...productInfo.regions, ...hotRegions])]
                              });
                            }}
                            className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-colors font-medium"
                          >
                            选择热门地区
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const allRegions = regionGroups.flatMap(g => g.regions.map(r => r.value));
                              setProductInfo({
                                ...productInfo,
                                regions: allRegions
                              });
                            }}
                            className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition-colors font-medium"
                          >
                            全选
                          </button>
                          <button
                            type="button"
                            onClick={clearAllRegions}
                            className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors font-medium"
                          >
                            清空
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 已选地区显示 */}
                  {productInfo.regions.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">已选择的地区：</div>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                        {productInfo.regions.map((regionCode: string) => {
                          const regionData = regionGroups.flatMap(g => g.regions).find(r => r.value === regionCode);
                          if (!regionData) return null;
                          
                          return (
                            <div
                              key={regionCode}
                              className="flex items-center space-x-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-sm text-blue-700"
                            >
                              <span>{regionData.label}</span>
                              <button
                                type="button"
                                onClick={() => removeRegion(regionCode)}
                                className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3 text-red-500 hover:text-red-700" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 快速模式开关 - 极简设计 */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">🚀 快速模式</span>
                  </div>
                  <button
                    onClick={() => setFastMode && setFastMode(!fastMode)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      fastMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        fastMode ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* 高级设置 */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                {/* 智能生成说明 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                    <label className="block text-sm font-semibold text-gray-900">
                      智能分析流程
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    🚀 优化体验：先快速生成文案供您查看，然后自动进行AI效果预测分析，无需等待即可查看文案结果
                  </p>
                </div>

                {/* 文案风格 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    文案风格
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {styles.map((style) => (
                      <label key={style.value} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300">
                        <input
                          type="radio"
                          name="style"
                          value={style.value}
                          checked={productInfo.style === style.value}
                          onChange={(e) => setProductInfo({...productInfo, style: e.target.value})}
                          className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">{style.label}</div>
                          <div className="text-xs text-gray-600 leading-relaxed">{style.description}</div>
                        </div>
                        {productInfo.style === style.value && (
                          <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 促销方式 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    促销方式
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                    {promotions.map((promo) => (
                      <label key={promo.value} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300">
                        <input
                          type="radio"
                          name="promotion"
                          value={promo.value}
                          checked={productInfo.promotion === promo.value}
                          onChange={(e) => setProductInfo({...productInfo, promotion: e.target.value})}
                          className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 mt-0.5"
                        />
                        <span className="text-lg">{promo.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">{promo.label}</div>
                          <div className="text-xs text-gray-600 leading-relaxed">{promo.desc}</div>
                        </div>
                        {productInfo.promotion === promo.value && (
                          <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>


              </div>
            )}




            {/* 生成按钮 - Apple风格 */}
            <button
              onClick={onGenerate}
              disabled={isLoading || !productInfo.name || !productInfo.features || productInfo.regions.length === 0}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI 创作中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>🚀 开始生成文案+效果预估</span>
                </>
              )}
            </button>



            {/* 快速模板区域 - Apple风格 */}
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
                快速模板
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setProductInfo({
                    name: '智能无线耳机',
                    features: '主动降噪, 长续航, 快速充电, 舒适佩戴',
                    targetAudience: '年轻上班族, 音乐爱好者',
                    regions: [],
                    style: 'confident',
                    promotion: 'discount'
                  })}
                  className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  🎧 智能耳机模板
                </button>
                <button
                  onClick={() => setProductInfo({
                    name: '运动健身器材',
                    features: '便携设计, 多功能, 耐用材质, 适合家庭使用',
                    targetAudience: '健身爱好者, 居家运动人群',
                    regions: [],
                    style: 'energetic',
                    promotion: 'limited'
                  })}
                  className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  💪 健身器材模板
                </button>
                <button
                  onClick={() => setProductInfo({
                    name: '护肤美容产品',
                    features: '天然成分, 温和配方, 快速见效, 适合敏感肌',
                    targetAudience: '爱美女性, 护肤达人',
                    regions: [],
                    style: 'elegant',
                    promotion: 'premium'
                  })}
                  className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  ✨ 护肤产品模板
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                💡 点击模板快速填充产品信息，然后选择地区即可生成文案
              </p>
            </div>

          </div>
          </div>
        </div>

        {/* 右侧结果展示 */}
        <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
          {copies.length > 0 ? (
            <OutputDisplay
              copies={copies}
              regions={productInfo.regions}
              isLoading={isLoading}
              error={null}
              isForbiddenProduct={false}
              policyCheckResult={policyCheckResult}
            />
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">AI 正在创作中...</h3>
                <p className="text-gray-600 mb-6">请稍候，正在为您生成高质量的Facebook广告文案</p>
                
                {/* 加载进度动画 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>分析产品特点</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    <span>优化营销语言</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
                    </div>
                    <span>生成创意文案</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-y-auto">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-2xl w-full">
                  {/* 空状态图标 */}
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-8">
                    <Lightbulb className="w-12 h-12 text-blue-600" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">准备开始创作</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    填写左侧的产品信息，选择投放地区和文案风格，
                    我们的 AI 将为您生成专业的 Facebook 广告文案。
                  </p>
                  
                  {/* 功能亮点展示 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">效果预测</h4>
                      <p className="text-sm text-gray-600">AI智能预测每条文案的点击率和转化效果</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">政策检测</h4>
                      <p className="text-sm text-gray-600">自动检测违禁词汇，确保广告合规性</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">本土化优化</h4>
                      <p className="text-sm text-gray-600">根据不同地区文化特色量身定制文案</p>
                    </div>
                  </div>
                  
                  {/* 使用指南 */}
                  <div className="text-left bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-2">📋</span>
                      使用指南
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                        <span>填写产品名称和核心功能特点</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                        <span>选择目标受众和投放地区</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                        <span>选择文案风格和促销方式</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                        <span>点击生成按钮，等待AI创作完成</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppleStyleGenerator;
