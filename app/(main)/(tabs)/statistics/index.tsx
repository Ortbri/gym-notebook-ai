import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
const Statistics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics</Text>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.bg.primary,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
}));
