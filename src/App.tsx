import { useState } from 'react';
import { OutputDisplay } from './components/OutputDisplay';

function App() {
  const [productInfo, setProductInfo] = useState({
    name: '',
    features: '',
    targetAudience: '',
    region: ''
  });
  const [copies, setCopies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 根据地区获取语言和文案风格
  const getLanguageAndStyle = (region: string) => {
    const regionConfig: { [key: string]: { language: string; style: string; culture: string } } = {
      'CN': { language: '中文', style: '亲切友好，强调实用性和性价比', culture: '注重家庭和实用价值' },
      'US': { language: 'English', style: 'confident and aspirational', culture: 'emphasize innovation and personal achievement' },
      'JP': { language: '日本語', style: '丁寧で品質重視', culture: '細部への注意と品質を重視' },
      'KR': { language: '한국어', style: '트렌디하고 스타일리시', culture: '트렌드와 미용에 중점' }
    };
    return regionConfig[region] || regionConfig['CN'];
  };

  // 生成文案函数
  const generateCopies = async (productInfo: any) => {
    const config = getLanguageAndStyle(productInfo.region);
    
    // 这里可以集成真实的 OpenAI API
    // 现在使用模拟数据，但结构已经为真实 API 做好准备
    const prompt = `为以下产品生成3条Facebook广告文案：
产品名称：${productInfo.name}
产品特性：${productInfo.features}
目标受众：${productInfo.targetAudience}
投放地区：${productInfo.region}

要求：
- 使用${config.language}
- 风格：${config.style}
- 文化特点：${config.culture}
- 每条文案包含表情符号
- 突出产品核心价值
- 包含明确的行动召唤`;

    console.log('📝 生成文案提示词:', prompt);

    // 模拟 AI 生成的高质量文案
    const generatedCopies = [
      `🚀 ${productInfo.name} - 改变你的生活方式！${productInfo.features}，专为${productInfo.targetAudience}设计。立即体验科技与生活的完美融合！`,
      `💎 发现${productInfo.name}的独特魅力！${productInfo.features}让你在${productInfo.targetAudience}中脱颖而出。限时特价，错过就没有了！`,
      `🔥 热销爆款！${productInfo.name}凭借${productInfo.features}成为${productInfo.targetAudience}的首选。现在购买享受专属优惠，快来抢购吧！`
    ];

    return generatedCopies;
  };

  // 主要的生成处理函数
  const handleGenerate = async () => {
    console.log('🎯 表单提交，产品信息:', productInfo);
    
    // 检查必填字段
    if (!productInfo.name || !productInfo.features || !productInfo.targetAudience || !productInfo.region) {
      console.error('❌ 必填字段未填写完整:', {
        name: productInfo.name,
        features: productInfo.features,
        targetAudience: productInfo.targetAudience,
        region: productInfo.region
      });
      alert('请填写所有必填字段！');
      return;
    }
    
    setIsLoading(true);
    setCopies([]);
    
    try {
      console.log('🚀 开始生成AI文案...');
      
      // 调用文案生成函数
      const generatedCopies = await generateCopies(productInfo);
      
      console.log('📝 生成的文案:', generatedCopies);
      setCopies(generatedCopies);
      
      // 文案生成完成后，OutputDisplay 组件会自动触发效果预测
      console.log('✅ 文案生成完成，将自动进行效果预测...');
      
    } catch (err) {
      console.error('💥 生成过程出错:', err);
      alert('生成失败，请重试！');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">🎯 爆款 Facebook 广告文案生成器</h1>
              <p className="text-xl opacity-90">AI 智能生成 + 效果预测，让你的广告投放更精准</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Product Info Input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg mr-3">📝</span>
                产品信息
              </h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
                {/* 产品名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品名称 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.name}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="例如：智能无线耳机"
                    required
                  />
                </div>

                {/* 产品特性 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品特性 *
                  </label>
                  <textarea
                    value={productInfo.features}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, features: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
                    rows={4}
                    placeholder="描述产品的主要特点和优势，如：主动降噪、超长续航、快速充电"
                    required
                  />
                </div>

                {/* 受众人群 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标受众 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="例如：年轻上班族、科技爱好者、健身人群"
                    required
                  />
                </div>

                {/* 投放地区 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投放地区 *
                  </label>
                  <select
                    value={productInfo.region}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, region: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">请选择投放地区</option>
                    <option value="CN">🇨🇳 中国大陆</option>
                    <option value="US">🇺🇸 美国</option>
                    <option value="JP">🇯🇵 日本</option>
                    <option value="KR">🇰🇷 韩国</option>
                  </select>
                </div>

                {/* 生成按钮 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      AI 生成中...
                    </span>
                  ) : (
                    <>🚀 生成爆款文案 + 效果预测</>
                  )}
                </button>
              </form>

              {/* 功能说明 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">🎯 智能功能</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>✅ AI 智能生成多条文案</li>
                  <li>✅ 自动效果预测分析</li>
                  <li>✅ 多语言多地区适配</li>
                  <li>✅ 实时优化建议</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Generated Results */}
          <div className="lg:col-span-2">
            <OutputDisplay
              copies={copies}
              region={productInfo.region}
              isLoading={isLoading}
              error={null}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🎯 爆款文案生成器</h3>
              <p className="text-gray-400">AI 驱动的 Facebook 广告文案生成工具，帮助你创造高转化率的营销内容。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">核心功能</h4>
              <ul className="text-gray-400 space-y-2">
                <li>• AI 智能文案生成</li>
                <li>• 效果预测分析</li>
                <li>• 多语言支持</li>
                <li>• 实时优化建议</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">支持地区</h4>
              <ul className="text-gray-400 space-y-2">
                <li>🇨🇳 中国大陆</li>
                <li>🇺🇸 美国</li>
                <li>🇯🇵 日本</li>
                <li>🇰🇷 韩国</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 爆款文案生成器 - 让每一条广告都成为爆款</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;