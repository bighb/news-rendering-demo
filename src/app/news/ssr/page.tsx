import Link from 'next/link';
import { getPopularNews, simulateDelay } from '@/lib/mock-data';

export const dynamic = 'force-dynamic'; // 强制动态渲染

export default async function SSRNewsPage() {
  await simulateDelay(500); // 模拟数据库查询延迟
  const news = getPopularNews(10);
  const currentTime = new Date().toLocaleString();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">SSR - 服务端渲染新闻列表</h1>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">渲染特点:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 每次请求都在服务器实时生成页面</li>
            <li>• 内容始终是最新的，适合动态内容</li>
            <li>• 首屏加载快，SEO友好</li>
            <li>• 服务器压力较高，响应时间取决于数据查询</li>
          </ul>
          <div className="mt-3 text-sm bg-white p-2 rounded">
            <strong>服务器渲染时间:</strong> {currentTime}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <Link href={`/news/ssr/${item.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2 text-green-600 hover:underline">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-2">{item.summary}</p>
              <div className="text-sm text-gray-500">
                <span>作者: {item.author}</span>
                <span className="mx-2">•</span>
                <span>分类: {item.category}</span>
                <span className="mx-2">•</span>
                <span>浏览量: {item.views}</span>
                <span className="mx-2">•</span>
                <span>发布时间: {new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>此页面使用 SSR，每次访问都重新渲柔</p>
        <p>刷新页面查看时间戳实时变化</p>
      </div>
    </div>
  );
}
