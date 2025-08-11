import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: { title: 'text-lg', subtitle: 'text-xs' },
    md: { title: 'text-xl', subtitle: 'text-sm' },
    lg: { title: 'text-2xl', subtitle: 'text-base' }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* 新的Logo设计 - 渐变圆形背景 */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden`}>
        {/* 内部装饰环 */}
        <div className="absolute inset-1 bg-white rounded-full opacity-20"></div>
        {/* 主图标 */}
        <span className="text-white font-bold text-lg relative z-10">A</span>
        {/* 装饰点 */}
        <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-green-300 rounded-full"></div>
      </div>
      
      {/* 文字部分 - 英文单行显示 */}
      <div className="ml-4">
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
