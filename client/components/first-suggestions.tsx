'use client';

import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { PromptOnTap } from './prompt-on-tap';

export function FirstSuggestions() {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        paddingHorizontal: 16,
      }}>
      {(
        [
          // ['server rendering apps', 'for native platforms'],
          'Suggest a workout',
          process.env.EXPO_OS !== 'web' && 'what should this set look like',
          'workout type',
        ].filter(Boolean) as string[]
      ).map((title, index) => (
        <Animated.View entering={FadeInDown.delay((3 - index) * 100)} key={String(index)}>
          <PromptOnTap key={String(index)} style={{}} activeOpacity={0.7} prompt={title}>
            <View style={styles.suggestion}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </PromptOnTap>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  suggestion: {
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderCurve: 'continuous',
    padding: 8,
    backgroundColor: theme.colors.border.light,
    borderColor: theme.colors.bg.secondary,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: 16,
  },
}));
