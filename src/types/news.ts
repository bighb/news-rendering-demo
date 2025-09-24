export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  publishedAt: string;
  category: string;
  views: number;
}

export interface NewsListResponse {
  news: NewsItem[];
  total: number;
  page: number;
  limit: number;
}
