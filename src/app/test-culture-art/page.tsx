import CultureArtDetailTemplate from '../../components/CultureArtDetailTemplate';
import { sampleCultureArtData } from '../../data/sample-culture-art';

export default function TestCultureArtPage() {
  return (
    <CultureArtDetailTemplate data={sampleCultureArtData} regionKey="tokyo" />
  );
}

export const metadata = {
  title: '东京艺术节2025 - 文化艺术活动详情',
  description:
    '东京艺术节是一场汇聚世界各地艺术家的盛大节庆，展示当代艺术的多元魅力。',
};
