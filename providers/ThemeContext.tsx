import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

type ColorTheme = 'red' | 'blue' | 'green' | 'yellow';

interface ThemeContextType {
  colorTheme: ColorTheme;
  isDarkMode: boolean;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [colorTheme, setColorTheme] = useState<ColorTheme>('red');

  const value = {
    colorTheme,
    isDarkMode: colorScheme === 'dark',
    setColorTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
