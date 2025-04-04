import '../tamagui-web.css';
import { ClerkProvider } from '@clerk/clerk-expo';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { ToastViewport } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider, Theme, ThemeName } from 'tamagui';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

import { ThemeProvider, useTheme } from '../providers/ThemeProvider';
import { tamaguiConfig } from '../tamagui.config';

import { CustomToast } from '~/components/CustomToast';
import { NAVIGATION_THEMES } from '~/constants/nav-themes';

// Initialize Sentry
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: 'https://32f899dfbf5bdcac1549ca8e6f5442c9@o4508489595813888.ingest.us.sentry.io/4509085649993728',
  attachScreenshot: true,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,
  replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0,
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllImages: true,
      maskAllText: true,
      maskAllVectors: true,
    }),
    navigationIntegration,
    Sentry.spotlightIntegration(),
  ],
});

export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

function ThemedApp() {
  const { colorTheme, isDarkMode } = useTheme();

  // Default to 'red' if colorTheme is invalid
  const validColorTheme = ['red', 'blue', 'green', 'yellow'].includes(colorTheme)
    ? colorTheme
    : 'red';

  // Determine base theme for Tamagui
  const tamaguiTheme = isDarkMode ? 'dark' : 'light';

  // Get the appropriate navigation theme based on mode and color
  const mode = isDarkMode ? 'dark' : 'light';
  const navigationTheme = NAVIGATION_THEMES[mode][validColorTheme];

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={tamaguiTheme}>
      <NavigationThemeProvider value={navigationTheme}>
        <Theme name={validColorTheme as ThemeName}>
          <Stack>
            <Stack.Screen
              name="(main)"
              options={{
                headerShown: false,
              }}
            />
          <CustomToast />
          <ToastViewport top="$10" left={0} right={0} />
          </Stack>
        </Theme>
      </NavigationThemeProvider>
    </TamaguiProvider>
  );
}

export default function RootLayout() {
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

  return (
    <ClerkProvider>
      <TinyBaseProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </TinyBaseProvider>
    </ClerkProvider>
  );
}
