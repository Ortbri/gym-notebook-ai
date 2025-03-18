import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(tabs)/(index)',
};

export default function ProfileLayout() {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat/index"
        options={{
          headerShown: true,
          title: 'ai',
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: Platform.OS !== 'web',
          headerBackTitle: 'Days',
        }}
      />
    </Stack>
  );
}
