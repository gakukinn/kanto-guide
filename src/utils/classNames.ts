/**
 * 高性能类名拼接工具
 * 用于替代模板字符串拼接，提升渲染性能
 */

export type ClassValue = string | number | boolean | undefined | null;

/**
 * 组合多个类名，自动过滤空值
 * @param classes 类名数组
 * @returns 拼接后的类名字符串
 */
export const combineClasses = (...classes: ClassValue[]): string => {
  return classes
    .filter(
      (cls): cls is string | number =>
        cls !== null && cls !== undefined && cls !== false && cls !== ''
    )
    .join(' ');
};

/**
 * 条件类名组合
 * @param baseClasses 基础类名
 * @param conditionalClasses 条件类名对象
 * @returns 组合后的类名字符串
 */
export const conditionalClasses = (
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string => {
  const conditionals = Object.entries(conditionalClasses)
    .filter(([, condition]) => condition)
    .map(([className]) => className);

  return combineClasses(baseClasses, ...conditionals);
};

/**
 * 首页专用：地区卡片类名生成器
 * @param baseClass CSS模块基础类名
 * @param regionColor 地区颜色类名
 * @param borderColor 边框颜色类名
 * @returns 完整的卡片类名
 */
export const generateRegionCardClasses = (
  baseClass: string,
  regionColor: string,
  borderColor: string
): string => {
  return combineClasses(
    baseClass,
    'group',
    'relative',
    'block',
    'transform',
    'rounded-3xl',
    'bg-gradient-to-br',
    'p-6',
    'transition-all',
    'duration-500',
    regionColor,
    'hover:shadow-3xl',
    'cursor-pointer',
    'overflow-hidden',
    'border-2',
    borderColor,
    'shadow-2xl',
    'backdrop-blur-sm',
    'hover:-translate-y-2',
    'hover:scale-105',
    'hover:shadow-black/20'
  );
};
