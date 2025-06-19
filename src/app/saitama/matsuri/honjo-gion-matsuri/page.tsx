'use client';

import MatsuriDetailTemplate from '../../../../components/MatsuriDetailTemplate';
import { HanabiMedia } from '../../../../types/hanabi';
import { MatsuriEvent } from '../../../../utils/matsuri-data-validator';

export default function HonjoGionMatsuriPage() {
  // 本庄祇園まつり媒体内容
  const matsuriMedia: HanabiMedia[] = [
    {
      type: 'image',
      url: '/images/saitama/Matsuri/Honjo Gion Festival/Honjo Gion Festival (1).jpg',
      title: '本庄祇園まつり - 神轿巡行',
      description:
        '威勢のよい「セイヤ、セイヤ」のかけ声とともに旧中山道を巡行する神轿',
      alt: '本庄祇園まつりの神轿巡行の様子',
      caption: '旧中山道での大人神轿と子ども神轿の巡行',
    },
    {
      type: 'image',
      url: '/images/saitama/Matsuri/Honjo Gion Festival/Honjo Gion Festival (2).jpg',
      title: '本庄祇園まつり - 獅子舞奉納',
      description: '埼玉県無形民俗文化財指定の伝統的な獅子舞の奉納',
      alt: '本庄祇園まつりの獅子舞奉納',
      caption: '八坂神社境内での獅子舞奉納',
    },
    {
      type: 'image',
      url: '/images/saitama/Matsuri/Honjo Gion Festival/Honjo Gion Festival (3).jpg',
      title: '本庄祇園まつり - 祭典風景',
      description:
        '木遣り、纏振り、梯子乗りなどの伝統芸能が披露される祭典の様子',
      alt: '本庄祇園まつりの祭典風景',
      caption: '多彩な伝統芸能が披露される賑やかな祭典',
    },
  ];

  // 本庄祇園まつり数据（来自Jalan.net爬虫）
  const matsuriData: MatsuriEvent = {
    id: 'honjo-gion-matsuri',
    title: '本庄祇園まつり',
    japaneseName: '本庄祇園まつり（ほんじょうぎおんまつり）',
    englishName: 'Honjo Gion Festival',
    date: '2025年7月12日～13日',
    endDate: '2025年7月13日',
    location: '埼玉県本庄市　本庄市街地',
    category: '夏祭り',
    highlights: [
      '埼玉県の無形民俗文化財指定の獅子舞',
      '旧中山道でのみこし巡行',
      '「セイヤ、セイヤ」の威勢のよいかけ声',
      '木遣り、纏（まとい）振り、梯子乗り',
      '大人みこしと子どもみこし',
      '八坂神社での奉納',
      '無病息災・五穀豊穣の祈念',
    ],
    likes: 2580,
    website: 'https://www.honjo-kanko.jp/event/honjogionmatsuri.html',
    description:
      '疫病を追い払うため、獅子舞を奉納し、みこしを担いだのが「本庄祇園まつり」の始まりとされます。八坂神社の境内で、無病息災や五穀豊穣などを祈念し、埼玉県の無形民俗文化財に指定されている獅子舞が奉納されます。「セイヤ、セイヤ」の威勢のよいかけ声とともに、旧中山道を大人みこしや子どもみこしが巡行し、大勢の観客で賑わいます。木遣り、纏（まとい）振り、梯子乗りなども披露されます。',
    // 新增详细信息（来自爬取数据）
    address: '〒367',
    schedule: '2025年7月12日～13日 【12日】16:00～22:00 【13日】14:00～22:00',
    venue: '埼玉県本庄市 本庄市街地',
    access: 'ＪＲ高崎線「本庄駅」北口から徒歩5分',
    organizer: '本庄祇園まつり実行委員会',
    contact: '本庄市観光協会（本庄市役所商工観光課内） 0495-25-1111',
    googleMapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.5!2d139.186066!3d36.240437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE0JzI1LjYiTiAxMznCsDExJzA5LjgiRQ!5e0!3m2!1sja!2sjp!4v1750308900000!5m2!1sja!2sjp',
    media: matsuriMedia, // 添加媒体内容
  };

  return <MatsuriDetailTemplate data={matsuriData} regionKey="saitama" />;
}
