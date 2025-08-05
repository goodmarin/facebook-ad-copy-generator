#!/bin/bash

echo "🚀 手动部署到GitHub Pages..."

# 构建项目
echo "📦 构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 创建部署说明
echo ""
echo "📝 请按照以下步骤手动部署："
echo ""
echo "1. 登录GitHub: https://github.com/goodmarin/facebook-ad-copy-generator"
echo ""
echo "2. 上传构建文件："
echo "   - 点击 'Add file' -> 'Upload files'"
echo "   - 将整个 dist/ 文件夹的内容拖拽上传"
echo "   - 或者逐个上传以下文件："
echo "     * dist/index.html"
echo "     * dist/assets/js/index-732a544e.js"
echo "     * dist/assets/js/vendor-79b9f383.js"
echo "     * dist/assets/js/ui-779ff5f3.js"
echo "     * dist/assets/css/index-12164956.css"
echo ""
echo "3. 提交更改："
echo "   - 填写提交信息：'手动部署构建文件'"
echo "   - 点击 'Commit changes'"
echo ""
echo "4. 等待部署完成（1-2分钟）"
echo ""
echo "5. 访问网站："
echo "   https://goodmarin.github.io/facebook-ad-copy-generator/"
echo ""

# 显示构建文件列表
echo "📋 构建文件列表："
ls -la dist/
echo ""
echo "📋 JavaScript文件："
ls -la dist/assets/js/
echo ""
echo "📋 CSS文件："
ls -la dist/assets/css/ 