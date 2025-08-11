import { useState } from 'react';
import { EffectPrediction, EffectPredictionResponse } from '../types';

interface UseEffectPredictionResult {
  predictEffect: (copyText: string) => Promise<EffectPrediction | null>;
  isPredicting: boolean;
  predictionError: string | null;
  clearPredictionError: () => void;
}

export const useEffectPrediction = (): UseEffectPredictionResult => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState<string | null>(null);

  // 缓存预测结果
  const predictionCache = new Map<string, EffectPrediction>();

  const predictEffect = async (copyText: string): Promise<EffectPrediction | null> => {
    setIsPredicting(true);
    setPredictionError(null);

    console.log('开始效果预测，文案:', copyText.substring(0, 50) + '...');

    // 检查缓存
    const cacheKey = copyText.substring(0, 100); // 使用前100个字符作为缓存键
    if (predictionCache.has(cacheKey)) {
      console.log('使用缓存的预测结果');
      setIsPredicting(false);
      return predictionCache.get(cacheKey) || null;
    }

    try {
      // 使用环境变量中的 API key，如果没有则使用默认值
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-674b29e0b86846bca55195b66eb3e3aa';
      
      // 构建效果预测的prompt
      const prompt = `请对以下 Facebook 广告文案进行营销效果预测，输出格式如下：
- 预估点击率（CTR）百分比（例如 3.2%）
- 效果评分（1~5星）
- 简短优化建议

文案内容：『${copyText}』

请严格按照以下格式返回，不要添加其他内容：
CTR: [百分比]
评分: [星级]
建议: [一句话建议]`;

      console.log('调用 DeepSeek API...');

      // 调用 DeepSeek API，使用更快的参数
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
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
              content: prompt
            }
          ],
          max_tokens: 150, // 减少token数量
          temperature: 0.1, // 降低随机性，提高速度
          top_p: 0.8 // 降低top_p，提高速度
        })
      });

      console.log('API响应状态:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API错误:', errorData);
        throw new Error(errorData.error?.message || `效果预测API请求失败: ${response.status}`);
      }

      const data: EffectPredictionResponse = await response.json();
      console.log('API响应数据:', data);
      
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('效果预测AI未返回有效内容');
      }

      console.log('AI返回内容:', content);

      // 解析效果预测结果
      const prediction = parseEffectPrediction(content);
      
      if (!prediction) {
        throw new Error('无法解析效果预测结果，请重试');
      }

      console.log('解析后的预测结果:', prediction);

      // 缓存结果
      if (prediction) {
        predictionCache.set(cacheKey, prediction);
      }

      return prediction;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '效果预测时发生未知错误';
      console.error('效果预测错误:', err);
      setPredictionError(errorMessage);
      return null;
    } finally {
      setIsPredicting(false);
    }
  };

  const clearPredictionError = () => {
    setPredictionError(null);
  };

  return {
    predictEffect,
    isPredicting,
    predictionError,
    clearPredictionError
  };
};

// 解析效果预测结果
const parseEffectPrediction = (content: string): EffectPrediction | null => {
  try {
    console.log('开始解析预测结果:', content);
    
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
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

    console.log('解析结果:', { ctr, rating, suggestion });

    // 验证结果
    if (!ctr || !rating || !suggestion) {
      console.warn('效果预测结果格式不完整:', { ctr, rating, suggestion });
      return null;
    }

    return {
      ctr,
      rating,
      suggestion
    };
  } catch (error) {
    console.error('解析效果预测结果失败:', error);
    return null;
  }
}; 