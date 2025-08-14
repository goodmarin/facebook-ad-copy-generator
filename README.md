# 🚀 AI 多地区文案生成器

一个基于 React + TypeScript 的智能 Facebook 广告文案生成器，支持全球多地区、多语言和文化适配。

## ✨ 主要功能

- 🌍 **全球覆盖**: 支持 25+ 个主要市场，包括亚洲、欧洲、美洲等
- 🎯 **智能适配**: 根据地区特点自动调整语言风格和文化元素
- ⚡ **高性能**: 使用 Web Worker 和并行处理，大幅提升生成速度
- 🎨 **表情优化**: 自动清理和优化表情符号，确保跨平台兼容性
- 📱 **响应式设计**: 完美适配各种设备尺寸
- 🔄 **实时进度**: 显示生成进度，支持取消操作
- 📋 **批量操作**: 一键复制、批量导出等功能

## 🏗️ 技术架构

### 前端技术栈
- **React 18** - 现代化的 React 框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 原子化 CSS 框架
- **Vite** - 快速的构建工具

### 核心模块
- **useStreamingGeneration** - 流式生成 Hook，管理 AI 请求
- **useEmojiWorker** - Web Worker Hook，处理表情符号优化
- **emojiWorker** - 后台 Worker，执行表情符号清理任务
- **StreamingOutputDisplay** - 结果展示组件
- **OptimizedMainPage** - 主页面组件

## 🚀 性能优化

### 1. Web Worker 异步处理
- 表情符号处理在后台线程执行
- 不阻塞主线程 UI 渲染
- 支持任务队列和超时处理

### 2. 并行请求处理
- 多个地区同时生成文案
- 智能请求合并和错误重试
- 实时进度反馈

### 3. 智能缓存和优化
- 减少重复 API 调用
- 优化模型参数配置
- 支持请求取消和恢复

## 📁 项目结构

```
src/
├── components/           # React 组件
│   ├── OptimizedMainPage.tsx      # 主页面组件
│   └── StreamingOutputDisplay.tsx # 结果展示组件
├── hooks/               # 自定义 Hooks
│   ├── useStreamingGeneration.ts  # 流式生成 Hook
│   └── useEmojiWorker.ts          # Worker 管理 Hook
├── workers/             # Web Workers
│   └── emojiWorker.ts   # 表情符号处理 Worker
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
└── App.tsx             # 主应用组件
```

## 🛠️ 安装和运行

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 环境配置
创建 `.env.local` 文件：
```env
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

## 🎯 使用方法

### 1. 填写产品信息
- 产品名称
- 主要功能
- 目标受众

### 2. 选择目标地区
- 支持单个或多个地区选择
- 提供预设组合（亚洲、欧洲、美洲、全球）
- 可视化地区选择界面

### 3. 开始生成
- 点击生成按钮
- 实时查看进度
- 支持取消操作

### 4. 查看和导出结果
- 按地区分组显示
- 支持单个和批量复制
- 多种导出格式

## 🔧 配置选项

### AI 模型配置
- 模型: DeepSeek Chat
- 最大 Token: 400
- 温度: 0.5
- Top-p: 0.7

### 地区配置
每个地区包含：
- 语言设置
- 风格偏好
- 文化特点
- 本地化要求

## 🌟 特色功能

### 智能语言适配
- 自动检测地区语言
- 文化敏感度调整
- 本地化表达优化

### 表情符号处理
- 自动清理非标准表情
- 跨平台兼容性保证
- 文化适应性优化

### 错误处理
- 智能重试机制
- 优雅降级处理
- 用户友好的错误提示

## 📊 性能指标

- **并发处理**: 支持 25+ 地区同时生成
- **响应时间**: 平均生成时间 < 30 秒
- **成功率**: 99%+ 的请求成功率
- **内存使用**: 优化的内存管理，支持长时间运行

## 🔮 未来规划

- [ ] 支持更多 AI 模型
- [ ] 增加更多地区和文化
- [ ] 添加文案质量评估
- [ ] 支持自定义模板
- [ ] 增加团队协作功能
- [ ] 添加数据分析面板

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范
- 使用 TypeScript 严格模式
- 遵循 React Hooks 最佳实践
- 保持代码简洁和可读性
- 添加适当的类型注解

### 提交规范
- feat: 新功能
- fix: 修复问题
- docs: 文档更新
- style: 代码格式
- refactor: 代码重构
- test: 测试相关
- chore: 构建工具

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**注意**: 请确保您有有效的 DeepSeek API 密钥，并遵守相关使用条款。 