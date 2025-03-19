import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function HomeLayout() {
  const { colors } = useTheme();

  /* --------------------------------- return --------------------------------- */
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerLargeTitle: true,
          headerLargeStyle: {
            backgroundColor: 'transparent',
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: Platform.OS !== 'web',
        }}
      />
      <Stack.Screen
        name="workout/[id]"
        options={{
          title: 'Workout ID',
        }}
      />
    </Stack>
  );
}
