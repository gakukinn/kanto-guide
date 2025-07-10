import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '隐私政策 - 日本关东地区活动指南',
  description: '日本关东地区活动指南的隐私政策，了解我们如何保护您的个人信息和数据安全。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">隐私政策</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-sm mb-6">
              最后更新日期：2025年1月
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 信息收集</h2>
              <p className="text-gray-700 mb-4">
                我们收集的信息类型包括：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">
                  <strong>自动收集的信息</strong>：当您访问我们的网站时，我们会自动收集某些信息，包括您的IP地址、浏览器类型、访问页面、访问时间等。
                </li>
                <li className="mb-2">
                  <strong>Cookie信息</strong>：我们使用Cookie来改善您的浏览体验，包括Google Analytics和广告相关的Cookie。
                </li>
                <li className="mb-2">
                  <strong>联系信息</strong>：当您通过邮箱或微信联系我们时，我们会收集您提供的联系信息。
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 信息使用</h2>
              <p className="text-gray-700 mb-4">
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">提供和改善我们的服务</li>
                <li className="mb-2">分析网站使用情况</li>
                <li className="mb-2">回复您的咨询和反馈</li>
                <li className="mb-2">发送相关的活动信息（仅在您同意的情况下）</li>
                <li className="mb-2">遵守法律要求</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Google AdSense和分析服务</h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Google AdSense</h3>
                <p className="text-gray-700 mb-3">
                  我们的网站使用Google AdSense展示广告。Google可能会使用Cookie来根据您对本网站和其他网站的访问为您投放广告。
                </p>
                <p className="text-gray-700">
                  您可以通过访问<a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google广告设置</a>来禁用个性化广告。
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Google Analytics</h3>
                <p className="text-gray-700">
                  我们使用Google Analytics来分析网站使用情况。Google Analytics使用Cookie来收集匿名信息，帮助我们了解访客如何使用我们的网站。
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 联盟营销</h2>
              <p className="text-gray-700 mb-4">
                我们的网站包含联盟营销链接，包括但不限于：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">Booking.com</li>
                <li className="mb-2">Agoda</li>
                <li className="mb-2">Hotels.com</li>
                <li className="mb-2">Expedia</li>
              </ul>
              <p className="text-gray-700 mb-4">
                当您通过这些链接进行预订时，我们可能会收到佣金，但这不会影响您的费用。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 信息共享</h2>
              <p className="text-gray-700 mb-4">
                我们不会出售、交易或转让您的个人信息给第三方，除非：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">获得您的明确同意</li>
                <li className="mb-2">法律要求</li>
                <li className="mb-2">保护我们的权利和安全</li>
                <li className="mb-2">与可信的第三方服务提供商（如Google Analytics、AdSense）</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookie政策</h2>
              <p className="text-gray-700 mb-4">
                我们的网站使用Cookie来：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">记住您的偏好设置</li>
                <li className="mb-2">分析网站流量</li>
                <li className="mb-2">投放相关广告</li>
                <li className="mb-2">改善用户体验</li>
              </ul>
              <p className="text-gray-700 mb-4">
                您可以通过浏览器设置控制或删除Cookie，但这可能会影响网站的功能。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 数据安全</h2>
              <p className="text-gray-700 mb-4">
                我们采取合理的安全措施来保护您的个人信息，包括：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">使用HTTPS加密传输</li>
                <li className="mb-2">限制对个人信息的访问</li>
                <li className="mb-2">定期审查安全措施</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 您的权利</h2>
              <p className="text-gray-700 mb-4">
                您有权：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">访问您的个人信息</li>
                <li className="mb-2">更正不准确的信息</li>
                <li className="mb-2">要求删除您的信息</li>
                <li className="mb-2">选择退出某些数据处理</li>
              </ul>
              <p className="text-gray-700 mb-4">
                如需行使这些权利，请通过<a href="mailto:gakuchuuwa@gmail.com" className="text-blue-600 hover:underline">gakuchuuwa@gmail.com</a>联系我们。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 政策更新</h2>
              <p className="text-gray-700 mb-4">
                我们可能会不时更新本隐私政策。任何更改都会在本页面发布，重大更改会通过网站通知或其他适当方式告知您。
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. 联系我们</h2>
              <p className="text-gray-700 mb-4">
                如果您对本隐私政策有任何问题或疑虑，请联系我们：
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  📧 邮箱：<a href="mailto:gakuchuuwa@gmail.com" className="text-blue-600 hover:underline">gakuchuuwa@gmail.com</a>
                </p>
                <p className="text-gray-700">
                  📱 微信：gakukinn
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 