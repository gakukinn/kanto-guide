'use client';

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { hachioji } from '../../../../data/level5-july-hanabi-tokyo-hachioji';
 
export default function HachiojiHanabiPage() {
  return <HanabiDetailTemplate data={hachioji} regionKey="tokyo" />;
} 