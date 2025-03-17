import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
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
