// AI图片生成工具函数
export interface AIImageConfig {
  prompt: string;
  apiType: 'dalle' | 'stable-diffusion' | 'mock';
  size?: string;
  quality?: 'standard' | 'hd';
  style?: 'natural' | 'vivid';
}

export interface AIImageResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface AIAPI {
  type: string;
  name: string;
  available: boolean;
}

// 获取可用的AI图片生成API
export const getAvailableAPIs = (): AIAPI[] => {
  return [
    {
      type: 'dalle',
    name: 'DALL-E 3',
      available: true
    },
    {
      type: 'stable-diffusion',
      name: 'Stable Diffusion',
      available: true
    },
    {
      type: 'mock',
      name: 'Mock (演示)',
      available: true
    }
  ];
};

// 生成特性图片提示词
export const generateFeatureImagePrompt = (
  title: string
): string => {
  const prompts = {
    'AI 智能生成': 'A sophisticated AI robot with glowing blue neural networks and digital circuits, surrounded by floating holographic text bubbles and data streams, modern minimalist design, clean lines, professional illustration style, high quality, suitable for tech website',
    '全球本土化': 'A beautiful world map with cultural symbols, flags, and landmarks from different countries, showing global connectivity and diversity, modern flat design with vibrant colors, professional illustration, clean and minimalist style, suitable for international business',
    '多风格模板': 'An elegant artist palette with multiple paint brushes and colorful style cards floating in space, creative design elements, modern illustration style, professional quality, clean composition, suitable for creative services',
    '智能优化': 'A modern shield with digital checkmarks and safety symbols, surrounded by optimization indicators and performance graphs, representing security and efficiency, clean design, professional illustration, minimalist style, suitable for business technology'
  };

  return prompts[title as keyof typeof prompts] || 
    `A professional illustration representing ${title}, modern design, clean style, suitable for business website`;
};

