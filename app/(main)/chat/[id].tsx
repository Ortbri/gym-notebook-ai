import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CurrentChat() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.typography}>CurrentChat</Text>
      <Text style={styles.typography}>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  typography: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Default color since theme is not used
  },
});
