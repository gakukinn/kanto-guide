import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '联系我们 - 日本东部地区活动指南',
  description: '联系日本东部地区活动指南团队，获取最新的关东地区活动信息，或为我们提供宝贵建议。',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">联系我们</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              欢迎联系我们！如果您有任何问题、建议或想要分享的活动信息，我们都很乐意听到您的声音。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">📧 邮箱联系</h2>
                <p className="text-gray-700 mb-4">
                  如果您有详细的问题或建议，请通过邮箱联系我们：
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <a 
                    href="mailto:gakuchuuwa@gmail.com" 
                    className="text-blue-600 hover:underline text-lg font-medium"
                  >
                    gakuchuuwa@gmail.com
                  </a>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  我们通常会在24小时内回复您的邮件
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">📱 微信联系</h2>
                <p className="text-gray-700 mb-4">
                  如果您希望快速沟通，可以通过微信联系我们：
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-green-600 text-lg font-medium">
                    微信号：gakukinn
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  请在添加好友时说明您的来意
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-yellow-800 mb-4">🤝 合作咨询</h2>
              <p className="text-gray-700 mb-4">
                如果您是：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>活动组织方，希望推广您的活动</li>
                <li>旅游相关企业，希望合作推广</li>
                <li>媒体机构，希望内容合作</li>
                <li>其他商业合作咨询</li>
              </ul>
              <p className="text-gray-700">
                请通过邮箱联系我们，我们会尽快回复您的合作提案。
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">💡 我们希望听到的内容</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li className="mb-2">新发现的精彩活动信息</li>
                <li className="mb-2">对我们网站内容的建议和反馈</li>
                <li className="mb-2">您的旅游经验和攻略分享</li>
                <li className="mb-2">网站功能改进建议</li>
                <li className="mb-2">错误信息的纠正</li>
                <li className="mb-2">其他任何您想分享的想法</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">
                🌟 感谢您的支持！
              </p>
              <p className="text-blue-700">
                您的每一个建议都是我们前进的动力。让我们一起为中文游客打造更好的日本旅游体验！
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 