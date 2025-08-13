import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// 恐龙头部剪影SVG组件 - 简洁的霸王龙头部轮廓
const DinosaurIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    viewBox="0 0 100 60" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 霸王龙头部剪影 - 侧面朝右，嘴巴张开，露出牙齿 */}
    <path d="M85 25c-2-3-5-5-8-6-3-1-6-1-9 0-3 1-5 3-7 5-2 2-3 5-4 8-1 3-1 6 0 9 1 3 3 5 5 7 2 2 5 3 8 4 3 1 6 1 9 0 3-1 5-3 7-5 2-2 3-5 4-8 1-3 1-6 0-9-1-3-3-5-5-7z"/>
    
    {/* 眼睛 - 三角形镂空 */}
    <path d="M70 25c-1-1-2-1-3 0-1 1-1 2 0 3 1 1 2 1 3 0 1-1 1-2 0-3z" fill="none" stroke="currentColor" strokeWidth="1"/>
    
    {/* 鼻孔 - 小三角形 */}
    <path d="M80 20c-1 0-2 0-2 1-1 1-1 2 0 2 1 1 2 1 2 1 1 0 2-1 2-1 1-1 1-2 0-2-1-1-2-1-2-1z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
    
    {/* 嘴巴和牙齿 - 上下颚的尖锐牙齿 */}
    <path d="M90 30l-3-4-3-3-3-2-3-1-3 0-3 1-3 2-3 3-3 4M90 40l-3 4-3 3-3 2-3 1-3 0-3-1-3-2-3-3-3-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizeClasses = {
    sm: { title: 'text-lg', subtitle: 'text-xs' },
    md: { title: 'text-xl', subtitle: 'text-sm' },
    lg: { title: 'text-2xl', subtitle: 'text-base' }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* 恐龙Logo容器 - 带圆角和渐变背景 */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-700`}>
        <DinosaurIcon className={`${iconSizeClasses[size]} text-white`} />
      </div>
      
      {/* 文字部分 */}
      <div className="ml-3">
        <div className={`${textSizeClasses[size].title} font-bold text-gray-900 leading-tight`}>
          爆款文案
        </div>
        <div className={`${textSizeClasses[size].subtitle} text-gray-600 font-medium tracking-wide whitespace-nowrap`}>
          Ad Copy Generator
        </div>
      </div>
    </div>
  );
};
