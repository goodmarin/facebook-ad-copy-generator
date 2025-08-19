import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface MenuItem {
  label: string;
  url?: string;
  children?: MenuItem[];
}

interface AppleNavigationProps {
  onScrollToGenerator?: () => void;
}

const menuItems: MenuItem[] = [
  {
    label: '系列课程',
    children: [
      { label: 'Facebook新手课', url: 'https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8' },
      { label: 'Facebook进阶课', url: 'https://cheetahgo.cmcm.com/classes/facebook/684266796287669c0313e7b119d42dba' },
      { label: 'TikTok课程', url: 'https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d' },
      { label: '政策解读课程', url: 'https://cheetahgo.cmcm.com/zixun/zhengcejiedu' }
    ]
  },
  {
    label: '线上直播',
    children: [
      { label: '电商出海', url: 'https://cheetahgo.cmcm.com/zhibo/ebusiness' },
      { label: '游戏出海', url: 'https://cheetahgo.cmcm.com/zhibo/game' },
      { label: '政策解读', url: 'https://cheetahgo.cmcm.com/zhibo/policy' },
      { label: '新手指导', url: 'https://cheetahgo.cmcm.com/zhibo/guide' }
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
      { label: '9号艺术工作室', url: 'https://overseas.cmcm.com/no9' }
    ]
  },
  {
    label: '帮助中心',
    url: 'https://cheetahgo.cmcm.com/help'
  }
];

export const AppleNavigation: React.FC<AppleNavigationProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/40 shadow-md' 
          : 'bg-white/40 backdrop-blur-lg backdrop-saturate-150 border-b border-white/20 shadow-sm'
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="#/"
                aria-label="返回首页"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <Logo 
                  size="md" 
                  className={`transition-colors duration-300 text-gray-900`}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center space-x-1 cursor-pointer group">
                    <span className={`font-medium transition-colors duration-200 relative ${
                      isScrolled 
                        ? 'text-gray-900 hover:text-gray-700' 
                        : 'text-gray-900 hover:text-gray-700'
                    }`}>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </span>
                    {item.children && (
                      <ChevronDown className={`w-4 h-4 transition-colors duration-200 ${
                        isScrolled ? 'text-gray-600 group-hover:text-gray-800' : 'text-gray-600 group-hover:text-gray-800'
                      }`} />
                    )}
                  </div>
                  
                  {/* 下拉菜单（移除非点击的标题行，首项可点击且样式一致） */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-3 min-w-max bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-2 z-[9999] animate-in fade-in-0 slide-in-from-top-2 duration-300 ease-out">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 ease-in-out transform hover:translate-x-1 hover:scale-105 whitespace-nowrap"
                        >
                          <span>{child.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* 猎豹学院 */}
              <a
                href="https://cheetahgo.cmcm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-gray-900 hover:text-gray-700'
                }`}
              >
                猎豹学院
              </a>
              
              {/* 立即开户按钮 */}
              <a
                href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                立即开户
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100/20 transition-colors duration-200"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute block w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-600' : 'bg-gray-900'
                } ${isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
                <span className={`absolute block w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-600' : 'bg-gray-900'
                } top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-600' : 'bg-gray-900'
                } ${isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-6 bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <div className="text-gray-700 font-medium py-2">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </div>
                  {item.children && (
                    <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-gray-600 hover:text-blue-600 py-1 transition-colors duration-200"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="https://cheetahgo.cmcm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-gray-700 hover:text-blue-600 font-medium py-3 transition-colors duration-200"
                >
                  猎豹学院
                </a>
                <a
                  href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 text-center block mt-2"
                >
                  立即开户
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};
