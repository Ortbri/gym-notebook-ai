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

  // Your brand color palette
  primary: {
    1: '#E6F2FF', // Lightest
    2: '#CCE5FF',
    3: '#99CBFF',
    4: '#66B2FF',
    5: '#3399FF',
    6: '#007AFF', // Main brand color
    7: '#0066CC',
    8: '#005299',
    9: '#003D73',
    10: '#00264D', // Darkest
  },

  // Success colors (green)
  success: {
    1: '#E6F9E6', // Lightest
    2: '#CFF4CF',
    3: '#9FE89F',
    4: '#70DD70',
    5: '#40D140',
    6: '#2EB62C', // Main success color
    7: '#259A24',
    8: '#1C771C',
    9: '#145814',
    10: '#0D3A0D', // Darkest
  },

  // Error colors (red)
  error: {
    1: '#FFEBEB', // Lightest
    2: '#FFD6D6',
    3: '#FFADAD',
    4: '#FF8585',
    5: '#FF5C5C',
    6: '#FF3333', // Main error color
    7: '#E62E2E',
    8: '#CC2929',
    9: '#991F1F',
    10: '#661414', // Darkest
  },
};

// Shared values across themes
const sharedValues = {
  // Spacing system
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // Border radius
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  // Utility functions
  gap: (v: number) => v * 8,
  borderRadius: (v: number) => v * 8,
};

// Light theme definition
export const lightTheme = {
  colors: {
    // Background colors
    bg: {
      primary: palette.gray[0],
      secondary: palette.gray[1],
      tertiary: palette.gray[2],
    },

    // Text colors
    text: {
      primary: palette.gray[12],
      secondary: palette.gray[9],
      tertiary: palette.gray[7],
      inverse: palette.gray[1],
    },

    // Border colors
    border: {
      light: palette.gray[3],
      regular: palette.gray[4],
      strong: palette.gray[5],
    },

    // Accent colors
    accent: {
      light: palette.primary[2],
      regular: palette.primary[6],
      strong: palette.primary[8],
    },

    // Status colors
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

    // Keep the raw palette accessible if needed
    palette,
  },
  ...sharedValues,
} as const;

// Dark theme definition
export const darkTheme = {
  colors: {
    // Background colors
    bg: {
      primary: palette.gray[12],
      secondary: palette.gray[11],
      tertiary: palette.gray[10],
    },

    // Text colors
    text: {
      primary: palette.gray[1],
      secondary: palette.gray[4],
      tertiary: palette.gray[6],
      inverse: palette.gray[12],
    },

    // Border colors
    border: {
      light: palette.gray[9],
      regular: palette.gray[8],
      strong: palette.gray[7],
    },

    // Accent colors
    accent: {
      light: palette.primary[8],
      regular: palette.primary[6],
      strong: palette.primary[4],
    },

    // Status colors
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

    // Keep the raw palette accessible if needed
    palette,
  },
  ...sharedValues,
} as const;
