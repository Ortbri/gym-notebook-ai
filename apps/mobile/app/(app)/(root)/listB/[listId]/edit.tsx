import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// import { BodyScrollView } from '@/components/ui/BodyScrollView';

import { BodyScrollView } from '~/components/BodyScroll';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { useBaseItems } from '~/providers/BaseItemProvider';
// import {}
import { useShoppingListValue } from '~/stores/ListStore';
// import { useListCreation } from '@/context/ListCreationContext';
// import { useShoppingListValue } from '@/stores/ShoppingListStore';

export default function ListScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };

  // List values
  const [name, setName] = useShoppingListValue(listId, 'name');
  const [description, setDescription] = useShoppingListValue(listId, 'description');
  const [emoji, setEmoji] = useShoppingListValue(listId, 'emoji');
  const [color, setColor] = useShoppingListValue(listId, 'color');

  // List creation context
  const { selectedEmoji, selectedColor, setSelectedColor, setSelectedEmoji } = useBaseItems();

  // Initialize context with current values
  useEffect(() => {
    setSelectedEmoji(emoji);
    setSelectedColor(color);
    return () => {
      setSelectedEmoji('');
      setSelectedColor('');
    };
  }, [listId]);

  // Update list when context changes
  useEffect(() => {
    if (selectedEmoji && selectedEmoji !== emoji) setEmoji(selectedEmoji);
    if (selectedColor && selectedColor !== color) setColor(selectedColor);
  }, [selectedEmoji, selectedColor]);

  const handleEmojiPress = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    console.log('emoji press');
  };

  const handleColorPress = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    console.log('color press');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button variant="ghost" onPress={router.back}>
              Cancel
            </Button>
          ),
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <Input
            label="Name"
            placeholder="Potatoes"
            value={name}
            onChangeText={setName}
            returnKeyType="done"
            containerStyle={styles.titleInputContainer}
          />
          <Pressable
            onPress={handleEmojiPress}
            style={[styles.emojiButton, { borderColor: color }]}>
            <View style={styles.emojiContainer}>
              <Text>{emoji}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={handleColorPress}
            style={[styles.colorButton, { borderColor: color }]}>
            <View style={styles.colorContainer}>
              <View style={[styles.colorPreview, { backgroundColor: color }]} />
            </View>
          </Pressable>
        </View>
        <Input
          label="Description"
          placeholder="Potatoes are good"
          textAlignVertical="top"
          value={description}
          multiline
          numberOfLines={4}
          onChangeText={setDescription}
        />
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
    marginTop: 16,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorButton: {
    marginTop: 16,
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
});
