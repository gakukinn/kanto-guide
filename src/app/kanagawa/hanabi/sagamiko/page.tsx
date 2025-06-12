import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { sagamikoHanabiData } from '@/data/level5-august-sagamiko-hanabi';

export default function SagamikoHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={sagamikoHanabiData}
      regionKey="kanagawa"
    />
  );
} 