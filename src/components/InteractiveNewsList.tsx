"use client";

import { useState } from "react";
import Link from "next/link";
import { NewsItem } from "@/types/news";
import { formatDate, formatNumber } from "@/lib/date-utils";

interface InteractiveNewsListProps {
  news: NewsItem[];
}

export default function InteractiveNewsList({
  news,
}: InteractiveNewsListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "views">("date");

  const categories = [
    "all",
    ...Array.from(new Set(news.map((item) => item.category))),
  ];

  const filteredAndSortedNews = news
    .filter((item) => filter === "all" || item.category === filter)
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      }
      return b.views - a.views;
    });

  return (
    <div>
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">客户端交互控制</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">分类筛选:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "全部" : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">排序方式:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "views")}
              className="px-3 py-1 border rounded text-sm"
            >
              <option value="date">按时间</option>
              <option value="views">按浏览量</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          ↑ 这些交互功能运行在客户端，无需服务器请求
        </p>
      </div>

      <div className="grid gap-4">
        {filteredAndSortedNews.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <Link href={`/news/mixed/${item.id}`} className="block">
              <h3 className="text-lg font-semibold mb-2 text-orange-600 hover:underline">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{item.summary}</p>
              <div className="text-xs text-gray-500">
                <span>作者: {item.author}</span>
                <span className="mx-2">•</span>
                <span>分类: {item.category}</span>
                <span className="mx-2">•</span>
                <span>浏览量: {formatNumber(item.views)}</span>
                <span className="mx-2">•</span>
                <span>发布时间: {formatDate(item.publishedAt, "date")}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>
          显示 {filteredAndSortedNews.length} / {news.length} 篇新闻
        </p>
      </div>
    </div>
  );
}
