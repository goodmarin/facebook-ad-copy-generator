import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface MenuItem {
  label: string;
  url?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: '系列课程',
    children: [
      { label: 'Facebook新手课', url: 'https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8' },
      { label: 'Facebook进阶课', url: 'https://cheetahgo.cmcm.com/classes/facebook/684266796287669c0313e7b119d42dba' },
      { label: 'TikTok课程', url: 'https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d' },
      { label: '政策解读课程', url: 'https://cheetahgo.cmcm.com/zixun/all' }
    ]
  },
  {
    label: '线上直播',
    children: [
      { label: '电商出海', url: 'https://cheetahgo.cmcm.com/live/ecommerce' },
      { label: '游戏出海', url: 'https://cheetahgo.cmcm.com/live/gaming' },
      { label: '政策解读', url: 'https://cheetahgo.cmcm.com/live/policy' },
      { label: '新手指导', url: 'https://cheetahgo.cmcm.com/live/guide' }
    ]
  },
  {
    label: '资讯报告',
    children: [
      { label: '独家专栏', url: 'https://cheetahgo.cmcm.com/zixun/dujiazhuanlan' },
      { label: '政策解读', url: 'https://cheetahgo.cmcm.com/zixun/zhengcejiedu' },
      { label: '产品更新', url: 'https://cheetahgo.cmcm.com/zixun/chanpingengxin' },
      { label: '案例精选', url: 'https://cheetahgo.cmcm.com/zixun/anlijingxuan' }
    ]
  },
  {
    label: '营销工具',
    children: [
      { label: 'Cheetahgo自助平台', url: 'https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9' },
      { label: '合伙人计划', url: 'https://partner.cmcm.com/' },
      { label: '9号艺术工作室', url: 'https://cheetahgo.cmcm.com/studio9' }
    ]
  },
  {
    label: '帮助中心',
    url: 'https://cheetahgo.cmcm.com/help'
  }
];

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={`flex items-center space-x-8 ${className}`}>
      {menuItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center space-x-1 cursor-pointer group">
            <span className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </span>
            {item.children && (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            )}
          </div>
          
          {/* 下拉菜单 */}
          {item.children && activeDropdown === item.label && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {item.children.map((child) => (
                <a
                  key={child.label}
                  href={child.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span>{child.label}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
