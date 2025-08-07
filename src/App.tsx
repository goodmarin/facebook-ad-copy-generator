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



  // 生成文案
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
      console.log('🚀 开始生成文案...');
      
      // 模拟生成过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCopies = [
        `🚀 ${productInfo.name} - 改变你的生活！`,
        `💡 发现 ${productInfo.name} 的独特魅力`,
        `🔥 限时优惠：${productInfo.name} 等你来体验！`
      ];
      
      console.log('📝 生成的文案:', mockCopies);
      setCopies(mockCopies);
      
    } catch (err) {
      console.error('💥 生成过程出错:', err);
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
              <p className="text-xl opacity-90">专业的广告文案生成工具，支持多语言和多种文案风格</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Product Info Input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">产品信息</h2>
              
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：轻便折叠电动滑板车"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    placeholder="描述产品的主要特点和优势"
                    required
                  />
                </div>

                {/* 受众人群 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    受众人群 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：年轻上班族、户外爱好者"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="CN">🇨🇳 中国</option>
                    <option value="US">🇺🇸 美国</option>
                    <option value="JP">🇯🇵 日本</option>
                    <option value="KR">🇰🇷 韩国</option>
                  </select>
                </div>

                {/* 生成按钮 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '生成中...' : '生成广告文案'}
                </button>
              </form>
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
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © 2024 爆款文案生成器 - 专业的Facebook广告文案生成工具
          </p>
        </div>
      </div>
    </div>
  );
}

export default App; 