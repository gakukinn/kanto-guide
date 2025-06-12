// 地区模板统一配置文件
export const REGIONAL_CONFIG = {
 // 卡片循环颜色系统 - 与第3层ActivityTemplate保持一致
 cardColors: [
 'from-rose-100 to-white', // 粉红到白色
 'from-white to-blue-100', // 白色到蓝色 
 'from-blue-100 to-blue-200' // 蓝色渐变
 ],

 // 响应式布局配置
 layouts: {
 mobile: { cols: 1, gap: 'gap-4' },
 tablet: { cols: 2, gap: 'gap-4 md:gap-5' },
 desktop: { cols: 3, gap: 'gap-4 md:gap-5' }
 },

 // 人群等级配置
 crowdLevels: {
 high: {
 icon: '🔥',
 text: '拥挤',
 color: 'bg-orange-200'
 },
 medium: {
 icon: '🟡',
 text: '适中', 
 color: 'bg-yellow-200'
 },
 low: {
 icon: '🟢',
 text: '宽松',
 color: 'bg-green-200'
 }
 },

 // 数据格式验证规则
 validation: {
 visitors: {
 patterns: [/^\d+万$/, /^未公布$/, /^\d+人$/],
 examples: ['77万', '未公布', '500人']
 },
 fireworks: {
 patterns: [/^\d+发$/, /^非公开$/, /^约\d+发$/],
 examples: ['4万2000发', '非公开', '约9000发']
 }
 },

 // 动画配置
 animations: {
 card: 'hover:shadow-lg hover:border-pink-200 transition-all duration-300',
 button: 'active:scale-95 transition-all',
 like: 'hover:bg-red-100 active:scale-95 transition-all'
 }
};

// 地区特色图标配置
export const REGION_ICONS = {
 saitama: '🌽', // 农业特色
 tokyo: '🗼', // 都市特色
 kanagawa: '🌊', // 海洋特色
 chiba: '🌸', // 樱花特色
 gunma: '🏔️', // 山岳特色
 tochigi: '🍓', // 草莓特色
 ibaraki: '🥬' // 蔬菜特色
};

// 主题色彩系统
export const THEME_COLORS = {
 saitama: {
 primary: 'blue',
 accent: 'rose',
 gradient: 'from-rose-100/60 to-white/50'
 },
 tokyo: {
 primary: 'purple', 
 accent: 'pink',
 gradient: 'from-purple-100/60 to-white/50'
 },
 kanagawa: {
 primary: 'blue',
 accent: 'cyan', 
 gradient: 'from-cyan-100/60 to-white/50'
 }
}; 