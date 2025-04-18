import React from 'react';
import { ScrollView, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Profile() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.text}>Profile</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.text.primary,
  },
}));
