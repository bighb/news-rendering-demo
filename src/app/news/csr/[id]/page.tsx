"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { NewsItem } from "@/types/news";

export default function CSRNewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("新闻不存在");
          }
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/news/csr" className="text-red-600 hover:underline">
            ← 返回CSR列表
          </Link>
        </div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在加载新闻详情...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/news/csr" className="text-red-600 hover:underline">
            ← 返回CSR列表
          </Link>
        </div>
        <div className="text-center text-red-600">
          <p>加载失败: {error}</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/news/csr" className="text-red-600 hover:underline">
            ← 返回CSR列表
          </Link>
        </div>
        <div className="text-center">
          <p>新闻不存在</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/news/csr" className="text-red-600 hover:underline">
          ← 返回CSR列表
        </Link>
      </div>

      <div className="mb-8">
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">CSR 详情页特点:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 页面骨架先渲染，内容通过API异步加载</li>
            <li>• 用户会看到完整的加载过程</li>
            <li>• 支持任意ID的新闻访问</li>
            <li>• SEO较差，但用户体验接近单页应用</li>
          </ul>
        </div>
      </div>

      <article className="max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>作者: {news.author}</span>
            <span>分类: {news.category}</span>
            <span>浏览量: {news.views.toLocaleString()}</span>
            <span>发布时间: {new Date(news.publishedAt).toLocaleString()}</span>
          </div>
        </header>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">文章摘要</h2>
          <p className="text-gray-700">{news.summary}</p>
        </div>

        <div className="prose max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">页面信息</h3>
            <p className="text-sm text-gray-600">
              此页面使用 CSR (客户端渲染)，内容通过API动态获取。 页面ID:
              {news.id}
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
