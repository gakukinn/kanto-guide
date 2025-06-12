'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRegionConfig } from '../../config/hanabi-detail-template';

interface HanabiBreadcrumbProps {
 regionKey: string;
 hanabiName: string;
}

export default function HanabiBreadcrumb({ regionKey, hanabiName }: HanabiBreadcrumbProps) {
 const regionConfig = getRegionConfig(regionKey);

 return (
 <nav className="pt-4 pb-2">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center space-x-2 text-gray-600">
 <Link href="/" className="hover:text-red-600 transition-colors font-medium">🏠 关东旅游指南</Link>
 <span className="text-gray-400">›</span>
 <Link href={`/${regionKey}`} className="hover:text-red-600 transition-colors font-medium">🗼 {regionConfig.name}活动</Link>
 <span className="text-gray-400">›</span>
 <Link href={`/${regionKey}/hanabi`} className="hover:text-red-600 transition-colors font-medium">🎆 花火大会</Link>
 <span className="text-gray-400">›</span>
 <span className="text-red-600 font-medium">{hanabiName}</span>
 </div>
 </div>
 </nav>
 );
} 