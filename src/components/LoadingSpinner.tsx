'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  size = 'md', 
  message = '加载中...', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const LoadingContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* 花火主题的加载动画 */}
      <div className="relative">
        {/* 外圈花火效果 */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent`}>
          <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-red-400 via-rose-400 to-blue-400 animate-spin border-t-transparent"></div>
          <div className="absolute inset-1 rounded-full border-2 border-gradient-to-l from-blue-300 via-cyan-300 to-red-300 animate-spin animate-reverse border-b-transparent"></div>
        </div>
        
        {/* 中心花火图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-red-500 animate-pulse">🎆</span>
        </div>
      </div>

      {/* 加载文字 */}
      {message && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}>
          {message}
        </p>
      )}

      {/* 装饰性花火动画 */}
      <div className="flex space-x-2 opacity-60">
        <span className="animate-bounce text-yellow-500" style={{ animationDelay: '0s' }}>✨</span>
        <span className="animate-bounce text-red-500" style={{ animationDelay: '0.1s' }}>🎇</span>
        <span className="animate-bounce text-blue-500" style={{ animationDelay: '0.2s' }}>🎆</span>
        <span className="animate-bounce text-purple-500" style={{ animationDelay: '0.3s' }}>🎇</span>
        <span className="animate-bounce text-green-500" style={{ animationDelay: '0.4s' }}>✨</span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-50/80 via-rose-100/80 to-blue-100/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50">
          {LoadingContent}
        </div>
      </div>
    );
  }

  return LoadingContent;
} 