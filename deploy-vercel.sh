#!/bin/bash

echo "🚀 开始部署到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 检查环境变量文件
if [ ! -f .env.local ]; then
    echo "❌ .env.local 文件不存在，请先创建并配置 PEXELS_API_KEY"
    exit 1
fi

# 读取 PEXELS_API_KEY
export PEXELS_API_KEY=$(grep PEXELS_API_KEY .env.local | cut -d '=' -f2)

if [ -z "$PEXELS_API_KEY" ]; then
    echo "❌ PEXELS_API_KEY 未配置"
    exit 1
fi

echo "✅ PEXELS_API_KEY 已配置"

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
vercel --prod --yes

echo "✅ 部署完成！"
echo "📝 请在 Vercel 控制台中设置环境变量 PEXELS_API_KEY=$PEXELS_API_KEY"
