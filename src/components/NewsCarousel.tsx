import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  date: string;
  url: string;
}

interface NewsCarouselProps {
  show?: boolean;
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ show = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsItems] = useState<NewsItem[]>([
    {
      title: "猎豹移动宣布控股UFACTORY",
      date: "2025-07-28",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "猎户星空语音交互机器人上岗SAP中国研究院",
      date: "2025-07-16",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "喜讯！猎豹旗下聚云科技与极狐GitLab达成战略合作",
      date: "2025-07-16",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "祝贺！猎豹旗下聚云科技荣膺亚马逊云科技核心级合作伙伴",
      date: "2025-07-08",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "傅盛：机器人行业的\"非共识\"实践",
      date: "2025-06-09",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "猎户星空大模型发布！傅盛：企业应用百亿参数就够了",
      date: "2024-01-23",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "傅盛在央视财经解密Sora：AI如何复刻人类推理和直觉？",
      date: "2024-03-01",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    },
    {
      title: "《财经》专访傅盛：开启企业私有化大模型新纪元",
      date: "2024-03-01",
      url: "https://www.cmcm.com/zh-CN/cm-news"
    }
  ]);

  // 计算显示区域能容纳的新闻条数
  const visibleCount = 4; // 显示4条新闻
  const itemHeight = 48; // 每条新闻高度48px

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // 当到达最后一组时，重置到开始位置
        if (prevIndex >= newsItems.length - visibleCount) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000); // 每3秒切换一次

    return () => clearInterval(timer);
  }, [newsItems.length, visibleCount]);

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank');
  };

  if (!show) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900">新闻资讯</h3>
      </div>
      
      <div className="flex">
        <div className="flex-1 relative overflow-hidden" style={{ height: `${visibleCount * itemHeight}px` }}>
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * itemHeight}px)` }}
          >
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="h-12 flex items-center cursor-pointer group py-2"
                onClick={() => handleNewsClick(item.url)}
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.date}
                  </div>
                </div>
                <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="ml-4 flex flex-col space-y-1 justify-center">
          {newsItems.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
