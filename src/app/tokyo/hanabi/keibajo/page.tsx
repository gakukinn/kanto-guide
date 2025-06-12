'use client';

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { keibajoData } from '../../../../data/level5-july-hanabi-tokyo-keibajo';
 
export default function KeibajoHanabiPage() {
  return <HanabiDetailTemplate data={keibajoData} regionKey="tokyo" />;
} 