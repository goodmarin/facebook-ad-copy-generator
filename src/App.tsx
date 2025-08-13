import { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { Navigation } from './components/Navigation';
import { OutputDisplay } from './components/OutputDisplay';
import { CountdownTimer } from './components/CountdownTimer';
import { TimeDisplay } from './components/TimeDisplay';

import { checkProductInfo, PolicyCheckResult } from './utils/policyChecker';

function App() {
  const [productInfo, setProductInfo] = useState({
    name: '',
    features: '',
    targetAudience: '',
    regions: [] as string[],
    style: 'confident', // 文案风格
    promotion: 'discount' // 促销方式
  });
  const [copies, setCopies] = useState<Array<{text: string, region: string, regionName: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [regionSearchTerm, setRegionSearchTerm] = useState('');
  const [policyCheckResult, setPolicyCheckResult] = useState<PolicyCheckResult | null>(null);
  const [fastMode, _setFastMode] = useState(false); // 快速模式

  // 根据地区获取语言和文案风格
  const getLanguageAndStyle = (region: string) => {
    const regionConfig: { [key: string]: { language: string; style: string; culture: string } } = {
      'US': { language: 'English', style: 'confident and aspirational', culture: 'emphasize innovation and personal achievement' },
      'JP': { language: '日本語', style: '丁寧で品質重視', culture: '細部への注意と品質を重視' },
      'KR': { language: '한국어', style: '트렌디하고 스타일리시', culture: '트렌드와 미용에中점' },
      'IN': { language: 'English', style: 'value-focused and practical', culture: 'emphasize cost-effectiveness and family values' },
      'SG': { language: 'English', style: 'professional and efficient', culture: 'emphasize quality and convenience' },
      'MY': { language: 'Bahasa Melayu', style: 'friendly and inclusive', culture: 'emphasize community and tradition' },
      'TH': { language: 'ไทย', style: 'warm and respectful', culture: 'emphasize family and social harmony' },
      'VN': { language: 'Tiếng Việt', style: 'direct and value-conscious', culture: 'emphasize family and education' },
      'ID': { language: 'Bahasa Indonesia', style: 'friendly and community-oriented', culture: 'emphasize social connection' },
      'PH': { language: 'English', style: 'warm and family-oriented', culture: 'emphasize family values and community' },
      'TW': { language: '繁體中文', style: '精緻優雅，注重品質', culture: '注重細節和品質追求' },
      'HK': { language: '繁體中文', style: '時尚前衛，追求卓越', culture: '注重效率和品質' },
      'CA': { language: 'English', style: 'inclusive and diverse', culture: 'emphasize multiculturalism and quality of life' },
      'MX': { language: 'Español', style: 'warm and family-oriented', culture: 'emphasize family and tradition' },
      'GB': { language: 'English', style: 'sophisticated and understated', culture: 'emphasize tradition and quality' },
      'DE': { language: 'Deutsch', style: 'precise and quality-focused', culture: 'emphasize engineering and reliability' },
      'FR': { language: 'Français', style: 'elegant and sophisticated', culture: 'emphasize style and refinement' },
      'IT': { language: 'Italiano', style: 'passionate and stylish', culture: 'emphasize beauty and tradition' },
      'ES': { language: 'Español', style: 'warm and social', culture: 'emphasize family and social connection' },
      'NL': { language: 'Nederlands', style: 'practical and direct', culture: 'emphasize efficiency and quality' },
      'AU': { language: 'English', style: 'laid-back and friendly', culture: 'emphasize lifestyle and outdoor activities' },
      'NZ': { language: 'English', style: 'adventure-seeking and natural', culture: 'emphasize nature and sustainability' },
      'BR': { language: 'Português', style: 'warm and social', culture: 'emphasize family and celebration' },
      'AR': { language: 'Español', style: 'passionate and expressive', culture: 'emphasize family and social life' }
    };
    return regionConfig[region] || regionConfig['US'];
  };

  // 生成文案函数 - 支持多地区本土化（并发优化）
  const generateCopies = async (productInfo: any) => {
    const allCopies: Array<{text: string, region: string, regionName: string}> = [];
    
    // 并发为所有选择的地区生成文案
    const regionPromises = productInfo.regions.map(async (region: string) => {
      const config = getLanguageAndStyle(region);
      
      console.log(`📝 为地区 ${region} 生成本土化文案，语言: ${config.language}`);

      try {
        // 使用DeepSeek API生成本土化文案
        const regionCopies = await generateLocalizedCopiesWithAI(productInfo, region, config);

        // 为每条文案添加地区信息
        const regionNames: { [key: string]: string } = {
          'US': '美国', 'JP': '日本', 'KR': '韩国', 'IN': '印度', 'SG': '新加坡', 'MY': '马来西亚', 'TH': '泰国',
          'VN': '越南', 'ID': '印度尼西亚', 'PH': '菲律宾', 'TW': '台湾', 'HK': '香港', 'CA': '加拿大', 'MX': '墨西哥', 'GB': '英国',
          'DE': '德国', 'FR': '法国', 'IT': '意大利', 'ES': '西班牙', 'NL': '荷兰', 'AU': '澳大利亚', 'NZ': '新西兰', 'BR': '巴西', 'AR': '阿根廷'
        };
        const regionName = regionNames[region] || '全球';
        
        return regionCopies.map((copy: string) => ({
          text: copy,
          region: region,
          regionName: regionName
        }));
      } catch (error) {
        console.error(`生成文案失败 for ${region}:`, error);
        return [];
      }
    });

    // 等待所有地区完成
    const results = await Promise.all(regionPromises);
    
    // 合并所有结果
    results.forEach(regionCopies => {
      allCopies.push(...regionCopies);
    });

    return allCopies;
  };

  // 使用DeepSeek API生成本土化文案的函数 - 优化版本
  const generateLocalizedCopiesWithAI = async (productInfo: any, region: string, config: any) => {
    const { language, style } = config;
    
    // 快速模式：直接使用备用模板，跳过AI生成
    if (fastMode) {
      console.log(`🚀 快速模式：为地区 ${region} 使用备用模板`);
      return generateFallbackCopies(productInfo, region, config);
    }
    
    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-674b29e0b86846bca55195b66eb3e3aa';
      
      // 先翻译产品信息
      const translatedProduct = translateProductInfo(productInfo, region);
      

      
      const prompt = `Create 3 engaging Facebook ad copies in ${language} for:
Product: ${translatedProduct.name}
Features: ${translatedProduct.features}
Audience: ${translatedProduct.audience}
Style: ${style}
Promotion: ${getPromotionText(productInfo.promotion)}

Requirements:
- 100% ${language}, no Chinese characters
- 120-180 characters each
- Include relevant emojis naturally throughout the copy
- Use emotional triggers and compelling call-to-action
- Make it engaging, creative and conversion-focused
- Format: Copy 1: [content] | Copy 2: [content] | Copy 3: [content]`;

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a creative ${language} Facebook ad copywriter specializing in engaging, conversion-focused content. Generate 100% ${language} content only, no Chinese characters. Use relevant emojis naturally, create emotional connections and include compelling calls-to-action. Make each copy unique and memorable.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 600,
          temperature: 0.7,
          top_p: 0.8,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('AI未返回有效内容');
      }

      // 快速解析返回的文案
      const copies = content
        .split(/copy\s*\d+[：:]\s*/i)
        .slice(1) // 移除第一个空元素
        .map((copy: string) => copy.trim().replace(/^[|:]\s*/, '').replace(/\s*[|:]\s*.*$/, ''))
        .filter((copy: string) => copy.length > 20 && copy.length < 500); // 过滤长度

      console.log('🔍 AI原始返回内容:', content);
      console.log('🔍 解析后的文案:', copies);

      // 智能后处理：确保文案完全本土化
      const processedCopies = copies.map((copy: string) => {
        console.log('🔍 处理前文案:', copy);
        const processed = processCopyForLocalization(copy, language, region);
        console.log('🔍 处理后文案:', processed);
        return processed;
      }).filter((copy: string) => copy.length > 20); // 再次过滤太短的内容

      // 如果AI生成失败或处理后没有有效文案，使用备用模板
      if (processedCopies.length === 0) {
        console.warn(`AI生成失败或处理后无有效文案，使用备用模板 for ${region}`);
        return generateFallbackCopies(productInfo, region, config);
      }

      return processedCopies.slice(0, 3); // 确保只返回3条文案

    } catch (error) {
      console.error(`生成文案失败 for ${region}:`, error);
      // 使用备用模板
      return generateFallbackCopies(productInfo, region, config);
    }
  };



  // 清理异常emoji的函数
  const cleanEmojis = (text: string): string => {
    console.log('cleanEmojis 输入:', text);
    
    // 只保留安全的emoji，移除所有其他emoji
    let cleanedText = text;
    

    
    // 直接移除所有已知的emoji和符号
    const symbolsToRemove = [
      '❓', '❔', '❕', '❖', '🔥', '💥', '💢', '💣', '💤', '♪', '♫', '♬', '♩', '💎', '⏳', '→',
      '✨', '⭐', '💡', '🎯', '🚀', '💪', '🎧', '🎵', '🎶', '🎤', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻',
      '🎮', '🎲', '🧩', '🎳', '🎪', '🎭', '🎨', '🎬', '⚙️', '🎭', '🎪', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹',
      '🥁', '🎷', '🎺', '🎸', '🎻', '🎮', '🎲', '🧩', '🎯', '🎳', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼',
      '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎮', '🎲', '🧩', '🎯', '🎳', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧',
      '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎮', '🎲', '🧩', '🎯', '🎳', '🎪', '🎭', '🎨', '🎬', '🎤',
      '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎮', '🎲', '🧩', '🎯', '🎳', '🎪', '🎭', '🎨', '🎬'
    ];
    
    symbolsToRemove.forEach(symbol => {
      cleanedText = cleanedText.replace(new RegExp(symbol, 'g'), '');
    });
    
    console.log('cleanEmojis 输出:', cleanedText);
    return cleanedText;
  };

  // 智能文案后处理函数
  const processCopyForLocalization = (copy: string, language: string, _region: string) => {
    let processedCopy = copy;
    
    // 清理异常emoji
    processedCopy = cleanEmojis(processedCopy);
    
    // 移除所有中文字符和标点符号
    processedCopy = processedCopy.replace(/[\u4e00-\u9fff]/g, '');
    processedCopy = processedCopy.replace(/[，。！？；：""''（）【】]/g, '');
    
    // 根据语言进行特定的清理
    switch (language) {
      case 'English':
        // 确保英语文案的标点符号正确
        processedCopy = processedCopy.replace(/\s+/g, ' ').trim();
        break;
      case '日本語':
        // 确保日语文案的标点符号正确
        processedCopy = processedCopy.replace(/\s+/g, ' ').trim();
        break;
      case '한국어':
        // 确保韩语文案的标点符号正确
        processedCopy = processedCopy.replace(/\s+/g, ' ').trim();
        break;
      default:
        // 其他语言的基本清理
        processedCopy = processedCopy.replace(/\s+/g, ' ').trim();
    }
    
    return processedCopy;
  };

  // 备用文案生成函数
  const generateFallbackCopies = (productInfo: any, region: string, config: any) => {
    const { language, style, culture } = config;
    const templates = getLocalizedTemplates(region, language);

    const translatedProduct = translateProductInfo(productInfo, region);

    return templates.map(template => {
      return template
        .replace('{product}', translatedProduct.name)
        .replace('{features}', translatedProduct.features)
        .replace('{audience}', translatedProduct.audience)
        .replace('{style}', style)
        .replace('{culture}', culture);
    });
  };

  // 翻译产品信息 - 彻底修复版本
  const translateProductInfo = (productInfo: any, region: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      // 通用产品词汇
      '产品': {
        'US': 'Product',
        'JP': '製品',
        'KR': '제품',
        'GB': 'Product',
        'DE': 'Produkt',
        'FR': 'Produit',
        'IT': 'Prodotto',
        'ES': 'Producto',
        'SG': 'Product',
        'MY': 'Produk',
        'TH': 'ผลิตภัณฑ์',
        'VN': 'Sản Phẩm'
      },
      '商品': {
        'US': 'Product',
        'JP': '商品',
        'KR': '상품',
        'GB': 'Product',
        'DE': 'Produkt',
        'FR': 'Produit',
        'IT': 'Prodotto',
        'ES': 'Producto',
        'SG': 'Product',
        'MY': 'Produk',
        'TH': 'สินค้า',
        'VN': 'Sản Phẩm'
      },
      '设备': {
        'US': 'Device',
        'JP': 'デバイス',
        'KR': '기기',
        'GB': 'Device',
        'DE': 'Gerät',
        'FR': 'Appareil',
        'IT': 'Dispositivo',
        'ES': 'Dispositivo',
        'SG': 'Device',
        'MY': 'Peranti',
        'TH': 'อุปกรณ์',
        'VN': 'Thiết Bị'
      },
      '工具': {
        'US': 'Tool',
        'JP': 'ツール',
        'KR': '도구',
        'GB': 'Tool',
        'DE': 'Werkzeug',
        'FR': 'Outil',
        'IT': 'Strumento',
        'ES': 'Herramienta',
        'SG': 'Tool',
        'MY': 'Alat',
        'TH': 'เครื่องมือ',
        'VN': 'Công Cụ'
      },
      '系统': {
        'US': 'System',
        'JP': 'システム',
        'KR': '시스템',
        'GB': 'System',
        'DE': 'System',
        'FR': 'Système',
        'IT': 'Sistema',
        'ES': 'Sistema',
        'SG': 'System',
        'MY': 'Sistem',
        'TH': 'ระบบ',
        'VN': 'Hệ Thống'
      },
      '软件': {
        'US': 'Software',
        'JP': 'ソフトウェア',
        'KR': '소프트웨어',
        'GB': 'Software',
        'DE': 'Software',
        'FR': 'Logiciel',
        'IT': 'Software',
        'ES': 'Software',
        'SG': 'Software',
        'MY': 'Perisian',
        'TH': 'ซอฟต์แวร์',
        'VN': 'Phần Mềm'
      },
      '应用': {
        'US': 'App',
        'JP': 'アプリ',
        'KR': '앱',
        'GB': 'App',
        'DE': 'App',
        'FR': 'Application',
        'IT': 'App',
        'ES': 'Aplicación',
        'SG': 'App',
        'MY': 'Aplikasi',
        'TH': 'แอป',
        'VN': 'Ứng Dụng'
      },
      '服务': {
        'US': 'Service',
        'JP': 'サービス',
        'KR': '서비스',
        'GB': 'Service',
        'DE': 'Dienst',
        'FR': 'Service',
        'IT': 'Servizio',
        'ES': 'Servicio',
        'SG': 'Service',
        'MY': 'Perkhidmatan',
        'TH': 'บริการ',
        'VN': 'Dịch Vụ'
      },
      // 产品特性词汇
      '智能': {
        'US': 'Smart',
        'JP': 'スマート',
        'KR': '스마트',
        'GB': 'Smart',
        'DE': 'Intelligent',
        'FR': 'Intelligent',
        'IT': 'Intelligente',
        'ES': 'Inteligente',
        'SG': 'Smart',
        'MY': 'Pintar',
        'TH': 'อัจฉริยะ',
        'VN': 'Thông Minh'
      },
      '无线': {
        'US': 'Wireless',
        'JP': 'ワイヤレス',
        'KR': '무선',
        'GB': 'Wireless',
        'DE': 'Drahtlos',
        'FR': 'Sans Fil',
        'IT': 'Senza Fili',
        'ES': 'Inalámbrico',
        'SG': 'Wireless',
        'MY': 'Tanpa Wayar',
        'TH': 'ไร้สาย',
        'VN': 'Không Dây'
      },
      '便携': {
        'US': 'Portable',
        'JP': 'ポータブル',
        'KR': '휴대용',
        'GB': 'Portable',
        'DE': 'Tragbar',
        'FR': 'Portable',
        'IT': 'Portatile',
        'ES': 'Portátil',
        'SG': 'Portable',
        'MY': 'Mudah Alih',
        'TH': 'พกพา',
        'VN': 'Di Động'
      },
      '高效': {
        'US': 'High Efficiency',
        'JP': '高効率',
        'KR': '고효율',
        'GB': 'High Efficiency',
        'DE': 'Hocheffizient',
        'FR': 'Haute Efficacité',
        'IT': 'Alta Efficienza',
        'ES': 'Alta Eficiencia',
        'SG': 'High Efficiency',
        'MY': 'Kecekapan Tinggi',
        'TH': 'ประสิทธิภาพสูง',
        'VN': 'Hiệu Quả Cao'
      },
      '节能': {
        'US': 'Energy Saving',
        'JP': '省エネ',
        'KR': '절약',
        'GB': 'Energy Saving',
        'DE': 'Energiesparend',
        'FR': 'Économie d\'Énergie',
        'IT': 'Risparmio Energetico',
        'ES': 'Ahorro de Energía',
        'SG': 'Energy Saving',
        'MY': 'Penjimatan Tenaga',
        'TH': 'ประหยัดพลังงาน',
        'VN': 'Tiết Kiệm Năng Lượng'
      },
      '环保': {
        'US': 'Eco-friendly',
        'JP': 'エコフレンドリー',
        'KR': '친환경',
        'GB': 'Eco-friendly',
        'DE': 'Umweltfreundlich',
        'FR': 'Écologique',
        'IT': 'Eco-compatibile',
        'ES': 'Ecológico',
        'SG': 'Eco-friendly',
        'MY': 'Mesra Alam',
        'TH': 'เป็นมิตรกับสิ่งแวดล้อม',
        'VN': 'Thân Thiện Môi Trường'
      },
      '时尚': {
        'US': 'Fashionable',
        'JP': 'ファッショナブル',
        'KR': '패셔너블',
        'GB': 'Fashionable',
        'DE': 'Modisch',
        'FR': 'À la Mode',
        'IT': 'Alla Moda',
        'ES': 'Fashionable',
        'SG': 'Fashionable',
        'MY': 'Bergaya',
        'TH': 'ทันสมัย',
        'VN': 'Thời Trang'
      },
      '实用': {
        'US': 'Practical',
        'JP': '実用的',
        'KR': '실용적',
        'GB': 'Practical',
        'DE': 'Praktisch',
        'FR': 'Pratique',
        'IT': 'Pratico',
        'ES': 'Práctico',
        'SG': 'Practical',
        'MY': 'Praktikal',
        'TH': 'ใช้งานได้จริง',
        'VN': 'Thực Tế'
      },
      '创新': {
        'US': 'Innovative',
        'JP': '革新的',
        'KR': '혁신적',
        'GB': 'Innovative',
        'DE': 'Innovativ',
        'FR': 'Innovant',
        'IT': 'Innovativo',
        'ES': 'Innovador',
        'SG': 'Innovative',
        'MY': 'Inovatif',
        'TH': 'นวัตกรรม',
        'VN': 'Sáng Tạo'
      },
      '优质': {
        'US': 'High Quality',
        'JP': '高品質',
        'KR': '고품질',
        'GB': 'High Quality',
        'DE': 'Hochwertig',
        'FR': 'Haute Qualité',
        'IT': 'Alta Qualità',
        'ES': 'Alta Calidad',
        'SG': 'High Quality',
        'MY': 'Kualiti Tinggi',
        'TH': 'คุณภาพสูง',
        'VN': 'Chất Lượng Cao'
      },
      '专业': {
        'US': 'Professional',
        'JP': 'プロフェッショナル',
        'KR': '전문적',
        'GB': 'Professional',
        'DE': 'Professionell',
        'FR': 'Professionnel',
        'IT': 'Professionale',
        'ES': 'Profesional',
        'SG': 'Professional',
        'MY': 'Profesional',
        'TH': 'มืออาชีพ',
        'VN': 'Chuyên Nghiệp'
      },
      '先进': {
        'US': 'Advanced',
        'JP': '先進的',
        'KR': '선진적',
        'GB': 'Advanced',
        'DE': 'Fortschrittlich',
        'FR': 'Avancé',
        'IT': 'Avanzato',
        'ES': 'Avanzado',
        'SG': 'Advanced',
        'MY': 'Maju',
        'TH': 'ก้าวหน้า',
        'VN': 'Tiên Tiến'
      },
      '可靠': {
        'US': 'Reliable',
        'JP': '信頼性',
        'KR': '신뢰할 수 있는',
        'GB': 'Reliable',
        'DE': 'Zuverlässig',
        'FR': 'Fiable',
        'IT': 'Affidabile',
        'ES': 'Confiable',
        'SG': 'Reliable',
        'MY': 'Boleh Dipercayai',
        'TH': 'เชื่อถือได้',
        'VN': 'Đáng Tin Cậy'
      },
      '安全': {
        'US': 'Safe',
        'JP': '安全',
        'KR': '안전한',
        'GB': 'Safe',
        'DE': 'Sicher',
        'FR': 'Sûr',
        'IT': 'Sicuro',
        'ES': 'Seguro',
        'SG': 'Safe',
        'MY': 'Selamat',
        'TH': 'ปลอดภัย',
        'VN': 'An Toàn'
      },
      '快速': {
        'US': 'Fast',
        'JP': '高速',
        'KR': '빠른',
        'GB': 'Fast',
        'DE': 'Schnell',
        'FR': 'Rapide',
        'IT': 'Veloce',
        'ES': 'Rápido',
        'SG': 'Fast',
        'MY': 'Pantas',
        'TH': 'เร็ว',
        'VN': 'Nhanh'
      },
      '便捷': {
        'US': 'Convenient',
        'JP': '便利',
        'KR': '편리한',
        'GB': 'Convenient',
        'DE': 'Bequem',
        'FR': 'Pratique',
        'IT': 'Conveniente',
        'ES': 'Conveniente',
        'SG': 'Convenient',
        'MY': 'Mudah',
        'TH': 'สะดวก',
        'VN': 'Tiện Lợi'
      },
      '舒适': {
        'US': 'Comfortable',
        'JP': '快適',
        'KR': '편안한',
        'GB': 'Comfortable',
        'DE': 'Komfortabel',
        'FR': 'Confortable',
        'IT': 'Comodo',
        'ES': 'Cómodo',
        'SG': 'Comfortable',
        'MY': 'Selesa',
        'TH': 'สบาย',
        'VN': 'Thoải Mái'
      },
      '耐用': {
        'US': 'Durable',
        'JP': '耐久性',
        'KR': '내구성',
        'GB': 'Durable',
        'DE': 'Langlebig',
        'FR': 'Durable',
        'IT': 'Durevole',
        'ES': 'Duradero',
        'SG': 'Durable',
        'MY': 'Tahan Lama',
        'TH': 'ทนทาน',
        'VN': 'Bền Bỉ'
      },
      '轻便': {
        'US': 'Lightweight',
        'JP': '軽量',
        'KR': '가벼운',
        'GB': 'Lightweight',
        'DE': 'Leicht',
        'FR': 'Léger',
        'IT': 'Leggero',
        'ES': 'Ligero',
        'SG': 'Lightweight',
        'MY': 'Ringan',
        'TH': 'น้ำหนักเบา',
        'VN': 'Nhẹ'
      },
      '小巧': {
        'US': 'Compact',
        'JP': 'コンパクト',
        'KR': '컴팩트',
        'GB': 'Compact',
        'DE': 'Kompakt',
        'FR': 'Compact',
        'IT': 'Compatto',
        'ES': 'Compacto',
        'SG': 'Compact',
        'MY': 'Padat',
        'TH': 'กะทัดรัด',
        'VN': 'Nhỏ Gọn'
      },
      // 金融投资类
      '股票': {
        'US': 'Investment Products',
        'JP': '投資商品',
        'KR': '투자 상품',
        'GB': 'Investment Products',
        'DE': 'Anlageprodukte',
        'FR': 'Produits d\'Investissement',
        'IT': 'Prodotti di Investimento',
        'ES': 'Productos de Inversión',
        'SG': 'Investment Products',
        'MY': 'Produk Pelaburan',
        'TH': 'ผลิตภัณฑ์การลงทุน',
        'VN': 'Sản Phẩm Đầu Tư'
      },
      '一夜暴富': {
        'US': 'Wealth Building',
        'JP': '資産構築',
        'KR': '부자 되기',
        'GB': 'Wealth Building',
        'DE': 'Vermögensaufbau',
        'FR': 'Construction de Richesse',
        'IT': 'Costruzione di Ricchezza',
        'ES': 'Construcción de Riqueza',
        'SG': 'Wealth Building',
        'MY': 'Pembinaan Kekayaan',
        'TH': 'การสร้างความมั่งคั่ง',
        'VN': 'Xây Dựng Tài Sản'
      },
      '一夜暴富,低投资高回报': {
        'US': 'Wealth Building with Affordable Investment and Good Returns',
        'JP': '資産構築、手頃な投資で良いリターン',
        'KR': '부자 되기, 저렴한 투자로 좋은 수익',
        'GB': 'Wealth Building with Affordable Investment and Good Returns',
        'DE': 'Vermögensaufbau mit erschwinglicher Investition und guten Renditen',
        'FR': 'Construction de Richesse avec Investissement Abordable et Bons Rendements',
        'IT': 'Costruzione di Ricchezza con Investimento Accessibile e Buoni Rendimenti',
        'ES': 'Construcción de Riqueza con Inversión Asequible y Buenos Rendimientos',
        'SG': 'Wealth Building with Affordable Investment and Good Returns',
        'MY': 'Pembinaan Kekayaan dengan Pelaburan Berpatutan dan Pulangan Baik',
        'TH': 'การสร้างความมั่งคั่งกับการลงทุนที่เหมาะสมและผลตอบแทนที่ดี',
        'VN': 'Xây Dựng Tài Sản với Đầu Tư Phù Hợp và Lợi Nhuận Tốt'
      },
      '高回报': {
        'US': 'Good Returns',
        'JP': '良いリターン',
        'KR': '좋은 수익',
        'GB': 'Good Returns',
        'DE': 'Gute Renditen',
        'FR': 'Bons Rendements',
        'IT': 'Buoni Rendimenti',
        'ES': 'Buenos Rendimientos',
        'SG': 'Good Returns',
        'MY': 'Pulangan Baik',
        'TH': 'ผลตอบแทนที่ดี',
        'VN': 'Lợi Nhuận Tốt'
      },
      '低投资': {
        'US': 'Affordable Investment',
        'JP': '手頃な投資',
        'KR': '저렴한 투자',
        'GB': 'Affordable Investment',
        'DE': 'Erschwingliche Investition',
        'FR': 'Investissement Abordable',
        'IT': 'Investimento Accessibile',
        'ES': 'Inversión Asequible',
        'SG': 'Affordable Investment',
        'MY': 'Pelaburan Berpatutan',
        'TH': 'การลงทุนที่เหมาะสม',
        'VN': 'Đầu Tư Phù Hợp'
      },
      '低投资高回报': {
        'US': 'Affordable Investment with Good Returns',
        'JP': '手頃な投資で良いリターン',
        'KR': '저렴한 투자로 좋은 수익',
        'GB': 'Affordable Investment with Good Returns',
        'DE': 'Erschwingliche Investition mit guten Renditen',
        'FR': 'Investissement Abordable avec de Bons Rendements',
        'IT': 'Investimento Accessibile con Buoni Rendimenti',
        'ES': 'Inversión Asequible con Buenos Rendimientos',
        'SG': 'Affordable Investment with Good Returns',
        'MY': 'Pelaburan Berpatutan dengan Pulangan Baik',
        'TH': 'การลงทุนที่เหมาะสมกับผลตอบแทนที่ดี',
        'VN': 'Đầu Tư Phù Hợp với Lợi Nhuận Tốt'
      },
      '投资': {
        'US': 'Financial Products',
        'JP': '金融商品',
        'KR': '금융 상품',
        'GB': 'Financial Products',
        'DE': 'Finanzprodukte',
        'FR': 'Produits Financiers',
        'IT': 'Prodotti Finanziari',
        'ES': 'Productos Financieros',
        'SG': 'Financial Products',
        'MY': 'Produk Kewangan',
        'TH': 'ผลิตภัณฑ์ทางการเงิน',
        'VN': 'Sản Phẩm Tài Chính'
      },
      '理财': {
        'US': 'Financial Planning',
        'JP': '資産運用',
        'KR': '자산 관리',
        'GB': 'Financial Planning',
        'DE': 'Finanzplanung',
        'FR': 'Planification Financière',
        'IT': 'Pianificazione Finanziaria',
        'ES': 'Planificación Financiera',
        'SG': 'Financial Planning',
        'MY': 'Perancangan Kewangan',
        'TH': 'การวางแผนทางการเงิน',
        'VN': 'Lập Kế Hoạch Tài Chính'
      },
      '希望一夜暴富的人': {
        'US': 'People Seeking Wealth Building',
        'JP': '資産構築を求める人々',
        'KR': '부자 되기를 원하는 사람들',
        'GB': 'People Seeking Wealth Building',
        'DE': 'Menschen, die Vermögensaufbau suchen',
        'FR': 'Personnes Cherchant la Construction de Richesse',
        'IT': 'Persone che Cercano la Costruzione di Ricchezza',
        'ES': 'Personas que Buscan la Construcción de Riqueza',
        'SG': 'People Seeking Wealth Building',
        'MY': 'Orang yang Mencari Pembinaan Kekayaan',
        'TH': 'ผู้ที่แสวงหาการสร้างความมั่งคั่ง',
        'VN': 'Những Người Tìm Kiếm Xây Dựng Tài Sản'
      },
      // 运动健身器材
      '运动健身器材': {
        'US': 'Sports Fitness Equipment',
        'JP': 'スポーツフィットネス機器',
        'KR': '스포츠 피트니스 장비',
        'GB': 'Sports Fitness Equipment',
        'DE': 'Sport- und Fitnessgeräte',
        'FR': 'Équipement de Fitness Sportif',
        'IT': 'Attrezzature Sportive e Fitness',
        'ES': 'Equipamiento Deportivo y Fitness',
        'SG': 'Sports Fitness Equipment',
        'MY': 'Peralatan Kecergasan Sukan',
        'TH': 'อุปกรณ์กีฬาและฟิตเนส',
        'VN': 'Thiết Bị Thể Thao và Fitness'
      },
      '便携设计': {
        'US': 'Portable Design',
        'JP': 'ポータブルデザイン',
        'KR': '휴대용 디자인',
        'GB': 'Portable Design',
        'DE': 'Tragbares Design',
        'FR': 'Design Portable',
        'IT': 'Design Portatile',
        'ES': 'Diseño Portátil',
        'SG': 'Portable Design',
        'MY': 'Reka Bentuk Mudah Alih',
        'TH': 'การออกแบบแบบพกพา',
        'VN': 'Thiết Kế Di Động'
      },
      '多功能': {
        'US': 'Multi-functional',
        'JP': '多機能',
        'KR': '다기능',
        'GB': 'Multi-functional',
        'DE': 'Multifunktional',
        'FR': 'Multifonctionnel',
        'IT': 'Multifunzionale',
        'ES': 'Multifuncional',
        'SG': 'Multi-functional',
        'MY': 'Pelbagai Fungsi',
        'TH': 'หลายฟังก์ชัน',
        'VN': 'Đa Chức Năng'
      },
      '耐用材质': {
        'US': 'Durable Material',
        'JP': '耐久性素材',
        'KR': '내구성 재료',
        'GB': 'Durable Material',
        'DE': 'Langlebiges Material',
        'FR': 'Matériau Durable',
        'IT': 'Materiale Durevole',
        'ES': 'Material Duradero',
        'SG': 'Durable Material',
        'MY': 'Bahan Tahan Lama',
        'TH': 'วัสดุทนทาน',
        'VN': 'Vật Liệu Bền Bỉ'
      },
      '适合家庭使用': {
        'US': 'Suitable for Home Use',
        'JP': '家庭使用に適している',
        'KR': '가정용으로 적합',
        'GB': 'Suitable for Home Use',
        'DE': 'Geeignet für den Heimgebrauch',
        'FR': 'Adapté à l\'Usage Domestique',
        'IT': 'Adatto all\'Uso Domestico',
        'ES': 'Adecuado para Uso Doméstico',
        'SG': 'Suitable for Home Use',
        'MY': 'Sesuai untuk Penggunaan Rumah',
        'TH': 'เหมาะสำหรับใช้ในบ้าน',
        'VN': 'Phù Hợp cho Sử Dụng Gia Đình'
      },
      '健身爱好者': {
        'US': 'Fitness Enthusiasts',
        'JP': 'フィットネス愛好家',
        'KR': '피트니스 애호가',
        'GB': 'Fitness Enthusiasts',
        'DE': 'Fitness-Enthusiasten',
        'FR': 'Passionnés de Fitness',
        'IT': 'Appassionati di Fitness',
        'ES': 'Entusiastas del Fitness',
        'SG': 'Fitness Enthusiasts',
        'MY': 'Peminat Kecergasan',
        'TH': 'ผู้ที่ชื่นชอบการออกกำลังกาย',
        'VN': 'Người Yêu Thích Fitness'
      },
      '居家运动人群': {
        'US': 'Home Exercise Crowd',
        'JP': '在宅運動をする人々',
        'KR': '홈 운동 인구',
        'GB': 'Home Exercise Crowd',
        'DE': 'Heimtrainingsgruppe',
        'FR': 'Groupe d\'Exercice à Domicile',
        'IT': 'Gruppo di Esercizio a Casa',
        'ES': 'Grupo de Ejercicio en Casa',
        'SG': 'Home Exercise Crowd',
        'MY': 'Kumpulan Senaman di Rumah',
        'TH': 'กลุ่มคนออกกำลังกายที่บ้าน',
        'VN': 'Nhóm Tập Thể Dục Tại Nhà'
      },
      // 电子产品
      '智能无线耳机': {
        'US': 'Smart Wireless Headphones',
        'JP': 'スマートワイヤレスヘッドフォン',
        'KR': '스마트 무선 헤드폰',
        'GB': 'Smart Wireless Headphones',
        'DE': 'Smart Wireless Kopfhörer',
        'FR': 'Écouteurs Sans Fil Intelligents',
        'IT': 'Cuffie Wireless Intelligenti',
        'ES': 'Auriculares Inalámbricos Inteligentes',
        'SG': 'Smart Wireless Headphones',
        'MY': 'Fon Telinga Tanpa Wayar Pintar',
        'TH': 'หูฟังไร้สายอัจฉริยะ',
        'VN': 'Tai Nghe Không Dây Thông Minh'
      },
      '主动降噪': {
        'US': 'Active Noise Cancellation',
        'JP': 'アクティブノイズキャンセリング',
        'KR': '액티브 노이즈 캔슬링',
        'GB': 'Active Noise Cancellation',
        'DE': 'Aktive Geräuschunterdrückung',
        'FR': 'Réduction Active du Bruit',
        'IT': 'Cancellazione Attiva del Rumore',
        'ES': 'Cancelación Activa de Ruido',
        'SG': 'Active Noise Cancellation',
        'MY': 'Pembatalan Bunyi Aktif',
        'TH': 'การลดเสียงรบกวนแบบแอคทีฟ',
        'VN': 'Chống Ồn Chủ Động'
      },
      '长续航': {
        'US': 'Long Battery Life',
        'JP': '長時間バッテリー',
        'KR': '긴 배터리 수명',
        'GB': 'Long Battery Life',
        'DE': 'Lange Akkulaufzeit',
        'FR': 'Longue Autonomie',
        'IT': 'Lunga Durata della Batteria',
        'ES': 'Larga Duración de Batería',
        'SG': 'Long Battery Life',
        'MY': 'Hayat Bateri Panjang',
        'TH': 'อายุแบตเตอรี่ยาวนาน',
        'VN': 'Pin Trâu Bền Bỉ'
      },
      '快速充电': {
        'US': 'Fast Charging',
        'JP': '急速充電',
        'KR': '빠른 충전',
        'GB': 'Fast Charging',
        'DE': 'Schnellladung',
        'FR': 'Chargement Rapide',
        'IT': 'Ricaricamento Rapido',
        'ES': 'Carga Rápida',
        'SG': 'Fast Charging',
        'MY': 'Pengecasan Pantas',
        'TH': 'การชาร์จเร็ว',
        'VN': 'Sạc Nhanh'
      },
      '舒适佩戴': {
        'US': 'Comfortable Fit',
        'JP': '快適な装着感',
        'KR': '편안한 착용감',
        'GB': 'Comfortable Fit',
        'DE': 'Komfortabler Sitz',
        'FR': 'Ajustement Confortable',
        'IT': 'Adattamento Comodo',
        'ES': 'Ajuste Cómodo',
        'SG': 'Comfortable Fit',
        'MY': 'Sesuai Selesa',
        'TH': 'การสวมใส่ที่สบาย',
        'VN': 'Đeo Thoải Mái'
      },
      // 目标受众
      '年轻上班族': {
        'US': 'Young Professionals',
        'JP': '若い会社員',
        'KR': '젊은 직장인',
        'GB': 'Young Professionals',
        'DE': 'Junge Berufstätige',
        'FR': 'Jeunes Professionnels',
        'IT': 'Giovani Professionisti',
        'ES': 'Jóvenes Profesionales',
        'SG': 'Young Professionals',
        'MY': 'Profesional Muda',
        'TH': 'คนทำงานรุ่นใหม่',
        'VN': 'Người Đi Làm Trẻ'
      },
      '音乐爱好者': {
        'US': 'Music Lovers',
        'JP': '音楽愛好家',
        'KR': '음악 애호가',
        'GB': 'Music Lovers',
        'DE': 'Musikliebhaber',
        'FR': 'Passionnés de Musique',
        'IT': 'Amanti della Musica',
        'ES': 'Amantes de la Música',
        'SG': 'Music Lovers',
        'MY': 'Peminat Muzik',
        'TH': 'ผู้ที่ชื่นชอบดนตรี',
        'VN': 'Người Yêu Âm Nhạc'
      }
    };

    const translateText = (text: string) => {
      if (!text) return '';
      
      // 首先尝试翻译整个文本（处理复合短语）
      const fullTextTranslation = translations[text];
      if (fullTextTranslation) {
        return fullTextTranslation[region] || fullTextTranslation['US'] || text;
      }
      
      // 分割文本，支持多种分隔符
      const words = text.split(/[,，、\s]+/).filter(word => word.trim());
      
      const translatedWords = words.map(word => {
        const trimmedWord = word.trim();
        const wordTranslations = translations[trimmedWord];
        
        if (wordTranslations) {
          return wordTranslations[region] || wordTranslations['US'] || trimmedWord;
        }
        
        // 如果没有找到翻译，返回原词
        return trimmedWord;
      });
      
      return translatedWords.join(' ');
    };

    return {
      name: translateText(productInfo.name),
      features: translateText(productInfo.features),
      audience: translateText(productInfo.targetAudience)
    };
  };

  // 获取本土化文案模板
  const getLocalizedTemplates = (region: string, _language: string) => {
    const templates: { [key: string]: string[] } = {

      'US': [
        '✨ Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '⭐ Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '💪 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'JP': [
        '✨ {product}で人生を変えよう！{features}、{audience}のために設計されました。テクノロジーとライフスタイルの完璧な融合を体験しよう！',
        '⭐ {product}の独特な魅力を発見！{features}で{audience}の中で際立とう。期間限定オファー、お見逃しなく！',
        '💪 人気商品！{product}は{features}で{audience}の第一選択肢に。今すぐ特別割引をゲット！'
      ],
      'KR': [
        '✨ {product}로 인생을 바꿔보세요! {features}, {audience}를 위해 설계되었습니다. 기술과 라이프스타일의 완벽한 융합을 경험하세요!',
        '⭐ {product}의 독특한 매력을 발견하세요! {features}로 {audience} 중에서 돋보이세요. 한정 시간 특가, 놓치지 마세요!',
        '💪 인기 상품! {product}는 {features}로 {audience}의 첫 번째 선택이 됩니다. 지금 특별 할인을 받으세요!'
      ],
      'MY': [
        '🚀 Tukar hidup anda dengan {product}! {features} direka untuk {audience}. Alami gabungan sempurna teknologi dan gaya hidup!',
        '💎 Temui keunikan {product}! {features} membantu anda menonjol dalam kalangan {audience}. Tawaran terhad, jangan lepaskan!',
        '🔥 Jualan panas! {product} dengan {features} menjadi pilihan pertama {audience}. Dapatkan diskaun eksklusif sekarang!'
      ],
      'TH': [
        '🚀 เปลี่ยนชีวิตของคุณด้วย {product}! {features} ออกแบบมาเพื่อ {audience} สัมผัสการผสมผสานที่สมบูรณ์แบบของเทคโนโลยีและไลฟ์สไตล์!',
        '💎 ค้นพบเสน่ห์ที่ไม่เหมือนใครของ {product}! {features} ช่วยให้คุณโดดเด่นในหมู่ {audience} ข้อเสนอจำกัดเวลา อย่าพลาด!',
        '🔥 ขายดี! {product} ด้วย {features} กลายเป็นตัวเลือกแรกสำหรับ {audience} รับส่วนลดพิเศษตอนนี้!'
      ],
      'VN': [
        '🚀 Thay đổi cuộc sống của bạn với {product}! {features} được thiết kế cho {audience}. Trải nghiệm sự kết hợp hoàn hảo giữa công nghệ và lối sống!',
        '💎 Khám phá sức hấp dẫn độc đáo của {product}! {features} giúp bạn nổi bật giữa {audience}. Ưu đãi có hạn, đừng bỏ lỡ!',
        '🔥 Bán chạy! {product} với {features} trở thành lựa chọn đầu tiên cho {audience}. Nhận ưu đãi đặc biệt ngay bây giờ!'
      ],
      'ID': [
        '🚀 Ubah hidup Anda dengan {product}! {features} dirancang untuk {audience}. Rasakan perpaduan sempurna teknologi dan gaya hidup!',
        '💎 Temukan pesona unik {product}! {features} membantu Anda menonjol di antara {audience}. Penawaran terbatas, jangan lewatkan!',
        '🔥 Laris manis! {product} dengan {features} menjadi pilihan pertama {audience}. Dapatkan diskon eksklusif sekarang!'
      ],
      'PH': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'TW': [
        '🚀 {product} - 改變你的生活方式！{features}，專為{audience}設計。立即體驗科技與生活的完美融合！',
        '💎 發現{product}的獨特魅力！{features}讓你在{audience}中脫穎而出。限時特價，錯過就沒有了！',
        '🔥 熱銷爆款！{product}憑藉{features}成為{audience}的首選。現在購買享受專屬優惠，快來搶購吧！'
      ],
      'HK': [
        '🚀 {product} - 改變你的生活方式！{features}，專為{audience}設計。立即體驗科技與生活的完美融合！',
        '💎 發現{product}的獨特魅力！{features}讓你在{audience}中脫穎而出。限時特價，錯過就沒有了！',
        '🔥 熱銷爆款！{product}憑藉{features}成為{audience}的首選。現在購買享受專屬優惠，快來搶購吧！'
      ],
      'SG': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'IN': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'CA': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'GB': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'AU': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'NZ': [
        '🚀 Transform your life with {product}! {features} designed for {audience}. Experience the perfect fusion of technology and lifestyle!',
        '💎 Discover the unique charm of {product}! {features} help you stand out among {audience}. Limited time offer, don\'t miss out!',
        '🔥 Hot selling! {product} with {features} becomes the first choice for {audience}. Get exclusive discounts now!'
      ],
      'DE': [
        '🚀 Verwandeln Sie Ihr Leben mit {product}! {features} entwickelt für {audience}. Erleben Sie die perfekte Verschmelzung von Technologie und Lifestyle!',
        '💎 Entdecken Sie den einzigartigen Charme von {product}! {features} helfen Ihnen, sich unter {audience} hervorzuheben. Begrenztes Angebot, nicht verpassen!',
        '🔥 Heißer Verkauf! {product} mit {features} wird zur ersten Wahl für {audience}. Holen Sie sich jetzt exklusive Rabatte!'
      ],
      'FR': [
        '🚀 Transformez votre vie avec {product}! {features} conçu pour {audience}. Vivez la fusion parfaite de technologie et de style de vie!',
        '💎 Découvrez le charme unique de {product}! {features} vous aident à vous démarquer parmi {audience}. Offre limitée, ne manquez pas!',
        '🔥 Vente chaude! {product} avec {features} devient le premier choix pour {audience}. Obtenez des réductions exclusives maintenant!'
      ],
      'IT': [
        '🚀 Trasforma la tua vita con {product}! {features} progettato per {audience}. Vivi la perfetta fusione di tecnologia e stile di vita!',
        '💎 Scopri il fascino unico di {product}! {features} ti aiutano a distinguerti tra {audience}. Offerta limitata, non perdere!',
        '🔥 Vendita calda! {product} con {features} diventa la prima scelta per {audience}. Ottieni sconti esclusivi ora!'
      ],
      'ES': [
        '🚀 ¡Transforma tu vida con {product}! {features} diseñado para {audience}. ¡Experimenta la fusión perfecta de tecnología y estilo de vida!',
        '💎 ¡Descubre el encanto único de {product}! {features} te ayudan a destacar entre {audience}. ¡Oferta limitada, no te lo pierdas!',
        '🔥 ¡Venta caliente! {product} con {features} se convierte en la primera opción para {audience}. ¡Obtén descuentos exclusivos ahora!'
      ],
      'NL': [
        '🚀 Transformeer je leven met {product}! {features} ontworpen voor {audience}. Ervaar de perfecte fusie van technologie en levensstijl!',
        '💎 Ontdek de unieke charme van {product}! {features} helpen je op te vallen onder {audience}. Beperkte aanbieding, mis het niet!',
        '🔥 Hete verkoop! {product} met {features} wordt de eerste keuze voor {audience}. Krijg nu exclusieve kortingen!'
      ],
      'MX': [
        '🚀 ¡Transforma tu vida con {product}! {features} diseñado para {audience}. ¡Experimenta la fusión perfecta de tecnología y estilo de vida!',
        '💎 ¡Descubre el encanto único de {product}! {features} te ayudan a destacar entre {audience}. ¡Oferta limitada, no te lo pierdas!',
        '�� ¡Venta caliente! {product} con {features} se convierte en la primera opción para {audience}. ¡Obtén descuentos exclusivos ahora!'
      ],
      'BR': [
        '🚀 Transforme sua vida com {product}! {features} projetado para {audience}. Experimente a fusão perfeita de tecnologia e estilo de vida!',
        '💎 Descubra o charme único de {product}! {features} ajudam você a se destacar entre {audience}. Oferta limitada, não perca!',
        '🔥 Venda quente! {product} com {features} se torna a primeira escolha para {audience}. Obtenha descontos exclusivos agora!'
      ],
      'AR': [
        '🚀 ¡Transforma tu vida con {product}! {features} diseñado para {audience}. ¡Experimenta la fusión perfecta de tecnología y estilo de vida!',
        '💎 ¡Descubre el encanto único de {product}! {features} te ayudan a destacar entre {audience}. ¡Oferta limitada, no te lo pierdas!',
        '🔥 ¡Venta caliente! {product} con {features} se convierte en la primera opción para {audience}. ¡Obtén descuentos exclusivos ahora!'
      ]
    };

    return templates[region] || templates['US']; // 默认使用英语模板
  };

  // 获取已选择地区的文本显示
  const getSelectedRegionsText = () => {
    if (productInfo.regions.length === 0) {
      return '请选择投放地区';
    }
    if (productInfo.regions.length === 1) {
      const region = productInfo.regions[0];
      const regionData = regionGroups.flatMap(group => group.regions).find(r => r.value === region);
      return regionData ? regionData.label.split(' ')[1] : '未知地区'; // 只显示国家名称，不显示国旗
    }
    
    // 多个地区的情况
    const selectedRegions = productInfo.regions.map(region => {
      const regionData = regionGroups.flatMap(group => group.regions).find(r => r.value === region);
      return regionData ? regionData.label.split(' ')[1] : '未知地区'; // 只显示国家名称，不显示国旗
    });
    
    if (productInfo.regions.length <= 3) {
      return selectedRegions.join('、');
    } else {
      return `${selectedRegions.slice(0, 3).join('、')}等${productInfo.regions.length}个地区`;
    }
  };

  // 处理地区选择
  const handleRegionToggle = (region: string) => {
    setProductInfo(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  // 搜索过滤逻辑
  const getFilteredRegionGroups = () => {
    if (!regionSearchTerm.trim()) {
      return regionGroups;
    }

    const searchTerm = regionSearchTerm.toLowerCase();
    return regionGroups.map(group => ({
      ...group,
      regions: group.regions.filter(region => 
        region.label.toLowerCase().includes(searchTerm) ||
        region.desc.toLowerCase().includes(searchTerm) ||
        region.value.toLowerCase().includes(searchTerm)
      )
    })).filter(group => group.regions.length > 0);
  };

  // 主要的生成处理函数
  const handleGenerate = async () => {
    console.log('🎯 表单提交，产品信息:', productInfo);
    
    // 检查必填字段
    if (!productInfo.name || !productInfo.features || !productInfo.targetAudience || productInfo.regions.length === 0) {
      console.error('❌ 必填字段未填写完整:', {
        name: productInfo.name,
        features: productInfo.features,
        targetAudience: productInfo.targetAudience,
        regions: productInfo.regions
      });
      alert('请填写所有必填字段并至少选择一个投放地区');
      return;
    }

    // 进行风险检测
    const policyResult = checkProductInfo(productInfo);
    setPolicyCheckResult(policyResult);
    console.log('🔍 风险检测结果:', policyResult);

    setIsLoading(true);
    console.log('🚀 开始生成文案...');

    try {
      const generatedCopies = await generateCopies(productInfo);
      console.log('✅ 文案生成完成:', generatedCopies);
      setCopies(generatedCopies);
    } catch (error) {
      console.error('❌ 生成文案时出错:', error);
      alert('生成文案时出现错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 获取促销文本
  const getPromotionText = (promotion: string) => {
    switch (promotion) {
      case 'discount':
        return '折扣优惠';
      case 'limited':
        return '限时抢购';
      case 'premium':
        return '高端品质';
      case 'bundle':
        return '套装组合';
      case 'new':
        return '新品上市';
      case 'sale':
        return '清仓特卖';
      case 'gift':
        return '赠品促销';
      case 'none':
        return '无促销';
      default:
        return '折扣优惠';
    }
  };

  // 地区分组配置
  const regionGroups = [
    {
      name: '热门地区',
      regions: [
        { value: 'US', label: '🇺🇸 美国', desc: '英语市场' },
        { value: 'JP', label: '🇯🇵 日本', desc: '日语市场' },
        { value: 'KR', label: '🇰🇷 韩国', desc: '韩语市场' },
        { value: 'SG', label: '🇸🇬 新加坡', desc: '英语市场' },
        { value: 'MY', label: '🇲🇾 马来西亚', desc: '马来语市场' },
        { value: 'TH', label: '🇹🇭 泰国', desc: '泰语市场' },
        { value: 'VN', label: '🇻🇳 越南', desc: '越南语市场' }
      ]
    },
    {
      name: '东南亚',
      regions: [
        { value: 'ID', label: '🇮🇩 印度尼西亚', desc: '印尼语市场' },
        { value: 'PH', label: '🇵🇭 菲律宾', desc: '英语市场' },
        { value: 'MM', label: '🇲🇲 缅甸', desc: '缅甸语市场' },
        { value: 'KH', label: '🇰🇭 柬埔寨', desc: '柬埔寨语市场' },
        { value: 'LA', label: '🇱🇦 老挝', desc: '老挝语市场' },
        { value: 'BN', label: '🇧🇳 文莱', desc: '马来语市场' }
      ]
    },
    {
      name: '欧美地区',
      regions: [
        { value: 'GB', label: '🇬🇧 英国', desc: '英语市场' },
        { value: 'CA', label: '🇨🇦 加拿大', desc: '英语市场' },
        { value: 'DE', label: '🇩🇪 德国', desc: '德语市场' },
        { value: 'FR', label: '🇫🇷 法国', desc: '法语市场' },
        { value: 'IT', label: '🇮🇹 意大利', desc: '意大利语市场' },
        { value: 'ES', label: '🇪🇸 西班牙', desc: '西班牙语市场' },
        { value: 'NL', label: '🇳🇱 荷兰', desc: '荷兰语市场' },
        { value: 'BE', label: '🇧🇪 比利时', desc: '法语/荷兰语市场' },
        { value: 'CH', label: '🇨🇭 瑞士', desc: '德语/法语/意大利语市场' },
        { value: 'AT', label: '🇦🇹 奥地利', desc: '德语市场' },
        { value: 'SE', label: '🇸🇪 瑞典', desc: '瑞典语市场' },
        { value: 'NO', label: '🇳🇴 挪威', desc: '挪威语市场' },
        { value: 'DK', label: '🇩🇰 丹麦', desc: '丹麦语市场' },
        { value: 'FI', label: '🇫🇮 芬兰', desc: '芬兰语市场' },
        { value: 'PL', label: '🇵🇱 波兰', desc: '波兰语市场' },
        { value: 'CZ', label: '🇨🇿 捷克', desc: '捷克语市场' },
        { value: 'HU', label: '🇭🇺 匈牙利', desc: '匈牙利语市场' },
        { value: 'RO', label: '🇷🇴 罗马尼亚', desc: '罗马尼亚语市场' },
        { value: 'BG', label: '🇧🇬 保加利亚', desc: '保加利亚语市场' },
        { value: 'HR', label: '🇭🇷 克罗地亚', desc: '克罗地亚语市场' },
        { value: 'SI', label: '🇸🇮 斯洛文尼亚', desc: '斯洛文尼亚语市场' },
        { value: 'SK', label: '🇸🇰 斯洛伐克', desc: '斯洛伐克语市场' },
        { value: 'LT', label: '🇱🇹 立陶宛', desc: '立陶宛语市场' },
        { value: 'LV', label: '🇱🇻 拉脱维亚', desc: '拉脱维亚语市场' },
        { value: 'EE', label: '🇪🇪 爱沙尼亚', desc: '爱沙尼亚语市场' },
        { value: 'IE', label: '🇮🇪 爱尔兰', desc: '英语市场' },
        { value: 'PT', label: '🇵🇹 葡萄牙', desc: '葡萄牙语市场' },
        { value: 'GR', label: '🇬🇷 希腊', desc: '希腊语市场' }
      ]
    },
    {
      name: '美洲地区',
      regions: [
        { value: 'MX', label: '🇲🇽 墨西哥', desc: '西班牙语市场' },
        { value: 'BR', label: '🇧🇷 巴西', desc: '葡萄牙语市场' },
        { value: 'AR', label: '🇦🇷 阿根廷', desc: '西班牙语市场' },
        { value: 'CL', label: '🇨🇱 智利', desc: '西班牙语市场' },
        { value: 'CO', label: '🇨🇴 哥伦比亚', desc: '西班牙语市场' },
        { value: 'PE', label: '🇵🇪 秘鲁', desc: '西班牙语市场' },
        { value: 'VE', label: '🇻🇪 委内瑞拉', desc: '西班牙语市场' },
        { value: 'EC', label: '🇪🇨 厄瓜多尔', desc: '西班牙语市场' },
        { value: 'BO', label: '🇧🇴 玻利维亚', desc: '西班牙语市场' },
        { value: 'PY', label: '🇵🇾 巴拉圭', desc: '西班牙语市场' },
        { value: 'UY', label: '🇺🇾 乌拉圭', desc: '西班牙语市场' },
        { value: 'CR', label: '🇨🇷 哥斯达黎加', desc: '西班牙语市场' },
        { value: 'PA', label: '🇵🇦 巴拿马', desc: '西班牙语市场' },
        { value: 'GT', label: '🇬🇹 危地马拉', desc: '西班牙语市场' },
        { value: 'SV', label: '🇸🇻 萨尔瓦多', desc: '西班牙语市场' },
        { value: 'HN', label: '🇭🇳 洪都拉斯', desc: '西班牙语市场' },
        { value: 'NI', label: '🇳🇮 尼加拉瓜', desc: '西班牙语市场' },
        { value: 'DO', label: '🇩🇴 多米尼加', desc: '西班牙语市场' },
        { value: 'CU', label: '🇨🇺 古巴', desc: '西班牙语市场' },
        { value: 'JM', label: '🇯🇲 牙买加', desc: '英语市场' },
        { value: 'TT', label: '🇹🇹 特立尼达和多巴哥', desc: '英语市场' },
        { value: 'BB', label: '🇧🇧 巴巴多斯', desc: '英语市场' },
        { value: 'GY', label: '🇬🇾 圭亚那', desc: '英语市场' },
        { value: 'SR', label: '🇸🇷 苏里南', desc: '荷兰语市场' },
        { value: 'GF', label: '🇬🇫 法属圭亚那', desc: '法语市场' }
      ]
    },
    {
      name: '其他地区',
      regions: [
        { value: 'IN', label: '🇮🇳 印度', desc: '英语市场' },
        { value: 'TW', label: '🇨🇳 台湾', desc: '繁体中文市场' },
        { value: 'HK', label: '🇭🇰 香港', desc: '繁体中文市场' },
        { value: 'AU', label: '🇦🇺 澳大利亚', desc: '英语市场' },
        { value: 'NZ', label: '🇳🇿 新西兰', desc: '英语市场' },
        { value: 'ZA', label: '🇿🇦 南非', desc: '英语市场' },
        { value: 'EG', label: '🇪🇬 埃及', desc: '阿拉伯语市场' },
        { value: 'SA', label: '🇸🇦 沙特阿拉伯', desc: '阿拉伯语市场' },
        { value: 'AE', label: '🇦🇪 阿联酋', desc: '阿拉伯语市场' },
        { value: 'QA', label: '🇶🇦 卡塔尔', desc: '阿拉伯语市场' },
        { value: 'KW', label: '🇰🇼 科威特', desc: '阿拉伯语市场' },
        { value: 'BH', label: '🇧🇭 巴林', desc: '阿拉伯语市场' },
        { value: 'OM', label: '🇴🇲 阿曼', desc: '阿拉伯语市场' },
        { value: 'JO', label: '🇯🇴 约旦', desc: '阿拉伯语市场' },
        { value: 'LB', label: '🇱🇧 黎巴嫩', desc: '阿拉伯语市场' },
        { value: 'IL', label: '🇮🇱 以色列', desc: '希伯来语市场' },
        { value: 'TR', label: '🇹🇷 土耳其', desc: '土耳其语市场' },
        { value: 'IR', label: '🇮🇷 伊朗', desc: '波斯语市场' },
        { value: 'PK', label: '🇵🇰 巴基斯坦', desc: '乌尔都语市场' },
        { value: 'BD', label: '🇧🇩 孟加拉国', desc: '孟加拉语市场' },
        { value: 'LK', label: '🇱🇰 斯里兰卡', desc: '僧伽罗语市场' },
        { value: 'NP', label: '🇳🇵 尼泊尔', desc: '尼泊尔语市场' },
        { value: 'MV', label: '🇲🇻 马尔代夫', desc: '迪维希语市场' },
        { value: 'BT', label: '🇧🇹 不丹', desc: '宗卡语市场' },
        { value: 'MN', label: '🇲🇳 蒙古', desc: '蒙古语市场' },
        { value: 'KZ', label: '🇰🇿 哈萨克斯坦', desc: '哈萨克语市场' },
        { value: 'UZ', label: '🇺🇿 乌兹别克斯坦', desc: '乌兹别克语市场' },
        { value: 'KG', label: '🇰🇬 吉尔吉斯斯坦', desc: '吉尔吉斯语市场' },
        { value: 'TJ', label: '🇹🇯 塔吉克斯坦', desc: '塔吉克语市场' },
        { value: 'TM', label: '🇹🇲 土库曼斯坦', desc: '土库曼语市场' },
        { value: 'AF', label: '🇦🇫 阿富汗', desc: '普什图语市场' },
        { value: 'GE', label: '🇬🇪 格鲁吉亚', desc: '格鲁吉亚语市场' },
        { value: 'AM', label: '🇦🇲 亚美尼亚', desc: '亚美尼亚语市场' },
        { value: 'AZ', label: '🇦🇿 阿塞拜疆', desc: '阿塞拜疆语市场' },
        { value: 'UA', label: '🇺🇦 乌克兰', desc: '乌克兰语市场' },
        { value: 'BY', label: '🇧🇾 白俄罗斯', desc: '白俄罗斯语市场' },
        { value: 'MD', label: '🇲🇩 摩尔多瓦', desc: '罗马尼亚语市场' },
        { value: 'RS', label: '🇷🇸 塞尔维亚', desc: '塞尔维亚语市场' },
        { value: 'ME', label: '🇲🇪 黑山', desc: '黑山语市场' },
        { value: 'BA', label: '🇧🇦 波斯尼亚和黑塞哥维那', desc: '波斯尼亚语市场' },
        { value: 'MK', label: '🇲🇰 北马其顿', desc: '马其顿语市场' },
        { value: 'AL', label: '🇦🇱 阿尔巴尼亚', desc: '阿尔巴尼亚语市场' },
        { value: 'XK', label: '🇽🇰 科索沃', desc: '阿尔巴尼亚语市场' }
      ]
    }
  ];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('region-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowRegionDropdown(false);
        setRegionSearchTerm(''); // 清空搜索词
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRegionDropdown]);

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <div className="navbar">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 左侧Logo */}
            <div className="flex items-center">
              <Logo size="md" />
            </div>
            
            {/* 中间导航菜单 */}
            <Navigation className="hidden lg:flex" />
          </div>
        </div>
      </div>

      {/* 倒计时信息栏 */}
      <div className="countdown-bar relative z-10">
        <CountdownTimer />
      </div>

      {/* 全球时间显示 */}
      <div className="time-bar relative z-10">
        <TimeDisplay />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8" id="generator">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left: Product Info Input */}
          <div className="lg:col-span-1">
            <div className="card p-6 h-full">
              <h2 className="text-2xl font-bold text-primary mb-6">产品信息</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
                {/* 产品名称 */}
                <div>
                  <label className="label">
                    产品名称 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.name}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field glass"
                    placeholder="例如：智能无线耳机"
                    required
                  />
                </div>

                {/* 产品特性 */}
                <div>
                  <label className="label">
                    产品特性 *
                  </label>
                  <textarea
                    value={productInfo.features}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, features: e.target.value }))}
                    className="input-field glass resize-none"
                    rows={4}
                    placeholder="描述产品的主要特点和优势，例如：主动降噪、长续航、快速充电"
                    required
                  />
                </div>

                {/* 受众人群 */}
                <div>
                  <label className="label">
                    目标受众 *
                  </label>
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="input-field glass"
                    placeholder="例如：年轻上班族、音乐爱好者、运动健身人群"
                    required
                  />
                </div>

                {/* 投放地区 - 下拉选择 */}
                <div className="relative">
                  <label className="label">
                    投放地区 * (可多选)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                    className="input-field glass text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className={productInfo.regions.length === 0 ? 'text-gray-600' : 'text-gray-900'}>
                        {getSelectedRegionsText()}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${showRegionDropdown ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* 下拉菜单 */}
                  {showRegionDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto" id="region-dropdown">
                      {/* 搜索输入框 - 固定悬浮 */}
                      <div className="sticky top-0 bg-white border-b border-gray-200 p-3 z-20">
                        <input
                          type="text"
                          placeholder="搜索地区..."
                          value={regionSearchTerm}
                          onChange={(e) => setRegionSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                      </div>

                      <div className="p-3 pt-0">
                        {/* 热门地区 */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">🔥 热门地区</h4>
                          <div className="space-y-2">
                            {getFilteredRegionGroups()[0]?.regions.map((region) => (
                              <label key={region.value} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                                <input
                                  type="checkbox"
                                  checked={productInfo.regions.includes(region.value)}
                                  onChange={() => handleRegionToggle(region.value)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{region.label}</div>
                                  <div className="text-xs text-gray-600">{region.desc}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* 其他地区 */}
                        {getFilteredRegionGroups().slice(1).map((group) => (
                          <div key={group.name} className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-800 mb-2">{group.name}</h4>
                            <div className="space-y-2">
                              {group.regions.map((region) => (
                                <label key={region.value} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={productInfo.regions.includes(region.value)}
                                    onChange={() => handleRegionToggle(region.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{region.label}</div>
                                    <div className="text-xs text-gray-600">{region.desc}</div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 错误提示 */}
                  {productInfo.regions.length === 0 && (
                    <p className="text-xs text-red-600 mt-1">请至少选择一个投放地区</p>
                  )}
                </div>

                {/* 文案风格 */}
                <div>
                  <label className="label">
                    文案风格
                  </label>
                  <div className="relative">
                    <select
                      value={productInfo.style}
                      onChange={(e) => setProductInfo(prev => ({ ...prev, style: e.target.value }))}
                      className="input-field appearance-none pr-10"
                    >
                      <option value="confident">自信专业</option>
                      <option value="friendly">亲切友好</option>
                      <option value="energetic">活力四射</option>
                      <option value="elegant">优雅精致</option>
                      <option value="modern">现代时尚</option>
                      <option value="casual">轻松随意</option>
                      <option value="luxury">奢华高端</option>
                      <option value="humorous">幽默风趣</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 促销方式 */}
                <div>
                  <label className="label">
                    促销方式
                  </label>
                  <div className="relative">
                    <select
                      value={productInfo.promotion}
                      onChange={(e) => setProductInfo(prev => ({ ...prev, promotion: e.target.value }))}
                      className="input-field appearance-none pr-10"
                    >
                      <option value="discount">折扣优惠</option>
                      <option value="limited">限时抢购</option>
                      <option value="premium">高端品质</option>
                      <option value="bundle">套装组合</option>
                      <option value="new">新品上市</option>
                      <option value="sale">清仓特卖</option>
                      <option value="gift">赠品促销</option>
                      <option value="none">无促销</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 生成按钮 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-4 px-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      AI 生成中...
                    </span>
                  ) : (
                    <>🚀 生成爆款文案 + 效果预测</>
                  )}
                </button>
              </form>

              {/* 功能说明 */}
              <div className="mt-6 space-y-4">
                  {/* 快速模板 */}
                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-sm font-semibold text-primary mb-2">⚡ 快速模板</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setProductInfo({
                          name: '智能无线耳机',
                          features: '主动降噪, 长续航, 快速充电, 舒适佩戴',
                          targetAudience: '年轻上班族, 音乐爱好者',
                          regions: [],
                          style: 'confident',
                          promotion: 'discount'
                        })}
                        className="w-full text-left p-2 glass rounded hover:bg-white/20 transition-colors duration-200 text-xs text-primary"
                      >
                        🎧 智能耳机模板
                      </button>
                      <button
                        onClick={() => setProductInfo({
                          name: '运动健身器材',
                          features: '便携设计, 多功能, 耐用材质, 适合家庭使用',
                          targetAudience: '健身爱好者, 居家运动人群',
                          regions: [],
                          style: 'energetic',
                          promotion: 'limited'
                        })}
                        className="w-full text-left p-2 glass rounded hover:bg-white/20 transition-colors duration-200 text-xs text-primary"
                      >
                        💪 健身器材模板
                      </button>
                      <button
                        onClick={() => setProductInfo({
                          name: '护肤美容产品',
                          features: '天然成分, 温和配方, 快速见效, 适合敏感肌',
                          targetAudience: '爱美女性, 护肤达人',
                          regions: [],
                          style: 'elegant',
                          promotion: 'premium'
                        })}
                        className="w-full text-left p-2 glass rounded hover:bg-white/20 transition-colors duration-200 text-xs text-primary"
                      >
                        ✨ 护肤产品模板
                      </button>
                      <button
                        onClick={() => setProductInfo({
                          name: '数码配件',
                          features: '高品质, 兼容性强, 时尚设计, 实用功能',
                          targetAudience: '数码爱好者, 3C用户',
                          regions: [],
                          style: 'modern',
                          promotion: 'bundle'
                        })}
                        className="w-full text-left p-2 glass rounded hover:bg-white/20 transition-colors duration-200 text-xs text-primary"
                      >
                        📱 数码配件模板
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Right: Generated Results */}
          <div className="lg:col-span-2">
            <div className="card p-6 h-full flex flex-col overflow-hidden">
              <OutputDisplay
                copies={copies}
                regions={productInfo.regions}
                isLoading={isLoading}
                error={null}
                policyCheckResult={policyCheckResult}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer text-white py-12 relative z-10" id="footer">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 猎豹服务 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">猎豹服务</h3>
              <ul className="text-gray-300 space-y-2">
                <li><a href="https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• Facebook广告</a></li>
                <li><a href="https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• TikTok广告</a></li>
                <li><a href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• 客户自助平台</a></li>
                <li><a href="https://overseas.cmcm.com/no9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">• 9号艺术工作室</a></li>
              </ul>
            </div>
            
            {/* 联系我们 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">联系我们</h3>
              <ul className="text-gray-300 space-y-2">
                <li>咨询热线: 400-603-7779</li>
                <li>咨询邮箱: adoverseas@cmcm.com</li>
                <li>总部地址: 北京市朝阳区三间房南里7号万东科技文创园11号楼</li>
              </ul>
            </div>
            
            {/* 官方公众号 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">官方公众号</h3>
              <div className="w-32 h-32 mb-3">
                <img 
                  src="https://7578-ux-new-cms-8gd8ix3g0aa5a108-1252921383.tcb.qcloud.la/cloudbase-cms/upload/2023-03-22/s40ex00l1ikhrlkwx94osckfnwv8bmwp_.png?sign=cca43c2053cdfe248375cc6a08645f52&t=1679467813" 
                  alt="猎豹国际广告官方公众号二维码" 
                  className="w-full h-full object-cover rounded-lg" 
                  loading="lazy" 
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-orange-500 rounded mx-auto mb-1"></div>
                    <div className="text-xs text-gray-600">CMCM</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 关于我们 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">关于我们</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                专业的Facebook广告文案生成工具,基于React + Tailwind CSS + DeepSeek构建,为广告主提供高质量的文案创作服务。与猎豹移动深度合作,助力企业出海营销。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;