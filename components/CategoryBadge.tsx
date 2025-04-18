import React from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

/**
 * from unistyles example
 * NOTE: just using as example for now
 */

type CategoryBadgeProps = {
  category: {
    id: string;
    name: string;
  };
  activeCategory: string;
  setActiveCategory(category: string): void;
};

export const CategoryBadge: React.FunctionComponent<CategoryBadgeProps> = ({
  category,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <Pressable
      key={category.id}
      style={[styles.categoryButton, activeCategory === category.id && styles.categoryButtonActive]}
      onPress={() => setActiveCategory(category.id)}>
      <Text
        style={[styles.categoryText, activeCategory === category.id && styles.categoryTextActive]}>
        {category.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  categoryButton: {
    paddingHorizontal: theme.gap(1),
    paddingVertical: theme.gap(1),
    borderRadius: theme.gap(1),
    marginRight: theme.gap(1),
    backgroundColor: theme.colors.bg.primary,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.bg.secondary,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  categoryTextActive: {
    color: theme.colors.text.tertiary,
  },
}));
