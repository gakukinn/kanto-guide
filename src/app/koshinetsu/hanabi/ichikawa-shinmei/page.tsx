import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { ichikawaShinmeiHanabiData } from '../../../../data/hanabi/koshinetsu/level4-ichikawa-shinmei-hanabi';

export default function IchikawaShinmeiHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={ichikawaShinmeiHanabiData}
      regionKey="koshinetsu"
    />
  );
}

export const metadata: Metadata = {
  title: ichikawaShinmeiHanabiData.title,
  description: ichikawaShinmeiHanabiData.description,
  keywords:
    '市川三郷町, 神明花火大会, 山梨县花火, 甲信越花火, 日本花火大会, 免费花火',
};
