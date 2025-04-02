import { useClerk } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
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

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
  },
}));
