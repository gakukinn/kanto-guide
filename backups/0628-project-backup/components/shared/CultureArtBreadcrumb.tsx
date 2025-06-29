'use client';

import Link from 'next/link';
import { getRegionConfig } from '../../src/config/culture-art-detail-template';

interface CultureArtBreadcrumbProps {
  regionKey: string;
  cultureArtName: string;
}

export default function CultureArtBreadcrumb({
  regionKey,
  cultureArtName,
}: CultureArtBreadcrumbProps) {
  const regionConfig = getRegionConfig(regionKey);

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-200 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3 text-sm">
          <Link
            href={"/" as any}
            className="text-purple-600 transition-colors duration-200 hover:text-purple-800"
          >
            首页
          </Link>
          <span className="text-gray-400">/</span>

          <Link
            href={regionConfig.listPagePath as any}
            className="text-purple-600 transition-colors duration-200 hover:text-purple-800"
          >
            {regionConfig.name}文化艺术活动
          </Link>
          <span className="text-gray-400">/</span>

          <span className="max-w-xs truncate font-medium text-gray-600 sm:max-w-sm md:max-w-md lg:max-w-lg">
            {cultureArtName}
          </span>
        </div>
      </div>
    </nav>
  );
}
