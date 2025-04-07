import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const Button = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text>{children}</Text>
    </Pressable>
  );
};

export default function Menu() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Menu</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  button: {
    backgroundColor: theme.colors.accent.strong,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
