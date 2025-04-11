import { Stack } from 'expo-router';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

import useNavStyle from '~/components/nav/NavStyles';
import { BaseItemProvider } from '~/providers/BaseItemProvider';
import { SuperWallProvider } from '~/providers/SuperWallProvider';
import ShoppingListsStore from '~/stores/ListsStore';

export default function RootLayout() {
  const { headerBlurSettings } = useNavStyle();
  return (
    <TinyBaseProvider>
      <ShoppingListsStore />
      <SuperWallProvider>
        <BaseItemProvider>
          <Stack screenOptions={{}}>
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
              name="listB/new/index"
              options={{
                title: 'List B',
                presentation: 'formSheet',
                sheetGrabberVisible: true,
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="listB/new/create"
              options={{
                title: 'Create',
                // presentation: 'modal',
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="listB/new/scan"
              options={{
                title: 'Scan',
                presentation: 'modal',
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="listB/[listId]/index"
              options={{
                title: 'List Item',
                headerBackTitle: 'Home',
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="settings/menu"
              options={{
                title: 'Settings',
                headerBackTitle: 'Home',
                headerLargeTitle: true,
                headerShown: true,
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="settings/test"
              options={{
                title: 'Test',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="settings/dbSync"
              options={{
                title: 'DB Sync',
                headerShown: true,
              }}
            />
          </Stack>
        </BaseItemProvider>
      </SuperWallProvider>
    </TinyBaseProvider>
  );
}
