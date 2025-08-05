# 🌐 免费域名配置指南

## 🎯 推荐方案：GitHub Pages (完全免费)

### 方案优势
- ✅ 完全免费，无时间限制
- ✅ 自动部署，代码更新自动生效
- ✅ 支持自定义域名
- ✅ 全球CDN加速
- ✅ 稳定可靠

### 部署步骤

#### 1. 准备Git仓库
```bash
# 初始化Git仓库
git init
git add .
git commit -m "Initial commit: Facebook广告文案生成器"

# 检查GitHub Actions配置
ls -la .github/workflows/
```

#### 2. 创建GitHub仓库
1. 访问 https://github.com/new
2. 仓库名称：`facebook-ad-copy-generator`
3. 选择 **Public** 仓库
4. 不要初始化README、.gitignore或license
5. 点击 "Create repository"

#### 3. 连接并推送代码
```bash
# 替换 YOUR_USERNAME 为您的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/facebook-ad-copy-generator.git
git branch -M main
git push -u origin main
```

#### 4. 启用GitHub Pages
1. 进入仓库设置：Settings
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，文件夹选择 "/ (root)"
5. 点击 "Save"

#### 5. 等待部署完成
- 部署时间：约2-5分钟
- 访问地址：`https://YOUR_USERNAME.github.io/facebook-ad-copy-generator`

---

## 🚀 备选方案：Netlify (推荐)

### 方案优势
- ✅ 免费计划包含自定义域名
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 表单处理
- ✅ 函数支持

### 部署步骤

#### 1. 注册Netlify
1. 访问 https://netlify.com
2. 使用GitHub账号登录

#### 2. 连接GitHub仓库
1. 点击 "New site from Git"
2. 选择 GitHub
3. 选择您的仓库：`facebook-ad-copy-generator`

#### 3. 配置构建设置
- Build command: `npm run build`
- Publish directory: `dist`
- 点击 "Deploy site"

#### 4. 自定义域名
1. 进入 Site settings
2. 找到 "Domain management"
3. 点击 "Add custom domain"
4. 输入您想要的域名

---

## 🌍 方案3：Vercel (推荐)

### 方案优势
- ✅ 免费计划包含自定义域名
- ✅ 自动HTTPS
- ✅ 边缘函数
- ✅ 实时预览

### 部署步骤

#### 1. 注册Vercel
1. 访问 https://vercel.com
2. 使用GitHub账号登录

#### 2. 导入项目
1. 点击 "New Project"
2. 选择您的GitHub仓库
3. 框架选择 "Vite"
4. 点击 "Deploy"

#### 3. 自定义域名
1. 进入项目设置
2. 找到 "Domains"
3. 添加您的自定义域名

---

## 📋 域名建议

### 推荐域名格式
- `facebook-ad-generator.你的域名.com`
- `ad-copy-tool.你的域名.com`
- `fb-ads-helper.你的域名.com`

### 免费顶级域名 (Freenom)
- `.tk` - 免费12个月
- `.ml` - 免费12个月
- `.ga` - 免费12个月
- `.cf` - 免费12个月

---

## 🔧 技术配置

### GitHub Actions 自动部署
已配置 `.github/workflows/deploy.yml`，推送代码到main分支会自动部署。

### Netlify 配置
已配置 `netlify.toml`，支持SPA路由。

### 环境变量
确保 `.env.local` 文件包含必要的API密钥。

---

## 📞 技术支持

如有问题，请检查：
1. 构建日志
2. 网络连接
3. 域名DNS设置
4. 环境变量配置

---

**推荐使用GitHub Pages方案，稳定可靠且完全免费！** 🎉 