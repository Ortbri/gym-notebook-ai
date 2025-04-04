import { useClerk } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Settings() {
  const { signOut } = useClerk();
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button
        title="Log Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
