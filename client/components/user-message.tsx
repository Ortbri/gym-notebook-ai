'use client';

import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function UserMessage({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={100} style={styles.text} selectable>
          {children}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    maxWidth: '100%',
    paddingHorizontal: 16,
    gap: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    borderCurve: 'continuous',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: 20,
    borderBottomRightRadius: 8,
    flexWrap: 'wrap',
    wordWrap: 'break-word',
    textAlign: 'right',
    color: 'black',
    padding: 12,
    fontSize: 16,
  },
}));
