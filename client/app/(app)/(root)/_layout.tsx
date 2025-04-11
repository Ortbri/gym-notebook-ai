import { Stack } from 'expo-router';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

import useNavStyle from '~/components/nav/NavStyles';
import { BaseItemProvider } from '~/providers/BaseItemProvider';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';
import ShoppingListsStore from '~/stores/ListsStore';

export default function RootLayout() {
  const { headerBlurSettings } = useNavStyle();
  return (
    <TinyBaseProvider>
      <ShoppingListsStore />
      <RevenueCatProvider>
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
          </Stack>
        </BaseItemProvider>
      </RevenueCatProvider>
    </TinyBaseProvider>
  );
}
