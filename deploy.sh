#!/bin/bash

echo "🚀 开始部署Facebook广告文案生成器到公司局域网..."

# 停止现有的服务器
echo "📋 停止现有服务器..."
pkill -f "serve" 2>/dev/null || true

# 构建生产版本
echo "🔨 构建生产版本..."
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist目录不存在"
    exit 1
fi

echo "✅ 构建成功！"

# 启动服务器
echo "🌐 启动生产服务器..."
echo "📱 本地访问地址: http://localhost:3000"
echo "🏢 公司内网地址: http://192.168.1.110:3000"
echo "🏢 公司内网地址: http://10.60.51.88:3000"

# 启动服务器到所有网络接口
serve -s dist -l 3000 --host 0.0.0.0 &

echo "✅ 部署完成！"
echo "💡 其他同事可以通过以下地址访问："
echo "   - http://192.168.1.110:3000"
echo "   - http://10.60.51.88:3000"
echo ""
echo "按 Ctrl+C 停止服务器" 