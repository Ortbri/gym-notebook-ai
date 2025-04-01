import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key');
}

const InitLayout = () => {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.bg.primary },
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
