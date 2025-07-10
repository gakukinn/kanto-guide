import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '条款和条件 - 日本关东地区活动指南',
  description: '日本关东地区活动指南的使用条款和条件，了解使用我们网站的规则和责任。',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">条款和条件</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-sm mb-6">
              最后更新日期：2025年1月
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 接受条款</h2>
              <p className="text-gray-700 mb-4">
                欢迎使用日本关东地区活动指南（以下简称"本网站"）。通过访问和使用本网站，您同意遵守并受本条款和条件（以下简称"条款"）的约束。
              </p>
              <p className="text-gray-700 mb-4">
                如果您不同意这些条款的任何部分，请不要使用本网站。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 网站描述</h2>
              <p className="text-gray-700 mb-4">
                本网站是一个提供日本关东地区活动信息的指南平台，包括但不限于：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">花火大会信息</li>
                <li className="mb-2">花见会活动</li>
                <li className="mb-2">传统祭典信息</li>
                <li className="mb-2">红叶狩（狩枫）活动</li>
                <li className="mb-2">灯光节和文化活动</li>
                <li className="mb-2">相关旅游攻略和建议</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 使用许可</h2>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">许可范围</h3>
                <p className="text-gray-700 mb-3">
                  我们授予您有限的、非独占的、不可转让的许可来访问和使用本网站，仅用于个人、非商业目的。
                </p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">使用限制</h3>
                <p className="text-gray-700 mb-3">您不得：</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li className="mb-2">复制、修改、分发或出售本网站的任何内容</li>
                  <li className="mb-2">用于任何非法或未授权的目的</li>
                  <li className="mb-2">干扰网站的正常运行</li>
                  <li className="mb-2">尝试获得未授权的访问权限</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 内容准确性</h2>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-3">
                  我们努力确保本网站上信息的准确性和及时性，但无法保证所有信息都是完全准确、完整或最新的。
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>重要提醒：</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li className="mb-2">活动信息可能会因天气、组织方决定等原因发生变化</li>
                  <li className="mb-2">请在参加活动前确认最新信息</li>
                  <li className="mb-2">我们建议查看官方网站或联系活动组织方</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 联盟营销披露</h2>
              <p className="text-gray-700 mb-4">
                本网站包含联盟营销链接。当您通过我们的链接预订酒店或其他服务时，我们可能会收到佣金。这些包括：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">Booking.com</li>
                <li className="mb-2">Agoda</li>
                <li className="mb-2">Hotels.com</li>
                <li className="mb-2">Expedia</li>
              </ul>
              <p className="text-gray-700 mb-4">
                这种合作关系不会影响您支付的价格，也不会影响我们对活动信息的客观性。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 免责声明</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-3">
                  本网站按"现状"提供，不提供任何明示或暗示的保证。我们不对以下情况承担责任：
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li className="mb-2">因使用本网站信息而导致的任何损失或损害</li>
                  <li className="mb-2">活动取消、延期或变更导致的不便</li>
                  <li className="mb-2">第三方网站或服务的问题</li>
                  <li className="mb-2">网站暂时无法访问或技术故障</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 用户责任</h2>
              <p className="text-gray-700 mb-4">
                作为用户，您有责任：
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">确保您有合法权利访问和使用本网站</li>
                <li className="mb-2">验证活动信息的准确性</li>
                <li className="mb-2">遵守当地法律法规</li>
                <li className="mb-2">尊重知识产权</li>
                <li className="mb-2">不进行任何可能损害网站或其他用户的行为</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 知识产权</h2>
              <p className="text-gray-700 mb-4">
                本网站的所有内容，包括但不限于文字、图片、设计、代码，均受版权法保护。未经明确许可，不得复制、分发或使用。
              </p>
              <p className="text-gray-700 mb-4">
                部分图片和信息可能来自第三方，我们尊重原作者的版权。如有版权问题，请联系我们处理。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 条款修改</h2>
              <p className="text-gray-700 mb-4">
                我们保留随时修改这些条款的权利。重大修改会在网站上公布。继续使用网站即表示您接受修改后的条款。
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. 适用法律</h2>
              <p className="text-gray-700 mb-4">
                这些条款受中华人民共和国法律管辖。如有争议，将通过友好协商解决。
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">联系我们</h2>
              <p className="text-gray-700 mb-4">
                如果您对这些条款有任何问题，请联系我们：
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