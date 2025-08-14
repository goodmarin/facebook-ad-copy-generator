import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// 元宇宙风格Logo - 高端科技未来感设计
const MetaverseLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`${className} flex items-center justify-center relative`}>
      <div className="metaverse-logo">
        <svg 
          viewBox="0 0 120 120" 
          className="w-full h-full drop-shadow-2xl transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(139,101,250,0.6)]"
          style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))' }}
        >
          <defs>
            {/* 高端渐变定义 */}
            <linearGradient id="primaryMetaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="1"/>
              <stop offset="30%" stopColor="#3B82F6" stopOpacity="1"/>
              <stop offset="70%" stopColor="#8B5CF6" stopOpacity="1"/>
              <stop offset="100%" stopColor="#EC4899" stopOpacity="1"/>
            </linearGradient>
            
            <linearGradient id="neuralMetaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9"/>
            </linearGradient>
            
            <linearGradient id="coreMetaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="1"/>
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="1"/>
              <stop offset="100%" stopColor="#EF4444" stopOpacity="1"/>
            </linearGradient>
            
            {/* 3D光晕效果 */}
            <radialGradient id="outerGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(139,101,250,0.4)" stopOpacity="1"/>
              <stop offset="50%" stopColor="rgba(59,130,246,0.2)" stopOpacity="1"/>
              <stop offset="100%" stopColor="rgba(59,130,246,0)" stopOpacity="0"/>
            </radialGradient>
            
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" stopOpacity="1"/>
              <stop offset="70%" stopColor="rgba(139,101,250,0.3)" stopOpacity="1"/>
              <stop offset="100%" stopColor="rgba(139,101,250,0)" stopOpacity="0"/>
            </radialGradient>
            
            {/* 滤镜效果 */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
              <feOffset dx="1" dy="1" result="offset"/>
            </filter>
          </defs>
          
          {/* 外层光晕背景 */}
          <circle cx="60" cy="60" r="55" fill="url(#outerGlow)" opacity="0.8" className="outer-glow"/>
          
          {/* 旋转的外环 - 科技感边框 */}
          <circle cx="60" cy="60" r="48" fill="none" 
                  stroke="url(#primaryMetaGradient)" 
                  strokeWidth="2" 
                  strokeDasharray="8,4" 
                  opacity="0.6"
                  className="rotating-ring"/>
          
          {/* 中层装饰环 */}
          <circle cx="60" cy="60" r="42" fill="none" 
                  stroke="url(#neuralMetaGradient)" 
                  strokeWidth="1" 
                  strokeDasharray="4,6" 
                  opacity="0.5"
                  className="middle-ring"/>
          
          {/* 主体 - 立体球体设计 */}
          <g className="main-sphere">
            {/* 球体主体 */}
            <circle cx="60" cy="60" r="35" 
                    fill="url(#primaryMetaGradient)" 
                    opacity="0.9"
                    filter="url(#innerShadow)"
                    className="sphere-main"/>
            
            {/* 球体高光 */}
            <ellipse cx="52" cy="48" rx="12" ry="8" 
                     fill="url(#innerGlow)" 
                     opacity="0.7"
                     className="sphere-highlight"/>
            
            {/* 网格线条 - 元宇宙特征 */}
            <g className="meta-grid" opacity="0.4">
              {/* 纬线 */}
              <ellipse cx="60" cy="60" rx="35" ry="10" fill="none" stroke="#ffffff" strokeWidth="0.8"/>
              <ellipse cx="60" cy="60" rx="35" ry="20" fill="none" stroke="#ffffff" strokeWidth="0.6"/>
              <ellipse cx="60" cy="60" rx="35" ry="30" fill="none" stroke="#ffffff" strokeWidth="0.4"/>
              
              {/* 经线 */}
              <ellipse cx="60" cy="60" rx="10" ry="35" fill="none" stroke="#ffffff" strokeWidth="0.8"/>
              <ellipse cx="60" cy="60" rx="20" ry="35" fill="none" stroke="#ffffff" strokeWidth="0.6"/>
              <ellipse cx="60" cy="60" rx="30" ry="35" fill="none" stroke="#ffffff" strokeWidth="0.4"/>
            </g>
          </g>
          
          {/* 神经网络连接 - 更加科幻 */}
          <g className="neural-network" opacity="0.8">
            {/* 主要连接线 */}
            <path d="M30 45 Q45 35 60 45 Q75 35 90 45" 
                  stroke="url(#neuralMetaGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeDasharray="6,3"
                  className="neural-flow primary"/>
            
            <path d="M35 60 Q50 50 60 60 Q70 50 85 60" 
                  stroke="url(#neuralMetaGradient)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="4,2"
                  className="neural-flow secondary"/>
            
            <path d="M30 75 Q45 85 60 75 Q75 85 90 75" 
                  stroke="url(#neuralMetaGradient)" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeDasharray="3,3"
                  className="neural-flow tertiary"/>
          </g>
          
          {/* 智能节点系统 */}
          <g className="smart-nodes">
            <circle cx="35" cy="45" r="4" fill="url(#coreMetaGradient)" 
                    className="node-pulse" style={{animationDelay: '0s'}} filter="url(#glow)"/>
            <circle cx="85" cy="45" r="4" fill="#00D4FF" 
                    className="node-pulse" style={{animationDelay: '0.5s'}} filter="url(#glow)"/>
            <circle cx="35" cy="75" r="3.5" fill="#10B981" 
                    className="node-pulse" style={{animationDelay: '1s'}} filter="url(#glow)"/>
            <circle cx="85" cy="75" r="3.5" fill="#EC4899" 
                    className="node-pulse" style={{animationDelay: '1.5s'}} filter="url(#glow)"/>
            <circle cx="45" cy="30" r="3" fill="#8B5CF6" 
                    className="node-pulse" style={{animationDelay: '2s'}} filter="url(#glow)"/>
            <circle cx="75" cy="30" r="3" fill="#F59E0B" 
                    className="node-pulse" style={{animationDelay: '2.5s'}} filter="url(#glow)"/>
          </g>
          
          {/* 中心AI标识 - 未来感设计 */}
          <g className="ai-core-advanced">
            {/* 核心背景 */}
            <circle cx="60" cy="60" r="12" 
                    fill="rgba(255,255,255,0.95)" 
                    stroke="url(#primaryMetaGradient)"
                    strokeWidth="1.5"
                    className="core-pulse"
                    filter="url(#glow)"/>
            
            {/* AI文字 - 更现代的设计 */}
            <text x="60" y="67" textAnchor="middle" 
                  fontSize="11" fill="url(#primaryMetaGradient)" 
                  fontWeight="bold" fontFamily="Arial, sans-serif"
                  className="ai-text">AI</text>
            
            {/* 装饰点 */}
            <circle cx="52" cy="54" r="1" fill="#3B82F6" opacity="0.8" className="deco-dot"/>
            <circle cx="68" cy="54" r="1" fill="#EC4899" opacity="0.8" className="deco-dot"/>
            <circle cx="52" cy="66" r="1" fill="#10B981" opacity="0.8" className="deco-dot"/>
            <circle cx="68" cy="66" r="1" fill="#F59E0B" opacity="0.8" className="deco-dot"/>
          </g>
          
          {/* 外围装饰粒子 */}
          <g className="particle-system" opacity="0.7">
            <circle cx="20" cy="30" r="2" fill="#00D4FF" className="particle-float" style={{animationDelay: '0s'}}/>
            <circle cx="100" cy="40" r="1.5" fill="#8B5CF6" className="particle-float" style={{animationDelay: '1s'}}/>
            <circle cx="15" cy="90" r="2.5" fill="#10B981" className="particle-float" style={{animationDelay: '2s'}}/>
            <circle cx="105" cy="80" r="1.5" fill="#EC4899" className="particle-float" style={{animationDelay: '3s'}}/>
            <circle cx="25" cy="60" r="1" fill="#F59E0B" className="particle-float" style={{animationDelay: '4s'}}/>
            <circle cx="95" cy="60" r="1" fill="#00D4FF" className="particle-float" style={{animationDelay: '5s'}}/>
          </g>
        </svg>
      </div>
      
      <style>{`
        .metaverse-logo {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        
        .metaverse-logo:hover {
          transform: scale(1.08) rotate(2deg);
        }
        
        /* 外层光晕动画 */
        .outer-glow {
          animation: outerGlowPulse 4s ease-in-out infinite;
        }
        
        /* 旋转环动画 */
        .rotating-ring {
          animation: rotate 15s linear infinite;
          transform-origin: 60px 60px;
        }
        
        .middle-ring {
          animation: rotate 25s linear infinite reverse;
          transform-origin: 60px 60px;
        }
        
        /* 主球体动画 */
        .sphere-main {
          animation: spherePulse 3s ease-in-out infinite;
        }
        
        .sphere-highlight {
          animation: highlightShift 4s ease-in-out infinite;
        }
        
        /* 网格动画 */
        .meta-grid {
          animation: gridFade 6s ease-in-out infinite;
        }
        
        /* 神经网络流动 */
        .neural-flow.primary {
          animation: neuralFlow 3s linear infinite;
        }
        
        .neural-flow.secondary {
          animation: neuralFlow 4s linear infinite;
          animation-delay: 0.5s;
        }
        
        .neural-flow.tertiary {
          animation: neuralFlow 5s linear infinite;
          animation-delay: 1s;
        }
        
        /* 节点脉冲 */
        .node-pulse {
          animation: nodePulse 2.5s ease-in-out infinite;
        }
        
        /* AI核心动画 */
        .core-pulse {
          animation: corePulse 3s ease-in-out infinite;
        }
        
        .ai-text {
          animation: textGlow 2s ease-in-out infinite alternate;
        }
        
        .deco-dot {
          animation: dotFloat 3s ease-in-out infinite;
        }
        
        /* 粒子系统 */
        .particle-float {
          animation: particleFloat 6s ease-in-out infinite;
        }
        
        /* 关键帧动画定义 */
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes outerGlowPulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.02); 
          }
        }
        
        @keyframes spherePulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.9; 
          }
          50% { 
            transform: scale(1.03); 
            opacity: 1; 
          }
        }
        
        @keyframes highlightShift {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.7; 
          }
          50% { 
            transform: translate(2px, -2px) scale(1.1); 
            opacity: 0.9; 
          }
        }
        
        @keyframes gridFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes neuralFlow {
          0% { stroke-dashoffset: 30; opacity: 0.6; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.6; }
        }
        
        @keyframes nodePulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8; 
            filter: brightness(1); 
          }
          50% { 
            transform: scale(1.4); 
            opacity: 1; 
            filter: brightness(1.3); 
          }
        }
        
        @keyframes corePulse {
          0%, 100% { 
            transform: scale(1); 
            filter: brightness(1); 
          }
          50% { 
            transform: scale(1.05); 
            filter: brightness(1.2); 
          }
        }
        
        @keyframes textGlow {
          0% { 
            filter: drop-shadow(0 0 3px rgba(59,130,246,0.6)); 
          }
          100% { 
            filter: drop-shadow(0 0 8px rgba(139,101,250,0.8)); 
          }
        }
        
        @keyframes dotFloat {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-2px) scale(1.2); 
            opacity: 1; 
          }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.5; 
          }
          33% { 
            transform: translateY(-3px) scale(1.1); 
            opacity: 0.8; 
          }
          66% { 
            transform: translateY(1px) scale(0.9); 
            opacity: 0.6; 
          }
        }
        
        /* 响应式调整 */
        @media (max-width: 768px) {
          .metaverse-logo:hover {
            transform: scale(1.05) rotate(1deg);
          }
        }
      `}</style>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // 响应式自适应尺寸系统 - 匹配文字总高度
  const sizeClasses = {
    sm: 'w-12 h-12 min-w-12',  // 匹配小尺寸文字总高度
    md: 'w-14 h-14 min-w-14',  // 匹配中等尺寸文字总高度
    lg: 'w-16 h-16 min-w-16'   // 匹配大尺寸文字总高度
  };

  const textSizeClasses = {
    sm: { title: 'text-base sm:text-lg', subtitle: 'text-xs' },
    md: { title: 'text-lg sm:text-xl', subtitle: 'text-xs sm:text-sm' },
    lg: { title: 'text-xl sm:text-2xl', subtitle: 'text-sm sm:text-base' }
  };

  // 刷新页面的函数
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={`flex items-center group w-full max-w-none ${className}`}>
      {/* 元宇宙风格Logo */}
      <button 
        onClick={handleRefresh}
        className={`${sizeClasses[size]} flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400/40 rounded-xl group-hover:scale-110 shrink-0`}
        title="点击刷新页面"
      >
        <MetaverseLogo className={`${sizeClasses[size]}`} />
      </button>
      
      {/* 文字部分 - 自适应宽度 */}
      <div className="ml-3 flex-1 min-w-0 flex flex-col justify-center">
        <button 
          onClick={handleRefresh}
          className="text-left hover:opacity-80 transition-all duration-500 cursor-pointer focus:outline-none group-hover:opacity-80 w-full"
          title="点击刷新页面"
        >
          <div className={`${textSizeClasses[size].title} font-bold text-white leading-tight tracking-tight truncate`}>
            元文案
          </div>
          <div className={`${textSizeClasses[size].subtitle} text-white font-medium tracking-wide opacity-90 truncate leading-tight`}>
            MetaCopy AI
          </div>
        </button>
      </div>
      
      {/* 菜单栏适配样式 */}
      <style>{`
        /* 确保Logo在不同屏幕尺寸下都能良好显示 */
        @media (max-width: 640px) {
          .group {
            max-width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .ml-3 {
            margin-left: 0.5rem;
          }
        }
        
        /* 菜单栏宽度自适应 */
        .group {
          flex: 1;
          min-width: 0;
          max-width: 100%;
        }
        
        /* 高对比度和可访问性 */
        @media (prefers-reduced-motion: reduce) {
          .transition-all {
            transition: none;
          }
          
          .metaverse-logo * {
            animation: none !important;
          }
        }
        
        /* 高对比度模式 */
        @media (prefers-contrast: high) {
          .text-white {
            color: #ffffff !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }
        }
      `}</style>
    </div>
  );
};