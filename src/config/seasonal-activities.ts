// 东京四季旅游活动配置
export const seasonalActivities = {
  spring: {
    name: "春季",
    theme: "樱花盛典",
    color: "pink",
    icon: "🌸",
    activities: [
      {
        type: "sakura",
        name: "樱花",
        description: "东京最美赏樱地点完全指南",
        months: ["march", "april", "may"],
        regions: ["central", "west", "east", "north", "south"]
      },
      {
        type: "festivals",
        name: "春季祭典",
        description: "春季传统节日和现代庆典",
        months: ["march", "april", "may"],
        regions: ["central", "west", "east", "north", "south"]
      }
    ]
  },
  
  summer: {
    name: "夏季",
    theme: "花火大会",
    color: "blue",
    icon: "🎆",
    activities: [
      {
        type: "hanabi",
        name: "花火大会",
        description: "夏日烟花节完全攻略（现有内容）",
        months: ["june", "july", "august", "september"],
        regions: ["tokyo", "kanagawa", "saitama", "chiba", "kitakanto", "koshinetsu"]
      },
      {
        type: "matsuri",
        name: "夏祭",
        description: "传统夏季祭典和庙会",
        months: ["june", "july", "august"],
        regions: ["central", "west", "east", "north", "south"]
      }
    ]
  },
  
  autumn: {
    name: "秋季",
    theme: "红叶狩猎",
    color: "orange",
    icon: "🍁",
    activities: [
      {
        type: "koyo",
        name: "红叶",
        description: "东京周边最佳赏枫地点和时间",
        months: ["october", "november", "december"],
        regions: ["central", "west", "mountains", "gardens", "temples"]
      },
      {
        type: "harvest",
        name: "秋季庆典",
        description: "收获节庆和文化活动",
        months: ["september", "october", "november"],
        regions: ["central", "west", "east", "north", "south"]
      }
    ]
  },
  
  winter: {
    name: "冬季",
    theme: "灯光秀",
    color: "indigo",
    icon: "✨",
    activities: [
      {
        type: "illumination",
        name: "灯光秀",
        description: "冬季点灯和圣诞灯饰完全指南",
        months: ["november", "december", "january", "february"],
        regions: ["shibuya", "roppongi", "marunouchi", "odaiba", "shinjuku"]
      },
      {
        type: "winter-events",
        name: "冬季活动",
        description: "新年庆典和冬季特别活动",
        months: ["december", "january", "february"],
        regions: ["central", "temples", "shrines", "parks"]
      }
    ]
  }
};

// 获取当前季节
export function getCurrentSeason(): keyof typeof seasonalActivities {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// 获取推荐活动
export function getRecommendedActivities() {
  const currentSeason = getCurrentSeason();
  return seasonalActivities[currentSeason];
} 