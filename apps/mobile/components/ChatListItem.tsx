import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import * as ContextMenu from 'zeego/context-menu';

import { Text } from './ui/Text';

import {
  useShoppingListProductCount,
  useShoppingListUserNicknames,
  useShoppingListValue,
} from '~/stores/ListStore';
import { useDelShoppingListCallback } from '~/stores/ListsStore';

export default function ChatListItem({ listId }: { listId: string }) {
  const router = useRouter();
  const [name] = useShoppingListValue(listId, 'name');
  const [emoji] = useShoppingListValue(listId, 'emoji');
  const productCount = useShoppingListProductCount(listId);
  const userNicknames = useShoppingListUserNicknames(listId);

  const deleteCallback = useDelShoppingListCallback(listId);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Pressable
          onPress={() => router.push(`/(app)/(root)/listB/${listId}`)}
          onLongPress={() => {}}>
          <View style={styles.container}>
            <Text size="h4">
              {/* {emoji} */}
              {name}
            </Text>
            <Text size="p">
              {/* {userNicknames.join(', ')} */}
              {productCount} Products
            </Text>
          </View>
        </Pressable>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        {/* <ContextMenu.Preview>{() => <Preview />}</ContextMenu.Preview> */}
        {/* <ContextMenu.Label /> */}
        <ContextMenu.Item destructive key="delete" onSelect={deleteCallback}>
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: 'trash',
            }}
          />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.colors.bg.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.light,
  },
}));
