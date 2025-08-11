import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  url: string;
  date: string;
}

export const NewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news] = useState<NewsItem[]>([
    {
      title: "Facebook广告政策更新：2024年最新投放指南",
      url: "https://cheetahgo.cmcm.com/zixun/zhengcejiedu",
      date: "2小时前"
    },
    {
      title: "TikTok Shop在英国市场表现突出：54%增长",
      url: "https://cheetahgo.cmcm.com/zixun/anlijingxuan",
      date: "3小时前"
    },
    {
      title: "跨境电商新趋势：AI驱动的广告文案优化",
      url: "https://cheetahgo.cmcm.com/zixun/dujiazhuanlan",
      date: "5小时前"
    },
    {
      title: "Google广告账户优化技巧：提升ROI的实用方法",
      url: "https://cheetahgo.cmcm.com/zixun/chanpingengxin",
      date: "1天前"
    },
    {
      title: "亚马逊广告投放策略：从新手到专家的完整指南",
      url: "https://cheetahgo.cmcm.com/zixun/all",
      date: "2天前"
    }
  ]);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [news.length]);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">跨境快讯</h3>
        <a 
          href="https://cheetahgo.cmcm.com/zixun/all" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
        >
          更多
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
      
      <div className="relative h-16 overflow-hidden">
        <div 
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          {news.map((item, index) => (
            <div key={index} className="h-16 flex-shrink-0">
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 p-2 rounded transition-colors h-full"
              >
                <div className="text-xs text-gray-900 line-clamp-2 mb-1 leading-tight">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">
                  {item.date}
                </div>
              </a>
            </div>
          ))}
        </div>
        
        {/* 轮播控制按钮 */}
        <button
          onClick={prevNews}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full p-1 transition-all"
        >
          <ChevronUp className="w-3 h-3 text-gray-600" />
        </button>
        <button
          onClick={nextNews}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full p-1 transition-all"
        >
          <ChevronDown className="w-3 h-3 text-gray-600" />
        </button>
      </div>
      
      {/* 轮播指示器 */}
      <div className="flex justify-center mt-2 space-x-1">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
