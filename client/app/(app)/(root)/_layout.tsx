import { Stack } from 'expo-router';

import useNavStyle from '~/components/nav/NavStyles';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

export default function RootLayout() {
  const { headerBlurSettings } = useNavStyle();
  return (
    <RevenueCatProvider>
      <Stack screenOptions={{ headerBackTitle: 'Home' }}>
        {/* NESTED STACK */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* NORMAL STACK */}
        <Stack.Screen
          name="chat/[id]"
          options={{
            title: 'Chat Null',
            headerShown: true,

            ...headerBlurSettings,
          }}
        />
        <Stack.Screen
          name="settings/menu"
          options={{
            title: 'Settings',
            presentation: 'formSheet',
            sheetCornerRadius: 24,
            sheetGrabberVisible: true,
            // sheetAllowedDetents: [0 1],
            headerShown: true,
            ...headerBlurSettings,
          }}
        />
        <Stack.Screen
          name="settings/test"
          options={{
            title: 'Test',
            headerShown: true,
            ...headerBlurSettings,
          }}
        />
        <Stack.Screen
          name="settings/dbSync"
          options={{
            title: 'DB Sync',
            headerShown: true,
            ...headerBlurSettings,
          }}
        />
      </Stack>
    </RevenueCatProvider>
  );
}
