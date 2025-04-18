import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { Toaster } from 'burnt/web';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { SuperWallProvider } from '~/providers/SuperWallProvider';

// TODO: should we keep superwall in the ap layout or bring it in a bit more?
/* ------------------------------ err boundary ------------------------------ */
export { ErrorBoundary } from 'expo-router';
/* --------------------------------- splash --------------------------------- */
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

/* -------------------------------- settings -------------------------------- */
export const unstable_settings = {
  initialRouteName: '(root)',
};
/* ------------------------------- init sentry ------------------------------ */
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

if (process.env.NODE_ENV === 'production') {
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
}
/* --------------------------------- loading -------------------------------- */
function LoadingScreen() {
  return <View style={loadingStyles.loadingScreen} />;
}
/* ------------------------------- init stack ------------------------------- */
function InitialLayout() {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const { theme } = useUnistyles();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();

  useEffect(() => {
    if (!authLoaded) return;

    const isInRoot = segments[0] === '(root)';
    try {
      if (isSignedIn && !isInRoot) {
        router.replace('/(root)/(tabs)/calendar');
      } else if (!isSignedIn && pathname !== '/') {
        router.replace('/(auth)/auth');
      }
    } catch (error) {
      console.error('Error in layout:', error);
    } finally {
      SplashScreen.hideAsync();
    }
  }, [isSignedIn, authLoaded]);

  if (!authLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        animationDuration: 50,
        contentStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
}
/* ------------------------------- app layout ------------------------------- */
export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SatoshiBlack: require('../assets/fonts/Satoshi-Black.ttf'),
    SatoshiBold: require('../assets/fonts/Satoshi-Bold.ttf'),
    SatoshiLight: require('../assets/fonts/Satoshi-Light.ttf'),
    Satoshi: require('../assets/fonts/Satoshi-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  if (!publishableKey) throw new Error('Missing Clerk publishable key');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <SuperWallProvider>
          <InitialLayout />
          <Toaster position="bottom-right" />
        </SuperWallProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

const loadingStyles = StyleSheet.create((theme) => ({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bg.primary,
  },
}));
