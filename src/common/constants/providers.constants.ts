import { Providers } from '../@types/providers.types';

export const PROVIDERS: { [key: string]: Providers } = {
  GITHUB: 'github',
  SPOTIFY: 'spotify',
  DISCORD: 'discord',
  YOUTUBE: 'youtube',
} as const;
