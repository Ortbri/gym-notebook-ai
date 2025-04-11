import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, FlatList } from 'react-native';

import { Text } from '~/components/ui/Text';
export default function List() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };
  return (
    <>
      <Stack.Screen options={{ title: 'List B', headerLargeTitle: true }} />
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={[listId]}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
    </>
  );
}
