import React, { useState, useEffect } from 'react';
import { 
  generateAIImage, 
  generateFeatureImagePrompt, 
  getAvailableAPIs,
  type AIImageConfig,
  type AIImageResult 
} from '../utils/aiImageGenerator';

interface AIImageGeneratorProps {
  feature: {
    title: string;
    description: string;
    details: string[];
    gradient: string;
    bgGradient: string;
    imagePrompt?: string;
  };
  onImageGenerated?: (imageUrl: string) => void;
  regenerateToken?: number;
}

export const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ 
  feature, 
  onImageGenerated,
  regenerateToken
}) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取可用的AI图片生成API
  const [availableAPIs] = useState(() => getAvailableAPIs());
  const [selectedAPI, setSelectedAPI] = useState<string>('mock');

  // 使用AI生成图片
  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // 使用自定义提示词或生成默认提示词
      const prompt = feature.imagePrompt || generateFeatureImagePrompt(feature.title);
      
      // 配置AI图片生成参数
      const config: AIImageConfig = {
        prompt,
        apiType: selectedAPI as any,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      };
      
      // 调用AI图片生成
      const result: AIImageResult = await generateAIImage(config);
      
      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        if (onImageGenerated) {
          onImageGenerated(result.imageUrl);
        }
      } else {
        setError(result.error || '图片生成失败');
      }
    } catch (err) {
      console.error('AI图片生成错误:', err);
      setError('图片生成失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // 组件挂载或接收到重生成信号时自动生成图片
    generateImage();
  }, [feature.title, regenerateToken]);

  return (
    <div className="relative w-full h-full">
      {isGenerating ? (
        <div className={`relative w-full h-full bg-gradient-to-br ${feature.bgGradient} rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center feature-image-loading`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative z-10 text-center p-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl text-4xl shadow-xl mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
            
            <div className="text-gray-600 font-medium text-sm">AI正在生成图片...</div>
            <div className="text-gray-500 text-xs mt-1">请稍候</div>
          </div>
        </div>
      ) : generatedImage ? (
        <div className={`relative w-full h-full bg-gradient-to-br ${feature.bgGradient} rounded-3xl shadow-2xl overflow-hidden feature-image-border`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* 图片容器 - 自适应尺寸 */}
            <div className="flex-1 p-6 flex items-center justify-center">
              <img 
                src={generatedImage} 
                alt={`${feature.title} AI生成图片`}
                className="w-full h-full object-cover rounded-2xl shadow-lg feature-image"
                style={{ maxHeight: 'calc(100% - 80px)' }}
                onError={(e) => {
                  console.error('图片加载失败:', e);
                  setError('图片加载失败');
                }}
              />
            </div>
            
            {/* 控制按钮区域 */}
            <div className="feature-image-controls">
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={generateImage}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  🔄 重新生成
                </button>
                
                {/* API选择器 */}
                {availableAPIs.length > 1 && (
                  <select
                    value={selectedAPI}
                    onChange={(e) => setSelectedAPI(e.target.value)}
                    className="px-3 py-2 bg-white/20 text-white rounded text-sm border border-white/30"
                  >
                    {availableAPIs.map((api) => (
                      <option key={api.type} value={api.type}>
                        {api.name} {api.available ? '✓' : '✗'}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            
            {/* 质量指示器 */}
            <div className="feature-image-quality">
              AI生成
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative w-full h-full bg-gradient-to-br ${feature.bgGradient} rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center feature-image-loading`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative z-10 text-center p-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-2xl text-4xl shadow-xl mb-4`}>
              {feature.title === 'AI 智能生成' && '🤖'}
              {feature.title === '全球本土化' && '🌍'}
              {feature.title === '多风格模板' && '🎨'}
              {feature.title === '智能优化' && '⚡'}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={generateImage}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                🎨 AI生成图片
              </button>
              
              {/* API选择器 */}
              {availableAPIs.length > 1 && (
                <div className="flex flex-col items-center space-y-2">
                  <label className="text-white/80 text-xs">选择AI模型:</label>
                  <select
                    value={selectedAPI}
                    onChange={(e) => setSelectedAPI(e.target.value)}
                    className="px-3 py-1 bg-white/20 text-white rounded text-xs border border-white/30"
                  >
                    {availableAPIs.map((api) => (
                      <option key={api.type} value={api.type}>
                        {api.name} {api.available ? '✓' : '✗'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-4 text-red-200 text-xs">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

