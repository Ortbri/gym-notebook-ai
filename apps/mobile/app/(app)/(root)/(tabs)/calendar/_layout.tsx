import { Stack } from 'expo-router';
import React from 'react';

import useNavStyle from '~/components/nav/NavStyles';

const CalendarLayout = () => {
  const { headerDefaultSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerDefaultSettings}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
