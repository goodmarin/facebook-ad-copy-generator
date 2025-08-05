import { useState } from 'react';
import { ProductInfo, OpenAIResponse } from '../types';
import { generatePrompt, parseGeneratedCopies } from '../utils/prompts';

interface UseOpenAIResult {
  generateCopies: (productInfo: ProductInfo) => Promise<string[]>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useOpenAI = (): UseOpenAIResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCopies = async (productInfo: ProductInfo): Promise<string[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // 使用 DeepSeek API
      const apiKey = 'sk-674b29e0b86846bca55195b66eb3e3aa';
      
      // 生成 Prompt
      const { system, user } = generatePrompt(productInfo);

      // 调用 DeepSeek API
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
              content: system
            },
            {
              role: 'user',
              content: user
            }
          ],
          max_tokens: 800,
          temperature: 0.8,
          top_p: 0.9,
          // 添加语言参数
          response_format: { type: "text" }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API 请求失败: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('AI 未返回有效内容');
      }

      // 解析生成的文案
      const copies = parseGeneratedCopies(content);
      
      if (copies.length === 0) {
        throw new Error('无法解析生成的文案，请重试');
      }

      return copies;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '生成文案时发生未知错误';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    generateCopies,
    isLoading,
    error,
    clearError
  };
}; 