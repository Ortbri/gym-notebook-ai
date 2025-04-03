import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export default function NewProjStack() {
  const { theme } = useUnistyles();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
        headerTitleStyle: {
          color: theme.colors.text.primary,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
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
