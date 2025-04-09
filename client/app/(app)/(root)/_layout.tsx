import { Stack } from 'expo-router';

import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

export default function RootLayout() {
  return (
    <RevenueCatProvider>
      <Stack screenOptions={{}}>
        {/* NESTED STACK */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* NORMAL STACK */}
        <Stack.Screen
          name="chat/[id]"
          options={{
            title: 'Chat Null',
            headerShown: true,
          }}
        />
      </Stack>
    </RevenueCatProvider>
  );
}
