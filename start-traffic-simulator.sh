#!/bin/bash

# 网站流量模拟器快速启动脚本
echo "🌐 网站流量模拟器快速启动"
echo "================================"

# 检查文件是否存在
if [ -f "simple-traffic-simulator.html" ]; then
    echo "✅ 找到简单版本: simple-traffic-simulator.html"
    SIMPLE_EXISTS=true
else
    echo "❌ 未找到简单版本"
    SIMPLE_EXISTS=false
fi

if [ -f "advanced-traffic-simulator.html" ]; then
    echo "✅ 找到高级版本: advanced-traffic-simulator.html"
    ADVANCED_EXISTS=true
else
    echo "❌ 未找到高级版本"
    ADVANCED_EXISTS=false
fi

echo ""
echo "选择要启动的版本:"
echo "1) 简单版本 (推荐新手)"
echo "2) 高级版本 (推荐有经验用户)"
echo "3) 查看使用指南"
echo "4) 退出"

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        if [ "$SIMPLE_EXISTS" = true ]; then
            echo "🚀 启动简单版本..."
            if command -v open >/dev/null 2>&1; then
                open simple-traffic-simulator.html
            elif command -v xdg-open >/dev/null 2>&1; then
                xdg-open simple-traffic-simulator.html
            else
                echo "请手动打开 simple-traffic-simulator.html"
            fi
        else
            echo "❌ 简单版本文件不存在"
        fi
        ;;
    2)
        if [ "$ADVANCED_EXISTS" = true ]; then
            echo "🚀 启动高级版本..."
            if command -v open >/dev/null 2>&1; then
                open advanced-traffic-simulator.html
            elif command -v xdg-open >/dev/null 2>&1; then
                xdg-open advanced-traffic-simulator.html
            else
                echo "请手动打开 advanced-traffic-simulator.html"
            fi
        else
            echo "❌ 高级版本文件不存在"
        fi
        ;;
    3)
        if [ -f "TRAFFIC_SIMULATOR_GUIDE.md" ]; then
            echo "📖 打开使用指南..."
            if command -v open >/dev/null 2>&1; then
                open TRAFFIC_SIMULATOR_GUIDE.md
            elif command -v xdg-open >/dev/null 2>&1; then
                xdg-open TRAFFIC_SIMULATOR_GUIDE.md
            else
                echo "请手动打开 TRAFFIC_SIMULATOR_GUIDE.md"
            fi
        else
            echo "❌ 使用指南文件不存在"
        fi
        ;;
    4)
        echo "👋 再见!"
        exit 0
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "💡 提示:"
echo "- 将目标URL改为你的网站地址"
echo "- 建议设置合理的访问间隔 (2-5秒)"
echo "- 观察Google Search Console的数据变化"
echo "- 详细说明请查看 TRAFFIC_SIMULATOR_GUIDE.md"
