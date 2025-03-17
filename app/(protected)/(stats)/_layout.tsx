import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';

export default function StatsLayout() {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Stats',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack>
  );
}
