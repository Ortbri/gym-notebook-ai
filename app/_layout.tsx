import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useUnistyles } from 'react-native-unistyles';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key');
}

const InitLayout = () => {
  const router = useRouter();
  const { theme } = useUnistyles();
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    const isInMain = segments[0] === '(main)';

    if (isSignedIn && !isInMain) {
      router.replace('/(main)/(tabs)/calendar');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/');
    }
  }, [isSignedIn, isLoaded]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          // backgroundColor: theme.colors.bg.primary,
          // paddingTop: 20,
        },
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};
export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

// only for web
// useEffect(() => {
//   if (Platform.OS === 'web') {
//     document.body.style.backgroundColor = theme.colors.bg.primary;
//     document.documentElement.style.backgroundColor = theme.colors.bg.primary;
//   }
// }, [theme]);
