# 选品分析功能

## 功能概述

选品分析功能为跨境电商卖家提供了一站式的选品工具导航，帮助卖家快速找到热门产品和市场趋势。

## 功能特点

### 1. 智能显示逻辑
- 只在用户未生成文案时显示选品分析工具
- 用户生成文案后自动隐藏，避免干扰
- 加载状态时也会隐藏

### 2. 12个专业选品工具
- **Seller Sprite (卖家精灵)** - 覆盖多维选品视角，挖掘隐藏机会市场
- **美亚销售榜** - 美国亚马逊销售排行榜
- **美亚新品榜** - 美国亚马逊新品排行榜
- **Temu Bestsellers** - 每日更新的Temu最受欢迎榜单
- **Google Trends** - 查看关键词搜索量和趋势变化
- **英亚销售榜** - 英国亚马逊销售排行榜
- **德亚销售榜** - 德国亚马逊销售排行榜
- **日亚销售榜** - 日本亚马逊销售排行榜（需VPN）
- **Walmart Bestsellers** - Walmart平台最受欢迎产品列表
- **Google商机洞察** - 查看全球各国产品类别的具体市场需求
- **Most Wished For** - 亚马逊买家愿望清单
- **Today's Deals** - 美国亚马逊每日促销

### 3. 专业Logo设计
- 使用amz123网站的真实logo图片
- 图片加载失败时自动降级为文字图标
- 每个工具都有独特的渐变色背景

### 4. 响应式布局
- 手机：1列布局
- 平板：2列布局
- 桌面：3列布局
- 大屏：4列布局

### 5. 交互效果
- 悬停时边框变色和阴影效果
- 点击跳转到对应平台
- 平滑的过渡动画和缩放效果

## 技术实现

### 组件结构
```typescript
interface ProductAnalysisProps {
  copies: any[];      // 已生成的文案数组
  isLoading: boolean; // 加载状态
}
```

### 显示逻辑
```typescript
// 只在未生成文案时显示
if (copies.length > 0 || isLoading) {
  return null;
}
```

### Logo处理
```typescript
// 图片加载失败时的降级处理
onError={(e) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
  const parent = target.parentElement;
  if (parent) {
    parent.innerHTML = `<span class="text-white text-xs font-bold">${tool.name.charAt(0)}</span>`;
    parent.className = `w-8 h-8 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`;
  }
}}
```

## 使用方法

1. 在主应用中导入组件：
```typescript
import ProductAnalysis from './components/ProductAnalysis';
```

2. 在App.tsx中使用：
```typescript
<ProductAnalysis copies={copies} isLoading={isLoading} />
```

3. 访问测试页面：
```
http://localhost:5178/test-product-analysis.html
```

## 文件结构

- `src/components/ProductAnalysis.tsx` - 选品分析组件
- `test-product-analysis.html` - 独立测试页面
- `README-ProductAnalysis.md` - 功能说明文档

## 设计理念

参考amz123网站的设计风格，为跨境电商卖家提供专业、实用的选品工具导航。通过智能的显示逻辑，确保功能在合适的时机出现，提升用户体验。
