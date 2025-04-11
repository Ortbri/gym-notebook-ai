import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';

import { BodyScrollView } from '~/components/BodyScroll';
import { IconSymbol } from '~/components/IconSymbol';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Text } from '~/components/ui/Text';
import { useAddShoppingListProductCallback } from '~/stores/ListStore';

export default function NewItemScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name, setName] = useState('');
  const [units, setUnits] = useState('kg');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const addShoppingListProduct = useAddShoppingListProductCallback(listId);

  const handleCreateProduct = () => {
    if (!name) {
      return;
    }

    addShoppingListProduct(name, quantity, units, notes);

    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: 'Add product',
          headerRight: () => (
            <Button variant="ghost" onPress={handleCreateProduct} disabled={!name} title="Save" />
          ),
          // headerLeft: () => (
          //   <Button variant="ghost" onPress={router.back}>
          //     Cancel
          //   </Button>
          // ),
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}>
        <Input
          label="Name"
          placeholder="Potatoes"
          value={name}
          onChangeText={setName}
          autoFocus
          onSubmitEditing={handleCreateProduct}
          returnKeyType="done"
        />
        <Input label="Units" placeholder="kg" value={units} onChangeText={setUnits} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>
            x{quantity} {units}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Button onPress={() => setQuantity(Math.max(0, quantity - 1))} variant="ghost">
              <IconSymbol name="minus" color="gray" />
            </Button>
            <Button onPress={() => setQuantity(quantity + 1)} variant="ghost">
              <IconSymbol name="plus" color="gray" />
            </Button>
          </View>
        </View>
        <Input
          label="Notes"
          placeholder="Potatoes are good"
          textAlignVertical="top"
          value={notes}
          multiline
          numberOfLines={4}
          // inputStyle={{
          //   height: 100,
          // }}
          onChangeText={setNotes}
        />
        {Platform.OS !== 'ios' && (
          <Button onPress={handleCreateProduct} disabled={!name}>
            Add product
          </Button>
        )}
      </BodyScrollView>
    </>
  );
}
