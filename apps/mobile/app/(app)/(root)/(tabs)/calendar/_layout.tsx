import { Stack } from 'expo-router';
import React from 'react';

import useNavStyle from '~/components/nav/NavStyles';

const CalendarLayout = () => {
  const { headerBlurSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerBlurSettings}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          // headerLargeTitle: true,
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
