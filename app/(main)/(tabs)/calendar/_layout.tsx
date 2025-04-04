import { Stack } from 'expo-router';
import React from 'react';

import MoreButton from '~/components/ui/MoreButton';

const CalendarLayout = () => {
  return (
    <Stack>
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

// const styles = StyleSheet.create({
//   headerBackgroundColor: '#ffffff', // Replace with your desired color
//   headerTitleColor: '#000000', // Replace with your desired color
//   contentBackgroundColor: '#ffffff', // Replace with your desired color
// });

export default CalendarLayout;
