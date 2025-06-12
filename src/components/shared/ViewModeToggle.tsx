'use client';

import { REGIONAL_CONFIG } from '@/config/regional-template';

interface ViewModeToggleProps {
 viewMode: 'grid' | 'list';
 onViewModeChange: (mode: 'grid' | 'list') => void;
 className?: string;
}

export default function ViewModeToggle({ 
 viewMode, 
 onViewModeChange, 
 className = '' 
}: ViewModeToggleProps) {
 const buttons = [
 {
 mode: 'grid' as const,
 icon: '🔳',
 label: '网格视图',
 description: '以卡片形式显示'
 },
 {
 mode: 'list' as const, 
 icon: '📋',
 label: '列表视图',
 description: '以列表形式显示'
 }
 ];

 return (
 <div className={`flex items-center space-x-1 ${className}`} role="group" aria-label="视图模式切换">
 {buttons.map(({ mode, icon, label, description }) => (
 <button
 key={mode}
 onClick={() => onViewModeChange(mode)}
 className={`
 p-2 rounded-lg text-sm transition-all
 ${viewMode === mode 
 ? 'bg-blue-200/60 text-gray-700' 
 : 'hover:bg-white/50 text-gray-500'
 }
 ${REGIONAL_CONFIG.animations.button}
 `}
 title={`${label} - ${description}`}
 aria-label={label}
 aria-pressed={viewMode === mode}
 >
 <span className="text-base" aria-hidden="true">{icon}</span>
 </button>
 ))}
 </div>
 );
} 