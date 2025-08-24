# 🚀 Vercel 部署指南

## 问题诊断

你的应用在Vercel上遇到身份验证错误，这是因为：

1. **环境变量未配置**：PEXELS_API_KEY 没有在Vercel项目设置中配置
2. **部署保护**：Vercel启用了部署保护，需要正确配置

## 🔧 解决方案

### 方法1：通过Vercel CLI部署（推荐）

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 运行部署脚本
./deploy-vercel.sh
```

### 方法2：手动配置Vercel

1. **访问Vercel控制台**
   - 登录 [vercel.com](https://vercel.com)
   - 选择你的项目

2. **配置环境变量**
   - 进入 Settings → Environment Variables
   - 添加变量：
     - Name: `PEXELS_API_KEY`
     - Value: `WdTCuRe43AkObcUVy7KjHqiTkYUpeDNpT3OOA0V55fFQ5ROzFjT4YbJc`
     - Environment: Production, Preview, Development

3. **重新部署**
   - 进入 Deployments
   - 点击 "Redeploy" 重新部署

### 方法3：通过GitHub集成

1. **连接GitHub仓库**
2. **配置环境变量**
3. **自动部署**

## 📋 环境变量配置

确保在Vercel中设置以下环境变量：

```bash
PEXELS_API_KEY=WdTCuRe43AkObcUVy7KjHqiTkYUpeDNpT3OOA0V55fFQ5ROzFjT4YbJc
```

## 🔍 验证部署

部署成功后，测试API接口：

```bash
curl 'https://your-domain.vercel.app/api/search?q=dog&per_page=20'
```

应该返回JSON数据而不是身份验证页面。

## 🚨 常见问题

### 1. 仍然显示身份验证页面
- 检查环境变量是否正确配置
- 确认已重新部署
- 清除浏览器缓存

### 2. API返回500错误
- 检查PEXELS_API_KEY是否有效
- 查看Vercel函数日志

### 3. CORS错误
- 已在前端代码中添加CORS头
- 检查浏览器控制台错误信息

## 📞 技术支持

如果问题仍然存在：
1. 检查Vercel函数日志
2. 验证Pexels API密钥有效性
3. 确认网络连接正常
