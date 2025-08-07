#!/bin/bash

echo "🚀 开始部署到 GitHub Pages..."

# 确保所有更改已提交
git add .
git commit -m "✨ 更新效果预测功能" || echo "没有新的更改需要提交"

# 强制推送到远程仓库
echo "📤 推送到 GitHub..."
git push origin main

# 等待部署完成
echo "⏳ 等待 GitHub Pages 部署完成..."
sleep 30

echo "✅ 部署完成！"
echo "🌐 网站地址: https://goodmarin.github.io/facebook-ad-copy-generator/"
echo "📝 请等待几分钟让部署生效..." 