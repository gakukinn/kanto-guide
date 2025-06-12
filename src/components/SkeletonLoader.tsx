'use client';

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'text' | 'image' | 'detail';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({ 
  type = 'card', 
  count = 1, 
  className = '' 
}: SkeletonLoaderProps) {
  
  const SkeletonCard = () => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-pulse ${className}`}>
      {/* 图片骨架 */}
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient"></div>
      
      {/* 内容骨架 */}
      <div className="p-4 space-y-3">
        {/* 标题骨架 */}
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-md w-3/4"></div>
        
        {/* 描述骨架 */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded w-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded w-5/6"></div>
        </div>
        
        {/* 标签和按钮骨架 */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-2">
            <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-full"></div>
            <div className="h-6 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-full"></div>
          </div>
          <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonList = () => (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 animate-pulse">
          {/* 图标骨架 */}
          <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-full flex-shrink-0"></div>
          
          {/* 文本骨架 */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded w-1/2"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded w-3/4"></div>
          </div>
          
          {/* 右侧骨架 */}
          <div className="w-16 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded"></div>
        </div>
      ))}
    </div>
  );

  const SkeletonText = () => (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded ${
            index === 3 ? 'w-2/3' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );

  const SkeletonImage = () => (
    <div className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-lg ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="text-4xl text-gray-400 animate-pulse">🎆</div>
      </div>
    </div>
  );

  const SkeletonDetail = () => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-pulse ${className}`}>
      {/* 头部图片骨架 */}
      <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient"></div>
      
      {/* 详情内容骨架 */}
      <div className="p-6 space-y-6">
        {/* 标题骨架 */}
        <div className="space-y-3">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-md w-4/5"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-md w-3/5"></div>
        </div>
        
        {/* 标签骨架 */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-full"
            ></div>
          ))}
        </div>
        
        {/* 描述段落骨架 */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded ${
                index === 2 ? 'w-4/5' : index === 5 ? 'w-3/4' : 'w-full'
              }`}
            ></div>
          ))}
        </div>
        
        {/* 按钮骨架 */}
        <div className="flex space-x-3 pt-4">
          <div className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-lg"></div>
          <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-gradient rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'list':
        return <SkeletonList />;
      case 'text':
        return <SkeletonText />;
      case 'image':
        return <SkeletonImage />;
      case 'detail':
        return <SkeletonDetail />;
      case 'card':
      default:
        return <SkeletonCard />;
    }
  };

  return (
    <div className="w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={count > 1 ? 'mb-6' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
} 