// 生成Mock图片数据 - 创建真实的应用场景图片
const generateMockImage = (prompt: string): string => {
  let svg = '';
  
  if (prompt.includes('AI') || prompt.includes('neural networks')) {
    // AI智能生成场景：AI生成内容的过程展示
    svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.6" />
          </linearGradient>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#bg1)"/>
        
        <!-- 标题 -->
        <text x="200" y="25" font-family="Arial, sans-serif" font-size="16" fill="#1f2937" text-anchor="middle" font-weight="bold">AI 智能内容生成</text>
        
        <!-- 输入区域 -->
        <rect x="30" y="50" width="120" height="100" fill="white" rx="8" stroke="#e5e7eb" stroke-width="2"/>
        <text x="90" y="70" font-family="Arial, sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="bold">用户输入</text>
        <rect x="40" y="80" width="100" height="50" fill="#f9fafb" rx="4"/>
        <text x="90" y="95" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">"为电商平台</text>
        <text x="90" y="105" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">写一个促销</text>
        <text x="90" y="115" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">广告文案"</text>
        
        <!-- AI处理中央区域 -->
        <circle cx="200" cy="110" r="35" fill="url(#aiGlow)"/>
        <circle cx="200" cy="110" r="25" fill="white" opacity="0.2"/>
        <text x="200" y="105" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" font-weight="bold">AI</text>
        <text x="200" y="120" font-family="Arial, sans-serif" font-size="8" fill="white" text-anchor="middle">Processing</text>
        
        <!-- AI思维过程可视化 -->
        <circle cx="180" cy="85" r="3" fill="#3b82f6" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="220" cy="90" r="2" fill="#10b981" opacity="0.6">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="185" cy="135" r="2" fill="#f59e0b" opacity="0.7">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="215" cy="130" r="3" fill="#ec4899" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        
        <!-- 输出区域 -->
        <rect x="250" y="50" width="120" height="100" fill="white" rx="8" stroke="#10b981" stroke-width="2"/>
        <text x="310" y="70" font-family="Arial, sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="bold">AI生成结果</text>
        <rect x="260" y="80" width="100" height="50" fill="#ecfdf5" rx="4"/>
        <text x="310" y="90" font-family="Arial, sans-serif" font-size="7" fill="#047857" text-anchor="middle" font-weight="bold">"🔥超值大促！限时5折"</text>
        <text x="310" y="100" font-family="Arial, sans-serif" font-size="7" fill="#059669" text-anchor="middle">"精选好物，品质保证"</text>
        <text x="310" y="110" font-family="Arial, sans-serif" font-size="7" fill="#059669" text-anchor="middle">"立即抢购，错过再等"</text>
        <text x="310" y="120" font-family="Arial, sans-serif" font-size="7" fill="#059669" text-anchor="middle">"一年！💯满意保障"</text>
        
        <!-- 连接箭头 -->
        <polygon points="155,100 175,95 175,105" fill="#6b7280"/>
        <polygon points="225,100 245,95 245,105" fill="#6b7280"/>
        
        <!-- 底部功能展示 -->
        <rect x="30" y="170" width="340" height="80" fill="white" rx="8" stroke="#e5e7eb" stroke-width="1"/>
        <text x="200" y="190" font-family="Arial, sans-serif" font-size="12" fill="#374151" text-anchor="middle" font-weight="bold">AI生成能力展示</text>
        
        <!-- 三个功能卡片 -->
        <rect x="40" y="200" width="100" height="40" fill="#ddd6fe" rx="6"/>
        <text x="90" y="215" font-family="Arial, sans-serif" font-size="8" fill="#7c3aed" text-anchor="middle" font-weight="bold">多语言支持</text>
        <text x="90" y="225" font-family="Arial, sans-serif" font-size="7" fill="#8b5cf6" text-anchor="middle">English | 中文 | 日本語</text>
        
        <rect x="150" y="200" width="100" height="40" fill="#fecaca" rx="6"/>
        <text x="200" y="215" font-family="Arial, sans-serif" font-size="8" fill="#dc2626" text-anchor="middle" font-weight="bold">智能优化</text>
        <text x="200" y="225" font-family="Arial, sans-serif" font-size="7" fill="#ef4444" text-anchor="middle">转化率提升287%</text>
        
        <rect x="260" y="200" width="100" height="40" fill="#bbf7d0" rx="6"/>
        <text x="310" y="215" font-family="Arial, sans-serif" font-size="8" fill="#059669" text-anchor="middle" font-weight="bold">实时生成</text>
        <text x="310" y="225" font-family="Arial, sans-serif" font-size="7" fill="#10b981" text-anchor="middle">响应时间 < 2秒</text>
        
        <!-- 装饰性AI元素 -->
        <circle cx="50" cy="30" r="2" fill="#3b82f6" opacity="0.4"/>
        <circle cx="350" cy="35" r="3" fill="#10b981" opacity="0.5"/>
        <circle cx="370" cy="20" r="2" fill="#f59e0b" opacity="0.6"/>
        <line x1="50" y1="30" x2="350" y2="35" stroke="#3b82f6" stroke-width="1" opacity="0.2"/>
      </svg>
    `;
  } else if (prompt.includes('world map') || prompt.includes('global')) {
    // 全球本土化场景：不同国家生成不同文案
    svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f0f9ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#bg2)"/>
        
        <!-- 标题 -->
        <text x="200" y="25" font-family="Arial, sans-serif" font-size="16" fill="#1f2937" text-anchor="middle" font-weight="bold">全球本土化文案生成</text>
        
        <!-- 美国区域 -->
        <rect x="40" y="50" width="100" height="80" fill="white" rx="8" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="60" cy="70" r="8" fill="#3b82f6"/>
        <text x="75" y="75" font-family="Arial, sans-serif" font-size="8" fill="#3b82f6" font-weight="bold">USA</text>
        <rect x="45" y="85" width="90" height="40" fill="#eff6ff" rx="4"/>
        <text x="90" y="95" font-family="Arial, sans-serif" font-size="7" fill="#1d4ed8" text-anchor="middle" font-weight="bold">"Revolutionary AI Tool"</text>
        <text x="90" y="105" font-family="Arial, sans-serif" font-size="6" fill="#2563eb" text-anchor="middle">"Transform your business</text>
        <text x="90" y="114" font-family="Arial, sans-serif" font-size="6" fill="#2563eb" text-anchor="middle">with cutting-edge AI"</text>
        
        <!-- 中国区域 -->
        <rect x="260" y="50" width="100" height="80" fill="white" rx="8" stroke="#10b981" stroke-width="2"/>
        <circle cx="280" cy="70" r="8" fill="#10b981"/>
        <text x="295" y="75" font-family="Arial, sans-serif" font-size="8" fill="#10b981" font-weight="bold">中国</text>
        <rect x="265" y="85" width="90" height="40" fill="#f0fdf4" rx="4"/>
        <text x="310" y="95" font-family="Arial, sans-serif" font-size="7" fill="#047857" text-anchor="middle" font-weight="bold">"智能AI助手"</text>
        <text x="310" y="105" font-family="Arial, sans-serif" font-size="6" fill="#059669" text-anchor="middle">"让您的业务更智能</text>
        <text x="310" y="114" font-family="Arial, sans-serif" font-size="6" fill="#059669" text-anchor="middle">更高效更成功"</text>
        
        <!-- 西班牙区域 -->
        <rect x="40" y="150" width="100" height="80" fill="white" rx="8" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="60" cy="170" r="8" fill="#f59e0b"/>
        <text x="75" y="175" font-family="Arial, sans-serif" font-size="8" fill="#f59e0b" font-weight="bold">España</text>
        <rect x="45" y="185" width="90" height="40" fill="#fffbeb" rx="4"/>
        <text x="90" y="195" font-family="Arial, sans-serif" font-size="7" fill="#b45309" text-anchor="middle" font-weight="bold">"Herramienta IA"</text>
        <text x="90" y="205" font-family="Arial, sans-serif" font-size="6" fill="#d97706" text-anchor="middle">"Revoluciona tu negocio</text>
        <text x="90" y="214" font-family="Arial, sans-serif" font-size="6" fill="#d97706" text-anchor="middle">con inteligencia artificial"</text>
        
        <!-- 日本区域 -->
        <rect x="260" y="150" width="100" height="80" fill="white" rx="8" stroke="#ec4899" stroke-width="2"/>
        <circle cx="280" cy="170" r="8" fill="#ec4899"/>
        <text x="295" y="175" font-family="Arial, sans-serif" font-size="8" fill="#ec4899" font-weight="bold">日本</text>
        <rect x="265" y="185" width="90" height="40" fill="#fdf2f8" rx="4"/>
        <text x="310" y="195" font-family="Arial, sans-serif" font-size="7" fill="#be185d" text-anchor="middle" font-weight="bold">"革新的AIツール"</text>
        <text x="310" y="205" font-family="Arial, sans-serif" font-size="6" fill="#db2777" text-anchor="middle">"ビジネスを変革する</text>
        <text x="310" y="214" font-family="Arial, sans-serif" font-size="6" fill="#db2777" text-anchor="middle">AI技術をお届け"</text>
        
        <!-- 中央连接线和AI图标 -->
        <circle cx="200" cy="150" r="25" fill="white" stroke="#6366f1" stroke-width="3"/>
        <circle cx="200" cy="150" r="15" fill="#6366f1" opacity="0.1"/>
        <text x="200" y="155" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">AI</text>
        
        <!-- 连接线 -->
        <line x1="140" y1="90" x2="175" y2="135" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="260" y1="90" x2="225" y2="135" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="140" y1="190" x2="175" y2="165" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="260" y1="190" x2="225" y2="165" stroke="#ec4899" stroke-width="2" stroke-dasharray="3,3"/>
        
        <!-- 底部说明 -->
        <text x="200" y="260" font-family="Arial, sans-serif" font-size="10" fill="#374151" text-anchor="middle">AI智能适配不同文化和语言习惯</text>
        <text x="200" y="275" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">自动生成符合当地用户偏好的营销文案</text>
      </svg>
    `;
  } else if (prompt.includes('palette') || prompt.includes('creative')) {
    // 多风格模板场景：设计工作台
    svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#fefce8;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fef3c7;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#bg3)"/>
        
        <!-- 设计软件界面 -->
        <rect x="40" y="40" width="320" height="220" fill="white" rx="8" stroke="#e5e7eb" stroke-width="2"/>
        
        <!-- 工具栏 -->
        <rect x="40" y="40" width="320" height="30" fill="#f9fafb" rx="8 8 0 0"/>
        <circle cx="60" cy="55" r="4" fill="#ef4444"/>
        <circle cx="80" cy="55" r="4" fill="#f59e0b"/>
        <circle cx="100" cy="55" r="4" fill="#10b981"/>
        
        <!-- 模板缩略图 -->
        <rect x="60" y="90" width="80" height="60" fill="#ddd6fe" rx="4"/>
        <rect x="65" y="95" width="70" height="8" fill="#8b5cf6" rx="2"/>
        <rect x="65" y="108" width="50" height="4" fill="#a78bfa" rx="1"/>
        <rect x="65" y="118" width="60" height="4" fill="#a78bfa" rx="1"/>
        <text x="105" y="140" font-family="Arial, sans-serif" font-size="8" fill="#7c3aed" text-anchor="middle">Template A</text>
        
        <rect x="160" y="90" width="80" height="60" fill="#fecaca" rx="4"/>
        <rect x="165" y="95" width="70" height="8" fill="#ef4444" rx="2"/>
        <rect x="165" y="108" width="45" height="4" fill="#f87171" rx="1"/>
        <rect x="165" y="118" width="55" height="4" fill="#f87171" rx="1"/>
        <text x="200" y="140" font-family="Arial, sans-serif" font-size="8" fill="#dc2626" text-anchor="middle">Template B</text>
        
        <rect x="260" y="90" width="80" height="60" fill="#bbf7d0" rx="4"/>
        <rect x="265" y="95" width="70" height="8" fill="#10b981" rx="2"/>
        <rect x="265" y="108" width="55" height="4" fill="#34d399" rx="1"/>
        <rect x="265" y="118" width="40" height="4" fill="#34d399" rx="1"/>
        <text x="300" y="140" font-family="Arial, sans-serif" font-size="8" fill="#059669" text-anchor="middle">Template C</text>
        
        <!-- 颜色调色板 -->
        <rect x="60" y="170" width="280" height="40" fill="#f8fafc" rx="4"/>
        <circle cx="80" cy="190" r="8" fill="#ef4444"/>
        <circle cx="110" cy="190" r="8" fill="#f59e0b"/>
        <circle cx="140" cy="190" r="8" fill="#10b981"/>
        <circle cx="170" cy="190" r="8" fill="#3b82f6"/>
        <circle cx="200" cy="190" r="8" fill="#8b5cf6"/>
        <circle cx="230" cy="190" r="8" fill="#ec4899"/>
        
        <!-- 画笔工具 -->
        <rect x="270" y="175" width="50" height="30" fill="#e5e7eb" rx="4"/>
        <rect x="275" y="180" width="10" height="20" fill="#6b7280" rx="2"/>
        <rect x="290" y="185" width="8" height="10" fill="#374151" rx="1"/>
        <rect x="303" y="187" width="6" height="6" fill="#1f2937" rx="1"/>
      </svg>
    `;
  } else if (prompt.includes('shield') || prompt.includes('optimization')) {
    // 智能优化场景：ROI提升和成本降低图表
    svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f0fdf4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#dcfce7;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#bg4)"/>
        
        <!-- Dashboard界面 -->
        <rect x="20" y="20" width="360" height="260" fill="white" rx="12" stroke="#e5e7eb" stroke-width="2"/>
        
        <!-- 标题栏 -->
        <rect x="20" y="20" width="360" height="40" fill="#f8fafc" rx="12 12 0 0"/>
        <text x="200" y="43" font-family="Arial, sans-serif" font-size="14" fill="#1f2937" font-weight="bold" text-anchor="middle">ROI 优化分析</text>
        
        <!-- ROI指标卡片 -->
        <rect x="40" y="80" width="150" height="50" fill="#ecfdf5" rx="8"/>
        <text x="115" y="100" font-family="Arial, sans-serif" font-size="10" fill="#059669" text-anchor="middle">ROI</text>
        <text x="115" y="115" font-family="Arial, sans-serif" font-size="16" fill="#047857" text-anchor="middle" font-weight="bold">+387%</text>
        <polygon points="135,95 145,90 145,100" fill="#10b981"/>
        
        <rect x="210" y="80" width="150" height="50" fill="#fef2f2" rx="8"/>
        <text x="285" y="100" font-family="Arial, sans-serif" font-size="10" fill="#dc2626" text-anchor="middle">成本</text>
        <text x="285" y="115" font-family="Arial, sans-serif" font-size="16" fill="#b91c1c" text-anchor="middle" font-weight="bold">-64%</text>
        <polygon points="305,105 315,100 315,110" fill="#ef4444" transform="rotate(180 310 105)"/>
        
        <!-- 图表区域 -->
        <rect x="40" y="150" width="320" height="110" fill="#f8fafc" rx="8"/>
        <text x="200" y="170" font-family="Arial, sans-serif" font-size="12" fill="#374151" text-anchor="middle">投资回报率变化趋势</text>
        
        <!-- Y轴标签 -->
        <text x="35" y="185" font-family="Arial, sans-serif" font-size="8" fill="#6b7280">ROI</text>
        <text x="35" y="195" font-family="Arial, sans-serif" font-size="8" fill="#6b7280">400%</text>
        <text x="35" y="210" font-family="Arial, sans-serif" font-size="8" fill="#6b7280">300%</text>
        <text x="35" y="225" font-family="Arial, sans-serif" font-size="8" fill="#6b7280">200%</text>
        <text x="35" y="240" font-family="Arial, sans-serif" font-size="8" fill="#6b7280">100%</text>
        <text x="35" y="255" font-family="Arial, sans-serif" font-size="8" fill="#6b7280">0%</text>
        
        <!-- ROI上升曲线 (绿色) -->
        <polyline points="60,250 90,240 120,225 150,210 180,195 210,185 240,180 270,175 300,170 330,165" 
                  fill="none" stroke="#10b981" stroke-width="4"/>
        
        <!-- 成本下降曲线 (红色) -->
        <polyline points="60,200 90,205 120,210 150,220 180,230 210,235 240,240 270,245 300,250 330,255" 
                  fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,5"/>
        
        <!-- 数据点 -->
        <circle cx="60" cy="250" r="3" fill="#10b981"/>
        <circle cx="150" cy="210" r="3" fill="#10b981"/>
        <circle cx="240" cy="180" r="3" fill="#10b981"/>
        <circle cx="330" cy="165" r="3" fill="#10b981"/>
        
        <circle cx="60" cy="200" r="2" fill="#ef4444"/>
        <circle cx="150" cy="220" r="2" fill="#ef4444"/>
        <circle cx="240" cy="240" r="2" fill="#ef4444"/>
        <circle cx="330" cy="255" r="2" fill="#ef4444"/>
        
        <!-- 图例 -->
        <line x1="50" y1="190" x2="70" y2="190" stroke="#10b981" stroke-width="3"/>
        <text x="75" y="194" font-family="Arial, sans-serif" font-size="9" fill="#059669">ROI 增长</text>
        
        <line x1="150" y1="190" x2="170" y2="190" stroke="#ef4444" stroke-width="3" stroke-dasharray="3,3"/>
        <text x="175" y="194" font-family="Arial, sans-serif" font-size="9" fill="#dc2626">成本下降</text>
        
        <!-- X轴时间标签 -->
        <text x="60" y="275" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">1月</text>
        <text x="150" y="275" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">3月</text>
        <text x="240" y="275" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">6月</text>
        <text x="330" y="275" font-family="Arial, sans-serif" font-size="8" fill="#6b7280" text-anchor="middle">12月</text>
      </svg>
    `;
  } else {
    // 默认办公场景
    svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="50" y="50" width="300" height="200" fill="white" rx="8"/>
        <text x="200" y="150" font-family="Arial, sans-serif" font-size="18" fill="#374151" text-anchor="middle">Business Application</text>
      </svg>
    `;
  }

  // 使用base64编码
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// 主要的AI图片生成函数
export const generateAIImage = async (config: AIImageConfig): Promise<AIImageResult> => {
  try {
    const { prompt, apiType, size = '1024x1024', quality = 'standard', style = 'natural' } = config;

    // 根据API类型选择不同的生成方法
    switch (apiType) {
      case 'mock':
        // Mock模式 - 生成演示图片
        return new Promise((resolve) => {
          setTimeout(() => {
            try {
              const mockImageUrl = generateMockImage(prompt);
              resolve({
                success: true,
                imageUrl: mockImageUrl
              });
            } catch (error) {
              console.error('Mock图片生成失败:', error);
              resolve({
                success: false,
                error: 'Mock图片生成失败'
              });
            }
          }, 1000); // 模拟1秒延迟
        });

      case 'dalle':
        // DALL-E API调用（需要配置API密钥）
        return await callDalleAPI(prompt, size, quality, style);

      case 'stable-diffusion':
        // Stable Diffusion API调用
        return await callStableDiffusionAPI(prompt, size, quality, style);

      default:
        return {
          success: false,
          error: '不支持的API类型'
        };
    }
  } catch (error) {
    console.error('AI图片生成错误:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '图片生成失败'
    };
  }
};

// DALL-E API调用
const callDalleAPI = async (
  prompt: string, 
  size: string, 
  quality: string, 
  style: string
): Promise<AIImageResult> => {
  try {
    // 这里应该调用真实的DALL-E API
    // 目前返回Mock数据
    console.log('调用DALL-E API:', { prompt, size, quality, style });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const mockImageUrl = generateMockImage(prompt);
          resolve({
            success: true,
            imageUrl: mockImageUrl
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'DALL-E API调用失败'
          });
        }
      }, 2000);
    });
  } catch (error) {
    return {
      success: false,
      error: 'DALL-E API调用失败'
    };
  }
};

// Stable Diffusion API调用
const callStableDiffusionAPI = async (
  prompt: string, 
  size: string, 
  quality: string, 
  style: string
): Promise<AIImageResult> => {
  try {
    // 这里应该调用真实的Stable Diffusion API
    // 目前返回Mock数据
    console.log('调用Stable Diffusion API:', { prompt, size, quality, style });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const mockImageUrl = generateMockImage(prompt);
          resolve({
            success: true,
            imageUrl: mockImageUrl
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Stable Diffusion API调用失败'
          });
        }
      }, 1500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Stable Diffusion API调用失败'
    };
  }
};
