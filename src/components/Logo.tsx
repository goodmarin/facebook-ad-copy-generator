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

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold text-lg">F</span>
      </div>
      <div className="ml-3">
        <div className="text-xl font-bold text-gray-900">爆款文案</div>
        <div className="text-xs text-gray-500">Ad Copy Generator</div>
      </div>
    </div>
  );
};
