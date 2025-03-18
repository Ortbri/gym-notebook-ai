import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';

export default function AIStack() {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Gym ai',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack>
  );
}
