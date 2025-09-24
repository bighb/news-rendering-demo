'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { NewsItem } from '@/types/news';

export default function CSRNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟从 API获取数据
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← 返回首页
          </Link>
        </div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在加载新闻数据...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← 返回首页
          </Link>
        </div>
        <div className="text-center text-red-600">
          <p>加载失败: {error}</p>
          <p className="text-sm text-gray-500 mt-2">请先创建 /api/news 接口</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">CSR - 客户端渲染新闻列表</h1>
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">渲染特点:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 页面骨架先加载，数据通过API异步获取</li>
            <li>• 用户会看到加载状态，体验更接近SPA</li>
            <li>• 首屏SEO较差，但交互性强</li>
            <li>• 服务器压力小，适合动态交互场景</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <Link href={`/news/csr/${item.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2 text-red-600 hover:underline">
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
        <p>此页面使用 CSR，数据通过客户端API调用获取</p>
        <p>注意观察加载过程和页面渲柔时机</p>
      </div>
    </div>
  );
}
