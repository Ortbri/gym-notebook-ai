import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16, // Adjust this value as needed for padding
    backgroundColor: '#ffffff', // Default background color, adjust as needed
  },
});
