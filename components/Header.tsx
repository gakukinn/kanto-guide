import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">日</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                日本东部地区活动指南
              </h1>
              <p className="text-sm text-gray-600">
                专为中国游客精心打造
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              首页
            </Link>
            <a 
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              关于我们
            </a>
            <a 
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              联系我们
            </a>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <button className="md:hidden p-2 text-gray-600 hover:text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 