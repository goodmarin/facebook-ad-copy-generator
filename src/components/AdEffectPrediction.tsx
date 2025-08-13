import { JSX } from 'react';
import { EffectPrediction } from '../types';
import { TrendingUp, Star, Lightbulb, AlertTriangle } from 'lucide-react';

// 统一评分格式为星星符号
const normalizeRating = (rating: string): string => {
  // 移除所有空格
  const cleanRating = rating.replace(/\s+/g, '');
  
  // 如果已经是星星格式，确保总是5颗星
  if (cleanRating.includes('★') || cleanRating.includes('☆')) {
    const starCount = (cleanRating.match(/★/g) || []).length;
    const emptyStarCount = (cleanRating.match(/☆/g) || []).length;
    const totalStars = starCount + emptyStarCount;
    
    // 如果已经是5颗星，直接返回
    if (totalStars === 5) {
      return cleanRating;
    }
    
    // 如果不是5颗星，重新构建
    let result = '';
    for (let i = 0; i < starCount; i++) {
      result += '★';
    }
    while (result.length < 5) {
      result += '☆';
    }
    return result;
  }
  
  // 提取数字评分
  const numberMatch = cleanRating.match(/(\d+(?:\.\d+)?)/);
  if (numberMatch) {
    const score = parseFloat(numberMatch[1]);
    const maxScore = cleanRating.includes('5') || cleanRating.includes('10') ? 
      (cleanRating.includes('10') ? 10 : 5) : 5;
    
    // 将评分转换为5星制
    const normalizedScore = maxScore === 10 ? score / 2 : score;
    const fullStars = Math.floor(normalizedScore);
    const hasHalfStar = normalizedScore % 1 >= 0.5;
    
    let result = '';
    for (let i = 0; i < fullStars; i++) {
      result += '★';
    }
    if (hasHalfStar) {
      result += '☆';
    }
    while (result.length < 5) {
      result += '☆';
    }
    
    return result;
  }
  
  // 如果无法解析，返回默认值
  return '★★★☆☆';
};

interface AdEffectPredictionProps {
  prediction: EffectPrediction | null;
  isPredicting: boolean;
  error: string | null;
}

export const AdEffectPrediction = ({
  prediction,
  isPredicting,
  error
}: AdEffectPredictionProps): JSX.Element | null => {
  // 如果有错误，显示错误信息
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-center">
          <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
          <span className="text-sm text-red-700">效果预测暂不可用</span>
        </div>
      </div>
    );
  }

  // 如果正在预测或没有预测结果，显示加载状态
  if (isPredicting || !prediction) {
    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
        <div className="flex items-center mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-sm font-semibold text-blue-800">📊 效果预测</h4>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="loading-spinner w-5 h-5 mr-3"></div>
          <span className="text-sm text-blue-700 font-medium">正在使用 DeepSeek AI 分析广告效果...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
      <div className="flex items-center mb-3">
        <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
        <h4 className="text-sm font-semibold text-green-800">效果预测</h4>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* CTR 预测 */}
        <div className="bg-white/80 rounded-lg p-3 border border-green-100">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
            <span className="text-xs font-medium text-gray-700">预估点击率</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-blue-600">{prediction.ctr}</div>
        </div>

        {/* 效果评分 */}
        <div className="bg-white/80 rounded-lg p-3 border border-green-100">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-yellow-600 mr-1" />
            <span className="text-xs font-medium text-gray-700">效果评分</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-yellow-600">
            {prediction.rating.includes('★') || prediction.rating.includes('☆') 
              ? prediction.rating 
              : normalizeRating(prediction.rating)}
          </div>
        </div>

        {/* 优化建议 */}
        <div className="bg-white/80 rounded-lg p-3 border border-green-100 sm:col-span-1">
          <div className="flex items-center mb-2">
            <Lightbulb className="w-4 h-4 text-orange-600 mr-1" />
            <span className="text-xs font-medium text-gray-700">优化建议</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">{prediction.suggestion}</div>
        </div>
      </div>

      {/* 说明文字 */}
      <div className="mt-3 pt-3 border-t border-green-200">
        <p className="text-xs text-green-700">
          💡 提示：此预测基于AI分析，仅供参考。实际效果可能因市场环境、受众群体等因素而有所不同。
        </p>
      </div>
    </div>
  );
}; 