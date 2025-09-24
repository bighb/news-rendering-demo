import Link from "next/link";
import { getPopularNews, simulateDelay } from "@/lib/mock-data";
import InteractiveNewsList from "@/components/InteractiveNewsList";

// 服务端组件（默认）
export default async function MixedNewsPage() {
  // 服务端数据获取
  await simulateDelay(200);
  const news = getPopularNews(15);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          混合模式 - Server Components + Client Components
        </h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">🔵 服务端组件部分:</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 数据在服务器获取和渲染</li>
              <li>• SEO友好，首屏加载快</li>
              <li>• 无法使用浏览器API和交互</li>
              <li>• Bundle大小更小</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">🟠 客户端组件部分:</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 交互功能（筛选、排序）在浏览器运行</li>
              <li>• 可以使用hooks和浏览器API</li>
              <li>• 状态管理和事件处理</li>
              <li>• 需要JavaScript水合</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">混合渲柔优势:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 结合了服务端渲柔的SEO优势和客户端的交互性</li>
            <li>• 数据在服务器预取，交互在客户端处理</li>
            <li>• 可以精确控制哪些部分需要JavaScript</li>
            <li>• 渐进式增强的用户体验</li>
          </ul>
        </div>
      </div>

      {/* 客户端组件：处理交互逻辑 */}
      <InteractiveNewsList news={news} />

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>此页面展示了Next.js 13+的混合渲柔模式</p>
        <p>服务端组件负责数据获取，客户端组件负责交互</p>
      </div>
    </div>
  );
}
