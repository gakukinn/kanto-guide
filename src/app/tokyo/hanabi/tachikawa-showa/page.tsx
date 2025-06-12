'use client';

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { tachikawaShowaHanabiData } from '../../../../data/level5-july-hanabi-tachikawa-showa';
 
export default function TachikawaShowaHanabiPage() {
  return <HanabiDetailTemplate data={tachikawaShowaHanabiData} regionKey="tokyo" />;
} 