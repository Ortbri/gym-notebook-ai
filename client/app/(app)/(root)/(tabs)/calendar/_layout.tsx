import { Stack } from 'expo-router';
import React from 'react';

import useNavStyle from '~/components/nav/NavStyles';

const CalendarLayout = () => {
  const { headerTransparentSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerTransparentSettings}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Test',
          headerLargeTitle: true,
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
