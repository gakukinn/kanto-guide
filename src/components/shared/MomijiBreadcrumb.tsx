'use client';

import Link from 'next/link';

interface MomijiBreadcrumbProps {
  regionKey: string;
  momijiName: string;
}

const getRegionName = (regionKey: string) => {
  const regionMap: { [key: string]: string } = {
    tokyo: '东京都',
    saitama: '埼玉县',
    chiba: '千叶县',
    kanagawa: '神奈川县',
    kitakanto: '北关东',
    koshinetsu: '甲信越',
  };
  return regionMap[regionKey] || '关东地区';
};

export default function MomijiBreadcrumb({
  regionKey,
  momijiName,
}: MomijiBreadcrumbProps) {
  const regionName = getRegionName(regionKey);

  return (
    <nav className="bg-gradient-to-r from-orange-50 to-red-100 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-orange-600 transition-colors hover:text-orange-800"
          >
            🏠 首页
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/momiji"
            className="text-orange-600 transition-colors hover:text-orange-800"
          >
            🍁 红叶狩
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/momiji/${regionKey}`}
            className="text-orange-600 transition-colors hover:text-orange-800"
          >
            {regionName}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-900">{momijiName}</span>
        </div>
      </div>
    </nav>
  );
}
