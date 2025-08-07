import React from 'react';
import { EffectPrediction } from '../types';
import { TrendingUp, Star, Lightbulb, AlertTriangle } from 'lucide-react';

interface AdEffectPredictionProps {
  prediction: EffectPrediction | null;
  isPredicting: boolean;
  error: string | null;
}

export const AdEffectPrediction: React.FC<AdEffectPredictionProps> = ({
  prediction,
  isPredicting,
  error
}) => {
  if (isPredicting) {
    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
        <div className="flex items-center justify-center">
          <div className="loading-spinner w-5 h-5 mr-3"></div>
          <span className="text-sm text-blue-700 font-medium">预测中...</span>
        </div>
      </div>
    );
  }

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

  if (!prediction) {
    return null;
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
          <div className="text-base sm:text-lg font-bold text-yellow-600">{prediction.rating}</div>
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