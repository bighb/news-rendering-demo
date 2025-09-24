# Next.js 渲染策略完整指南

## 项目概述

本项目是一个完整的 Next.js 渲染策略演示应用，展示了 5 种不同的渲染方式：CSR、SSR、SSG、ISR 和混合模式。

## 核心渲染策略

### 1. CSR - 客户端渲染 (Client-Side Rendering)

**比喻**: 自助餐厅模式，客户端获取数据并渲染

**技术实现**:
```tsx
'use client';  // 客户端组件标识
const [news, setNews] = useState<NewsItem[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/news')
    .then(res => res.json())
    .then(data => setNews(data));
}, []);
```

**特点**:
- 首屏加载慢，需要下载 JS 后执行
- SEO 不友好，搜索引擎难以抓取动态内容
- 服务器压力低，计算转移到客户端
- 用户交互性强，响应迅速

**适用场景**: 管理后台、个人仪表盘等不需要 SEO 的应用

### 2. SSR - 服务端渲染 (Server-Side Rendering)

**比喻**: 现点现做模式，服务器实时生成页面

**技术实现**:
```tsx
export const dynamic = 'force-dynamic';

export default async function SSRNewsPage() {
  await simulateDelay(500);  // 模拟服务器处理时间
  const news = getRecentNews(20);
  return <div>{/* 渲染内容 */}</div>;
}
```

**特点**:
- 首屏加载快，HTML 直接返回
- SEO 友好，搜索引擎可直接抓取
- 服务器压力高，每次请求都要重新渲染
- 支持个性化内容（基于 cookies/headers）

**适用场景**: 电商产品页、个性化内容、实时数据展示

### 3. SSG - 静态生成 (Static Site Generation)

**比喻**: 预制便当模式，构建时预生成页面

**技术实现**:
```tsx
export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString()
  }));
}

export default async function SSGNewsDetail({ params }: { params: { id: string } }) {
  const news = getNewsById(params.id);
  return <div>{/* 渲染内容 */}</div>;
}
```

**核心机制**:
- **构建时生成**: `pnpm build` 时通过 `generateStaticParams` 预生成指定路由
- **运行时处理**: 未预生成的路由会返回 404 或进行服务端渲染（取决于配置）
- **静态文件**: 生成的 HTML 文件部署到 CDN，访问速度极快

**特点**:
- 首屏加载极快，直接返回静态 HTML
- SEO 极友好，完全静态内容
- 服务器压力极低，只需要文件服务
- 内容更新需要重新构建部署

**适用场景**: 博客文章、产品文档、营销页面

### 4. ISR - 增量静态再生 (Incremental Static Regeneration)

**比喻**: 智能便当模式，定时更新静态页面

**技术实现**:
```tsx
export const revalidate = 60;  // 60秒后重新验证

export default async function ISRNewsPage() {
  const renderTime = new Date().toLocaleString('zh-CN');
  const news = getRecentNews(20);

  return (
    <div>
      <p>页面生成时间: {renderTime}</p>
      {/* 其他内容 */}
    </div>
  );
}
```

**工作原理**:
1. 首次访问触发静态生成
2. 在 `revalidate` 时间内，所有用户看到相同的缓存版本
3. 超过时间后，下一个访问者触发后台重新生成
4. 重新生成期间，用户仍看到旧版本（stale-while-revalidate）

**特点**:
- 结合了 SSG 和 SSR 的优势
- 首屏快速加载 + 内容可以更新
- 服务器压力可控，仅在需要时重新生成
- 适合内容有更新但不频繁的场景

**适用场景**: 新闻网站、电商分类页、定期更新的内容

### 5. 混合模式 (Server + Client Components)

**比喻**: 混合餐厅模式，服务端负责基础内容，客户端负责交互

**技术实现**:
```tsx
// 服务器组件 - 处理数据获取
export default async function MixedNewsPage() {
  const news = getRecentNews(20);

  return (
    <div>
      {/* 服务端渲染的静态内容 */}
      <h1>新闻列表 (混合模式)</h1>

      {/* 客户端组件 - 处理交互 */}
      <InteractiveNewsList news={news} />
    </div>
  );
}

// 客户端组件 - 处理用户交互
'use client';
export function InteractiveNewsList({ news }: { news: NewsItem[] }) {
  const [filter, setFilter] = useState('all');
  // 交互逻辑...
}
```

**特点**:
- 服务端组件处理数据获取和 SEO
- 客户端组件处理用户交互和状态管理
- 最优的性能和用户体验平衡
- 减少客户端 JavaScript 包大小

**适用场景**: 现代 Web 应用的推荐方案

## 性能对比表

