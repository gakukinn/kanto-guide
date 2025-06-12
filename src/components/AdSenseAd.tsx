'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  adSize?: 'responsive' | 'fixed';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseAd({ 
  adSlot, 
  adFormat = 'auto', 
  adSize = 'responsive',
  className = ''
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // 确保 adsbygoogle 已加载
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <div className="text-center text-xs text-gray-400 mb-2">广告</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={adSize === 'responsive' ? 'true' : 'false'}
      />
    </div>
  );
}

// 预设的广告位组件
export function HeaderAd() {
  return (
    <AdSenseAd 
      adSlot="1234567890"
      adFormat="horizontal"
      className="mb-6"
    />
  );
}

export function SidebarAd() {
  return (
    <AdSenseAd 
      adSlot="1234567891"
      adFormat="rectangle"
      className="mb-4"
    />
  );
}

export function ContentAd() {
  return (
    <AdSenseAd 
      adSlot="1234567892"
      adFormat="auto"
      className="my-6"
    />
  );
}

export function FooterAd() {
  return (
    <AdSenseAd 
      adSlot="1234567893"
      adFormat="horizontal"
      className="mt-6"
    />
  );
} 