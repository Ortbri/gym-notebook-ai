import { Stack } from 'expo-router';
import React from 'react';

import useNavStyle from '~/components/nav/NavStyles';
import { ActiveDayTitle } from '~/components/week-calendar/components/active-day';

const CalendarLayout = () => {
  const { headerDefaultSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerDefaultSettings}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: () => <ActiveDayTitle />,
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
