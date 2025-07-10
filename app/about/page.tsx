import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '关于我们 - 日本关东地区活动指南',
  description: '专为中文游客打造的日本关东地区四季活动指南，提供最真实、最及时的祭典、花火、赏花、红叶活动信息。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">关于我们</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">我们的使命</h2>
            <p className="text-gray-700 mb-6">
              日本关东地区活动指南致力于为中文游客提供最真实、最及时的日本关东地区活动信息。
              我们专注于六个核心地区：东京、埼玉、千叶、神奈川、北关东、甲信越，为您呈现最精彩的四季活动。
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">四季活动覆盖</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-pink-800 mb-3">🌸 春季活动</h3>
                <p className="text-gray-700">
                  花见会活动，涵盖关东地区最美的赏花地点，包括上野公园、新宿御苑、千鸟渊等经典赏樱胜地。
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3">🎆 夏季活动</h3>
                <p className="text-gray-700">
                  花火大会是夏季的重头戏，我们收录了隅田川花火大会、江户川花火大会等关东地区所有重要花火活动。
                </p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">🍁 秋季活动</h3>
                <p className="text-gray-700">
                  红叶狩（狩枫）活动，为您推荐最佳的赏枫地点和时间，包括高尾山、日光、轻井泽等经典红叶胜地。
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">✨ 冬季活动</h3>
                <p className="text-gray-700">
                  冬季灯光节和文化活动，包括东京站灯光秀、六本木灯光节等冬季浪漫活动。
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">传统祭典文化</h2>
            <p className="text-gray-700 mb-6">
              除了四季活动，我们还深入报道日本传统祭典文化，包括神田祭、三社祭、深川祭等江户三大祭，
              以及各地区特色的传统文化活动，让您深度体验日本文化的魅力。
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">我们的特色</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li className="mb-2">专注关东地区，覆盖东京、埼玉、千叶、神奈川、北关东、甲信越</li>
              <li className="mb-2">提供中文详细介绍，包括交通方式、最佳观赏时间、实用攻略</li>
              <li className="mb-2">及时更新活动信息，确保信息的准确性和时效性</li>
              <li className="mb-2">针对中文游客的特殊需求，提供实用的旅游建议</li>
              <li className="mb-2">涵盖从大型知名活动到小众特色活动的全方位信息</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">联系我们</h2>
            <p className="text-gray-700">
              如果您有任何问题或建议，欢迎通过以下方式联系我们：
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                📧 邮箱：<a href="mailto:gakuchuuwa@gmail.com" className="text-blue-600 hover:underline">gakuchuuwa@gmail.com</a>
              </p>
              <p className="text-gray-700 mt-2">
                📱 微信：gakukinn
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 