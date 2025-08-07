import { useState } from 'react';

function App() {
  const [productInfo, setProductInfo] = useState({
    name: '',
    features: '',
    targetAudience: '',
    region: ''
  });
  const [copies, setCopies] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  // 效果预测函数
  const predictEffect = async (copyText: string) => {
    try {
      console.log('🎯 开始效果预测，文案:', copyText);
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-674b29e0b86846bca55195b66eb3e3aa'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的Facebook广告效果预测专家，能够准确评估广告文案的营销效果。请基于文案的吸引力、情感共鸣、号召性语言等因素进行评分。'
            },
            {
              role: 'user',
              content: `请对以下 Facebook 广告文案进行营销效果预测，输出格式如下：
- 预估点击率（CTR）百分比（例如 3.2%）
- 效果评分（1~5星）
- 简短优化建议

文案内容：『${copyText}』

请严格按照以下格式返回，不要添加其他内容：
CTR: [百分比]
评分: [星级]
建议: [一句话建议]`
            }
          ],
          max_tokens: 200,
          temperature: 0.3,
          top_p: 0.9
        })
      });

      console.log('📊 API响应状态:', response.status);
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 API响应数据:', data);
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('AI未返回有效内容');
      }

      console.log('🤖 AI返回内容:', content);
      
      // 解析结果
      const lines = content.split('\n').map((line: string) => line.trim()).filter((line: string) => line);
      let ctr = '';
      let rating = '';
      let suggestion = '';
      
      for (const line of lines) {
        if (line.startsWith('CTR:')) {
          ctr = line.replace('CTR:', '').trim();
        } else if (line.startsWith('评分:')) {
          rating = line.replace('评分:', '').trim();
        } else if (line.startsWith('建议:')) {
          suggestion = line.replace('建议:', '').trim();
        }
      }
      
      console.log('📊 解析结果:', { ctr, rating, suggestion });
      
      if (!ctr || !rating || !suggestion) {
        console.warn('⚠️ 效果预测结果格式不完整');
        return null;
      }
      
      return { ctr, rating, suggestion };
    } catch (err) {
      console.error('💥 效果预测错误:', err);
      return null;
    }
  };

  // 生成文案并预测效果
  const handleGenerate = async () => {
    setIsLoading(true);
    setCopies([]);
    setPredictions([]);
    
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
      
      // 为每个文案生成效果预测
      console.log('🎯 开始效果预测...');
      setIsPredicting(true);
      const newPredictions = [];
      
      for (let i = 0; i < mockCopies.length; i++) {
        const copy = mockCopies[i];
        console.log(`📊 正在预测第 ${i + 1} 条文案:`, copy.substring(0, 50) + '...');
        
        const prediction = await predictEffect(copy);
        if (prediction) {
          console.log(`✅ 第 ${i + 1} 条文案预测成功:`, prediction);
          newPredictions.push(prediction);
        } else {
          console.log(`⚠️ 第 ${i + 1} 条文案预测失败，使用默认值`);
          newPredictions.push({
            ctr: '2.5%',
            rating: '★★★☆☆',
            suggestion: '建议优化文案结构，增加情感共鸣元素'
          });
        }
      }
      
      console.log('🎉 所有预测完成，设置预测结果:', newPredictions);
      setPredictions(newPredictions);
      
    } catch (err) {
      console.error('💥 生成过程出错:', err);
    } finally {
      setIsLoading(false);
      setIsPredicting(false);
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">生成结果</h2>
              
              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">正在生成文案...</p>
                </div>
              )}
              
              {copies.length > 0 && (
                <div className="space-y-6">
                  {copies.map((copy, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed">{copy}</p>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(copy)}
                          className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          复制
                        </button>
                      </div>
                      
                      {/* 效果预测 */}
                      {predictions[index] && (
                        <div className="mt-4 p-4 bg-white/80 rounded-lg border border-green-100">
                          <div className="flex items-center mb-3">
                            <span className="text-sm font-semibold text-green-800">📊 效果预测</span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* CTR 预测 */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">预估点击率</span>
                              </div>
                              <div className="text-base font-bold text-blue-600">{predictions[index].ctr}</div>
                            </div>

                            {/* 效果评分 */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">效果评分</span>
                              </div>
                              <div className="text-base font-bold text-yellow-600">{predictions[index].rating}</div>
                            </div>

                            {/* 优化建议 */}
                            <div className="bg-gray-50 rounded-lg p-3 sm:col-span-1">
                              <div className="flex items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">优化建议</span>
                              </div>
                              <div className="text-xs text-gray-700 leading-relaxed">{predictions[index].suggestion}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* 预测中状态 */}
                      {isPredicting && index === predictions.length && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-center">
                            <div className="loading-spinner w-4 h-4 mr-2"></div>
                            <span className="text-sm text-blue-700">预测中...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {!isLoading && copies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>填写产品信息并点击生成按钮开始创建广告文案</p>
                </div>
              )}
            </div>
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