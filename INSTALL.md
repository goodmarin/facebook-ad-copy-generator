# 安装指南

## 环境要求

在运行此项目之前，请确保你的系统已安装以下软件：

### 1. Node.js 和 npm

#### macOS (使用 Homebrew)
```bash
# 安装 Homebrew (如果尚未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node
```

#### macOS (使用官方安装包)
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装 LTS 版本

#### 验证安装
```bash
node --version
npm --version
```

### 2. 项目安装步骤

1. **克隆项目** (如果从 Git 仓库)
```bash
git clone [项目地址]
cd qawsed
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制环境变量示例文件
cp env.example .env.local

# 编辑 .env.local 文件，添加你的 OpenAI API Key
echo "VITE_OPENAI_API_KEY=你的OpenAI_API_Key" > .env.local
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **打开浏览器**
访问 `http://localhost:5173`

## 获取 OpenAI API Key

1. 访问 [OpenAI 官网](https://platform.openai.com/)
2. 注册或登录账户
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制 API Key 并添加到 `.env.local` 文件中

## 常见问题

### Q: 安装依赖时出现错误
A: 确保 Node.js 版本 >= 16.0，可以运行 `node --version` 检查

### Q: 启动时提示找不到模块
A: 确保已正确安装依赖，运行 `npm install` 重新安装

### Q: API 调用失败
A: 检查 `.env.local` 文件中的 API Key 是否正确配置

### Q: 端口被占用
A: 可以修改 `vite.config.ts` 中的端口配置，或使用 `npm run dev -- --port 3000`

## 生产环境部署

### 构建项目
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

构建后的文件将生成在 `dist` 目录中，可以部署到任何静态文件服务器。 