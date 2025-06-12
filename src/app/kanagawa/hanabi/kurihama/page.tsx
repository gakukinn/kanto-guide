import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kurihamaHanabiData } from '@/data/level5-august-kurihama-hanabi';

export default function KurihamaHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={kurihamaHanabiData}
      regionKey="kanagawa"
    />
  );
} 