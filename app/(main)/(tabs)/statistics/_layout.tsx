import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';
const StatisticsLayout = () => {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.bg.primary },
        headerTitleStyle: { color: theme.colors.text.primary },
      }}>
      <Stack.Screen name="index" options={{ title: 'Statistics' }} />
    </Stack>
  );
};

export default StatisticsLayout;
