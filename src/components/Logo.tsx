import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// 科技感元宇宙Logo设计 - 简洁大气
const MetaverseLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [letters, setLetters] = React.useState<string[]>([]);
  
  // 随机生成英文字母
  React.useEffect(() => {
    const generateRandomLetters = () => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const newLetters = Array.from({ length: 6 }, () => 
        alphabet[Math.floor(Math.random() * alphabet.length)]
      );
      setLetters(newLetters);
    };

    generateRandomLetters();
    const interval = setInterval(generateRandomLetters, 2000); // 每2秒更换字母
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${className} flex items-center justify-center relative`}>
      <div className="tech-logo">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 3px 12px rgba(59,130,246,0.25))' }}
        >
          <defs>
            {/* 主要渐变 - 科技蓝 */}
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA"/>
              <stop offset="50%" stopColor="#3B82F6"/>
              <stop offset="100%" stopColor="#1D4ED8"/>
            </linearGradient>
            
            {/* 次要渐变 - 紫色科技感 */}
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA"/>
              <stop offset="50%" stopColor="#8B5CF6"/>
              <stop offset="100%" stopColor="#7C3AED"/>
            </linearGradient>
            
            {/* 发光效果 */}
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DBEAFE" opacity="0.8"/>
              <stop offset="70%" stopColor="#3B82F6" opacity="0.4"/>
              <stop offset="100%" stopColor="#1E40AF" opacity="0"/>
            </radialGradient>
            
            {/* 滤镜效果 */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
                    {/* 背景发光圆 */}
          <circle cx="50" cy="50" r="45" fill="url(#glowGradient)" opacity="0.3" className="glow-bg"/>
          
          {/* 主要Logo图形 - 立体几何结构 */}
          <g className="meta-structure">
            {/* 外环 - 代表无限可能 */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="url(#primaryGradient)" strokeWidth="2.5" opacity="0.6" className="outer-ring"/>
            
            {/* 内部几何结构 - 代表数字空间 */}
            <g className="inner-geometry">
              {/* 中心核心 */}
              <circle cx="50" cy="50" r="10" fill="url(#primaryGradient)" className="core"/>
              
              {/* 围绕核心的六边形结构 */}
              <polygon 
                points="50,25 65,35 65,65 50,75 35,65 35,35" 
          fill="none" 
                stroke="url(#accentGradient)" 
          strokeWidth="2" 
                className="hex-frame"
              />
              
              {/* 旋转的英文字母 */}
              <g className="rotating-letters">
                {letters.map((letter, index) => {
                  const angle = (index * 60) * (Math.PI / 180);
                  const radius = 22;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  
                  return (
                    <text
                      key={`${letter}-${index}`}
                      x={x}
                      y={y}
                      fill="url(#accentGradient)"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="letter"
                      style={{
                        animation: `letterRotate 12s linear infinite`,
                        animationDelay: `${index * 0.2}s`,
                        transformOrigin: '50px 50px'
                      }}
                    >
                      {letter}
                    </text>
                  );
                })}
              </g>
              
              {/* 节点 - 网络连接点 */}
              <circle cx="50" cy="25" r="2.5" fill="url(#accentGradient)" className="node"/>
              <circle cx="65" cy="35" r="2.5" fill="url(#accentGradient)" className="node"/>
              <circle cx="65" cy="65" r="2.5" fill="url(#accentGradient)" className="node"/>
              <circle cx="50" cy="75" r="2.5" fill="url(#accentGradient)" className="node"/>
              <circle cx="35" cy="65" r="2.5" fill="url(#accentGradient)" className="node"/>
              <circle cx="35" cy="35" r="2.5" fill="url(#accentGradient)" className="node"/>
            </g>
            
            {/* 外围装饰元素 - 代表数字化 */}
            <g className="digital-elements">
              <rect x="12" y="48" width="6" height="4" rx="2" fill="url(#primaryGradient)" opacity="0.7" className="pixel-1"/>
              <rect x="82" y="48" width="6" height="4" rx="2" fill="url(#primaryGradient)" opacity="0.7" className="pixel-2"/>
              <rect x="48" y="12" width="4" height="6" rx="2" fill="url(#accentGradient)" opacity="0.7" className="pixel-3"/>
              <rect x="48" y="82" width="4" height="6" rx="2" fill="url(#accentGradient)" opacity="0.7" className="pixel-4"/>
            </g>
          </g>
        </svg>
      </div>
      
      <style>{`
        .tech-logo {
          transition: all 0.4s ease;
        }
        
        .tech-logo:hover {
          transform: scale(1.05);
        }
        
        .glow-bg {
          animation: pulse 3s infinite ease-in-out;
        }
        
        .outer-ring {
          animation: rotate 20s linear infinite;
          transform-origin: 50px 50px;
        }
        
        .core {
          animation: corePulse 2s infinite ease-in-out;
        }
        
        .hex-frame {
          animation: hexRotate 15s linear infinite reverse;
          transform-origin: 50px 50px;
        }
        
        .rotating-letters .letter {
          animation: letterRotate 12s linear infinite;
        }
        
        .rotating-letters .letter:nth-child(2) { animation-delay: 0.2s; }
        .rotating-letters .letter:nth-child(3) { animation-delay: 0.4s; }
        .rotating-letters .letter:nth-child(4) { animation-delay: 0.6s; }
        .rotating-letters .letter:nth-child(5) { animation-delay: 0.8s; }
        .rotating-letters .letter:nth-child(6) { animation-delay: 1s; }
        
        .node {
          animation: nodeBlink 1.5s infinite ease-in-out;
        }
        
        .node:nth-child(1) { animation-delay: 0s; }
        .node:nth-child(2) { animation-delay: 0.25s; }
        .node:nth-child(3) { animation-delay: 0.5s; }
        .node:nth-child(4) { animation-delay: 0.75s; }
        .node:nth-child(5) { animation-delay: 1s; }
        .node:nth-child(6) { animation-delay: 1.25s; }
        
        .digital-elements rect {
          animation: pixelGlow 2.5s infinite ease-in-out;
        }
        
        .pixel-2 { animation-delay: 0.5s; }
        .pixel-3 { animation-delay: 1s; }
        .pixel-4 { animation-delay: 1.5s; }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes corePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes hexRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes letterRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes nodeBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes pixelGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: { title: 'text-lg', subtitle: 'text-xs' },
    md: { title: 'text-xl', subtitle: 'text-sm' },
    lg: { title: 'text-2xl', subtitle: 'text-base' }
  };

  // 刷新页面的函数
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={`flex items-center group ${className}`}>
      {/* 科技感元宇宙Logo */}
      <button 
        onClick={handleRefresh}
        className={`${sizeClasses[size]} flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/30 rounded-lg group-hover:scale-110`}
        title="点击刷新页面"
      >
        <MetaverseLogo className={`${sizeClasses[size]}`} />
      </button>
      
      {/* 文字部分 - 科技企业风格 */}
      <div className="ml-3">
        <button 
          onClick={handleRefresh}
          className="text-left hover:opacity-80 transition-all duration-300 cursor-pointer focus:outline-none group-hover:opacity-80"
          title="点击刷新页面"
        >
          <div className={`${textSizeClasses[size].title} font-bold text-white leading-tight tracking-tight`}>
            元文案
          </div>
          <div className={`${textSizeClasses[size].subtitle} text-white font-medium tracking-wide whitespace-nowrap opacity-90`}>
            MetaCopy AI
          </div>
        </button>
      </div>
    </div>
  );
};