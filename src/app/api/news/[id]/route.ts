import { NextResponse } from "next/server";
import { getNewsById, simulateDelay } from "@/lib/mock-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 模拟API延迟
    await simulateDelay(600);

    const { id } = await params;
    const news = getNewsById(id);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
