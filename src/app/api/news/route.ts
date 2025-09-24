import { NextResponse } from 'next/server';
import { getPopularNews, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  try {
    // 模拟API延迟
    await simulateDelay(800);
    
    const news = getPopularNews(10);
    
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
