import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { Toaster } from 'burnt/web';
import { useFonts } from 'expo-font';
import { SplashScreen, useRouter, useSegments, usePathname, Slot } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';
export { ErrorBoundary } from 'expo-router';

// Initialize Sentry
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

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

function InitialLayout({ fontsLoaded }: { fontsLoaded: boolean }) {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  // console.log('is signed in', isSignedIn);

  useEffect(() => {
    if (!authLoaded || !fontsLoaded) return;

    const isInRoot = segments[1] === '(root)';

    if (isSignedIn && !isInRoot) {
      router.replace('/(app)/(root)/(tabs)/calendar');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/(app)/(auth)/auth');
    }

    // Slight delay for visual polish
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, [isSignedIn, authLoaded, fontsLoaded]);

  // if (!fontsLoaded && !authLoaded) {
  //   return <Loading />;
  // }

  return <Slot />;
}

// function Loading() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" color="#0000ff" />
//     </View>
//   );
// }

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key');
}

export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SourGummy: require('../assets/fonts/SourGummy-Light.ttf'),
    SourGummyBold: require('../assets/fonts/SourGummy-Bold.ttf'),
    SourGummyRegular: require('../assets/fonts/SourGummy-Regular.ttf'),
  });

  console.log('Fonts loaded:', fontsLoaded, 'Font error:', fontError);

  if (!fontsLoaded && !fontError) {
    return null; // Keep splash visible
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <TinyBaseProvider>
            <InitialLayout fontsLoaded={fontsLoaded} />
            <Toaster position="bottom-right" />
          </TinyBaseProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
