import { Stack } from 'expo-router';
import React from 'react';

import useNavStyle from '~/components/nav/NavStyles';
import MoreButton from '~/components/ui/MoreButton';

const CalendarLayout = () => {
  const { headerBlurSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerBlurSettings}>
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
