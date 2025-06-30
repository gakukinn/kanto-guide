'use client';

import Link from 'next/link';
import { getRegionConfig } from '../../config/hanabi-detail-template';

interface CultureArtBreadcrumbProps {
  regionKey: string;
  cultureArtName: string;
}

export default function CultureArtBreadcrumb({
  regionKey,
  cultureArtName,
}: CultureArtBreadcrumbProps) {
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
    const keywords = ['美术馆', '博物馆', '艺术', '文化', '展览', '画廊', '剧场', '音乐厅'];
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
            className="font-medium transition-colors hover:text-green-600 whitespace-nowrap"
          >
            ⛩️ 首页
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <Link
            href={`/${regionKey}` as any}
            className="font-medium transition-colors hover:text-green-600 whitespace-nowrap"
          >
            {regionEmoji} {regionConfig.name}活动
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <Link
            href={`/${regionKey}/culture` as any}
            className="font-medium transition-colors hover:text-green-600 whitespace-nowrap"
          >
            🎨 文化艺术
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <span 
            className="font-medium text-green-600 truncate min-w-0" 
            title={cultureArtName}
          >
            {truncateTitle(cultureArtName)}
          </span>
        </div>
      </div>
    </nav>
  );
}
