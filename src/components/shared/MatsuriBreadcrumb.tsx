'use client';

import Link from 'next/link';
import { getRegionConfig } from '../../config/hanabi-detail-template';

interface MatsuriBreadcrumbProps {
  regionKey: string;
  matsuriName: string;
}

export default function MatsuriBreadcrumb({
  regionKey,
  matsuriName,
}: MatsuriBreadcrumbProps) {
  const regionConfig = getRegionConfig(regionKey);

  // 地区图标映射
  const regionEmojis: { [key: string]: string } = {
    tokyo: '🗼',
    saitama: '🌸',
    chiba: '🌊',
    kanagawa: '🗻',
    kitakanto: '🌿',
    koshinetsu: '🏔️',
  };

  const regionEmoji = regionEmojis[regionKey] || '🎌';

  // 智能截断标题函数
  const truncateTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    
    // 优先保留重要关键词
    const keywords = ['祭', '神社', '寺', '公園', '川', '祭典'];
    const hasKeyword = keywords.some(keyword => title.includes(keyword));
    
    if (hasKeyword && title.length > maxLength) {
      // 如果包含关键词，尝试在关键词后截断
      for (const keyword of keywords) {
        const keywordIndex = title.indexOf(keyword);
        if (keywordIndex !== -1) {
          const endIndex = keywordIndex + keyword.length;
          if (endIndex <= maxLength) {
            return title.substring(0, endIndex) + '...';
          }
        }
      }
    }
    
    // 默认截断
    return title.substring(0, maxLength) + '...';
  };

  return (
    <nav className="pb-2 pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gray-600 overflow-hidden">
          <Link
            href={'/' as any}
            className="font-medium transition-colors hover:text-red-600 whitespace-nowrap"
          >
            ⛩️ 首页
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <Link
            href={`/${regionKey}` as any}
            className="font-medium transition-colors hover:text-red-600 whitespace-nowrap"
          >
            {regionEmoji} {regionConfig.name}活动
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <Link
            href={`/${regionKey}/matsuri` as any}
            className="font-medium transition-colors hover:text-red-600 whitespace-nowrap"
          >
            🏮 祭典
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <span 
            className="font-medium text-red-600 truncate min-w-0" 
            title={matsuriName}
          >
            {truncateTitle(matsuriName)}
          </span>
        </div>
      </div>
    </nav>
  );
} 