# 🚀 GitHub Pages 部署指南

## 📋 当前状态
✅ Git仓库已初始化  
✅ 代码已提交  
✅ GitHub Actions配置已完成  
✅ 生产构建配置已完成  

## 🎯 下一步操作

### 1. 创建GitHub仓库
1. 访问 https://github.com/new
2. 仓库名称：`facebook-ad-copy-generator`
3. 描述：`专业的Facebook广告文案生成工具`
4. 选择 **Public** 仓库
5. **不要** 勾选 "Add a README file"
6. **不要** 勾选 "Add .gitignore"
7. **不要** 勾选 "Choose a license"
8. 点击 "Create repository"

### 2. 连接本地仓库到GitHub
```bash
# 替换 YOUR_USERNAME 为您的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/facebook-ad-copy-generator.git
```

### 3. 推送代码到GitHub
```bash
git branch -M main
git push -u origin main
```

### 4. 启用GitHub Pages
1. 进入您的GitHub仓库页面
2. 点击 "Settings" 标签
3. 左侧菜单找到 "Pages"
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "main"
6. Folder 选择 "/ (root)"
7. 点击 "Save"

### 5. 等待自动部署
- 部署时间：约2-5分钟
- 您可以在 "Actions" 标签页查看部署进度
- 部署完成后，您的网站将在以下地址可用：
  `https://YOUR_USERNAME.github.io/facebook-ad-copy-generator`

## 🔧 技术配置详情

### GitHub Actions 自动部署
已配置 `.github/workflows/deploy.yml`，包含：
- ✅ 自动构建项目
- ✅ 自动部署到GitHub Pages
- ✅ 支持TypeScript编译
- ✅ 优化生产版本

### 构建配置
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js版本：18
- 自动缓存依赖

## 🌐 访问地址
部署完成后，您的网站将在以下地址可用：
```
https://YOUR_USERNAME.github.io/facebook-ad-copy-generator
```

## 📱 功能特点
✅ 多语言支持 - 支持多种语言的广告文案生成  
✅ 多种文案风格 - 提供不同风格的文案选择  
✅ 敏感词检测 - 自动检测可能违反政策的词汇  
✅ 响应式设计 - 适配各种设备屏幕  
✅ 一键复制 - 快速复制生成的文案  
✅ 快速生成 - 基于DeepSeek AI的快速生成  
✅ DeepSeek AI - 使用先进的AI技术  

## 🔄 更新部署
每次推送代码到main分支时，GitHub Actions会自动：
1. 构建最新版本
2. 部署到GitHub Pages
3. 更新网站内容

## 📞 技术支持
如有问题，请检查：
1. GitHub Actions 构建日志
2. 仓库设置中的Pages配置
3. 网络连接状态

---

**部署完成后，您将拥有一个完全免费的、自动部署的Facebook广告文案生成器网站！** 🎉 