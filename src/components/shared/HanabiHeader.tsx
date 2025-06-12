'use client';

import Link from 'next/link';
import { getRegionConfig } from '../../config/hanabi-detail-template';

interface HanabiHeaderProps {
 regionKey: string;
}

export default function HanabiHeader({ regionKey }: HanabiHeaderProps) {
 const regionConfig = getRegionConfig(regionKey);

 return (
 <header className="relative z-10 bg-white shadow-sm border-b border-gray-300">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 <div className="flex items-center space-x-3">
 <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
 <div className="text-3xl">🎆</div>
 <h1 className="text-xl font-bold text-gray-900">关东地区旅游指南</h1>
 </Link>
 </div>
 <nav className="hidden md:flex space-x-6">
 <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">首页</Link>
 <Link href="/july" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">七月花火</Link>
 <Link href={regionConfig.breadcrumbPath} className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
 {regionConfig.name}地区
 </Link>
 </nav>
 </div>
 </div>
 </header>
 );
} 