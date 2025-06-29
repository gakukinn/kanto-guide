/**
 * 神奈川县花火大会打上数排行榜数据
 * @source WalkerPlus官方数据 https://hanabi.walkerplus.com/launch/ar0314/
 * @date 2025年6月15日更新
 * @description 按花火数量排序的神奈川县花火大会完整列表（35个大会）
 */

export interface KanagawaHanabiLaunchRanking {
  rank: number;
  name: string;
  fireworksCount: string;
  expectedVisitors: string;
  date: string;
  location: string;
  description: string;
  walkerPlusUrl: string;

  // 内部参考字段（日文源数据）
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };
}

export const kanagawaHanabiLaunchRanking: KanagawaHanabiLaunchRanking[] = [
  // 第1页（1-10位）
  {
    rank: 1,
    name: '港未来智能节 2025',
    _sourceData: {
    japaneseName: '港未来智能节 2025'
  },
    fireworksCount: '約2万発',
    expectedVisitors: '約2万人',
    date: '2025年8月4日(月)',
    location:
      '神奈川県横浜市中区/港未来21地区 臨海公园、杯面博物馆公园、横浜锤头9号岸壁公园、耐震泊位他',
    description: '港未来的夜空将彩大規模花火节庆',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e356531/',
  },
  {
    rank: 2,
    name: '第36回 小田原酒匂川花火大会',
    _sourceData: {

      japaneseName: '第36回 小田原酒匂川花火大会',
    },
    fireworksCount: '約1万発',
    expectedVisitors: '約25万人',
    date: '2025年8月2日(土)',
    location: '神奈川県小田原市/酒匂川体育広場',
    description: '酒匂川河川敷在举办进行大規模花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00244/',
  },
  {
    rank: 3,
    name: '市制70周年記念 第79回 厚木鮎祭典',
    _sourceData: {

      japaneseName: '市制70周年記念 第79回 厚木鮎祭典',
    },
    fireworksCount: '約1万発',
    expectedVisitors: '約28万人',
    date: '2025年8月2日(土)',
    location: '神奈川県厚木市/相模川河川敷(三川合流点)',
    description: '厚木市制70周年将記念了特別的花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00243/',
  },
  {
    rank: 4,
    name: '第77回 鎌倉花火大会',
    _sourceData: {

      japaneseName: '第77回 鎌倉花火大会',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約18万人',
    date: '2025年7月23日(水)',
    location: '神奈川県鎌倉市/由比浜海岸、材木座海岸',
    description: '歴史鎌倉的海岸在举办进行伝統的的花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00875/',
  },
  {
    rank: 5,
    name: '第36回 相模原納涼花火大会',
    _sourceData: {

      japaneseName: '第36回 相模原納涼花火大会',
    },
    fireworksCount: '約8000発',
    expectedVisitors: '約42万人',
    date: '2025年8月16日(土)',
    location: '神奈川県相模原市中央区/相模川高田橋上流',
    description: '相模川河川敷在举办进行大規模納涼花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00246/',
  },
  {
    rank: 6,
    name: '第48回 藤沢市民祭典',
    _sourceData: {

      japaneseName: '第48回 藤沢市民祭典',
    },
    fireworksCount: '約3000発',
    expectedVisitors: '約25万人',
    date: '2025年9月28日(日)',
    location: '神奈川県藤沢市/秋葉台文化体育館周辺',
    description: '藤沢市民由于手作的温花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00248/',
  },
  {
    rank: 7,
    name: '第49回 相模川芸術花火大会',
    _sourceData: {

      japaneseName: '第49回 相模川芸術花火大会',
    },
    fireworksCount: '約3000発',
    expectedVisitors: '約3万人',
    date: '2025年8月23日(土)',
    location: '神奈川県平塚市/相模川河川敷',
    description: '芸術性的高花火的相模川将彩',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00247/',
  },
  {
    rank: 8,
    name: '第40回 了夏祭典',
    _sourceData: {

      japaneseName: '第40回 了夏祭典',
    },
    fireworksCount: '約3000発',
    expectedVisitors: '約3万5000人',
    date: '2025年8月15日(金)',
    location: '神奈川県足柄上郡山北町/山北町役場周辺',
    description: '山北町的夏将彩地域密着型花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00249/',
  },
  {
    rank: 9,
    name: '第38回 座間市祭典',
    _sourceData: {

      japaneseName: '第38回 座間市祭典',
    },
    fireworksCount: '約3000発',
    expectedVisitors: '約55万人',
    date: '2025年8月16日(土)',
    location: '神奈川県座間市/座間市立相模的丘仲小道周辺',
    description: '畑和花火的合作',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00250/',
  },
  {
    rank: 10,
    name: '第77回 川崎市制記念多摩川花火大会',
    _sourceData: {

      japaneseName: '第77回 川崎市制記念多摩川花火大会',
    },
    fireworksCount: '約6000発',
    expectedVisitors: '約12万人',
    date: '2025年8月17日(日)',
    location: '神奈川県川崎市高津区/多摩川河川敷',
    description: '川崎市制将記念了多摩川的花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00251/',
  },

  // 第2页（11-20位）
  {
    rank: 11,
    name: '第40回 南海滩茅崎花火大会',
    _sourceData: {

      japaneseName: '第40回 南海滩茅崎花火大会',
    },
    fireworksCount: '約3000発',
    expectedVisitors: '約8万人',
    date: '2025年8月9日(土)',
    location: '神奈川県茅崎市/南海滩茅崎',
    description: '湘南的海将背景在了夏的風物詩',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00252/',
  },
  {
    rank: 12,
    name: '第74回 按針祭海的花火大会',
    _sourceData: {

      japaneseName: '第74回 按針祭海的花火大会',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約10万人',
    date: '2025年8月10日(日)',
    location: '神奈川県伊東市/伊東海岸',
    description: '按針祭的终章将飾海上花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00253/',
  },
  {
    rank: 13,
    name: '第39回 神奈川新聞花火大会',
    _sourceData: {

      japaneseName: '第39回 神奈川新聞花火大会',
    },
    fireworksCount: '約6000発',
    expectedVisitors: '約19万5000人',
    date: '2025年8月5日(火)',
    location: '神奈川県横浜市西区/港未来21',
    description: '神奈川新聞主催的大規模花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00254/',
  },
  {
    rank: 14,
    name: '第40回 横滨港祭典',
    _sourceData: {

      japaneseName: '第40回 横滨港祭典',
    },
    fireworksCount: '約6000発',
    expectedVisitors: '約35万人',
    date: '2025年7月19日(土)',
    location: '神奈川県横浜市中区/横浜港',
    description: '横浜港将舞台在了港町的花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00255/',
  },
  {
    rank: 15,
    name: '第29回 大磯町観光協会納涼花火大会',
    _sourceData: {

      japaneseName: '第29回 大磯町観光協会納涼花火大会',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約3万人',
    date: '2025年8月16日(土)',
    location: '神奈川県中郡大磯町/大磯海岸',
    description: '大磯海岸的夏夜将彩納涼花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00256/',
  },
  {
    rank: 16,
    name: '第40回 逗子海岸花火大会',
    _sourceData: {

      japaneseName: '第40回 逗子海岸花火大会',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約5万人',
    date: '2025年8月23日(土)',
    location: '神奈川県逗子市/逗子海岸',
    description: '逗子海岸的美夜景和花火的',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00257/',
  },
  {
    rank: 17,
    name: '第40回 葉山海岸花火大会',
    _sourceData: {

      japaneseName: '第40回 葉山海岸花火大会',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約3万人',
    date: '2025年8月30日(土)',
    location: '神奈川県三浦郡葉山町/葉山海岸',
    description: '葉山的上品的海岸在举办进行花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00258/',
  },
  {
    rank: 18,
    name: '第40回 江島神社奉納花火大会',
    _sourceData: {

      japaneseName: '第40回 江島神社奉納花火大会',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約10万人',
    date: '2025年8月26日(火)',
    location: '神奈川県藤沢市/江島神社周辺',
    description: '江島神社向奉納作为行神聖的花火大会',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00259/',
  },
  {
    rank: 19,
    name: '第40回 平塚七夕祭典',
    _sourceData: {

      japaneseName: '第40回 平塚七夕祭典',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約150万人',
    date: '2025年7月4日(金)～6日(日)',
    location: '神奈川県平塚市/平塚市街地',
    description: '日本三大七夕祭典的一、终章的花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00260/',
  },
  {
    rank: 20,
    name: '第40回 秦野了如果这祭',
    _sourceData: {

      japaneseName: '第40回 秦野了如果这祭',
    },
    fireworksCount: '約2500発',
    expectedVisitors: '約23万7000人',
    date: '2025年9月28日(日)29日(月)',
    location: '神奈川県秦野市/秦野市街地',
    description: '秦野市的伝統的的祭的终章花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00261/',
  },

  // 第3页（21-30位）
  {
    rank: 21,
    name: '湯河原温泉海上花火大会',
    _sourceData: {

      japaneseName: '湯河原温泉海上花火大会',
    },
    fireworksCount: '約2000発',
    expectedVisitors: '約1万3000人',
    date: '2025年8月3日(日)',
    location: '神奈川県足柄下郡湯河原町/湯河原町 吉浜海岸沖合',
    description: '海将背在夏的夜空将在彩',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00906/',
  },
  {
    rank: 22,
    name: '三浦市市制施行70周年記念 第45回 三浦海岸納涼祭典花火大会',
    _sourceData: {

      japaneseName:
        '三浦市市制施行70周年記念 第45回 三浦海岸納涼祭典花火大会',
    },
    fireworksCount: '約2000発',
    expectedVisitors: '約6万5000人',
    date: '2025年8月7日(木)',
    location: '神奈川県三浦市/三浦海岸',
    description: '海面将美染「水中孔雀」',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00279/',
  },
  {
    rank: 23,
    name: '箱根強羅温泉「大文字焼」',
    _sourceData: {

      japaneseName: '箱根強羅温泉「大文字焼」',
    },
    fireworksCount: '2000発',
    expectedVisitors: '2万人',
    date: '2025年8月17日(日)',
    location: '神奈川県足柄下郡箱根町/強羅温泉全域',
    description: '大文字焼和仕掛花火的見事的合作',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00877/',
  },
  {
    rank: 24,
    name: '第40回丹沢湖花火大会【2025年举办无】',
    _sourceData: {

      japaneseName: '第40回丹沢湖花火大会【2025年開催的】',
    },
    fireworksCount: '約2000発',
    expectedVisitors: '約3万人',
    date: '2025年中止',
    location: '神奈川県足柄上郡山北町/丹沢湖駐車場',
    description: '湖周辺的大自然的中在水中花火等的打上',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00265/',
  },
  {
    rank: 25,
    name: '是芸術花火大会',
    _sourceData: {

      japaneseName: '是芸術花火大会',
    },
    fireworksCount: '約2000発',
    expectedVisitors: '約2万人',
    date: '2025年5月17日(土)',
    location: '神奈川県伊勢原市/伊勢原市総合運動公園',
    description: '音和光的響合心温市民花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e544913/',
  },
  {
    rank: 26,
    name: '藤泽江的島花火大会',
    _sourceData: {

      japaneseName: '藤泽江的島花火大会',
    },
    fireworksCount: '1800発',
    expectedVisitors: '2万8000人',
    date: '2024年10月19日(土)',
    location: '神奈川県藤沢市/片瀬海岸西浜',
    description: '秋的夜空将彩、30分間的打上花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00859/',
  },
  {
    rank: 27,
    name: '三崎城島花火大会',
    _sourceData: {

      japaneseName: '三崎城島花火大会',
    },
    fireworksCount: '1200発',
    expectedVisitors: '2万人',
    date: '2024年10月20日(日)',
    location: '神奈川県三浦市/',
    description: '漁港、三崎从眺大輪的花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e357293/',
  },
  {
    rank: 28,
    name: '第24回 足柄花火大会',
    _sourceData: {

      japaneseName: '第24回 足柄花火大会',
    },
    fireworksCount: '1000発',
    expectedVisitors: '5万5000人',
    date: '2025年8月23日(土)',
    location: '神奈川県足柄上郡松田町/酒匂川町民親水広場、開成水辺体育公園',
    description: '松田町和開成町的合同在举办！河川敷从花火将楽',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00919/',
  },
  {
    rank: 29,
    name: '第77回秦野了如果这祭',
    _sourceData: {

      japaneseName: '第77回秦野了如果这祭',
    },
    fireworksCount: '約1000発',
    expectedVisitors: '23万7000人',
    date: '2024年9月29日(日)',
    location: '神奈川県秦野市/権現山山頂其他',
    description: '伝統祭的终章将花火在締来',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e356551/',
  },
  {
    rank: 30,
    name: '寒川的的花火',
    _sourceData: {

      japaneseName: '寒川的的花火',
    },
    fireworksCount: '600発',
    expectedVisitors: '未公表',
    date: '2024年11月30日(土)',
    location: '神奈川県高座郡寒川町/神奈川県立寒川高等学校',
    description: '町民的力将合着打上花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e08711/',
  },

  // 第4页（31-35位）
  {
    rank: 31,
    name: '横须贺2025',
    _sourceData: {

      japaneseName: '横须贺2025',
    },
    fireworksCount: '約500発',
    expectedVisitors: '2万人',
    date: '2024年12月31日(火)～2025年1月1日(祝)',
    location: '神奈川県横須賀市维尔尼公园',
    description: '横須賀的在是的艦船和新年的花火在毎年恒例的年越',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e54026/',
  },
  {
    rank: 32,
    name: '横浜夜晚花火2025',
    _sourceData: {

      japaneseName: '横浜夜晚花火2025',
    },
    fireworksCount: '約150発',
    expectedVisitors: '未公表',
    date: '2025年4/5619、5/1724、6/21、7/512、8/10、9/614',
    location: '神奈川県横浜市中区/横浜港(新港頭、大橋)',
    description: '年間将通着毎月横浜港将彩短時間的花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e541039/',
  },
  {
    rank: 33,
    name: '第38回 宮瀬故乡祭典',
    _sourceData: {

      japaneseName: '第38回 宮瀬和祭典',
    },
    fireworksCount: '未公表',
    expectedVisitors: '1万5000人',
    date: '2024年8月14日(水)15日(木)16日(金)',
    location: '神奈川県愛甲郡清川村/宮瀬湖畔園地',
    description: '豊的自然在囲了清川村在花火的打上',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00928/',
  },
  {
    rank: 34,
    name: '海滩表演"夏"花火',
    _sourceData: {
      japaneseName: '海滩表演"夏"花火',
      japaneseDescription: '海滩表演"夏"花火',
    },
    fireworksCount: '未公表',
    expectedVisitors: '5万人',
    date: '2024年7月23日(火)、8月11月(祝)17日(土)24日(土)30日(金)',
    location: '神奈川県藤沢市/片瀬海岸西浜',
    description: '湘南的夜空将彩納涼花火',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00505/',
  },
  {
    rank: 35,
    name: '茅崎芸術花火2025',
    _sourceData: {

      japaneseName: '茅崎芸術花火2025',
    },
    fireworksCount: '非公開',
    expectedVisitors: '3万5000人',
    date: '2025年6月7日(土)',
    location: '神奈川県茅崎市/南海滩茅崎',
    description: '的音楽和花火的共演新感動体験',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e483125/',
  },
];

export default kanagawaHanabiLaunchRanking;
