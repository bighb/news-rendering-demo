import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Next.js 渲染策略演示
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/news/csr"
          className="block p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">CSR - 客户端渲染</h2>
          <p className="text-gray-600">自助餐厅模式，客户端获取数据并渲染</p>
        </Link>

        <Link
          href="/news/ssr"
          className="block p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">SSR - 服务端渲染</h2>
          <p className="text-gray-600">现点现做模式，服务器实时生成页面</p>
        </Link>

        <Link
          href="/news/ssg"
          className="block p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">SSG - 静态生成</h2>
          <p className="text-gray-600">预制便当模式，构建时预生成页面</p>
        </Link>

        <Link
          href="/news/isr"
          className="block p-6 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">ISR - 增量静态再生</h2>
          <p className="text-gray-600">智能便当模式，定时更新静态页面</p>
        </Link>

        <Link
          href="/news/mixed"
          className="block p-6 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">混合模式</h2>
          <p className="text-gray-600">Server Components + Client Components</p>
        </Link>

        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">PPR - 部分预渲染</h2>
          <p className="text-gray-600 mb-2">混合餐厅模式 (Next.js 14+)</p>
          <span className="text-sm text-gray-500">即将支持</span>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">渲染策略对比</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">策略</th>
                <th className="px-4 py-2 border">首屏加载</th>
                <th className="px-4 py-2 border">SEO</th>
                <th className="px-4 py-2 border">服务器压力</th>
                <th className="px-4 py-2 border">交互性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border font-semibold">CSR</td>
                <td className="px-4 py-2 border text-red-600">慢</td>
                <td className="px-4 py-2 border text-red-600">差</td>
                <td className="px-4 py-2 border text-green-600">低</td>
                <td className="px-4 py-2 border text-green-600">强</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-semibold">SSR</td>
                <td className="px-4 py-2 border text-green-600">快</td>
                <td className="px-4 py-2 border text-green-600">好</td>
                <td className="px-4 py-2 border text-red-600">高</td>
                <td className="px-4 py-2 border text-green-600">强</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-semibold">SSG</td>
                <td className="px-4 py-2 border text-green-600">极快</td>
                <td className="px-4 py-2 border text-green-600">好</td>
                <td className="px-4 py-2 border text-green-600">极低</td>
                <td className="px-4 py-2 border text-yellow-600">中等</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-semibold">ISR</td>
                <td className="px-4 py-2 border text-green-600">快</td>
                <td className="px-4 py-2 border text-green-600">好</td>
                <td className="px-4 py-2 border text-green-600">低</td>
                <td className="px-4 py-2 border text-yellow-600">中等</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
