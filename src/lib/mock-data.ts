import { NewsItem } from '@/types/news';

// 模拟新闻数据 - 模拟数据库中的大量新闻
export const mockNewsData: NewsItem[] = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `重要新闻标题 ${index + 1}`,
  content: `这是新闻 ${index + 1} 的详细内容。这里包含了新闻的完整报道，通常会有很多段落的详细描述。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  summary: `新闻 ${index + 1} 的简要摘要，这里是新闻的核心要点...`,
  author: `记者${(index % 5) + 1}`,
  publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  category: ['科技', '财经', '体育', '娱乐', '社会'][index % 5],
  views: Math.floor(Math.random() * 10000) + 100
}));

// 获取热门新闻（模拟高访问量的新闻）
export const getPopularNews = (limit: number = 10): NewsItem[] => {
  return mockNewsData
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

// 获取最新新闻
export const getRecentNews = (limit: number = 10): NewsItem[] => {
  return mockNewsData
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

// 根据ID获取新闻
export const getNewsById = (id: string): NewsItem | null => {
  return mockNewsData.find(news => news.id === id) || null;
};

// 模拟数据库查询延迟
export const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
