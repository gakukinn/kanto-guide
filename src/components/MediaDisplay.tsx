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

export default function MediaDisplay({ media, themeColors, eventName }: MediaDisplayProps) {
 const [isPlaying, setIsPlaying] = useState(false);
 const [imageError, setImageError] = useState(false);

 if (!media || media.length === 0) {
 // 如果没有媒体内容，显示默认占位符
 return (
 <div className={`bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} rounded-xl p-8 mb-6 text-center border ${themeColors.border200}`}>
 <div className="text-8xl mb-4">🎆</div>
 <p className="text-gray-700 text-sm">
 {eventName}精彩瞬间即将上传
 </p>
 <p className="text-gray-500 text-xs mt-2">
 敬请期待现场视频和精美图片
 </p>
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
 <div className={`bg-gradient-to-br ${themeColors.gradientFrom} ${themeColors.gradientTo} rounded-xl overflow-hidden border ${themeColors.border200} shadow-lg`}>
 {/* 媒体内容 - 1:1比例 */}
 <div className="relative aspect-w-1 aspect-h-1 bg-black">
 {currentMedia.type === 'video' ? (
 <div className="relative w-full h-0 pb-[100%]"> {/* 1:1 比例 */}
 <video
 className="absolute inset-0 w-full h-full object-cover"
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
 className={`${themeColors.bg600} hover:${themeColors.bg500} text-white rounded-full p-4 transition-all transform hover:scale-110 shadow-lg`}
 >
 <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
 </svg>
 </button>
 </div>
 )}

 {/* 视频时长显示 */}
 {currentMedia.duration && (
 <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
 {currentMedia.duration}
 </div>
 )}

 {/* 静音图标提示 */}
 <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.816a1 1 0 011-.108zM16 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1z" clipRule="evenodd" />
 <path d="M18 10a1 1 0 11-2 0V8a1 1 0 112 0v2z" />
 </svg>
 <span>静音</span>
 </div>
 </div>
 ) : (
 <div className="relative w-full h-0 pb-[100%]"> {/* 1:1 比例 */}
 {imageError ? (
 // 图片加载失败时显示占位符
 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
 <div className="text-6xl mb-4">🎆</div>
 <p className="text-gray-600 text-sm text-center px-4">
 {currentMedia.title}
 </p>
 <p className="text-gray-400 text-xs mt-2">
 图片即将上传
 </p>
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
 <div className="flex items-center justify-between mb-2">
 <h3 className="text-lg font-bold text-gray-800">{currentMedia.title}</h3>
 <span className={`${themeColors.bg100} ${themeColors.text700} text-xs font-semibold px-2 py-1 rounded-full`}>
 {currentMedia.type === 'video' ? '🎥 视频' : '📸 图片'}
 </span>
 </div>
 {currentMedia.description && (
 <p className="text-gray-600 text-sm">{currentMedia.description}</p>
 )}
 </div>
 </div>
 </div>
 );
} 