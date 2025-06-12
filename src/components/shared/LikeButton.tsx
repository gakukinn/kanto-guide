'use client';

import { useState, useEffect } from 'react';
import { REGIONAL_CONFIG } from '@/config/regional-template';

interface LikeButtonProps {
 eventId: string;
 initialLikes?: number;
 onLike?: (eventId: string) => void;
 className?: string;
 size?: 'sm' | 'md' | 'lg';
}

export default function LikeButton({ 
 eventId, 
 initialLikes = 0, 
 onLike,
 className = '',
 size = 'md'
}: LikeButtonProps) {
 const [likes, setLikes] = useState(initialLikes);
 const [isAnimating, setIsAnimating] = useState(false);

 // 使用传入的初始值，不从localStorage读取（因为父组件已经管理了）
 useEffect(() => {
 setLikes(initialLikes);
 }, [initialLikes]);

 // 处理点赞
 const handleLike = () => {
 setIsAnimating(true);

 // 回调通知父组件
 onLike?.(eventId);

 // 动画结束后重置状态
 setTimeout(() => setIsAnimating(false), 200);
 };

 // 尺寸配置
 const sizeConfig = {
 sm: {
 container: 'px-2 py-2 min-w-[36px] min-h-[36px]',
 icon: 'text-base',
 text: 'text-xs'
 },
 md: {
 container: 'px-3 py-3 min-w-[44px] min-h-[44px]',
 icon: 'text-lg', 
 text: 'text-sm'
 },
 lg: {
 container: 'px-4 py-4 min-w-[52px] min-h-[52px]',
 icon: 'text-xl',
 text: 'text-base'
 }
 };

 const config = sizeConfig[size];

 return (
 <button 
 className={`
 ${config.container}
 bg-red-50 border border-red-200 text-gray-600 rounded-lg 
 ${REGIONAL_CONFIG.animations.like}
 ${isAnimating ? 'scale-110' : ''}
 flex items-center justify-center space-x-1
 ${className}
 `}
 title={`点赞 ${likes} 次 (点击增加)`}
 onClick={handleLike}
 aria-label={`点赞，当前 ${likes} 次`}
 >
 <span className={`text-red-500 ${config.icon} ${isAnimating ? 'animate-pulse' : ''}`}>
 ❤️
 </span>
 <span className={`${config.text} font-bold text-red-600`}>
 {likes}
 </span>
 </button>
 );
} 