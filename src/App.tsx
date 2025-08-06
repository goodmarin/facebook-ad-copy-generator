import React, { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { InputForm } from './components/InputForm';
import { MetaLogo } from './components/MetaLogo';
import { CountdownTimer } from './components/CountdownTimer';
import { useOpenAI } from './hooks/useOpenAI';
import { ProductInfo } from './types';
import { checkForbiddenCategory } from './utils/sensitiveWords';

// 懒加载组件
const LazyOutputDisplay = React.lazy(() => import('./components/OutputDisplay').then(module => ({ default: module.OutputDisplay })));

const App: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: '',
    features: '',
    targetAudience: '',
    region: '',
    style: '',
    tone: ''
  });

  const [generatedCopies, setGeneratedCopies] = useState<string[]>([]);
  const { generateCopies, isLoading, error, clearError } = useOpenAI();

  // 性能优化：预加载关键资源
  useEffect(() => {
    // 预加载关键字体
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=SF+Pro+Display:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);

    // 预加载关键图片
    const img = new Image();
    img.src = 'https://7578-ux-new-cms-8gd8ix3g0aa5a108-1252921383.tcb.qcloud.la/cloudbase-cms/upload/2023-03-22/s40ex00l1ikhrlkwx94osckfnwv8bmwp_.png?sign=cca43c2053cdfe248375cc6a08645f52&t=1679467813';
  }, []);

  const handleSubmit = useCallback(async () => {
    clearError();
    const copies = await generateCopies(productInfo);
    setGeneratedCopies(copies);
  }, [productInfo, generateCopies, clearError]);

  // 优化功能卡片数据
  const featureCards = useMemo(() => [
    { title: '多语言支持' },
    { title: '多种文案风格' },
    { title: '敏感词检测' },
    { title: '响应式设计' },
    { title: '一键复制' },
    { title: '快速生成' },
    { title: 'DeepSeek AI' }
  ], []);

  // 检查产品信息是否包含黑五类
  const isForbiddenProduct = useMemo(() => {
    return checkForbiddenCategory(productInfo.name + ' ' + productInfo.features);
  }, [productInfo.name, productInfo.features]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* 头部 - 参考CheetahGo设计 */}
      <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-8 relative">
            {/* 左侧占位，保持平衡 */}
            <div className="w-32"></div>
            
            {/* 中间标题和Logo - 完全居中显示 */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-start justify-center">
                <div className="transform transition-transform duration-200 mr-3 mt-1">
                  <MetaLogo className="text-white" size={32} />
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-1">
                    Facebook爆款广告文案生成器
                  </h1>
                </div>
              </div>
            </div>
            
            {/* 右侧友联链接 - 缩小尺寸 */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
              >
                立即开户
              </a>
              <a 
                href="https://cheetahgo.cmcm.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
              >
                猎豹学院
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 分割线 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-sm"></div>
      
      {/* 功能特点 - Meta风格 */}
      <section className="text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          {/* 功能卡片网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {featureCards.map((card, index) => (
              <div key={index} className="group">
                <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 transform group-hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border border-white/15 text-center flex items-center justify-center min-h-[70px]">
                  <span className="text-xs sm:text-sm font-medium text-white/90 leading-tight px-1">{card.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 倒计时板块 */}
      <div className="text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 倒计时内容 - 跨越整个宽度，与产品信息和生成结果对齐 */}
            <div className="lg:col-span-3">
              <div className="w-full">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧产品信息 */}
          <div className="lg:col-span-1">
            <div className="card bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl h-full">
              <div className="flex items-center mb-4 p-6 pb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">📝</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">产品信息</h2>
              </div>
              <div className="px-6 pb-6 flex-1 w-full">
                <InputForm
                  productInfo={productInfo}
                  onProductInfoChange={setProductInfo}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          {/* 右侧生成结果和快速导航 */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-6">
            {/* 生成结果 */}
            <div className="card bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl min-h-[600px]">
              <div className="flex items-center mb-4 p-6 pb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">✨</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">生成结果</h2>
              </div>
              <div className="px-6 pb-8 min-h-0 overflow-hidden">
                <Suspense fallback={<div className="flex items-center justify-center h-32">加载中...</div>}>
                  <LazyOutputDisplay
                    copies={generatedCopies}
                    region={productInfo.region}
                    isLoading={isLoading}
                    error={error}
                    isForbiddenProduct={isForbiddenProduct}
                  />
                </Suspense>
              </div>
            </div>

            {/* 快速导航 */}
            <div className="card bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-6">快速导航</h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                  {/* 系列课程 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                      系列课程
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        Facebook新手课
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/classes/facebook/684266796287669c0313e7b119d42dba" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        Facebook进阶课
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        TikTok课程
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/all" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        政策解读课程
                      </a>
                    </div>
                  </div>

                  {/* 线上直播 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                      线上直播
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://cheetahgo.cmcm.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        电商出海
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        游戏出海
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        政策解读
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        新手指导
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        进阶指南
                      </a>
                    </div>
                  </div>

                  {/* 资讯报告 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                      资讯报告
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/dujiazhuanlan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        独家专栏
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/zhengcejiedu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        政策解读
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/chanpingengxin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        产品更新
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/zhanghuzhuye" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        账户主页
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/anlijingxuan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        案例精选
                      </a>
                      <a 
                        href="https://cheetahgo.cmcm.com/zixun/baogaodongcha" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        报告洞察
                      </a>
                    </div>
                  </div>

                  {/* 线下活动 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                      线下活动
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://cheetahgo.cmcm.com/xianxia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        线下活动
                      </a>
                    </div>
                  </div>

                  {/* 营销工具 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                      营销工具
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        Cheetahgo客户自助平台
                      </a>
                      <a 
                        href="https://partner.cmcm.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        合伙人计划
                      </a>
                      <a 
                        href="https://overseas.cmcm.com/no9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        9号艺术工作室
                      </a>
                    </div>
                  </div>

                  {/* 帮助中心 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                      帮助中心
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://cheetahgo.cmcm.com/help" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block py-1 transition-colors duration-200"
                      >
                        帮助中心
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部 - 参考CheetahGo网站设计 */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 主要内容区域 */}
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px',
              alignItems: 'end'
            }}
          >
            {/* 猎豹服务 */}
            <div 
              className="flex flex-col h-full" 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-white">猎豹服务</h3>
              <ul className="space-y-2 flex-1">
                <li>
                  <a 
                    href="https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Facebook广告
                  </a>
                </li>
                <li>
                  <a 
                    href="https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    TikTok广告
                  </a>
                </li>
                <li>
                  <a 
                    href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    客户自助平台
                  </a>
                </li>
                <li>
                  <a 
                    href="https://overseas.cmcm.com/no9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    9号艺术工作室
                  </a>
                </li>
              </ul>
            </div>

            {/* 联系我们 */}
            <div 
              className="flex flex-col h-full" 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-white">联系我们</h3>
              <ul className="space-y-2 text-gray-300 flex-1">
                <li>咨询热线：400-603-7779</li>
                <li>咨询邮箱：adoverseas@cmcm.com</li>
                <li className="text-sm leading-relaxed">总部地址：北京市朝阳区三间房南里7号万东科技文创园11号楼</li>
              </ul>
            </div>

            {/* 官方公众号 */}
            <div 
              className="flex flex-col h-full" 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-white">官方公众号</h3>
              <div className="flex-1 flex flex-col">
                {/* 二维码 - 缩小尺寸 */}
                <div className="w-24 h-24 mb-3">
                  <img 
                    src="https://7578-ux-new-cms-8gd8ix3g0aa5a108-1252921383.tcb.qcloud.la/cloudbase-cms/upload/2023-03-22/s40ex00l1ikhrlkwx94osckfnwv8bmwp_.png?sign=cca43c2053cdfe248375cc6a08645f52&t=1679467813&v=5&ts=1754461800" 
                    alt="猎豹国际广告官方公众号二维码" 
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // 如果图片加载失败，显示备用样式
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* 备用二维码样式 - 当图片加载失败时显示 */}
                  <div className="w-full h-full bg-black rounded-lg flex items-center justify-center relative hidden">
                    <div className="grid grid-cols-7 gap-0.5 w-20 h-20">
                      {/* 简化的二维码图案 */}
                      <div className="bg-white w-1 h-1"></div>
                      <div className="bg-black w-1 h-1"></div>
                      <div className="bg-white w-1 h-1"></div>
                      <div className="bg-black w-1 h-1"></div>
                      <div className="bg-white w-1 h-1"></div>
                      <div className="bg-black w-1 h-1"></div>
                      <div className="bg-white w-1 h-1"></div>
                      {/* 更多图案... */}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-orange-500 rounded-lg p-1 w-6 h-6 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">CMT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 关于我们 */}
            <div 
              className="flex flex-col h-full" 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-white">关于我们</h3>
              <div className="flex-1">
                <p className="text-gray-300 text-sm leading-relaxed">
                  专业的Facebook广告文案生成工具，基于React + Tailwind CSS + DeepSeek构建，
                  为广告主提供高质量的文案创作服务。与猎豹移动深度合作，助力企业出海营销。
                </p>
              </div>
            </div>
          </div>
          
          {/* 版权信息 - 参考CheetahGo设计 */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              猎豹移动 © 2024 • 京公网安备11010502025911号，京ICP备12038800号-7
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 