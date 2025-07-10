export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">🛠️ 管理员工具</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">🎆 花火页面生成器</h2>
          <p className="text-gray-600 mb-4">生成花火大会活动页面</p>
          <a 
            href="/admin/walkerplus-page-generator"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            打开工具
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">🏕️ 夏休页面生成器</h2>
          <p className="text-gray-600 mb-4">生成夏休活动页面</p>
          <a 
            href="/admin/walkerplus-matsuri-generator"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            打开工具
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">📝 佳兰页面生成器</h2>
          <p className="text-gray-600 mb-4">生成通用活动页面</p>
          <a 
            href="/admin/activity-page-generator"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            打开工具
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">🎨 祭典页面生成器</h2>
          <p className="text-gray-600 mb-4">生成祭典页面模板</p>
          <a 
            href="/admin/matsuri-page-generator"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            打开工具
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">🔧 第三层生成器</h2>
          <p className="text-gray-600 mb-4">生成第三层页面结构</p>
          <a 
            href="/admin/third-layer-generator"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
          >
            打开工具
          </a>
        </div>
      </div>
    </div>
  );
} 