#!/bin/bash

echo "🚀 开始配置GitHub Pages免费域名..."

# 检查是否已安装git
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装，请先安装Git"
    exit 1
fi

# 检查是否已初始化git仓库
if [ ! -d ".git" ]; then
    echo "📋 初始化Git仓库..."
    git init
    git add .
    git commit -m "Initial commit: Facebook广告文案生成器"
fi

echo "✅ Git仓库已准备就绪"
echo ""
echo "📝 接下来需要您手动完成以下步骤："
echo ""
echo "1. 在GitHub上创建新仓库："
echo "   - 访问 https://github.com/new"
echo "   - 仓库名称建议：facebook-ad-copy-generator"
echo "   - 选择 Public 仓库"
echo "   - 不要初始化README、.gitignore或license"
echo ""
echo "2. 连接本地仓库到GitHub："
echo "   git remote add origin https://github.com/YOUR_USERNAME/facebook-ad-copy-generator.git"
echo ""
echo "3. 推送代码到GitHub："
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. 启用GitHub Pages："
echo "   - 进入仓库设置 Settings"
echo "   - 找到 Pages 选项"
echo "   - Source 选择 'Deploy from a branch'"
echo "   - Branch 选择 'main'，文件夹选择 '/ (root)'"
echo "   - 点击 Save"
echo ""
echo "5. 配置自动部署："
echo "   - 在仓库根目录创建 .github/workflows/deploy.yml"
echo "   - 配置GitHub Actions自动构建和部署"
echo ""
echo "完成后，您的网站将在以下地址可用："
echo "https://YOUR_USERNAME.github.io/facebook-ad-copy-generator"
echo ""
echo "💡 提示：将 YOUR_USERNAME 替换为您的GitHub用户名" 