import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Typography } from '~/components/Typography';

export default function Test() {
  return (
    <View style={styles.container}>
      <Typography>Test</Typography>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
}));
