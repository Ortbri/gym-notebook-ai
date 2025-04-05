import '../tamagui-web.css';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { SplashScreen, useRouter, useSegments, usePathname, Slot } from 'expo-router';
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

function InitialLayout() {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const { colorTheme, isDarkMode } = useTheme();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const isInMain = segments[0] === '(main)';

    if (isSignedIn && !isInMain) {
      router.replace('/(main)/(tabs)/calendar');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/(auth)/auth');
    }
  }, [isSignedIn, isLoaded]);

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
        <ToastProvider>
          <Theme name={validColorTheme as ThemeName}>
            <Slot />
            <CustomToast />
            <ToastViewport top="$10" left={0} right={0} />
          </Theme>
        </ToastProvider>
      </NavigationThemeProvider>
    </TamaguiProvider>
  );
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key');
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
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <TinyBaseProvider>
          <ThemeProvider>
            <InitialLayout />
          </ThemeProvider>
        </TinyBaseProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
