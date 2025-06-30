'use client';

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'text' | 'image' | 'detail';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({
  type = 'card',
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const SkeletonCard = () => (
    <div
      className={`animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ${className}`}
    >
      {/* 图片骨架 */}
      <div className="bg-size-200 animate-gradient h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

      {/* 内容骨架 */}
      <div className="space-y-3 p-4">
        {/* 标题骨架 */}
        <div className="bg-size-200 animate-gradient h-6 w-3/4 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

        {/* 描述骨架 */}
        <div className="space-y-2">
          <div className="bg-size-200 animate-gradient h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
          <div className="bg-size-200 animate-gradient h-4 w-5/6 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        {/* 标签和按钮骨架 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            <div className="bg-size-200 animate-gradient h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            <div className="bg-size-200 animate-gradient h-6 w-12 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
          </div>
          <div className="bg-size-200 animate-gradient h-8 w-20 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonList = () => (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4"
        >
          {/* 图标骨架 */}
          <div className="bg-size-200 animate-gradient h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

          {/* 文本骨架 */}
          <div className="flex-1 space-y-2">
            <div className="bg-size-200 animate-gradient h-4 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            <div className="bg-size-200 animate-gradient h-3 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
          </div>

          {/* 右侧骨架 */}
          <div className="bg-size-200 animate-gradient h-6 w-16 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>
      ))}
    </div>
  );

  const SkeletonText = () => (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`bg-size-200 animate-gradient h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${
            index === 3 ? 'w-2/3' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );

  const SkeletonImage = () => (
    <div
      className={`bg-size-200 animate-gradient rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
    >
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-4xl text-gray-400">🎆</div>
      </div>
    </div>
  );

  const SkeletonDetail = () => (
    <div
      className={`animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ${className}`}
    >
      {/* 头部图片骨架 */}
      <div className="bg-size-200 animate-gradient h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

      {/* 详情内容骨架 */}
      <div className="space-y-6 p-6">
        {/* 标题骨架 */}
        <div className="space-y-3">
          <div className="bg-size-200 animate-gradient h-8 w-4/5 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
          <div className="bg-size-200 animate-gradient h-6 w-3/5 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        {/* 标签骨架 */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-size-200 animate-gradient h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            ></div>
          ))}
        </div>

        {/* 描述段落骨架 */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`bg-size-200 animate-gradient h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${
                index === 2 ? 'w-4/5' : index === 5 ? 'w-3/4' : 'w-full'
              }`}
            ></div>
          ))}
        </div>

        {/* 按钮骨架 */}
        <div className="flex space-x-3 pt-4">
          <div className="bg-size-200 animate-gradient h-10 w-24 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
          <div className="bg-size-200 animate-gradient h-10 w-32 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
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
