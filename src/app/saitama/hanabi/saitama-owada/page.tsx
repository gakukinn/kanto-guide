import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { saitamaOwadaHanabiData } from '@/data/saitama-owada-hanabi';

export default function SaitamaOwadaHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={saitamaOwadaHanabiData} 
      regionKey="saitama"
    />
  );
} 