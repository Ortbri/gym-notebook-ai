import { DarkTheme, DefaultTheme } from '@react-navigation/native';
export const NAVIGATION_THEMES = {
  light: {
    red: {
      ...DefaultTheme,
      colors: {
        primary: '#F64932',
        background: '#f2f2f2',
        card: '#fff',
        text: 'rgb(28, 28, 30)',
        border: '#e8e8e8',
        notification: '#FF7A32',
      },
    },
    blue: {
      ...DefaultTheme,
      colors: {
        primary: '#3772FF',
        background: '#f2f2f2',
        card: '#fff',
        text: 'rgb(28, 28, 30)',
        border: '#e8e8e8',
        notification: '#45AAF2',
      },
    },
    green: {
      ...DefaultTheme,
      colors: {
        primary: '#4CAF50',
        background: '#f2f2f2',
        card: '#fff',
        text: 'rgb(28, 28, 30)',
        border: '#e8e8e8',
        notification: '#81C784',
      },
    },
    yellow: {
      ...DefaultTheme,
      colors: {
        primary: '#FFEB3B',
        background: '#f2f2f2',
        card: '#fff',
        text: 'rgb(28, 28, 30)',
        border: '#e8e8e8',
        notification: '#FFF176',
      },
    },
  },
  dark: {
    red: {
      ...DarkTheme,
      colors: {
        primary: '#FF5B45',
        background: '#050505',
        card: '#191919',
        text: '#fff',
        border: '#282828',
        notification: '#FF8A4A',
      },
    },
    blue: {
      ...DarkTheme,
      colors: {
        primary: '#4D89FF',
        background: '#050505',
        card: '#191919',
        text: '#fff',
        border: '#282828',
        notification: '#63B8FF',
      },
    },
    green: {
      ...DarkTheme,
      colors: {
        primary: '#388E3C',
        background: '#050505',
        card: '#191919',
        text: '#fff',
        border: '#282828',
        notification: '#66BB6A',
      },
    },
    yellow: {
      ...DarkTheme,
      colors: {
        primary: '#FBC02D',
        background: '#050505',
        card: '#191919',
        text: '#fff',
        border: '#282828',
        notification: '#FFCA28',
      },
    },
  },
};
