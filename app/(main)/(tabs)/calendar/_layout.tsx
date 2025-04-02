import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

const CalendarLayout = () => {
  const { theme } = useUnistyles();
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
      }}>
      <Stack.Screen name="index" options={{ title: 'Today', headerLargeTitle: true }} />
    </Stack>
  );
};

export default CalendarLayout;
