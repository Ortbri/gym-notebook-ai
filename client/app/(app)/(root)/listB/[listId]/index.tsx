import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import * as ContextMenu from 'zeego/context-menu';

import { IconSymbol } from '~/components/IconSymbol';
import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';
import {
  useDelShoppingListProductCallback,
  useShoppingListProductIds,
  useShoppingListValue,
} from '~/stores/ListStore';
export default function List() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name] = useShoppingListValue(listId, 'name');
  const [emoji] = useShoppingListValue(listId, 'emoji');
  const [description] = useShoppingListValue(listId, 'description');
  const newProductHref = {
    pathname: '/(app)/(root)/listB/[listId]/product/new',
    params: { listId },
  } as const;
  return (
    <>
      <Stack.Screen
        options={{
          title: 'List Item',
          headerLargeTitle: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <TouchableOpacity
                onPress={() => {
                  // edit the list

                  // edit the list
                  router.push({
                    pathname: '/(app)/(root)/listB/[listId]/share',
                    params: { listId },
                  });
                }}>
                <IconSymbol name="square.and.arrow.up" color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: '/(app)/(root)/listB/[listId]/edit',
                    params: { listId },
                  });
                }}>
                <IconSymbol name="pencil.and.list.clipboard" color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // edit the list
                  router.push({
                    pathname: '/(app)/(root)/listB/[listId]/product/new',
                    params: { listId },
                  });
                }}>
                <IconSymbol name="plus" color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Animated.FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={useShoppingListProductIds(listId)}
        ListEmptyComponent={
          <Button onPress={() => router.push(newProductHref)} title="Add Product" />
        }
        contentContainerStyle={{
          padding: 16,
        }}
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

function ShoppingListProductItem({ listId, productId }: { listId: string; productId: string }) {
  const router = useRouter();
  const [name] = useShoppingListProductCell(listId, productId, 'name');
  const [isPurchased] = useShoppingListProductCell(listId, productId, 'isPurchased');
  const deleteCallback = useDelShoppingListProductCallback(listId, productId);
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Text>{productId}</Text>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item key="complete" onSelect={() => {}}>
          <ContextMenu.ItemTitle>Complete</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: 'checkmark',
            }}
          />
        </ContextMenu.Item>

        <ContextMenu.Item key="delete" onSelect={deleteCallback}>
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
