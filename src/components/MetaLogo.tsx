import React from 'react';

interface MetaLogoProps {
  className?: string;
  size?: number;
}

export const MetaLogo: React.FC<MetaLogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div 
      className={`${className} flex items-center`}
      style={{ fontSize: size * 0.6 }}
    >
      {/* 无限符号 */}
      <div className="relative">
        <svg 
          width={size * 0.9} 
          height={size * 0.9} 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* 无限符号路径 */}
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="url(#blueGradient)"
          />
          <path 
            d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            fill="url(#blueGradient)"
          />
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1877F2" />
              <stop offset="50%" stopColor="#42A5F5" />
              <stop offset="100%" stopColor="#1976D2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}; 