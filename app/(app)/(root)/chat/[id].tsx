import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Typography } from '~/components/Typography';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.rootContainer}>
      <Typography>ChatScreen {id}</Typography>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: 100, height: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  rootContainer: {
    flex: 1,
  },
  dragHandleContainer: {
    paddingBottom: 14,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
}));
