'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HanabiMedia } from '../types/hanabi';

interface MediaDisplayProps {
  media?: HanabiMedia[];
  themeColors: {
    bg50: string;
    bg100: string;
    bg500: string;
    bg600: string;
    text600: string;
    text700: string;
    border200: string;
    gradientFrom: string;
    gradientTo: string;
  };
  eventName: string;
}

export default function MediaDisplay({
  media,
  themeColors,
  eventName,
}: MediaDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!media || media.length === 0) {
    // 如果没有媒体内容，显示默认占位符
    return (
      <div
        className={`bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} mb-6 rounded-xl border p-8 text-center ${themeColors.border200}`}
      >
        <div className="mb-4 text-8xl">🎆</div>
        <p className="text-sm text-gray-700">{eventName}精彩瞬间即将上传</p>
        <p className="mt-2 text-xs text-gray-500">敬请期待现场视频和精美图片</p>
      </div>
    );
  }

  // 只取第一个媒体项
  const currentMedia = media[0];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mb-6">
      {/* 主要媒体展示区域 */}
      <div
        className={`bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} overflow-hidden rounded-xl border ${themeColors.border200} shadow-lg`}
      >
        {/* 媒体内容 - 1:1比例 */}
        <div className="aspect-w-1 aspect-h-1 relative bg-black">
          {currentMedia.type === 'video' ? (
            <div className="relative h-0 w-full pb-[100%]">
              {' '}
              {/* 1:1 比例 */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls={isPlaying}
                poster={currentMedia.thumbnail}
                preload="metadata"
                muted
                playsInline
              >
                <source src={currentMedia.url} type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
              {/* 播放控制覆盖层 */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <button
                    onClick={handlePlay}
                    className={`${themeColors.bg600} hover:${themeColors.bg500} transform rounded-full p-4 text-white shadow-lg transition-all hover:scale-110`}
                  >
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {/* 视频时长显示 */}
              {currentMedia.duration && (
                <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-60 px-2 py-1 text-xs text-white">
                  {currentMedia.duration}
                </div>
              )}
              {/* 静音图标提示 */}
              <div className="absolute right-2 top-2 flex items-center space-x-1 rounded bg-black bg-opacity-60 px-2 py-1 text-xs text-white">
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.816a1 1 0 011-.108zM16 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                  <path d="M18 10a1 1 0 11-2 0V8a1 1 0 112 0v2z" />
                </svg>
                <span>静音</span>
              </div>
            </div>
          ) : (
            <div className="relative h-0 w-full pb-[100%]">
              {' '}
              {/* 1:1 比例 */}
              {imageError ? (
                // 图片加载失败时显示占位符
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                  <div className="mb-4 text-6xl">🎆</div>
                  <p className="px-4 text-center text-sm text-gray-600">
                    {currentMedia.title}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">图片即将上传</p>
                </div>
              ) : (
                <Image
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          )}
        </div>

        {/* 媒体信息 */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              {currentMedia.title}
            </h3>
            <span
              className={`${themeColors.bg100} ${themeColors.text700} rounded-full px-2 py-1 text-xs font-semibold`}
            >
              {currentMedia.type === 'video' ? '🎥 视频' : '📸 图片'}
            </span>
          </div>
          {currentMedia.description && (
            <p className="text-sm text-gray-600">{currentMedia.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
