export interface RegionIcons {
  hanabi: string;
  spots: string;
  events: string;
  food: string;
}

export interface RegionConfig {
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
  description: string;
  gridArea: string;
  icons: RegionIcons;
}

export interface RegionConfigMap {
  [key: string]: RegionConfig;
}
