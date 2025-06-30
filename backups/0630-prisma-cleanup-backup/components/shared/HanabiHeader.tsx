'use client';

import Link from 'next/link';
import { getRegionConfig } from '../../src/config/hanabi-detail-template';

interface HanabiHeaderProps {
  regionKey: string;
}

export default function HanabiHeader({ regionKey }: HanabiHeaderProps) {
  const regionConfig = getRegionConfig(regionKey);

  return (
    <header className="relative z-10 border-b border-gray-300 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href={"/" as any}
              className="flex items-center space-x-3 transition-opacity hover:opacity-80"
            >
              <div className="text-3xl">🎆</div>
              <h1 className="text-xl font-bold text-gray-900">
                关东地区旅游指南
              </h1>
            </Link>
          </div>

          <nav className="space-x-6 md:flex">
            <Link
              href={"/" as any}
              className="font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              首页
            </Link>
            <Link
              href={"/july" as any}
              className="font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              七月花火
            </Link>
            <Link
              href={regionConfig.breadcrumbPath as any}
              className="font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              {regionConfig.name}地区
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
