// styles/config.ts
import { StyleSheet } from 'react-native-unistyles';
import { type AppBreakpoints, breakpoints } from './breakpoints';
import { appThemes } from './themes';

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  breakpoints,
  themes: appThemes,
});
