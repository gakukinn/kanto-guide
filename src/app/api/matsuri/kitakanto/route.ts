import { NextResponse } from 'next/server';

// 添加静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  const festivals = [
    {
      id: "kiryu-yagibushi",
      name: "桐生八木节祭",
      japaneseName: "桐生八木節まつり",
      englishName: "Kiryu Yagibushi Festival",
      date: "2025年8月第一个周五～周日",
      location: "群马县桐生市中心区域",
      prefecture: "群马县",
      scale: "大型",
      visitors: "约50万人",
      features: [
        "群马县最大夏日祭典",
        "超级参加型民众舞蹈",
        "传统八木节音乐与舞蹈"
      ],
      description: "群马县内规模最大的夏日祭典，以热情的八木节舞蹈而闻名。市民围绕高台载歌载舞，游客也可自由参与。",
      website: "http://kiryu-walker.net/kiryuyagibusifes/",
      access: "JR两毛线桐生站、东武桐生线新桐生站",
      likes: 142
    },
    {
      id: "nikko-toshogu-reitaisai",
      name: "日光东照宫例大祭",
      japaneseName: "日光東照宮例大祭",
      englishName: "Nikko Toshogu Grand Festival",
      date: "2025年5月17日～18日、10月16日～17日",
      location: "栃木县日光市山内",
      prefecture: "栃木县",
      scale: "大型",
      visitors: "约15万人",
      features: [
        "德川家康公神灵祭典",
        "千人武者行列游行",
        "神事流镝马射箭仪式"
      ],
      description: "再现德川家康神灵改葬时壮观行列的庄严祭典。包含流镝马神事和千人武者行列等传统仪式。",
      website: "https://toshogu.jp/saiten/",
      access: "JR日光线日光站、东武日光线东武日光站",
      likes: 89
    },
    {
      id: "mito-komon-matsuri",
      name: "水戸黄门祭",
      japaneseName: "水戸黄門まつり",
      englishName: "Mito Komon Festival",
      date: "2025年8月2日～3日",
      location: "茨城县水戸市国道50号",
      prefecture: "茨城县",
      scale: "大型",
      visitors: "约90万人",
      features: [
        "水戸黄门主题祭典",
        "水戸偕楽園花火大会",
        "黄门神轿与山车游行"
      ],
      description: "以江户时代水戸藩主德川光圀（水戸黄门）为主题的夏季祭典，包含盛大的花火大会。",
      website: "https://mitokoumon.com/koumon/",
      access: "JR常磐线水戸站",
      likes: 178
    },
    {
      id: "takasaki-matsuri",
      name: "高崎祭",
      japaneseName: "高崎まつり",
      englishName: "Takasaki Festival",
      date: "2025年8月26日～27日",
      location: "群马县高崎市中心区域",
      prefecture: "群马县",
      scale: "大型",
      visitors: "约90万人",
      features: [
        "群马县最大规模夏祭",
        "市民总参加型祭典",
        "山车巡行与神轿游行"
      ],
      description: "由市民创立并发展起来的市民总参加型祭典，包含山车巡行、神轿游行和大型花火大会。",
      website: "https://www.takasaki-matsuri.jp/",
      access: "JR高崎线高崎站",
      likes: 156
    },
    {
      id: "mito-ume-matsuri",
      name: "水戸梅祭",
      japaneseName: "水戸の梅まつり",
      englishName: "Mito Plum Festival",
      date: "2025年2月11日～3月20日",
      location: "茨城县水戸市偕楽園",
      prefecture: "茨城县",
      scale: "中型",
      visitors: "约40万人",
      features: [
        "日本三名园梅花祭",
        "120年历史传统祭典",
        "100品种3000本梅花"
      ],
      description: "在日本三名园之一的偕楽園举办的传统梅花祭，历史悠久，是茨城县春季的代表性活动。",
      website: "https://mitokoumon.com/ume/",
      access: "JR常磐线水戸站",
      likes: 67
    }
  ];

  return NextResponse.json(festivals);
} 