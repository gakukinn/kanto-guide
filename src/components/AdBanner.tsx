// 广告横幅组件
interface AdBannerProps {
  size: 'banner' | 'rectangle' | 'skyscraper';
  position: 'header' | 'content' | 'sidebar';
}

export default function AdBanner({ size, position }: AdBannerProps) {
  // 广告尺寸配置
  const adSizes = {
    banner: 'w-full h-24', // 728x90
    rectangle: 'w-80 h-64', // 300x250
    skyscraper: 'w-40 h-96', // 160x600
  };

  return (
    <div
      className={`${adSizes[size]} flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100`}
    >
      <div className="text-sm text-gray-500">
        {/* 这里将来放置Google AdSense代码 */}
        <p>广告位</p>
        <p className="text-xs">({size})</p>
      </div>
    </div>
  );
}
