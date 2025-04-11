import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { BodyScrollView } from '~/components/BodyScroll';
import { Input } from '~/components/ui/Input';
import { Text } from '~/components/ui/Text';
import {
  useShoppingListProductCell,
  useShoppingListProductCreatedByNickname,
  useShoppingListUserNicknames,
} from '~/stores/ListStore';

export default function ProductScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };

  // Check if the product exists by trying to get any of its properties
  const [name] = useShoppingListProductCell(listId, productId, 'name');

  // If the product doesn't exist anymore, redirect to the list
  React.useEffect(() => {
    if (name === undefined) {
      router.replace(`/(app)/(root)/listB/${listId}`);
    }
  }, [listId, name]);

  // If the product is deleted, show nothing while redirecting
  if (name === undefined) {
    return null;
  }

  return <ProductContent listId={listId} productId={productId} />;
}

function ProductContent({ listId, productId }: { listId: string; productId: string }) {
  const [name, setName] = useShoppingListProductCell(listId, productId, 'name');
  const [quantity, setQuantity] = useShoppingListProductCell(listId, productId, 'quantity');
  const [units, setUnits] = useShoppingListProductCell(listId, productId, 'units');
  const [notes, setNotes] = useShoppingListProductCell(listId, productId, 'notes');
  const createdBy = useShoppingListProductCreatedByNickname(listId, productId);
  const [createdAt] = useShoppingListProductCell(listId, productId, 'createdAt');
  const userNicknames = useShoppingListUserNicknames(listId);

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}>
      <FieldItem label="Product name" value={name} onChangeText={setName} />
      <FieldItem label="Created by" value={createdBy ?? 'unknown'} />
      <FieldItem
        label="Created at"
        value={createdAt ? new Date(createdAt).toDateString() : 'unknown'}
      />
      <FieldItem
        label="Quantity"
        value={quantity.toString()}
        onChangeText={(value) => setQuantity(Number(value))}
      />
      <FieldItem label="Units" value={units} onChangeText={setUnits} />
      <View
        style={{
          gap: 8,
        }}>
        <Text size="h4">Notes</Text>
        <Input
          value={notes ?? '(none)'}
          editable
          onChangeText={setNotes}
          variant="ghost"
          placeholder="Add a note..."
          size="sm"
          //   inputStyle={{ padding: 0 }}
        />
      </View>
      <Text size="h4">Shared with</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {userNicknames.map((nickname, index) => (
          <Text key={nickname}>
            {nickname}
            {index < userNicknames.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </View>
    </BodyScrollView>
  );
}

function FieldItem({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 8,
      }}>
      <Text size="h4">{label}</Text>
      <Input
        value={value}
        editable={onChangeText !== undefined}
        onChangeText={onChangeText}
        variant="ghost"
        placeholder="..."
        size="sm"
        containerStyle={{ maxWidth: '60%' }}
        // inputStyle={{ padding: 0, margin: 0, textAlign: 'right' }}
      />
    </View>
  );
}
