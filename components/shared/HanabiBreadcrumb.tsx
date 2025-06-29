'use client';

import Link from 'next/link';
import { getRegionConfig } from '../../src/config/hanabi-detail-template';

interface HanabiBreadcrumbProps {
  regionKey: string;
  hanabiName: string;
}

export default function HanabiBreadcrumb({
  regionKey,
  hanabiName,
}: HanabiBreadcrumbProps) {
  const regionConfig = getRegionConfig(regionKey);

  return (
    <nav className="pb-2 pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gray-600 overflow-hidden">
          <Link
            href={'/' as any}
            className="font-medium transition-colors hover:text-red-600 whitespace-nowrap"
          >
            🏠 关东旅游指南
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <Link
            href={`/${regionKey}` as any}
            className="font-medium transition-colors hover:text-red-600 whitespace-nowrap"
          >
            🗼 {regionConfig.name}活动
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <Link
            href={`/${regionKey}/hanabi` as any}
            className="font-medium transition-colors hover:text-red-600 whitespace-nowrap"
          >
            🎆 花火大会
          </Link>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <span 
            className="font-medium text-red-600 truncate min-w-0" 
            title={hanabiName}
          >
            {hanabiName}
          </span>
        </div>
      </div>
    </nav>
  );
}
