import React, { useState } from 'react';

interface ProductAnalysisProps {
  copies: any[];
  isLoading: boolean;
}

const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ copies, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // 只在未生成文案时显示
  if (copies.length > 0 || isLoading) {
    return null;
  }

  // 所有工具数据 - 使用各平台的真实favicon
  const allTools = [
    {
      name: "加拿大销售榜",
      description: "加拿大亚马逊销售排行榜",
      url: "https://www.amazon.ca/Best-Sellers/zgbs",
      icon: "https://www.amazon.ca/favicon.ico",
      fallbackIcon: "🇨🇦",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Walmart Bestsellers",
      description: "Walmart平台最受欢迎产品列表",
      url: "https://www.walmart.com/browse/top-sellers",
      icon: "https://www.walmart.com/favicon.ico",
      fallbackIcon: "🛒",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "谷歌商机洞察",
      description: "查看全球各国产品类别的具体市场需求",
      url: "https://www.thinkwithgoogle.com/",
      icon: "https://www.google.com/favicon.ico",
      fallbackIcon: "🔍",
      color: "from-purple-500 to-blue-500"
    },
    {
      name: "Most Wished For",
      description: "亚马逊买家愿望清单",
      url: "https://www.amazon.com/gp/registry/wishlist",
      icon: "https://www.amazon.com/favicon.ico",
      fallbackIcon: "💝",
      color: "from-pink-500 to-red-500"
    },
    {
      name: "美亚销售榜",
      description: "美国亚马逊销售排行榜",
      url: "https://www.amazon.com/Best-Sellers/zgbs",
      icon: "https://www.amazon.com/favicon.ico",
      fallbackIcon: "🇺🇸",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Temu Bestsellers",
      description: "每日更新的Temu最受欢迎榜单",
      url: "https://www.temu.com/",
      icon: "https://www.temu.com/favicon.ico",
      fallbackIcon: "🛍️",
      color: "from-red-500 to-red-600"
    },
    {
      name: "英亚销售榜",
      description: "英国亚马逊销售排行榜",
      url: "https://www.amazon.co.uk/Best-Sellers/zgbs",
      icon: "https://www.amazon.co.uk/favicon.ico",
      fallbackIcon: "🇬🇧",
      color: "from-blue-600 to-red-600"
    },
    {
      name: "日亚销售榜",
      description: "日本亚马逊销售排行榜（需VPN）",
      url: "https://www.amazon.co.jp/Best-Sellers/zgbs",
      icon: "https://www.amazon.co.jp/favicon.ico",
      fallbackIcon: "🇯🇵",
      color: "from-red-500 to-white"
    },
    // 新增更多选品工具
    {
      name: "eBay热销榜",
      description: "eBay平台最热销产品排行",
      url: "https://www.ebay.com/trending/",
      icon: "https://www.ebay.com/favicon.ico",
      fallbackIcon: "📦",
      color: "from-green-500 to-blue-600"
    },
    {
      name: "Shopee热销",
      description: "Shopee东南亚热销产品",
      url: "https://shopee.com.my/",
      icon: "https://shopee.com.my/favicon.ico",
      fallbackIcon: "🦐",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Lazada热销",
      description: "Lazada东南亚热销榜单",
      url: "https://www.lazada.com.my/",
      icon: "https://www.lazada.com.my/favicon.ico",
      fallbackIcon: "🛒",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "速卖通热销",
      description: "AliExpress全球热销产品",
      url: "https://www.aliexpress.com/",
      icon: "https://www.aliexpress.com/favicon.ico",
      fallbackIcon: "🚀",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Etsy热销",
      description: "Etsy手工艺品热销榜",
      url: "https://www.etsy.com/trending",
      icon: "https://www.etsy.com/favicon.ico",
      fallbackIcon: "🎨",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Wish热销",
      description: "Wish平台热门产品",
      url: "https://www.wish.com/",
      icon: "https://www.wish.com/favicon.ico",
      fallbackIcon: "⭐",
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Target热销",
      description: "Target热门产品排行",
      url: "https://www.target.com/c/top-deals/-/N-5q0f9",
      icon: "https://www.target.com/favicon.ico",
      fallbackIcon: "🎯",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Best Buy热销",
      description: "Best Buy电子产品热销榜",
      url: "https://www.bestbuy.com/site/electronics/top-deals/pcmcat1563299784494.c",
      icon: "https://www.bestbuy.com/favicon.ico",
      fallbackIcon: "💻",
      color: "from-blue-500 to-blue-600"
    }
  ];

  // 计算总页数，每页4个工具（2x2布局）
  const toolsPerPage = 4;
  const totalPages = Math.ceil(allTools.length / toolsPerPage);
  
  // 获取当前页的工具
  const currentTools = allTools.slice(currentPage * toolsPerPage, (currentPage + 1) * toolsPerPage);

  // 轮播控制函数
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900">选品分析</h3>
        </div>
        
        {/* 轮播控制按钮 */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="上一页"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-500 px-2">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="下一页"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* 2x2网格布局 - 每行2个工具，共2行 */}
      <div className="grid grid-cols-2 gap-4">
        {currentTools.map((tool, index) => (
          <div
            key={index}
            className="group cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md hover:scale-105 transition-all duration-200"
            onClick={() => window.open(tool.url, '_blank')}
          >
            <div className="flex items-center space-x-3">
              {/* 图标容器 - 保持清晰度 */}
              <div className="w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src={tool.icon} 
                  alt={tool.name}
                  className="w-7 h-7 object-cover"
                  onError={(e) => {
                    // 如果图片加载失败，显示emoji图标
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-2xl">${tool.fallbackIcon}</span>`;
                      parent.className = `w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`;
                    }
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                  {tool.name}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2 leading-tight">
                  {tool.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAnalysis;
