'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRegionConfig } from '../../config/hanabi-detail-template';

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
        <div className="flex items-center space-x-2 text-gray-600">
          <Link
            href="/"
            className="font-medium transition-colors hover:text-red-600"
          >
            🏠 关东旅游指南
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/${regionKey}`}
            className="font-medium transition-colors hover:text-red-600"
          >
            🗼 {regionConfig.name}活动
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/${regionKey}/hanabi`}
            className="font-medium transition-colors hover:text-red-600"
          >
            🎆 花火大会
          </Link>
          <span className="text-gray-400">›</span>
          <span className="font-medium text-red-600">{hanabiName}</span>
        </div>
      </div>
    </nav>
  );
}
