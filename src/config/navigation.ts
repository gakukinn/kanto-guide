// 地区导航配置
export interface NavigationRegion {
 name: string;
 slug: string;
 href: string;
 emoji: string;
}

// 七月花火地区循环导航顺序
export const JULY_REGIONS: NavigationRegion[] = [
 { name: '东京花火', slug: 'tokyo', href: '/july/hanabi/tokyo', emoji: '🗼' },
 { name: '埼玉花火', slug: 'saitama', href: '/july/hanabi/saitama', emoji: '🌾' },
 { name: '千叶花火', slug: 'chiba', href: '/july/hanabi/chiba', emoji: '🌊' },
 { name: '神奈川花火', slug: 'kanagawa', href: '/july/hanabi/kanagawa', emoji: '⛩️' },
 { name: '北关东花火', slug: 'kitakanto', href: '/july/hanabi/kitakanto', emoji: '🏔️' },
 { name: '甲信越花火', slug: 'koshinetsu', href: '/july/hanabi/koshinetsu', emoji: '🗻' }
];

// 祭典地区循环导航顺序
export const MATSURI_REGIONS: NavigationRegion[] = [
 { name: '东京', slug: 'tokyo', href: '/tokyo/matsuri', emoji: '🗼' },
 { name: '埼玉', slug: 'saitama', href: '/saitama/matsuri', emoji: '🌾' },
 { name: '千叶', slug: 'chiba', href: '/chiba/matsuri', emoji: '🌊' },
 { name: '神奈川', slug: 'kanagawa', href: '/kanagawa/matsuri', emoji: '⛩️' },
 { name: '北关东', slug: 'kitakanto', href: '/kitakanto/matsuri', emoji: '🏔️' },
 { name: '甲信越', slug: 'koshinetsu', href: '/koshinetsu/matsuri', emoji: '🗻' }
];

// 获取花火地区的前后导航链接
export function getRegionNavigation(currentSlug: string) {
 const currentIndex = JULY_REGIONS.findIndex(region => region.slug === currentSlug);
 
 if (currentIndex === -1) {
 // 如果找不到当前地区，返回默认导航
 return {
 prev: { label: '← 返回', href: '/july/hanabi' },
 next: { label: '继续 →', href: '/july/hanabi' }
 };
 }
 
 // 循环导航：前一个和后一个
 const prevIndex = (currentIndex - 1 + JULY_REGIONS.length) % JULY_REGIONS.length;
 const nextIndex = (currentIndex + 1) % JULY_REGIONS.length;
 
 const prevRegion = JULY_REGIONS[prevIndex];
 const nextRegion = JULY_REGIONS[nextIndex];
 
 return {
 prev: { 
 label: `← ${prevRegion.name}`, 
 href: prevRegion.href 
 },
 next: { 
 label: `${nextRegion.name} →`, 
 href: nextRegion.href 
    }
  };
}

// 获取祭典地区的循环导航链接
export function getMatsuriRegionNavigation(currentSlug: string) {
 const currentIndex = MATSURI_REGIONS.findIndex(region => region.slug === currentSlug);
 
 if (currentIndex === -1) {
   // 如果找不到当前地区，返回默认导航
   return {
     prev: { name: '甲信越', href: '/koshinetsu/matsuri', emoji: '🗻' },
     current: { name: '东京', href: '/tokyo/matsuri', emoji: '🗼' },
     next: { name: '埼玉', href: '/saitama/matsuri', emoji: '🌾' }
   };
 }
 
 // 循环导航：前一个和后一个
 const prevIndex = (currentIndex - 1 + MATSURI_REGIONS.length) % MATSURI_REGIONS.length;
 const nextIndex = (currentIndex + 1) % MATSURI_REGIONS.length;
 
 const prevRegion = MATSURI_REGIONS[prevIndex];
 const nextRegion = MATSURI_REGIONS[nextIndex];
 const currentRegion = MATSURI_REGIONS[currentIndex];
 
 return {
   prev: { 
     name: prevRegion.name, 
     href: prevRegion.href,
     emoji: prevRegion.emoji
   },
   current: {
     name: currentRegion.name,
     href: currentRegion.href,
     emoji: currentRegion.emoji
   },
   next: { 
     name: nextRegion.name, 
     href: nextRegion.href,
     emoji: nextRegion.emoji
 }
 };
}

// 通用花火地区循环导航（适用于任何月份的花火页面）
export const HANABI_REGIONS: NavigationRegion[] = [
 { name: '东京', slug: 'tokyo', href: '/tokyo/hanabi', emoji: '🗼' },
 { name: '埼玉', slug: 'saitama', href: '/saitama/hanabi', emoji: '🌾' },
 { name: '千叶', slug: 'chiba', href: '/chiba/hanabi', emoji: '🌊' },
 { name: '神奈川', slug: 'kanagawa', href: '/kanagawa/hanabi', emoji: '⛩️' },
 { name: '北关东', slug: 'kitakanto', href: '/kitakanto/hanabi', emoji: '🏔️' },
 { name: '甲信越', slug: 'koshinetsu', href: '/koshinetsu/hanabi', emoji: '🗻' }
];

// 获取花火地区的循环导航链接（通用版本）
export function getHanabiRegionNavigation(currentSlug: string) {
 const currentIndex = HANABI_REGIONS.findIndex(region => region.slug === currentSlug);
 
 if (currentIndex === -1) {
   // 如果找不到当前地区，返回默认导航
   return {
     prev: { name: '甲信越', href: '/koshinetsu/hanabi', emoji: '🗻' },
     current: { name: '东京', href: '/tokyo/hanabi', emoji: '🗼' },
     next: { name: '埼玉', href: '/saitama/hanabi', emoji: '🌾' }
   };
 }
 
 // 循环导航：前一个和后一个
 const prevIndex = (currentIndex - 1 + HANABI_REGIONS.length) % HANABI_REGIONS.length;
 const nextIndex = (currentIndex + 1) % HANABI_REGIONS.length;
 
 const prevRegion = HANABI_REGIONS[prevIndex];
 const nextRegion = HANABI_REGIONS[nextIndex];
 const currentRegion = HANABI_REGIONS[currentIndex];
 
 return {
   prev: { 
     name: prevRegion.name, 
     href: prevRegion.href,
     emoji: prevRegion.emoji
   },
   current: {
     name: currentRegion.name,
     href: currentRegion.href,
     emoji: currentRegion.emoji
   },
   next: { 
     name: nextRegion.name, 
     href: nextRegion.href,
     emoji: nextRegion.emoji
   }
 };
} 