// theme.ts - Compatible with react-native-unistyles v3

// Define core palette colors
const palette = {
  // Grayscale
  gray: {
    0: '#FFFFFF',
    1: '#F2F2F2',
    2: '#E5E5E5',
    3: '#D9D9D9',
    4: '#CCCCCC',
    5: '#B3B3B3',
    6: '#999999',
    7: '#808080',
    8: '#666666',
    9: '#4D4D4D',
    10: '#333333',
    11: '#222222',
    12: '#111111',
    13: '#000000',
  },

  primary: {
    1: '#E6F2FF',
    2: '#CCE5FF',
    3: '#99CBFF',
    4: '#66B2FF',
    5: '#3399FF',
    6: '#007AFF',
    7: '#0066CC',
    8: '#005299',
    9: '#003D73',
    10: '#00264D',
  },

  success: {
    1: '#E6F9E6',
    2: '#CFF4CF',
    3: '#9FE89F',
    4: '#70DD70',
    5: '#40D140',
    6: '#2EB62C',
    7: '#259A24',
    8: '#1C771C',
    9: '#145814',
    10: '#0D3A0D',
  },

  error: {
    1: '#FFEBEB',
    2: '#FFD6D6',
    3: '#FFADAD',
    4: '#FF8585',
    5: '#FF5C5C',
    6: '#FF3333',
    7: '#E62E2E',
    8: '#CC2929',
    9: '#991F1F',
    10: '#661414',
  },

  warning: {
    1: '#FFF7E6',
    2: '#FFECCC',
    3: '#FFD999',
    4: '#FFC266',
    5: '#FFAD33',
    6: '#FF9900',
    7: '#CC7A00',
    8: '#995C00',
    9: '#664000',
    10: '#332100',
  },

  info: {
    1: '#E6F0FF',
    2: '#CCE0FF',
    3: '#99C2FF',
    4: '#66A3FF',
    5: '#3385FF',
    6: '#0066FF',
    7: '#0052CC',
    8: '#003D99',
    9: '#002966',
    10: '#001433',
  },
};

// Shared values across themes
const sharedValues = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },

  gap: (v: number) => v * 8,
  borderRadius: (v: number) => v * 8,

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  fonts: {
    Satoshi: 'Satoshi',
    SatoshiBold: 'SatoshiBold',
    SatoshiLight: 'SatoshiLight',
    SatoshiRegular: 'SatoshiRegular',
  },

  shadow: {
    sm: '0px 1px 2px rgba(0,0,0,0.05)',
    md: '0px 4px 6px rgba(0,0,0,0.1)',
    lg: '0px 10px 15px rgba(0,0,0,0.15)',
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    modal: 100,
    toast: 1000,
  },
};

// Light theme definition
export const lightTheme = {
  colors: {
    bg: {
      primary: palette.gray[0],
      secondary: palette.gray[1],
      tertiary: palette.gray[2],
    },
    text: {
      primary: palette.gray[12],
      secondary: palette.gray[9],
      tertiary: palette.gray[7],
      inverse: palette.gray[1],
    },
    border: {
      light: palette.gray[3],
      regular: palette.gray[4],
      strong: palette.gray[5],
    },
    accent: {
      light: palette.primary[2],
      regular: palette.primary[4],
      strong: palette.primary[5],
    },
    success: {
      bg: palette.success[1],
      fg: palette.success[8],
      main: palette.success[6],
    },
    error: {
      bg: palette.error[1],
      fg: palette.error[8],
      main: palette.error[6],
    },
    warning: {
      bg: palette.warning[1],
      fg: palette.warning[8],
      main: palette.warning[6],
    },
    info: {
      bg: palette.info[1],
      fg: palette.info[8],
      main: palette.info[6],
    },
    disabled: {
      bg: palette.gray[2],
      fg: palette.gray[6],
      border: palette.gray[3],
    },
    palette,
  },
  ...sharedValues,
} as const;

// Dark theme definition
export const darkTheme = {
  colors: {
    bg: {
      primary: palette.gray[12],
      secondary: palette.gray[11],
      tertiary: palette.gray[10],
    },
    text: {
      primary: palette.gray[1],
      secondary: palette.gray[4],
      tertiary: palette.gray[6],
      inverse: palette.gray[12],
    },
    border: {
      light: palette.gray[9],
      regular: palette.gray[8],
      strong: palette.gray[7],
    },
    accent: {
      light: palette.primary[8],
      regular: palette.primary[6],
      strong: palette.primary[4],
    },
    success: {
      bg: palette.success[9],
      fg: palette.success[3],
      main: palette.success[6],
    },
    error: {
      bg: palette.error[9],
      fg: palette.error[3],
      main: palette.error[6],
    },
    warning: {
      bg: palette.warning[9],
      fg: palette.warning[3],
      main: palette.warning[6],
    },
    info: {
      bg: palette.info[9],
      fg: palette.info[3],
      main: palette.info[6],
    },
    disabled: {
      bg: palette.gray[9],
      fg: palette.gray[5],
      border: palette.gray[7],
    },
    palette,
  },
  ...sharedValues,
} as const;
