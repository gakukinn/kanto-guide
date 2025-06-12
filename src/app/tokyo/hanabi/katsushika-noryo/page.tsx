'use client';

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { katsushikaNoryoHanabiData } from '../../../../data/level5-july-hanabi-katsushika-noryo';
 
export default function KatsushikaNoryoHanabiPage() {
  return <HanabiDetailTemplate data={katsushikaNoryoHanabiData} regionKey="tokyo" />;
} 