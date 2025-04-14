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
                title: '',
                presentation: 'formSheet',
                sheetGrabberVisible: true,
                sheetCornerRadius: 40,
                headerTransparent: true,
                // ...headerBlurSettings,
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
              name="listB/[listId]/product/new"
              options={{
                title: 'Product',
                headerBackTitle: 'List',
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="listB/[listId]/share"
              options={{
                title: 'Share',
                headerBackTitle: 'List',
                presentation: 'formSheet',
                sheetGrabberVisible: true,
                sheetCornerRadius: 40,
                // headerTransparent: true,
                ...headerBlurSettings,
              }}
            />
            <Stack.Screen
              name="listB/[listId]/product/[productId]"
              options={{
                title: 'Product',
                headerBackTitle: 'List',
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
              }}
            />
            <Stack.Screen
              name="profile/dbSync"
              options={{
                title: 'DB Sync',
                headerShown: true,
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
