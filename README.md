
# 📷 NAU 图像搜索应用 (Next.js + Pexels API)

本项目是一个使用 [Next.js 15](https://nextjs.org/) 构建的现代化图像搜索应用，集成了 [Pexels API](https://www.pexels.com/api/) 来实现根据用户搜索关键词展示图像，并支持**随机展示单张图像**与**图像网格展示**的功能。

---

## ✨ 功能特性

- **智能图像搜索**：用户可输入关键词，获取相关高质量图像
- **随机图像查看器**：每次搜索结果中，随机选取并展示一张图像，点击"换一张"按钮可重新随机
- **响应式图像网格**：搜索结果以网格形式展示，支持响应式布局
- **图像下载**：支持下载原图功能
- **摄影师信息**：显示摄影师信息并提供摄影师主页链接
- **API 中间层**：使用 Next.js API routes 作为后端代理，安全调用 Pexels API

---

## 📁 项目结构

```
image-search-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── search/
│   │   │       └── route.js          # Pexels API 代理接口
│   │   ├── globals.css               # 全局样式
│   │   ├── layout.js                 # 应用布局
│   │   └── page.js                   # 主页面组件
│   ├── components/
│   │   ├── ui/                       # UI 组件库
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── skeleton.jsx
│   │   │   └── tabs.jsx
│   │   └── ...                       # 其他组件
│   └── lib/
│       └── utils.js                  # 工具函数
├── public/                           # 静态资源
├── .env.local                        # 环境变量（需添加 PEXELS_API_KEY）
├── package.json
└── README.md
```

---

## 🛠️ 安装与使用

### 1. 克隆项目

```bash
git clone <your-repository-url>
cd image-search-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置环境变量

创建 `.env.local` 文件并添加你的 Pexels API 密钥：

```bash
PEXELS_API_KEY=your_pexels_api_key_here
```

> **注意**：你需要先在 [Pexels](https://www.pexels.com/api/) 注册账号并获取 API 密钥

### 4. 启动开发服务器

```bash
npm run dev
```

访问：`http://localhost:3000`

### 5. 构建生产版本

```bash
npm run build
npm start
```

---

## 🧩 技术栈

- **Next.js 15**
- **React 19**
- **Tailwind CSS 4**
- **Lucide React**
- **Pexels REST API**
