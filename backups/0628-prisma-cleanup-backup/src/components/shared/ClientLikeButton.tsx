'use client';
import { useState } from 'react';

interface ClientLikeButtonProps {
  eventId: string;
  initialLikes: number;
}

export default function ClientLikeButton({ eventId, initialLikes }: ClientLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      
      // 可选：保存到localStorage
      localStorage.setItem(`liked_${eventId}`, 'true');
      localStorage.setItem(`likes_${eventId}`, String(likes + 1));
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex transform items-center gap-2 rounded-full border px-4 py-2 shadow-lg transition-all duration-200 hover:scale-110 ${
        isLiked 
          ? 'border-red-300 bg-red-100 text-red-800' 
          : 'border-amber-200 bg-amber-50 text-gray-800 hover:bg-amber-100'
      }`}
      disabled={isLiked}
    >
      <span className="text-xl">{isLiked ? '💝' : '❤️'}</span>
      <span className="font-bold">{likes}</span>
      {isLiked && <span className="text-xs">已点赞</span>}
    </button>
  );
} 