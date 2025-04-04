import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet } from 'react-native';

export default function NewProjStack() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={
        {
          // headerStyle: {
          //   backgroundColor: styles.headerBackgroundColor,
          // },
          // headerTitleStyle: {
          //   color: styles.headerTitleColor,
          // },
          // headerShadowVisible: false,
          // contentStyle: {
          //   backgroundColor: styles.headerBackgroundColor,
          // },
        }
      }>
      <Stack.Screen
        name="index"
        options={{
          title: 'New Project',
          headerLeft: () => <Button title="Cancel" onPress={() => router.dismiss()} />,
        }}
      />
      <Stack.Screen name="color-select" options={{}} />
    </Stack>
  );
}

// const styles = StyleSheet.create({
//   headerBackgroundColor: '#ffffff', // Replace with your desired color
//   headerTitleColor: '#000000', // Replace with your desired color
// });
