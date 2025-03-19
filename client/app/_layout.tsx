import '../tamagui-web.css';
import { AIBaseContextProvider } from '@/providers/AIProvider';
import { BaseContextProvider } from '@/providers/BaseProvider';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { SplashScreen } from 'expo-router';
import * as React from 'react';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';
// error boundary
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  /* ---------------------------------- fonts --------------------------------- */
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  /* --------------------------------- return --------------------------------- */
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || 'light'}>
      <NavigationThemeProvider
        value={colorScheme === 'dark' ? customDarkTheme : customDefaultTheme}
      >
        <BaseContextProvider>
          <AIBaseContextProvider>
            <Slot />
          </AIBaseContextProvider>
        </BaseContextProvider>
      </NavigationThemeProvider>
    </TamaguiProvider>
  );
}

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    // Primary - using a medium purple from your accent light palette
    primary: '#7B5BC9', // Matches 'hsla(250, 50%, 54%, 1)' from light accent palette

    // Background - using lightPalette[1]
    background: '#f2f2f2',

    // Card - using lightPalette[0]
    card: '#fff',

    // Text - dark color, similar to lightPalette[11]
    text: 'rgb(28, 28, 30)',

    // Border - using lightPalette[3] (converted from HSL)
    border: '#e8e8e8', // converted from 'hsl(0, 0%, 91%)'

    // Notification - using red from Tamagui colors
    notification: '#E54D2E', // A standard red color

    // Custom colors
    secondary: '#6748B9', // Matches 'hsla(250, 50%, 51%, 1)' from light accent palette
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF453A',
    info: '#8E70D8', // Matches 'hsla(250, 50%, 59%, 1)' from light accent palette
    grey: '#8E8E93',
    lightGrey: '#C7C7CC',
    darkGrey: '#48484A',
    transparent: 'transparent',
  },
};

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    // Primary - using a medium purple from your accent dark palette
    primary: '#836FD1', // Matches 'hsla(250, 50%, 57%, 1)' from dark accent palette

    // Background - using darkPalette[0]
    background: '#050505',

    // Card - using darkPalette[2]
    card: '#191919',

    // Text - light color, similar to darkPalette[11]
    text: '#fff',

    // Border - using darkPalette[4]
    border: '#282828',

    // Notification - using red from Tamagui colors
    notification: '#E54D2E', // A standard red color

    // Custom colors
    secondary: '#7B5BC9', // Matches 'hsla(250, 50%, 54%, 1)' from dark accent palette
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#CEBAF2', // Matches 'hsla(250, 50%, 90%, 1)' from dark accent palette
    grey: '#8E8E93',
    lightGrey: '#48484A',
    darkGrey: '#636366',
    transparent: 'transparent',
  },
};
