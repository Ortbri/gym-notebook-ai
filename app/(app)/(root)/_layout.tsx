import { Stack } from 'expo-router';

import useNavStyle from '~/components/nav/NavStyles';

export default function RootLayout() {
  const { headerBlurSettings } = useNavStyle();
  return (
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
        name="test/[id]"
        options={{
          title: 'Test',
          headerShown: true,
          ...headerBlurSettings,
        }}
      />
      <Stack.Screen
        name="settings/menu"
        options={{
          title: 'Settings',
          presentation: 'modal',
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
    </Stack>
  );
}
