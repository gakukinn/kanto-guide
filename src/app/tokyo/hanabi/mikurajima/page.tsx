'use client';

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { mikurajimaHanabiData } from '../../../../data/level5-july-hanabi-mikurajima';
 
export default function MikurajimaHanabiPage() {
  return <HanabiDetailTemplate data={mikurajimaHanabiData} regionKey="tokyo" />;
} 