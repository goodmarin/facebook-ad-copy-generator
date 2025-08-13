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
      {/* 简洁的Logo设计 */}
      <div className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center shadow-sm`}>
        <span className="text-white font-bold text-lg">A</span>
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
