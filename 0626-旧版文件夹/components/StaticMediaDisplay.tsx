import React from 'react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title: string;
  alt: string;
  caption?: string;
}

interface StaticMediaDisplayProps {
  media: MediaItem[];
  themeColors: any;
  eventName: string;
  hideTitle?: boolean;
}

export default function StaticMediaDisplay({
  media,
  themeColors,
  eventName,
  hideTitle = false
}: StaticMediaDisplayProps) {
  if (!media || media.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="text-4xl mb-2">🖼️</div>
          <div>暂无图片</div>
        </div>
      </div>
    );
  }

  // 只显示第一张图片（静态模式）
  const primaryImage = media[0];

  return (
    <div className="w-full">
      {!hideTitle && (
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          活动图片
        </h3>
      )}
      
      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
        <img
          src={primaryImage.url}
          alt={primaryImage.alt || eventName}
          title={primaryImage.title || eventName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {primaryImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
            {primaryImage.caption}
          </div>
        )}
        
        {media.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            1 / {media.length}
          </div>
        )}
      </div>
      
      {media.length > 1 && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          共 {media.length} 张图片
        </div>
      )}
    </div>
  );
} 