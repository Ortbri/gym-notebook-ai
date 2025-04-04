import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

// import { defaultConfig } from './tam.conf.extra'; // can look up to see base styling

export const tamaguiConfig = createTamagui(defaultConfig);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
