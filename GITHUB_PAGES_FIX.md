# GitHub Pages 空白页面修复指南

## 问题诊断

您的GitHub Pages网站显示空白页面的原因是：
1. HTML文件中的JavaScript路径不正确
2. 引用了开发环境的路径 `/src/main.tsx` 而不是生产环境的编译文件

## 解决方案

### 方法1：手动修复（推荐）

1. **登录GitHub**，进入您的仓库：https://github.com/goodmarin/facebook-ad-copy-generator

2. **找到index.html文件**：
   - 点击仓库中的 `index.html` 文件
   - 点击编辑按钮（铅笔图标）

3. **替换文件内容**：
   将整个文件内容替换为以下内容：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>爆款 Facebook 广告文案生成器</title>
    <meta name="description" content="专业的 Facebook 广告文案生成工具，支持多语言和多种文案风格" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=SF+Pro+Display:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="/facebook-ad-copy-generator/assets/js/index-732a544e.js"></script>
    <link rel="modulepreload" crossorigin href="/facebook-ad-copy-generator/assets/js/vendor-79b9f383.js">
    <link rel="modulepreload" crossorigin href="/facebook-ad-copy-generator/assets/js/ui-779ff5f3.js">
    <link rel="stylesheet" href="/facebook-ad-copy-generator/assets/css/index-12164956.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

4. **提交更改**：
   - 在页面底部填写提交信息："修复GitHub Pages空白页面问题"
   - 点击 "Commit changes"

### 方法2：重新推送代码

如果网络连接正常，可以尝试：

```bash
git push origin main
```

### 方法3：使用GitHub Desktop

1. 下载并安装 GitHub Desktop
2. 克隆您的仓库
3. 将修复后的文件复制到仓库
4. 提交并推送更改

## 验证修复

修复后，等待1-2分钟，然后访问：
https://goodmarin.github.io/facebook-ad-copy-generator/

## 常见问题

### Q: 为什么会出现这个问题？
A: 这是因为GitHub Pages使用的是旧的构建文件，JavaScript路径不正确。

### Q: 修复后多久生效？
A: 通常1-2分钟内生效，最多可能需要5分钟。

### Q: 如果还是空白页面怎么办？
A: 尝试清除浏览器缓存（Ctrl+F5）或使用无痕模式。

## 联系支持

如果问题仍然存在，请：
1. 检查浏览器控制台是否有错误信息
2. 确认GitHub Pages设置正确
3. 等待更长时间让更改生效 