# Next.js 新闻渲染策略演示项目

这是一个完整的 Next.js 渲染策略演示应用，展示了现代前端开发中 5 种主要的渲染方式：

- **CSR** - 客户端渲染 (Client-Side Rendering)
- **SSR** - 服务端渲染 (Server-Side Rendering)  
- **SSG** - 静态生成 (Static Site Generation)
- **ISR** - 增量静态再生 (Incremental Static Regeneration)
- **混合模式** - 服务器组件 + 客户端组件

## 快速开始

首先，安装依赖并启动开发服务器：

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

然后运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目特色

### 🎯 完整的渲染策略演示
每种渲染方式都有对应的页面和详细说明，可以直观对比不同策略的特点和性能表现。

### 📚 深度技术解析
包含详细的技术文档 `RENDERING_STRATEGIES_SUMMARY.md`，从原理到实现，从比喻到代码，帮助深入理解各种渲染策略。

### 🔄 真实场景模拟
使用模拟数据和延迟，真实还原不同渲染策略在生产环境中的表现。

### 💡 最佳实践展示
Next.js 15 + App Router + TypeScript 的现代化技术栈，展示当前前端开发的最佳实践。

## 技术栈

- **Next.js 15.5.4** - React 全栈框架，支持 App Router
- **React 19.1.0** - 最新版本 React
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 原子化 CSS 框架
- **pnpm** - 快速的包管理器

## 学习路径

1. 🏠 **首页导航** (`/`) - 了解项目概览
2. 📖 **技术文档** - 阅读 `RENDERING_STRATEGIES_SUMMARY.md`
3. 🎯 **实践体验** - 依次访问各个渲染策略页面
4. 🔍 **源码学习** - 查看 `src/app/news/` 下的实现代码
5. 🚀 **构建测试** - 运行 `pnpm build` 查看构建输出

## 页面路由

- `/news/csr` - 客户端渲染演示
- `/news/ssr` - 服务端渲染演示
- `/news/ssg` - 静态生成演示
- `/news/isr` - 增量静态再生演示
- `/news/mixed` - 混合模式演示

## 部署

推荐使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 部署，这是 Next.js 创作者推出的部署平台。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多部署选项。

## 更多资源

- [Next.js 官方文档](https://nextjs.org/docs) - 学习 Next.js 的功能和API
- [Learn Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程
- [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎反馈和贡献

---

*本项目是学习和理解现代前端渲染技术的完整参考，涵盖了从基础概念到高级实践的全部内容。*
