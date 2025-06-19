'use client';

import MatsuriDetailTemplate from '../../../../components/MatsuriDetailTemplate';
import { HanabiMedia } from '../../../../types/hanabi';
import { MatsuriEvent } from '../../../../utils/matsuri-data-validator';

export default function NaritaGionFestivalPage() {
  // 成田祇园祭媒体内容
  const matsuriMedia: HanabiMedia[] = [
    {
      type: 'image',
      url: '/images/chiba/Matsuri/Narita Gion Festival/Narita Gion Festival (1).jpg',
      title: '成田祇园祭 - 华丽山车巡游',
      description: '华丽绚烂的御舆与山车在成田市内巡游，展现300年历史传统',
      alt: '成田祇园祭华丽山车巡游',
      caption: '10台豪华山车与御舆在成田市内威武巡游',
    },
    {
      type: 'image',
      url: '/images/chiba/Matsuri/Narita Gion Festival/Narita Gion Festival (2).jpg',
      title: '成田祇园祭 - 成田山新勝寺祇园会',
      description: '在成田山新勝寺举行的祇园会，大日如来奥之院特别开帐',
      alt: '成田山新勝寺祇园会',
      caption: '约300年历史的成田山祇园会，大日如来奥之院特别开帐',
    },
    {
      type: 'image',
      url: '/images/chiba/Matsuri/Narita Gion Festival/Narita Gion Festival (3).jpg',
      title: '成田祇园祭 - 传统舞蹈表演',
      description: '传统舞蹈与囃子竞演，每年吸引40万人观赏',
      alt: '成田祇园祭传统舞蹈表演',
      caption: '传统舞蹈与囃子的精彩竞演，展现江户文化精髓',
    },
  ];

  // 成田祇园祭数据
  const matsuriData: MatsuriEvent = {
    id: 'narita-gion-festival',
    title: '成田祇园祭',
    japaneseName: '成田祇園祭',
    englishName: 'Narita Gion Festival',
    date: '2025年7月4日-6日',
    endDate: '2025年7月6日',
    location: '千葉県成田市　成田山新勝寺とその周辺',
    category: '祇园祭',
    highlights: [
      '约300年历史的成田山祇园会',
      '大日如来奥之院特别开帐',
      '豪华绚烂的10台山车与御舆巡游',
      '传统舞蹈与囃子竞演',
      '五穀豊穣万民豊楽祈愿',
      '千叶县内最大夏祭之一',
    ],
    likes: 320,
    website: 'https://www.nrtk.jp/enjoy/shikisaisai/gion-festival.html',
    description:
      '成田祇园祭是为供养成田山新勝寺奥之院大日如来而举行的历史悠久的夏祭。以约300年历史的"成田山祇园会"为中心，周边町内一体举办盛大夏祭。豪华绚烂的御舆和10台山车在市内巡游3天，传统舞蹈与囃子竞演热闹非凡，每年吸引40万人以上观赏。祭典期间，大日如来奥之院特别开帐，信众们祈求五穀豊穣和万民豊楽。',

    // 详细信息
    address: '〒286-0023 千葉県成田市成田1',
    schedule:
      '2025年7月4日-6日\n3日间连续举行\n山车巡游：各日10:00～21:00\n祇园会：在成田山新勝寺举行',
    venue: '千葉県成田市　成田山新勝寺とその周辺',
    access: 'ＪＲ成田線・京成「成田駅」から徒歩10分',
    organizer: '一般社団法人成田市観光協会',
    contact: '一般社団法人成田市観光協会　0476-22-2102',
    googleMapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3217.21!2d140.318295!3d35.786063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ3JzA5LjgiTiAxNDDCsDE5JzA1LjkiRQ!5e0!3m2!1sja!2sjp!4v1750327613633!5m2!1sja!2sjp',
    media: matsuriMedia,
  };

  return <MatsuriDetailTemplate data={matsuriData} regionKey="chiba" />;
}
