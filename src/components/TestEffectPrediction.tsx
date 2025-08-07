import React, { useState } from 'react';
import { useEffectPrediction } from '../hooks/useEffectPrediction';
import { AdEffectPrediction } from './AdEffectPrediction';

export const TestEffectPrediction: React.FC = () => {
  const [testCopy, setTestCopy] = useState('🚀 Transform your fitness journey with our advanced smartwatch! 💪 Track your workouts, monitor heart rate, and get personalized insights. Stay motivated with real-time coaching. ⏰ Limited time offer - upgrade your health today! 🔥 Don\'t wait, start your transformation now!');
  const [prediction, setPrediction] = useState<any>(null);
  const { predictEffect, isPredicting, predictionError } = useEffectPrediction();

  const handleTestPrediction = async () => {
    const result = await predictEffect(testCopy);
    setPrediction(result);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">效果预测功能测试</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          测试文案：
        </label>
        <textarea
          value={testCopy}
          onChange={(e) => setTestCopy(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="输入要测试的广告文案..."
        />
      </div>

      <button
        onClick={handleTestPrediction}
        disabled={isPredicting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPredicting ? '预测中...' : '开始预测'}
      </button>

      {/* 效果预测结果 */}
      <div className="mt-6">
        <AdEffectPrediction
          prediction={prediction}
          isPredicting={isPredicting}
          error={predictionError}
        />
      </div>

      {/* 调试信息 */}
      {prediction && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">调试信息：</h3>
          <pre className="text-sm">{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
