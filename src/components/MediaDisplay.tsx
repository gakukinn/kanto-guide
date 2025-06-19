'use client';

import Image from 'next/image';
import { useState } from 'react';
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
  hideTitle?: boolean;
}

export default function MediaDisplay({
  media,
  themeColors,
  eventName,
  hideTitle = false,
}: MediaDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) {
    // 如果没有媒体内容，显示专业级默认占位符
    return (
      <div
        className={`bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} mb-6 rounded-2xl border-2 border-white/30 p-12 text-center shadow-2xl backdrop-blur-sm ${themeColors.border200}`}
      >
        <div className="mb-6 animate-bounce text-9xl">🎆</div>
        <h3 className="mb-3 text-xl font-bold text-gray-800">{eventName}</h3>
        <p className="mb-2 text-base font-medium text-gray-700">
          精彩瞬间即将呈现
        </p>
        <p className="text-sm text-gray-500">高清图片与现场视频正在准备中</p>
        <div className="mx-auto mt-6 h-1 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      </div>
    );
  }

  // 使用当前索引的媒体项，支持多张图片切换
  const currentMedia = media[currentIndex];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 切换到上一张图片
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + media.length) % media.length);
    setImageError(false); // 重置错误状态
  };

  // 切换到下一张图片
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % media.length);
    setImageError(false); // 重置错误状态
  };

  return (
    <div className="mb-6">
      {/* 主要媒体展示区域 */}
      <div
        className={`bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} overflow-hidden rounded-xl border ${themeColors.border200} shadow-lg`}
      >
        {/* 媒体内容 - 16:9电影级比例 */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
          {currentMedia.type === 'video' ? (
            <div className="relative h-0 w-full pb-[56.25%]">
              {' '}
              {/* 16:9 专业电影比例 */}
              <video
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 hover:scale-105"
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
            <div className="relative h-0 w-full pb-[56.25%]">
              {' '}
              {/* 16:9 专业宽屏比例 */}
              {imageError ? (
                // 图片加载失败时显示占位符
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="mb-4 animate-pulse text-8xl">🎆</div>
                  <p className="px-4 text-center text-lg font-semibold text-gray-700">
                    {currentMedia.title}
                  </p>
                  <p className="mt-3 text-sm font-medium text-gray-500">
                    精彩瞬间即将呈现
                  </p>
                  <div className="mt-4 h-1 w-24 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                </div>
              ) : (
                <Image
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  className="object-cover filter transition-all duration-700 hover:scale-105 hover:brightness-110"
                  loading="lazy"
                  placeholder="blur"
                  quality={90}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          )}

          {/* 多张图片时显示切换按钮和指示器 */}
          {media.length > 1 && (
            <>
              {/* 左右切换按钮 */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:scale-110 hover:bg-black/70"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:scale-110 hover:bg-black/70"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* 图片指示器 */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setImageError(false);
                    }}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'scale-125 bg-white'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* 图片计数器 */}
              <div className="absolute right-4 top-4 rounded bg-black/60 px-2 py-1 text-xs text-white">
                {currentIndex + 1} / {media.length}
              </div>
            </>
          )}
        </div>

        {/* 媒体信息 - 条件显示 */}
        {!hideTitle && (
          <div className="bg-gradient-to-r from-white/95 to-white/90 p-6 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-wide text-gray-800">
                {currentMedia.title}
              </h3>
              <span
                className={`${themeColors.bg100} ${themeColors.text700} rounded-full px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-white/20`}
              >
                {currentMedia.type === 'video' ? '🎥 视频' : '📸 高清图片'}
              </span>
            </div>
            {currentMedia.description && (
              <p className="text-sm font-medium leading-relaxed text-gray-600">
                {currentMedia.description}
              </p>
            )}
            {/* 新增：视觉分隔线 */}
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}
