import React, { useState } from 'react';
import { generateAIImage, type AIImageConfig } from '../utils/aiImageGenerator';

export const TestImageGeneration: React.FC = () => {
  const [testImage, setTestImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testImageGeneration = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const config: AIImageConfig = {
        prompt: 'A beautiful test image with blue gradient background',
        apiType: 'mock',
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      };

      const result = await generateAIImage(config);
      
      if (result.success && result.imageUrl) {
        setTestImage(result.imageUrl);
        console.log('测试图片生成成功:', result.imageUrl);
      } else {
        setError(result.error || '图片生成失败');
      }
    } catch (err) {
      console.error('测试图片生成错误:', err);
      setError('图片生成失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">AI图片生成测试</h3>
      
      <button
        onClick={testImageGeneration}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-4"
      >
        {isLoading ? '生成中...' : '测试生成图片'}
      </button>

      {error && (
        <div className="text-red-500 mb-4">
          错误: {error}
        </div>
      )}

      {testImage && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">生成的图片:</h4>
          <img 
            src={testImage} 
            alt="测试图片" 
            className="w-64 h-48 object-cover rounded-lg border"
            onError={(e) => {
              console.error('图片加载失败:', e);
              setError('图片加载失败');
            }}
          />
        </div>
      )}
    </div>
  );
};
