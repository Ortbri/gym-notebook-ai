import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { Toaster } from 'burnt/web';
import { useFonts } from 'expo-font';
import { SplashScreen, useRouter, useSegments, usePathname, Slot } from 'expo-router';
import { useEffect } from 'react';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

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
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const isInRoot = segments[1] === '(root)';

    if (isSignedIn && !isInRoot) {
      router.replace('/(app)/(root)/(tabs)/calendar');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/(app)/(auth)/auth');
    }
  }, [isSignedIn, isLoaded]);

  return <Slot />;
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
  const [loaded, error] = useFonts({});

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
          <InitialLayout />
          <Toaster position="bottom-right" />
        </TinyBaseProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
