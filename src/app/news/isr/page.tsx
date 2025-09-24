import Link from 'next/link';
import { getRecentNews } from '@/lib/mock-data';

export const revalidate = 60; // 每60秒重新验证

export default async function ISRNewsPage() {
  const news = getRecentNews(10);
  const currentTime = new Date().toLocaleString();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">ISR - 增量静态再生新闻列表</h1>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">渲柔特点:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 构建时预生成，后续按需更新</li>
            <li>• 每60秒自动重新验证内容</li>
            <li>• 结合了SSG的速度和SSR的实时性</li>
            <li>• 适合内容更新频率适中的场景</li>
          </ul>
          <div className="mt-3 text-sm bg-white p-2 rounded">
            <strong>页面生成时间:</strong> {currentTime}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <Link href={`/news/isr/${item.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2 text-purple-600 hover:underline">
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
        <p>此页面使用 ISR，每60秒重新验证一次内容</p>
        <p>刷新页面查看时间戳变化</p>
      </div>
    </div>
  );
}
