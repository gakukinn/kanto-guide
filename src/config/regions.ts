export interface RegionConfig {
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
  description: string;
  gridArea: string;
  icons: {
    hanabi: string;
    spots: string;
    events: string;
    food: string;
  };
}

export const regionConfig: Record<string, RegionConfig> = {
  koshinetsu: {
    name: '甲信越',
    emoji: '🗻',
    color: 'from-purple-50 to-violet-100',
    borderColor: 'border-white/60',
    description: '新潟长野山梨三县精华',
    gridArea: 'koshinetsu',
    icons: {
      hanabi: '🎆',
      spots: '🏔️',
      events: '🎿',
      food: '🍇',
    },
  },
  kitakanto: {
    name: '北关东',
    emoji: '♨️',
    color: 'from-green-50 to-emerald-100',
    borderColor: 'border-white/60',
    description: '群马栃木茨城三县精华',
    gridArea: 'kitakanto',
    icons: {
      hanabi: '🎆',
      spots: '♨️',
      events: '🏯',
      food: '🥟',
    },
  },
  saitama: {
    name: '埼玉县',
    emoji: '🌸',
    color: 'from-orange-50 to-amber-100',
    borderColor: 'border-white/60',
    description: '都市近郊的夏夜花火',
    gridArea: 'saitama',
    icons: {
      hanabi: '🎆',
      spots: '🏰',
      events: '🎭',
      food: '🍜',
    },
  },
  chiba: {
    name: '千叶县',
    emoji: '🌊',
    color: 'from-sky-50 to-cyan-100',
    borderColor: 'border-white/60',
    description: '太平洋海岸的海滨花火',
    gridArea: 'chiba',
    icons: {
      hanabi: '🎆',
      spots: '🏖️',
      events: '🎪',
      food: '🦐',
    },
  },
  tokyo: {
    name: '东京都',
    emoji: '🗼',
    color: 'from-red-50 to-rose-100',
    borderColor: 'border-white/60',
    description: '国际都市的璀璨花火',
    gridArea: 'tokyo',
    icons: {
      hanabi: '🎆',
      spots: '🗼',
      events: '🎭',
      food: '🍣',
    },
  },
  kanagawa: {
    name: '神奈川',
    emoji: '⛵',
    color: 'from-blue-100 to-blue-200',
    borderColor: 'border-white/60',
    description: '湘南海岸的夏日花火',
    gridArea: 'kanagawa',
    icons: {
      hanabi: '🎆',
      spots: '⛩️',
      events: '🌺',
      food: '��',
    },
  },
};
