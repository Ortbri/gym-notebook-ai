import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import MoreButton from '~/components/ui/MoreButton';

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
        contentStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Today',
          headerLargeTitle: true,
          headerRight: () => <MoreButton pageName="Calendar" />,
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
