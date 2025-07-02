interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  category: string;
}

// 地区颜色配置
export const getRegionArticleColors = (regionKey: string) => {
  const regionColors = {
    tokyo: {
      bgColor: 'from-red-50 to-rose-100',
      borderColor: 'border-red-200',
    },
    saitama: {
      bgColor: 'from-orange-50 to-amber-100',
      borderColor: 'border-orange-200',
    },
    chiba: {
      bgColor: 'from-sky-50 to-cyan-100',
      borderColor: 'border-sky-200',
    },
    kanagawa: {
      bgColor: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-200',
    },
    kitakanto: {
      bgColor: 'from-green-50 to-emerald-100',
      borderColor: 'border-green-200',
    },
    koshinetsu: {
      bgColor: 'from-purple-50 to-violet-100',
      borderColor: 'border-purple-200',
    },
  };

  return (
    regionColors[regionKey as keyof typeof regionColors] || regionColors.tokyo
  );
};

// 加载地区文章数据
export async function getRegionArticles(regionKey: string): Promise<Article[]> {
  try {
    const articlesModule = await import(`@/data/articles/${regionKey}-articles.json`);
    return articlesModule.default || [];
  } catch (error) {
    console.warn(`无法加载 ${regionKey} 地区的文章数据:`, error);
    return [];
  }
}

// 地区名称映射
export const getRegionDisplayName = (regionKey: string): string => {
  const regionNames = {
    tokyo: '东京都',
    saitama: '埼玉县',
    chiba: '千叶县',
    kanagawa: '神奈川',
    kitakanto: '北关东',
    koshinetsu: '甲信越',
  };

  return regionNames[regionKey as keyof typeof regionNames] || regionKey;
}; 