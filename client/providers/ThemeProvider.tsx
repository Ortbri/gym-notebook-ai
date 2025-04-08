import type React from 'react';
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Define the theme types - keeping it simple
export type AppTheme = 'red' | 'blue' | 'green' | 'yellow';

// Define the context type
type ThemeContextType = {
  colorTheme: AppTheme;
  isDarkMode: boolean;
  setColorTheme: React.Dispatch<React.SetStateAction<AppTheme>>;
  toggleColorTheme: () => void;
  toggleDarkMode: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get system appearance
  const systemColorScheme = useColorScheme();

  // State - keeping it minimal
  const [colorTheme, setColorTheme] = useState<AppTheme>('red');
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Update when system changes
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  // Toggle between color themes
  const toggleColorTheme = () => {
    setColorTheme((prev) => (prev === 'red' ? 'blue' : 'red'));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        isDarkMode,
        setColorTheme,
        toggleColorTheme,
        toggleDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
