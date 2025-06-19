'use client';

import MatsuriDetailTemplate from '../../../../components/MatsuriDetailTemplate';
import { HanabiMedia } from '../../../../types/hanabi';
import { MatsuriEvent } from '../../../../utils/matsuri-data-validator';

export default function ChichibuKawaseFestivalPage() {
  // 秩父川濑祭媒体内容
  const matsuriMedia: HanabiMedia[] = [
    {
      type: 'image',
      url: '/images/saitama/Matsuri/Chichibu Kawase Festival/kawase-festival-1.jpg',
      title: '秩父川濑祭 - 山车入水',
      description: '炎热夏日中山车入水的清凉壮观场面，是祭典的最大看点',
      alt: '秩父川濑祭山车入水',
      caption: '传统山车勇敢入水的激动人心时刻',
    },
    {
      type: 'image',
      url: '/images/saitama/Matsuri/Chichibu Kawase Festival/kawase-festival-2.jpg',
      title: '秩父川濑祭 - 川边祈福',
      description: '在清澈的河川边进行的传统祈福仪式，祈求清凉与平安',
      alt: '秩父川濑祭川边祈福',
      caption: '参与者在河边进行传统的夏日祈福',
    },
    {
      type: 'image',
      url: '/images/saitama/Matsuri/Chichibu Kawase Festival/kawase-festival-3.jpg',
      title: '秩父川濑祭 - 祭典队伍',
      description: '身着传统服装的祭典队伍沿着河边巡游',
      alt: '秩父川濑祭祭典队伍',
      caption: '传统服装的参与者组成的庄严队伍',
    },
  ];

  // 秩父川濑祭数据
  const matsuriData: MatsuriEvent = {
    id: 'chichibu-kawase-festival',
    title: '秩父川濑祭',
    japaneseName: '秩父川瀬祭り',
    englishName: 'Chichibu Kawase Festival',
    date: '2025年7月19日-20日',
    endDate: '2025年7月20日',
    location: '埼玉県秩父市　秩父神社',
    category: '夏祭り',
    highlights: [
      '清凉川水中的神圣仪式',
      '山车入水的壮观场面',
      '夏日消暑祈福活动',
      '秩父神社的传统祭礼',
      '河边的传统表演',
      '炎夏中的清凉体验',
    ],
    likes: 90,
    website: 'https://www.chichibu-jinja.or.jp/',
    description:
      '秩父川濑祭是在炎热夏日举行的清凉祭典，最大的看点是山车勇敢入水的壮观场面。这个传统祭典在秩父神社举行，参与者在清澈的河川中进行神圣的祈福仪式，祈求夏日的清凉与平安。川水的清凉与传统祭典的热烈形成鲜明对比，是体验日本夏季祭典文化的绝佳机会。',
    // 详细信息
    address: '〒368-0041 埼玉県秩父市番場町1-3',
    schedule: '2025年7月19日-20日\n19日：18:00～21:00\n20日：10:00～21:00',
    venue: '埼玉県秩父市　秩父神社',
    access:
      '秩父鉄道「秩父駅」からすぐ、または西武池袋線「西武秩父駅」から徒歩15分',
    organizer: '秩父神社',
    contact: '秩父神社　0494-22-0262、秩父観光協会　0494-21-2277',
    googleMapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.48!2d139.0813274!3d35.9972185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDU5JzUwLjAiTiAxMznCsDA0JzUyLjgiRQ!5e0!3m2!1sja!2sjp!4v1750327613633!5m2!1sja!2sjp',
    media: matsuriMedia,
  };

  return <MatsuriDetailTemplate data={matsuriData} regionKey="saitama" />;
}
