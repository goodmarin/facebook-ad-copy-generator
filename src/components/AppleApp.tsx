import React, { useState, useEffect } from 'react';
import { AppleNavigation } from './AppleNavigation';
import { AppleHero } from './AppleHero';
import { AppleFeatures } from './AppleFeatures';
import { AppleFooter } from './AppleFooter';

export const AppleApp: React.FC = () => {
  const [featureImages, setFeatureImages] = useState<Record<string, string | null>>({});
  

  // 跳转到新页面的生成器
  const scrollToGenerator = () => {
    window.location.hash = '/generate';
  };

  // 统一批量生成特性图片，并直接替换到对应位置
  const regenerateAllFeatureImages = async () => {
    try {
      const features = [
        { title: 'AI 智能生成' },
        { title: '全球本土化' },
        { title: '多风格模板' },
        { title: '智能优化' }
      ];
      const results: Record<string, string | null> = {};
      const { generateAIImage, generateFeatureImagePrompt } = await import('../utils/aiImageGenerator');
      
      for (const f of features) {
        const prompt = generateFeatureImagePrompt(f.title);
        const res = await generateAIImage({
          prompt,
          apiType: 'mock'
        });
        results[f.title] = res.success ? res.imageUrl || null : null;
      }
      setFeatureImages(results);
    } catch (e) {
      console.error('批量生成特性图片失败', e);
    }
  };

  // 组件加载时自动生成图片
  useEffect(() => {
    regenerateAllFeatureImages();
  }, []);

  return (
    <div className="min-h-screen">
      <AppleNavigation />
      <AppleHero onScrollToGenerator={scrollToGenerator} />
      <AppleFeatures 
        featureImages={featureImages}
        onRegenerateAll={regenerateAllFeatureImages}
      />
      <AppleFooter />
    </div>
  );
};