| 策略 | 首屏加载 | SEO | 服务器压力 | 交互性 | 适用场景 |
|------|----------|-----|------------|--------|----------|
| CSR | 慢 | 差 | 低 | 强 | 管理后台 |
| SSR | 快 | 好 | 高 | 强 | 电商、个性化内容 |
| SSG | 极快 | 好 | 极低 | 中等 | 博客、文档 |
| ISR | 快 | 好 | 低 | 中等 | 新闻、定期更新内容 |
| 混合 | 快 | 好 | 中等 | 强 | 现代 Web 应用 |

## 关键技术概念

### Hydration（水化）
- 服务端渲染的静态 HTML 在客户端被 JavaScript "激活"的过程
- 使静态内容变为可交互的动态组件
- Next.js 自动处理 hydration 过程

### generateStaticParams
```tsx
export async function generateStaticParams() {
  // 返回需要在构建时预生成的参数
  return [{ id: '1' }, { id: '2' }];  // 仅生成这些路由
}
```

### revalidate 配置
```tsx
export const revalidate = 60;        // ISR：60秒后重新验证
export const revalidate = false;     // 永不重新验证（纯 SSG）
export const dynamic = 'force-dynamic'; // 强制 SSR
```

### 组件边界
- `'use client'`：标识客户端组件
- 默认为服务器组件（Next.js 13+ App Router）
- 服务器组件可以直接访问数据库和文件系统

## 项目架构

```
src/
├── app/
│   ├── page.tsx              # 主页导航
│   ├── api/news/            # API 路由（支持 CSR）
│   └── news/
│       ├── csr/             # 客户端渲染演示
│       ├── ssr/             # 服务端渲染演示
│       ├── ssg/             # 静态生成演示
│       ├── isr/             # 增量静态再生演示
│       └── mixed/           # 混合模式演示
├── components/              # 可复用组件
├── lib/
│   └── mock-data.ts        # 模拟数据和工具函数
└── types/
    └── news.ts             # TypeScript 类型定义
```

## 实战经验总结

1. **选择策略的决策树**:
   - 需要 SEO？→ 考虑 SSR/SSG/ISR
   - 内容是否频繁变化？→ SSR vs ISR/SSG
   - 服务器资源是否充足？→ SSR vs ISR
   - 是否需要个性化？→ SSR vs 其他

2. **性能优化建议**:
   - 混合模式是现代应用的最佳实践
   - 合理使用 `revalidate` 时间
   - 客户端组件尽量小，减少 JavaScript 包大小

3. **开发注意事项**:
   - 服务器组件不能使用 React hooks
   - 客户端组件不能直接访问服务器资源
   - 合理规划组件边界，避免过度客户端化

## 技术栈

- Next.js 15.5.4 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- pnpm 包管理器

## 构建输出符号解析

在执行 `pnpm build` 时，Next.js 会显示每个路由的构建符号，帮助开发者理解不同的渲染策略：

### 构建符号含义

| 符号 | 名称 | 说明 | 示例 |
|------|------|------|------|
| **○** | Static | 静态预渲染，构建时生成静态 HTML，无数据依赖 | `/`、`/news/csr` |
| **●** | SSG | 静态生成，使用 `generateStaticParams` 预生成指定路由 | `/news/ssg/[id]` (生成1-20) |
| **ƒ** | Dynamic | 动态服务端渲染，每次请求时在服务器生成 | `/news/ssr`、`/api/news` |

### 实际构建输出示例

```
Route (app)                         Size  First Load JS  Revalidate  Expire
┌ ○ /                                0 B         117 kB
├ ○ /news/csr                    4.61 kB         119 kB
├ ƒ /news/ssr                        0 B         117 kB
├ ● /news/ssg/[id]                   0 B         117 kB
├   ├ /news/ssg/1
├   ├ /news/ssg/2
├   └ [+17 more paths]
├ ○ /news/isr                        0 B         117 kB          1m      1y
└ ● /news/isr/[id]                   0 B         117 kB         30s      1y
```

### 特殊标识说明

- **Revalidate**: ISR 重新验证时间（如 `1m`、`30s`）
- **Expire**: 缓存过期时间（通常为 `1y`）
- **[+N more paths]**: 表示预生成了额外的 N 个路由
- **First Load JS**: 页面首次加载需要下载的 JavaScript 大小

这个构建报告清晰展示了项目中 5 种渲染策略的实际构建结果，是验证渲染策略配置是否正确的重要工具。

## 启动项目

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:3000` 体验不同渲染策略的效果对比。

---

*这个演示项目涵盖了 Next.js 所有主要渲染策略，是学习和理解现代前端渲染技术的完整参考。*
