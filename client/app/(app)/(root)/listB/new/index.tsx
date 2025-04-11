import Superwall from '@superwall/react-native-superwall';
import { Href, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { BodyScrollView } from '~/components/BodyScroll';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Text } from '~/components/ui/Text';

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function ListB() {
  const params = useGlobalSearchParams();
  // const { listId: listIdParam } = params as { listId: string | undefined };
  const listIdParam = '123';
  const router = useRouter();
  // const joinShoppingListCallback = useJoinShoppingListCallback();
  const [listId, setListId] = useState<string | null>(listIdParam);
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  // const randomEmoji = useMemo(
  //   () => emojies[Math.floor(Math.random() * emojies.length)],
  //   []
  // );

  // const randomBackgroundColor = useMemo(
  //   () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
  //   []
  // );

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  const handleJoinList = () => {
    if (listId && isValidUUID(listId)) {
      // joinShoppingListCallback(listId);

      // dismissTo method is not working due to a bug in react-native-screens
      router.dismiss();
      setTimeout(() => {
        router.push({
          pathname: '/list/[listId]',
          params: { listId },
        });
      }, 100);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={{ gap: 16, paddingBottom: 200 }}>
      <View style={{ alignItems: 'center' }}>
        <Text size="h1">Getting Started</Text>
        <Text size="p">Testing Description</Text>
      </View>
      <View style={{ gap: 16, flex: 1 }}>
        <Button
          size="md"
          title="Create a New list"
          onPress={() => {
            console.log('Create a New list');
            handleDismissTo('/(app)/(root)/listB/new/create');
          }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text>Or Join an existing list</Text>
        </View>
        <Input
          value={listId}
          // onSubmitEditing={(e) => {
          // joinListCallback(e.nativeEvent.text);
          // }}
          onChangeText={setListId}
          placeholder="Enter list ID"
        />
        <Button size="md" variant="secondary" title="Join a list" onPress={handleJoinList} />
      </View>
      <Button
        size="md"
        variant="primary"
        title="Scan a QR code"
        onPress={() => {
          console.log('Scan a QR code');
          Superwall.shared.register({
            placement: 'start_chat',
            feature: () => {
              handleDismissTo('/(app)/(root)/listB/new/scan');

              // navigation.navigate('LaunchedFeature', {
              //   value: 'Non-gated feature launched',
              // });
            },
          });
        }}
      />
    </BodyScrollView>
  );
}
