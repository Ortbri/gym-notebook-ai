import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
/**
 * technically not working --- our main route is only working becuase its the first index.tsx on tabs route
 * if we wrong (tabs)/(ai)/index.tsx this would show first
 */
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
