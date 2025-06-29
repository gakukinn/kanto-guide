'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  message = '加载中...',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const LoadingContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* 花火主题的加载动画 */}
      <div className="relative">
        {/* 外圈花火效果 */}
        <div
          className={`${sizeClasses[size]} relative rounded-full border-4 border-transparent`}
        >
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-b-blue-400 border-l-transparent border-r-rose-400 border-t-red-400"></div>
          <div
            className="absolute inset-1 animate-spin rounded-full border-2 border-b-blue-300 border-l-cyan-300 border-r-transparent border-t-red-300"
            style={{ animationDirection: 'reverse' }}
          ></div>
        </div>

        {/* 中心花火图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-pulse text-red-500">🎆</span>
        </div>
      </div>

      {/* 加载文字 */}
      {message && (
        <p
          className={`${textSizeClasses[size]} animate-pulse font-medium text-gray-600`}
        >
          {message}
        </p>
      )}

      {/* 装饰性花火动画 */}
      <div className="flex space-x-2 opacity-60">
        <span
          className="animate-bounce text-yellow-500"
          style={{ animationDelay: '0s' }}
        >
          ✨
        </span>
        <span
          className="animate-bounce text-red-500"
          style={{ animationDelay: '0.1s' }}
        >
          🎇
        </span>
        <span
          className="animate-bounce text-blue-500"
          style={{ animationDelay: '0.2s' }}
        >
          🎆
        </span>
        <span
          className="animate-bounce text-purple-500"
          style={{ animationDelay: '0.3s' }}
        >
          🎇
        </span>
        <span
          className="animate-bounce text-green-500"
          style={{ animationDelay: '0.4s' }}
        >
          ✨
        </span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-50/80 via-rose-100/80 to-blue-100/80 backdrop-blur-sm">
        <div className="rounded-2xl border border-white/50 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
          {LoadingContent}
        </div>
      </div>
    );
  }

  return LoadingContent;
}
