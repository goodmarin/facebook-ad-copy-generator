import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavigationItem {
  label: string;
  icon: string;
  url?: string;
  children?: Array<{
    label: string;
    url: string;
  }>;
}

const navigationItems: NavigationItem[] = [
  {
    label: '系列课程',
    icon: '📚',
    children: [
      { label: 'Facebook新手课', url: 'https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8' },
      { label: 'Facebook进阶课', url: 'https://cheetahgo.cmcm.com/classes/facebook/684266796287669c0313e7b119d42dba' },
      { label: 'TikTok课程', url: 'https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d' },
      { label: '政策解读课程', url: 'https://cheetahgo.cmcm.com/zixun/all' }
    ]
  },
  {
    label: '线上直播',
    icon: '📺',
    children: [
      { label: '电商出海', url: 'https://cheetahgo.cmcm.com/live/ecommerce' },
      { label: '游戏出海', url: 'https://cheetahgo.cmcm.com/live/gaming' },
      { label: '政策解读', url: 'https://cheetahgo.cmcm.com/live/policy' },
      { label: '新手指导', url: 'https://cheetahgo.cmcm.com/live/guide' }
    ]
  },
  {
    label: '资讯报告',
    icon: '📰',
    children: [
      { label: '独家专栏', url: 'https://cheetahgo.cmcm.com/zixun/dujiazhuanlan' },
      { label: '政策解读', url: 'https://cheetahgo.cmcm.com/zixun/zhengcejiedu' },
      { label: '产品更新', url: 'https://cheetahgo.cmcm.com/zixun/chanpingengxin' },
      { label: '案例精选', url: 'https://cheetahgo.cmcm.com/zixun/anlijingxuan' }
    ]
  },
  {
    label: '线下活动',
    icon: '🎪',
    children: [
      { label: '线下活动', url: 'https://cheetahgo.cmcm.com/events' }
    ]
  },
  {
    label: '营销工具',
    icon: '🔧',
    children: [
      { label: 'Cheetahgo自助平台', url: 'https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9' },
      { label: '合伙人计划', url: 'https://partner.cmcm.com/' },
      { label: '9号艺术工作室', url: 'https://cheetahgo.cmcm.com/studio9' }
    ]
  },
  {
    label: '帮助中心',
    icon: '❓',
    url: 'https://cheetahgo.cmcm.com/help'
  }
];

interface QuickNavigationProps {
  className?: string;
}

export const QuickNavigation: React.FC<QuickNavigationProps> = ({ className = '' }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 py-6 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">快速导航</h2>
        
        {/* 导航栏 */}
        <nav className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 lg:gap-8">
          {navigationItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {/* 一级导航项 */}
              <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer px-2 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-105">
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors whitespace-nowrap text-sm sm:text-base">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </span>
                {item.children && (
                  <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                )}
              </div>
              
              {/* 下拉菜单（移除非点击的标题行） */}
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-300 ease-out scale-in-95">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ease-in-out transform hover:translate-x-1 rounded mx-2"
                    >
                      <span>{child.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
