import Link from 'next/link';
import { getPopularNews } from '@/lib/mock-data';

export default async function SSGNewsPage() {
  const news = getPopularNews(10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">SSG - 静态生成新闻列表</h1>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">渲柔特点:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 构建时预生成所有页面内容</li>
            <li>• 首屏加载极快，服务器压力极低</li>
            <li>• 适合内容相对静态的页面</li>
            <li>• SEO友好</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <Link href={`/news/ssg/${item.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:underline">
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
        <p>此页面使用 SSG，在构建时预生成静态内容</p>
        <p>内容更新需要重新构建部署</p>
      </div>
    </div>
  );
}
