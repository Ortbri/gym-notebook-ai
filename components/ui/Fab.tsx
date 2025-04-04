import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function Fab({ onPress }: { onPress: () => void }) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}>
      <Ionicons name="add" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Adjusted for simplicity, remove rt.insets
    right: 24,
    height: 50,
    width: 50,
    backgroundColor: '#1D9BF0', // Example color, replace with desired color
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Example shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
