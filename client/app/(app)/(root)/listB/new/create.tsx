import { Link, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { BodyScrollView } from '~/components/BodyScroll';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { useBaseItems } from '~/providers/BaseItemProvider';

// import { BodyScrollView } from '@/components/ui/BodyScrollView';
// import Button from '@/components/ui/button';
// import TextInput from '@/components/ui/text-input';
// import { appleBlue, backgroundColors, emojies } from '@/constants/Colors';
// import { useListCreation } from '@/context/ListCreationContext';
// import { useAddShoppingListCallback } from '@/stores/ShoppingListsStore';

export default function CreateListScreen() {
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const { selectedEmoji, setSelectedEmoji, selectedColor, setSelectedColor } = useBaseItems();

  const router = useRouter();
  // const useAddShoppingList = useAddShoppingListCallback();

  useEffect(() => {
    setSelectedEmoji('🦍');
    setSelectedColor('red');

    // Cleanup function to reset context when unmounting
    return () => {
      setSelectedEmoji('');
      setSelectedColor('');
    };
  }, []);

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    // const listId = useAddShoppingList(listName, listDescription, selectedEmoji, selectedColor);

    router.replace({
      pathname: '/list/[listId]',
      params: { listId },
    });
  };

  const handleCreateTestLists = () => {
    const testListNames = [
      'Grocery Shopping',
      'Weekend BBQ',
      'Party Supplies',
      'Office Supplies',
      'Camping Trip',
      'Holiday Gifts',
      'Home Improvement',
      'School Supplies',
      'Birthday Party',
      'Household Items',
    ];

    const testEmojis = ['🛒', '🍖', '🎉', '📎', '⛺️', '🎁', '🔨', '📚', '🎂', '🏠'];
    const testColors = Object.values(backgroundColors).slice(0, 10);

    testListNames.forEach((name, index) => {
      useAddShoppingList(
        name,
        `This is a test list for ${name}`,
        testEmojis[index],
        testColors[index]
      );
    });

    // Navigate back to the main list view
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: 'New list',
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Grocery Essentials"
            value={listName}
            onChangeText={setListName}
            onSubmitEditing={handleCreateList}
            returnKeyType="done"
            variant="filled"
            size="lg"
            // autoFocus
            // inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
          {/* <Link
            href={{ pathname: '/emoji-picker' }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}>
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>
          <Link
            href={{ pathname: '/color-picker' }}
            style={[styles.colorButton, { borderColor: selectedColor }]}>
            <View style={styles.colorContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link> */}
        </View>
        <Input
          placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="filled"
          size="lg"

          // inputStyle={styles.descriptionInput}
        />
        <Button
          onPress={handleCreateList}
          disabled={!listName}
          variant="ghost"
          // textStyle={styles.createButtonText}>
          // Create list
          title="Create list"
        />
        <Button onPress={handleCreateTestLists} variant="ghost">
          Create 10 test lists
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollViewContent: {
    gap: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleInput: {
    fontWeight: '600',
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 'auto',
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: theme.colors.accent.regular,
    fontWeight: 'normal',
  },
  colorButton: {
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
}));
