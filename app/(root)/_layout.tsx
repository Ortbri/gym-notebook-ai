import { Stack } from 'expo-router';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

import useNavStyle from '~/components/nav/NavStyles';
import { BaseItemProvider } from '~/providers/BaseItemProvider';
import { SuperWallProvider } from '~/providers/SuperWallProvider';
import { WorkoutStoreProvider } from '~/stores/WorkoutStore';

export default function RootLayout() {
  // const { isSignedIn, isLoaded } = useAuth();
  const { headerBlurSettings } = useNavStyle();

  // if (!isSignedIn) {
  //   return <Redirect href="/(auth)/auth" />;
  // }

  return (
    <TinyBaseProvider>
      <WorkoutStoreProvider />
      <SuperWallProvider>
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
              name="profile/menu"
              options={{
                title: 'Profile',
                headerBackTitle: 'Home',
                headerLargeTitle: true,
                headerShown: true,
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="profile/test"
              options={{
                title: 'Test',
                headerShown: true,
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="profile/main"
              options={{
                title: 'Profile',
                headerBackTitle: 'Home',
                headerShown: true,
                ...headerBlurSettings,
              }}
            />
          </Stack>
        </BaseItemProvider>
      </SuperWallProvider>
    </TinyBaseProvider>
  );
}
