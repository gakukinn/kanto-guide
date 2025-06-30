import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">日</span>
              </div>
              <h3 className="text-xl font-bold">日本东部地区活动指南</h3>
            </div>
            <p className="text-gray-300 mb-4">
              专为中国游客打造的日本东部六地区旅游活动指南，提供最真实、最及时的活动信息。
            </p>
            <p className="text-sm text-gray-400">
              涵盖东京、埼玉、千叶、神奈川、北关东、甲信越六个地区的祭典、花见、花火、狩枫、灯光、文艺活动。
            </p>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
          
          {/* 联系信息 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">联系信息</h4>
            <div className="space-y-2 text-gray-300">
              <p className="text-sm">
                📧 info@japanguide.com
              </p>
              <p className="text-sm">
                🌐 www.japanguide.com
              </p>
              <p className="text-sm">
                📱 微信：JapanGuide2024
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} 日本东部地区活动指南. 版权所有.
          </p>
        </div>
      </div>
    </footer>
  );
} 