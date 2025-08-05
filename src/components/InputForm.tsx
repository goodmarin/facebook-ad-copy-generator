import React, { useCallback, memo } from 'react';
import { ProductInfo } from '../types';
import { REGIONS, STYLE_OPTIONS, TONE_OPTIONS } from '../utils/languages';

interface InputFormProps {
  productInfo: ProductInfo;
  onProductInfoChange: (info: ProductInfo) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = memo(({
  productInfo,
  onProductInfoChange,
  onSubmit,
  isLoading
}) => {
  const handleInputChange = useCallback((field: keyof ProductInfo, value: string) => {
    onProductInfoChange({
      ...productInfo,
      [field]: value
    });
  }, [productInfo, onProductInfoChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit();
    }
  }, [isLoading, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* 产品名称 */}
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
          产品名称 *
        </label>
        <input
          type="text"
          id="productName"
          value={productInfo.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="input-field"
          placeholder="例如：轻便折叠电动滑板车"
          required
        />
      </div>

      {/* 产品特性 */}
      <div>
        <label htmlFor="productFeatures" className="block text-sm font-medium text-gray-700 mb-2">
          产品特性 *
        </label>
        <textarea
          id="productFeatures"
          value={productInfo.features}
          onChange={(e) => handleInputChange('features', e.target.value)}
          className="input-field resize-none"
          rows={4}
          placeholder="描述产品的主要特点和优势，例如：续航强、轻便可提、适合城市通勤"
          required
        />
      </div>

      {/* 受众人群 */}
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
          受众人群 *
        </label>
        <input
          type="text"
          id="targetAudience"
          value={productInfo.targetAudience}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          className="input-field"
          placeholder="例如：年轻上班族、户外爱好者、年轻女性"
          required
        />
      </div>

      {/* 投放地区 */}
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          投放地区 *
        </label>
        <select
          id="region"
          value={productInfo.region}
          onChange={(e) => handleInputChange('region', e.target.value)}
          className="input-field pr-20"
          required
        >
          <option value="">请选择</option>
          {REGIONS.map((region) => (
            <option key={region.code} value={region.code}>
              {region.flag} {region.name}
            </option>
          ))}
        </select>
      </div>

      {/* 文案风格 */}
      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
          文案风格 *
        </label>
        <select
          id="style"
          value={productInfo.style}
          onChange={(e) => handleInputChange('style', e.target.value)}
          className="input-field pr-20"
          required
        >
          <option value="">请选择</option>
          {STYLE_OPTIONS.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
        {productInfo.style && (
          <p className="mt-1 text-sm text-gray-500">
            {STYLE_OPTIONS.find(s => s.value === productInfo.style)?.description}
          </p>
        )}
      </div>

      {/* 语气风格 */}
      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
          语气风格 *
        </label>
        <select
          id="tone"
          value={productInfo.tone}
          onChange={(e) => handleInputChange('tone', e.target.value)}
          className="input-field pr-20"
          required
        >
          <option value="">请选择</option>
          {TONE_OPTIONS.map((tone) => (
            <option key={tone.value} value={tone.value}>
              {tone.label}
            </option>
          ))}
        </select>
        {productInfo.tone && (
          <p className="mt-1 text-sm text-gray-500">
            {TONE_OPTIONS.find(t => t.value === productInfo.tone)?.description}
          </p>
        )}
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={isLoading || !productInfo.name || !productInfo.features || !productInfo.targetAudience || !productInfo.region || !productInfo.style || !productInfo.tone}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loading-spinner mr-2"></div>
            生成中...
          </div>
        ) : (
          '生成文案'
        )}
      </button>

      {/* 填写提示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
          <span className="text-lg mr-2">💡</span>
          填写技巧
        </h4>
        <ul className="text-xs text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">•</span>
            <span className="flex-1">产品名称要简洁明了，突出核心卖点</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">•</span>
            <span className="flex-1">产品特性描述要具体，包含功能和优势</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">•</span>
            <span className="flex-1">受众人群要精准定位，便于文案针对性</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">•</span>
            <span className="flex-1">选择合适的文案风格和语气</span>
          </li>
        </ul>
      </div>

      {/* 快速模板 */}
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
        <h4 className="text-sm font-medium text-green-800 mb-3 flex items-center">
          <span className="text-lg mr-2">⚡</span>
          快速模板
        </h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              onProductInfoChange({
                ...productInfo,
                name: "智能无线耳机",
                features: "主动降噪、长续航、快速充电、舒适佩戴、高清音质",
                targetAudience: "年轻上班族、音乐爱好者、运动健身人群",
                style: "professional",
                tone: "friendly"
              });
            }}
            className="w-full text-left p-2 bg-white/80 rounded-lg hover:bg-white transition-colors text-xs text-gray-700"
          >
            🎧 智能耳机模板
          </button>
          <button
            type="button"
            onClick={() => {
              onProductInfoChange({
                ...productInfo,
                name: "便携充电宝",
                features: "大容量、快充技术、小巧便携、多接口兼容、安全保护",
                targetAudience: "商务人士、学生群体、旅行爱好者",
                style: "casual",
                tone: "enthusiastic"
              });
            }}
            className="w-full text-left p-2 bg-white/80 rounded-lg hover:bg-white transition-colors text-xs text-gray-700"
          >
            🔋 充电宝模板
          </button>
          <button
            type="button"
            onClick={() => {
              onProductInfoChange({
                ...productInfo,
                name: "护肤精华液",
                features: "天然成分、深层滋养、改善肤质、温和不刺激、快速吸收",
                targetAudience: "年轻女性、护肤爱好者、敏感肌人群",
                style: "elegant",
                tone: "caring"
              });
            }}
            className="w-full text-left p-2 bg-white/80 rounded-lg hover:bg-white transition-colors text-xs text-gray-700"
          >
            ✨ 护肤品模板
          </button>
        </div>
      </div>
    </form>
  );
}); 