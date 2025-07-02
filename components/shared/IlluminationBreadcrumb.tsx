import Link from 'next/link';

interface IlluminationBreadcrumbProps {
  regionKey: string;
  illuminationName: string;
}

export default function IlluminationBreadcrumb({
  regionKey,
  illuminationName,
}: IlluminationBreadcrumbProps) {
  const regionNames: { [key: string]: string } = {
    tokyo: '东京都',
    saitama: '埼玉县',
    chiba: '千叶县',
    kanagawa: '神奈川',
    kitakanto: '北关东',
    koshinetsu: '甲信越',
  };

  const regionEmojis: { [key: string]: string } = {
    tokyo: '🗼',
    saitama: '🌸',
    chiba: '🌊',
    kanagawa: '🗻',
    kitakanto: '🌿',
    koshinetsu: '🏔️',
  };

  const regionName = regionNames[regionKey] || '关东地区';
  const regionEmoji = regionEmojis[regionKey] || '🎌';

  return (
    <nav className="pb-2 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gray-600">
          <Link
            href={'/' as any}
            className="font-medium transition-colors hover:text-purple-600"
          >
            🏠 首页
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/${regionKey}` as any}
            className="font-medium transition-colors hover:text-purple-600"
          >
            {regionEmoji} {regionName}活动
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/${regionKey}/illumination` as any}
            className="font-medium transition-colors hover:text-purple-600"
          >
            ✨ 灯光秀
          </Link>
          <span className="text-gray-400">›</span>
          <span className="font-medium text-purple-600">
            {illuminationName}
          </span>
        </div>
      </div>
    </nav>
  );
}
