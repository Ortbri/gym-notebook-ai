import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function CurrentChat() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.typography}>CurrentChat</Text>
      <Text style={styles.typography}>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
  },
  typography: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
}));
