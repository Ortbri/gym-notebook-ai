// import { MMKV } from 'react-native-mmkv';
import { StyleSheet } from 'react-native-unistyles';
const sharedStyles = {
  fs: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  br: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  gap: (v: number) => v * 8,
};

const lightTheme = {
  colors: {
    // Base scale
    gray1: '#fcfcfc',
    gray2: '#f8f8f8',
    gray3: '#f3f3f3',
    gray4: '#ededed',
    gray5: '#e8e8e8',
    gray6: '#e2e2e2',
    gray7: '#dbdbdb',
    gray8: '#c7c7c7',
    gray9: '#8f8f8f',
    gray10: '#858585',
    gray11: '#6f6f6f',
    gray12: '#171717',

    // Primary scale (violet)
    primary1: '#fdfcfe',
    primary2: '#fbf8ff',
    primary3: '#f5eeff',
    primary4: '#ebe3ff',
    primary5: '#dfd0ff',
    primary6: '#cfbaff',
    primary7: '#ba9eff',
    primary8: '#9776ff',
    primary9: '#6E56CF',
    primary10: '#644fc1',
    primary11: '#5746af',
    primary12: '#20134b',

    // Semantic colors
    background: '$gray1',
    foreground: '$gray12',
    muted: '$gray3',
    mutedForeground: '$gray11',
    border: '$gray6',
    input: '$gray2',
    ring: '$primary7',

    success: '#30A46C',
    warning: '#FFB224',
    error: '#E54D2E',
    info: '#0091FF',
  },
  ...sharedStyles,
};

const darkTheme = {
  colors: {
    // Base scale
    gray1: '#161616',
    gray2: '#1c1c1c',
    gray3: '#232323',
    gray4: '#282828',
    gray5: '#2e2e2e',
    gray6: '#343434',
    gray7: '#3e3e3e',
    gray8: '#505050',
    gray9: '#707070',
    gray10: '#7e7e7e',
    gray11: '#a0a0a0',
    gray12: '#ededed',

    // Primary scale (violet)
    primary1: '#17151f',
    primary2: '#1c172b',
    primary3: '#251e40',
    primary4: '#2c2250',
    primary5: '#32275f',
    primary6: '#392c72',
    primary7: '#443592',
    primary8: '#5842c3',
    primary9: '#6E56CF',
    primary10: '#7c66dc',
    primary11: '#9b8afb',
    primary12: '#f1eefe',

    // Semantic colors
    background: '$gray1',
    foreground: '$gray12',
    muted: '$gray3',
    mutedForeground: '$gray11',
    border: '$gray6',
    input: '$gray2',
    ring: '$primary7',

    success: '#30A46C',
    warning: '#FFB224',
    error: '#E54D2E',
    info: '#0091FF',
  },
  ...sharedStyles,
};

const otherTheme = {
  colors: {
    // Base scale (sage)
    gray1: '#fbfdfc',
    gray2: '#f7f9f8',
    gray3: '#f1f4f3',
    gray4: '#ecefed',
    gray5: '#e6e9e8',
    gray6: '#dfe4e2',
    gray7: '#d7dcda',
    gray8: '#c2c9c6',
    gray9: '#8a918e',
    gray10: '#808784',
    gray11: '#6a716e',
    gray12: '#111c18',

    // Primary scale (mint)
    primary1: '#f9fefd',
    primary2: '#f2fbf9',
    primary3: '#e9f9f7',
    primary4: '#ddf3f1',
    primary5: '#cdeae7',
    primary6: '#b5ddd9',
    primary7: '#95ccc8',
    primary8: '#67b3b0',
    primary9: '#479c98',
    primary10: '#3b8b87',
    primary11: '#2b7a76',
    primary12: '#0d2f2e',

    // Semantic colors
    background: '$gray1',
    foreground: '$gray12',
    muted: '$gray3',
    mutedForeground: '$gray11',
    border: '$gray6',
    input: '$gray2',
    ring: '$primary7',

    success: '#30A46C',
    warning: '#FFB224',
    error: '#E54D2E',
    info: '#0091FF',
  },
  ...sharedStyles,
};

const appThemes = {
  light: lightTheme,
  other: otherTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
    // initialTheme: () => {
    //   const storage = new MMKV();
    //   return (storage.getString('preferredTheme') ?? 'dark') as keyof typeof appThemes;w
    // },
    /**
     * Adaptive themes allow Unistyles to automatically
     *  manage the selection of your themes based on device color
     *  scheme settings. To enable this, you need to meet two conditions:
     */
    // adaptiveTheme: true, //
  },
  breakpoints,
  themes: appThemes,
});
