import { NextResponse } from 'next/server';

// 添加静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  const festivals = [
    {
      id: "shingen-ko-matsuri",
      name: "信玄公祭",
      japaneseName: "信玄公祭り",
      englishName: "Shingen-ko Festival",
      date: "2025年4月第一个周六",
      location: "山梨县甲府市中心区域",
      prefecture: "山梨县",
      scale: "大型",
      visitors: "约10万人",
      features: [
        "日本最大武田信玄主题祭典",
        "1500名武者游行队列",
        "战国时代历史重现"
      ],
      description: "日本最大规模的武田信玄主题祭典，1500名参与者身着战国武者装束进行盛大游行。重现甲斐之虎武田信玄的威风。",
      website: "https://shingen.info/",
      access: "JR甲府站南口徒歩5分",
      likes: 89
    },
    {
      id: "onbashira-matsuri",
      name: "诹访大社御柱祭",
      japaneseName: "諏訪大社御柱祭",
      englishName: "Suwa Onbashira Festival",
      date: "2026年寅年·申年（7年一度）",
      location: "长野县诹访市诹访大社",
      prefecture: "长野县",
      scale: "特大型",
      visitors: "约150万人",
      features: [
        "1200年历史最古老祭典",
        "御柱从山中拖拽神圣仪式",
        "日本三大奇祭之一"
      ],
      description: "1200年以上传承的日本最古老祭典之一。将巨大的御柱从山中拖拽到神社，是日本三大奇祭之一的神圣仪式。",
      website: "https://onbashira.jp/",
      access: "JR中央本线上诹访站徒歩10分",
      likes: 156
    },
    {
      id: "zenkoji-gokaicho",
      name: "善光寺御开帐",
      japaneseName: "善光寺御開帳",
      englishName: "Zenkoji Gokaicho",
      date: "2027年数字7年一度（4月-6月）",
      location: "长野县长野市善光寺",
      prefecture: "长野县",
      scale: "特大型",
      visitors: "约600万人",
      features: [
        "日本最大佛教祭典",
        "秘佛本尊御开帳仪式",
        "回向柱触摸参拜"
      ],
      description: "数字7年一度的大祭典，秘佛本尊阿弥陀如来进行御开帳。参拜者可通过回向柱与本尊结缘，是日本最重要的佛教祭典。",
      website: "https://www.zenkoji.jp/",
      access: "JR长野站善光寺口步行30分或巴士10分",
      likes: 234
    },
    {
      id: "nagaoka-hanabi",
      name: "长冈祭大花火大会",
      japaneseName: "長岡まつり大花火大会",
      englishName: "Nagaoka Fireworks Festival",
      date: "2025年8月2日・3日",
      location: "新潟县长冈市信浓川河川敷",
      prefecture: "新潟县",
      scale: "特大型",
      visitors: "约100万人",
      features: [
        "日本三大花火大会之一",
        "复兴祈愿凤凰花火",
        "和平祈愿主题花火"
      ],
      description: "日本三大花火大会之一，以战后复兴和平祈愿为主题。复兴祈愿凤凰花火搭配音乐，感动观众落泪的著名花火盛典。",
      website: "https://nagaokamatsuri.com/",
      access: "JR长冈站徒歩20分",
      likes: 412
    },
    {
      id: "niigata-matsuri",
      name: "新潟祭",
      japaneseName: "新潟まつり",
      englishName: "Niigata Festival",
      date: "2025年8月9日～11日",
      location: "新潟县新潟市中心区域",
      prefecture: "新潟县",
      scale: "大型",
      visitors: "约80万人",
      features: [
        "大民谣流万人齐舞",
        "住吉行列传统游行",
        "信浓川花火大会"
      ],
      description: "新潟市最大的夏日祭典，以大民谣流万人齐舞而闻名。住吉行列再现江户时代风情，夜晚还有信浓川花火大会。",
      website: "https://niigata-matsuri.com/",
      access: "JR新潟站万代口徒歩10分",
      likes: 167
    },
    {
      id: "kawaguchi-matsuri",
      name: "河口湖红叶祭",
      japaneseName: "河口湖もみじまつり",
      englishName: "Kawaguchi Autumn Leaves Festival",
      date: "2025年11月1日～23日",
      location: "山梨县富士河口湖町河口湖畔",
      prefecture: "山梨县",
      scale: "中型",
      visitors: "约15万人",
      features: [
        "富士山与红叶绝景",
        "河口湖畔梦幻夜间点灯",
        "秋季限定美食体验"
      ],
      description: "以富士山为背景的红叶祭典，河口湖畔的红叶与富士山形成绝美景色。夜间点灯更是如梦如幻，是秋季必访的祭典。",
      website: "https://www.fujisan.ne.jp/",
      access: "富士急行线河口湖站徒歩10分",
      likes: 98
    }
  ];

  return NextResponse.json(festivals);
} 