import { NextResponse } from 'next/server';

// 添加静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  const saitamaMatsuriData = {
    metadata: {
      lastUpdated: "2025-01-13",
      dataSource: "omaturilink.com, 川越まつり公式サイト, 秩父観光協会官方网站",
      verified: true,
      region: "saitama"
    },
    events: [
      {
        id: "kawagoe-matsuri-2025",
        name: "川越祭",
        japaneseName: "川越まつり",
        englishName: "Kawagoe Festival",
        date: "2025-10-18",
        endDate: "2025-10-19",
        location: "川越市·川越一番街周边",
        highlights: ["江户山车巡游", "传统囃子表演", "历史街区游行"],
        likes: 147,
        website: "https://www.kawagoematsuri.jp/",
        description: "江户时代传承至今的川越最大祭典，华丽山车在小江戸街道巡游，重现江户风情。"
      },
      {
        id: "chichibu-yomatsuri-2025",
        name: "秩父夜祭",
        japaneseName: "秩父夜祭",
        englishName: "Chichibu Night Festival",
        date: "2025-12-02",
        endDate: "2025-12-03",
        location: "秩父市·秩父神社周边",
        highlights: ["UNESCO世界遗产", "夜间花火大会", "壮观山车巡游"],
        likes: 128,
        website: "https://www.chichibuji.gr.jp/event/yomatsuri/",
        description: "日本三大曳山祭之一，壮观的山车与绚烂花火共同演绎冬夜传奇。"
      },
      {
        id: "kawagoe-hyakumando-2025",
        name: "川越百万灯夏祭",
        japaneseName: "川越百万灯夏まつり",
        englishName: "Kawagoe Million Lanterns Summer Festival",
        date: "2025-07-26",
        location: "川越市·本川越站周边",
        highlights: ["百万灯笼装饰", "夏季祭典氛围", "传统表演"],
        likes: 56,
        website: "https://www.kawagoe.or.jp/natsumatsuri/",
        description: "夏夜点亮百万灯笼的浪漫祭典，川越街道洋溢夏日祭典的热闹气氛。"
      },
      {
        id: "kama-no-fuchi-midori-2025",
        name: "釜之渊新绿祭",
        japaneseName: "釜の淵新緑祭",
        englishName: "Kama no Fuchi Green Festival",
        date: "2025-05-10",
        endDate: "2025-05-11",
        location: "青梅市·釜之渊公园",
        highlights: ["生涯学习体验", "新绿季节庆典", "传统文化展示"],
        likes: 32,
        website: "https://www.city.ome.tokyo.jp/",
        description: "新绿季节举办的文化教育祭典，体验传统文化与自然美景。"
      },
      {
        id: "soka-spring-harvest-2025",
        name: "草加春季收获祭",
        japaneseName: "春の収穫祭",
        englishName: "Soka Spring Harvest Festival",
        date: "2025-04-25",
        endDate: "2025-04-27",
        location: "草加市·松原团地纪念公园",
        highlights: ["地域特产展示", "国际交流活动", "手工制品市场"],
        likes: 21,
        website: "https://hajimari.co.jp/",
        description: "融合地域特色与国际文化的春季祭典，展示草加地区多元文化魅力。"
      }
    ]
  };

  return NextResponse.json(saitamaMatsuriData.events);
} 