import React from 'react';

interface HeroSectionProps {
  onScrollToGenerator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToGenerator }) => {
  return (
    <div className="hero-section relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 主标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            重新定义Facebook文案
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            基于AI大模型技术，智能生成高转化率的广告文案，助力企业出海营销
          </p>
          
          {/* 统计数据 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">成功生成文案</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-purple-600 mb-2">90+</div>
              <div className="text-gray-600 font-medium">支持地区</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-pink-600 mb-2">1,200+</div>
              <div className="text-gray-600 font-medium">企业用户</div>
            </div>
          </div>

          {/* CTA按钮 */}
          <div className="flex justify-center">
            <button
              onClick={onScrollToGenerator}
              className="group inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 active:scale-[0.98] transition-all duration-200 shadow-sm w-fit leading-none gap-1"
            >
              <span className="flex items-center">
                立即开始
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* 工具优势 - 4个板块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* 板块1: AI智能生成 */}
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                🤖
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI智能生成</h3>
            <p className="text-gray-600 leading-relaxed">
              基于DeepSeek大模型，智能理解产品特性，自动生成高转化率的广告文案
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">智能分析</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">深度学习</span>
            </div>
          </div>

          {/* 板块2: 全球本土化 */}
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                🌍
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">全球本土化</h3>
            <p className="text-gray-600 leading-relaxed">
              支持90+个国家和地区，自动适配当地语言、文化和表达习惯，提升本土接受度
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">多语言</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">文化适配</span>
            </div>
          </div>

          {/* 板块3: 多风格模板 */}
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                🎨
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">多风格模板</h3>
            <p className="text-gray-600 leading-relaxed">
              提供8种文案风格和多种促销模式，满足不同产品和营销场景的需求
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">多样化</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">个性化</span>
            </div>
          </div>

          {/* 板块4: 智能优化 */}
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">智能优化</h3>
            <p className="text-gray-600 leading-relaxed">
              自动检测敏感词汇，提供合规建议，确保文案符合Facebook广告政策要求
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">合规检测</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">风险控制</span>
            </div>
          </div>
        </div>
      </div>

      {/* 自定义样式 */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};
