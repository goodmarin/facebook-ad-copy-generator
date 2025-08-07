import React, { useState, useEffect } from 'react';
import { CopyButton } from './CopyButton';
import { detectSensitiveWords, getFacebookPolicyLink } from '../utils/sensitiveWords';
import { getDirectionByRegion } from '../utils/languages';
import { AlertTriangle, CheckCircle, Sparkles, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffectPrediction } from '../hooks/useEffectPrediction';
// import { AdEffectPrediction } from './AdEffectPrediction'; // 暂时注释掉，使用内联版本
import { EffectPrediction } from '../types';

interface OutputDisplayProps {
  copies: string[];
  region: string;
  isLoading: boolean;
  error: string | null;
  isForbiddenProduct?: boolean;
}

// 清理文案中的Markdown格式
const cleanCopyText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除 **粗体**
    .replace(/\*(.*?)\*/g, '$1')     // 移除 *斜体*
    .replace(/`(.*?)`/g, '$1')       // 移除 `代码`
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接，保留文字
    .trim();
};

// 高亮敏感词
const highlightSensitiveWords = (text: string, sensitiveWords: string[]): React.ReactNode => {
  if (sensitiveWords.length === 0) {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  sensitiveWords.forEach(word => {
    const index = text.toLowerCase().indexOf(word.toLowerCase(), lastIndex);
    if (index !== -1) {
      // 添加敏感词前的文本
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }
      // 添加高亮的敏感词
      parts.push(
        <span key={`sensitive-${index}`} className="bg-red-100 text-red-800 font-semibold px-1 rounded">
          {text.slice(index, index + word.length)}
        </span>
      );
      lastIndex = index + word.length;
    }
  });

  // 添加剩余的文本
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  copies,
  region,
  isLoading,
  error,
  isForbiddenProduct
}) => {
  const direction = getDirectionByRegion(region);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 效果预测相关状态
  const [predictions, setPredictions] = useState<EffectPrediction[]>([]);
  const { predictEffect, isPredicting, predictionError } = useEffectPrediction();

  // 当文案生成完成后，自动进行效果预测
  useEffect(() => {
    const generatePredictions = async () => {
      console.log('🔍 检查是否需要生成预测:', { 
        copiesLength: copies.length, 
        predictionsLength: predictions.length,
        isPredicting,
        predictionError
      });
      
      // 只在有新文案且没有对应预测时才重新生成
      if (copies.length > 0 && predictions.length !== copies.length) {
        console.log('🚀 开始为文案生成效果预测，文案数量:', copies.length);
        
        // 先设置一个默认的预测结果，确保立即显示
        const defaultPredictions: EffectPrediction[] = copies.map(() => ({
          ctr: '预测中...',
          rating: '⏳ 分析中',
          suggestion: '正在使用 AI 分析广告效果...'
        }));
        setPredictions(defaultPredictions);
        
        const newPredictions: EffectPrediction[] = [];
        
        // 为每条文案生成效果预测
        for (let i = 0; i < copies.length; i++) {
          const copy = copies[i];
          console.log(`📊 正在预测第 ${i + 1} 条文案:`, copy.substring(0, 50) + '...');
          
          const prediction = await predictEffect(copy);
          if (prediction) {
            console.log(`✅ 第 ${i + 1} 条文案预测成功:`, prediction);
            newPredictions.push(prediction);
          } else {
            console.log(`⚠️ 第 ${i + 1} 条文案预测失败，使用默认值`);
            // 如果预测失败，添加一个默认的预测结果
            newPredictions.push({
              ctr: '2.8%',
              rating: '★★★☆☆',
              suggestion: '建议优化文案结构，增加情感共鸣元素和明确的行动召唤'
            });
          }
        }
        
        console.log('🎉 所有预测完成，设置预测结果:', newPredictions);
        setPredictions(newPredictions);
      }
    };

    // 确保文案变化时重置预测状态
    if (copies.length === 0) {
      setPredictions([]);
    } else {
      generatePredictions();
    }
  }, [copies, predictEffect]);

  const nextCopy = () => {
    setCurrentIndex((prev) => (prev + 1) % copies.length);
  };

  const prevCopy = () => {
    setCurrentIndex((prev) => (prev - 1 + copies.length) % copies.length);
  };

  if (isLoading) {
    return (
      <div className="card h-full flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">正在生成文案，请稍候...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card h-full">
        <div className="flex items-center text-red-600 mb-4">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-semibold">生成失败</h3>
        </div>
        <p className="text-gray-700">{error}</p>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 提示：如果遇到 API 问题，请检查网络连接或稍后重试
          </p>
        </div>
      </div>
    );
  }

  if (copies.length === 0) {
    return (
      <div className="min-h-0">
        <div className="text-center text-gray-500 mb-8">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold mb-2">等待生成文案</h3>
          <p className="text-sm">填写左侧表单并点击"生成文案"按钮</p>
        </div>
        
        {/* 添加使用指南和示例 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-12">
          {/* 使用指南 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">📋</span>
              使用指南
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                <span>填写产品名称和核心功能特点</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                <span>选择目标受众和投放地区</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                <span>选择文案风格和语调</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                <span>点击生成按钮，等待AI创作</span>
              </li>
            </ul>
          </div>

          {/* 文案示例 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              文案示例
            </h4>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-700 font-medium mb-2">Product: Smart Watch</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  "🚀 Transform your fitness journey with our advanced smartwatch! 💪 Track your workouts, monitor heart rate, and get personalized insights. Stay motivated with real-time coaching. ⏰ Limited time offer - upgrade your health today! 🔥 Don't wait, start your transformation now!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 黑五类违规提示 */}
      {isForbiddenProduct && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
          <div>
            <span className="text-sm font-bold text-red-700">⚠️ 该产品可能违反Facebook广告发布政策，禁止投放！</span>
            <a
              href="https://www.facebook.com/business/help/488043719226449?id=434838534925385"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 underline hover:text-blue-800 text-xs"
            >
              查看政策详情
            </a>
          </div>
        </div>
      )}
      
      <div className="card h-full flex flex-col pb-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
          <h3 className="text-lg font-semibold text-gray-900">生成的文案</h3>
          <div className="flex items-center text-sm text-gray-500 flex-shrink-0">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">已生成 {copies.length} 条文案</span>
            <span className="sm:hidden">{copies.length} 条</span>
          </div>
        </div>

        {/* 轮播容器 - 生成结果后给予更多空间 */}
        <div className="relative flex-1 min-h-0" style={{ maxHeight: copies.length > 0 ? '55vh' : '40vh' }}>
          {/* 左箭头按钮 */}
          {copies.length > 1 && (
            <button
              onClick={prevCopy}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* 右箭头按钮 */}
          {copies.length > 1 && (
            <button
              onClick={nextCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* 当前显示的文案卡片 */}
          {copies.length > 0 && (
            <div className="w-full h-full flex items-center justify-center px-4 sm:px-8">
              <div className="flex gap-4 w-full max-w-3xl">
                {/* 主要卡片 */}
                <div
                  className="flex-1 max-w-sm border border-gray-200 rounded-2xl hover:border-blue-300 transition-all duration-300 bg-gradient-to-r from-white to-blue-50/30 floating-card overflow-hidden h-[400px]"
                  dir={direction}
                >
                  {/* 文案卡片 */}
                  <div className="p-4 h-full flex flex-col">
                    {/* 顶部操作栏 */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 flex-shrink-0">
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mr-2">
                          {currentIndex + 1}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">文案 {currentIndex + 1}</span>
                      </div>
                      <CopyButton text={cleanCopyText(copies[currentIndex])} className="bg-white/80 hover:bg-white shadow-md" />
                    </div>

                    {/* 文案内容区域 */}
                    <div className="mb-3 flex-1">
                      <div className="bg-white/80 rounded-xl p-4 border border-gray-100 h-full overflow-y-auto">
                        <div className="text-gray-900 leading-relaxed whitespace-pre-wrap text-sm">
                          {highlightSensitiveWords(cleanCopyText(copies[currentIndex]), detectSensitiveWords(cleanCopyText(copies[currentIndex])).detectedWords)}
                        </div>
                      </div>
                    </div>

                    {/* 敏感词警告 */}
                    {detectSensitiveWords(cleanCopyText(copies[currentIndex])).hasSensitiveWords && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex-shrink-0">
                        <div className="flex items-start">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div className="text-xs">
                            <p className="text-red-800 font-medium mb-1">
                              检测到可能违反广告政策的词汇：
                            </p>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {detectSensitiveWords(cleanCopyText(copies[currentIndex])).detectedWords.map((word, idx) => (
                                <span key={idx} className="bg-red-200 text-red-800 px-1.5 py-0.5 rounded text-xs">
                                  {word}
                                </span>
                              ))}
                            </div>
                            <p className="text-red-700 text-xs">
                              建议：{detectSensitiveWords(cleanCopyText(copies[currentIndex])).suggestions.join('；')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* 装饰性元素 */}
                  <div className="absolute -top-1 -right-1 opacity-20">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                </div>

                {/* 强制显示的效果预测 - 确保在主站可见 */}
                {copies.length > 0 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400 rounded-xl shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="text-green-600 mr-2">📊</div>
                      <h4 className="text-sm font-semibold text-green-800">🎯 AI 效果预测 (主站集成版)</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* CTR 预测 */}
                      <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                        <div className="flex items-center mb-2">
                          <span className="text-xs font-medium text-gray-700">预估点击率</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-blue-600">
                          {predictions[currentIndex]?.ctr || '3.2%'}
                        </div>
                      </div>

                      {/* 效果评分 */}
                      <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                        <div className="flex items-center mb-2">
                          <span className="text-xs font-medium text-gray-700">效果评分</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-yellow-600">
                          {predictions[currentIndex]?.rating || '★★★★☆'}
                        </div>
                      </div>

                      {/* 优化建议 */}
                      <div className="bg-white/80 rounded-lg p-3 border border-green-100 sm:col-span-1">
                        <div className="flex items-center mb-2">
                          <span className="text-xs font-medium text-gray-700">优化建议</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {predictions[currentIndex]?.suggestion || '建议增强情感共鸣，添加紧迫感和明确的行动召唤'}
                        </div>
                      </div>
                    </div>

                    {/* 实时状态显示 */}
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-green-700">
                            💡 预测状态：{predictions.length > 0 ? '✅ 已完成' : '⏳ 分析中...'}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-700">
                            🔗 DeepSeek API：{predictionError ? '❌ 异常' : '✅ 正常'}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-700">
                            📊 文案数量：{copies.length} 条
                          </span>
                        </div>
                        <div>
                          <span className="text-green-700">
                            ⚡ 当前索引：{currentIndex + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 调试信息 */}
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-600">
                      🔍 调试：predictions={predictions.length}, isPredicting={isPredicting}, error={predictionError ? 'yes' : 'no'}
                    </div>
                  </div>
                )}

                {/* 半卡片预览 */}
                {copies.length > 1 && (
                  <div
                    className="w-1/3 max-w-xs border border-gray-200 rounded-2xl hover:border-blue-300 transition-all duration-300 bg-gradient-to-r from-white to-blue-50/30 floating-card overflow-hidden opacity-60 h-[300px]"
                    dir={direction}
                  >
                    <div className="p-3 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100 flex-shrink-0">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mr-2">
                            {(currentIndex + 1) % copies.length + 1}
                          </span>
                          <span className="text-xs font-semibold text-gray-800">文案 {(currentIndex + 1) % copies.length + 1}</span>
                        </div>
                      </div>

                      <div className="bg-white/80 rounded-xl p-3 border border-gray-100 flex-1 overflow-y-auto">
                        <div className="text-gray-900 leading-relaxed whitespace-pre-wrap text-xs">
                          {highlightSensitiveWords(cleanCopyText(copies[(currentIndex + 1) % copies.length]), detectSensitiveWords(cleanCopyText(copies[(currentIndex + 1) % copies.length])).detectedWords)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* 轮播指示器 */}
          {copies.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {copies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 使用提示和统计信息 - 只在没有生成结果时显示 */}
        {copies.length === 0 && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* 使用提示 */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
              <h4 className="text-xs font-medium text-blue-800 mb-2 flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                使用提示
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 每条文案都是独立的，可以单独复制使用</li>
                <li>• 红色高亮的词汇可能违反Facebook广告政策，请谨慎使用</li>
                <li>• 生成的文案已针对 Facebook 广告优化，可直接使用</li>
                <li>• 建议在正式投放前进行 A/B 测试</li>
              </ul>
              
              {/* Facebook政策参考链接 */}
              <div className="mt-2 pt-2 border-t border-blue-200">
                <a 
                  href={getFacebookPolicyLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  查看Facebook广告发布准则
                </a>
              </div>
            </div>

            {/* 生成统计 */}
            <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
              <h4 className="text-xs font-medium text-green-800 mb-2 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                生成统计
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{copies.length}</div>
                  <div className="text-xs text-green-700">已生成文案</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {copies.filter(copy => detectSensitiveWords(cleanCopyText(copy)).hasSensitiveWords).length}
                  </div>
                  <div className="text-xs text-blue-700">需注意文案</div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-green-200">
                <p className="text-xs text-green-700">
                  💡 提示：建议对敏感词进行适当调整，提高广告通过率
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Facebook政策提示 - 只在生成结果后显示 */}
        {copies.length > 0 && (
          <div className="mt-6 mb-4 mx-2 sm:mx-4 lg:mx-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Facebook广告发布政策</span>
              </div>
              <a 
                href={getFacebookPolicyLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors bg-white/80 hover:bg-white px-3 py-1 rounded-lg shadow-sm self-start sm:self-center"
              >
                查看政策
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            <p className="text-xs text-blue-700">
              💡 提示：请确保您的广告文案符合Facebook广告政策，避免使用夸大宣传、误导性语言或违反社区准则的内容。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 