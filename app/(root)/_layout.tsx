import { Stack } from 'expo-router';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

import useNavStyle from '~/components/nav/NavStyles';
import { BaseItemProvider } from '~/providers/BaseItemProvider';
import { WorkoutStoreProvider } from '~/stores/WorkoutStore';

export default function RootLayout() {
  const { headerBlurSettings } = useNavStyle();

  return (
    <TinyBaseProvider>
      <WorkoutStoreProvider />
      <BaseItemProvider>
        <Stack>
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
            name="profile/[id]"
            options={{
              title: 'Profile',
              headerBackTitle: 'Home',
              headerLargeTitle: true,
              headerShown: true,
              presentation: 'formSheet',
              sheetGrabberVisible: true,
              sheetCornerRadius: 30,
              ...headerBlurSettings,
            }}
          />
        </Stack>
      </BaseItemProvider>
    </TinyBaseProvider>
  );
}
