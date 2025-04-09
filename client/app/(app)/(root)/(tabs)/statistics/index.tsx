import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Statistics() {
  return <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic" />;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexGrow: 1,
  },
  txt: {
    color: theme.colors.text.primary,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.accent.strong,
    padding: 16,
    borderRadius: 18,
  },
}));
