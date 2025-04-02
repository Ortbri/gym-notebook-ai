import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

const MainLayout = () => {
  const { theme } = useUnistyles();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'red',
        },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MainLayout;
