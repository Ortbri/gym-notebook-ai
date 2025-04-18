import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { Toaster } from 'burnt/web';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export { ErrorBoundary } from 'expo-router';
/* -------------------------------------------------------------------------- */
/*                                   splash                                   */
/* -------------------------------------------------------------------------- */
SplashScreen.preventAutoHideAsync();
/* -------------------------------------------------------------------------- */
/*                              Initialize Sentry                             */
/* -------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------- */
/*                                 app layout                                 */
/* -------------------------------------------------------------------------- */
export default function InitLayout() {
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
        <Slot />
        <Toaster position="bottom-right" />
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
