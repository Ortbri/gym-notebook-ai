import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import MoreButton from '~/components/ui/MoreButton';

const CalendarLayout = () => {
  return (
    <Stack
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: styles.headerBackgroundColor,
    //   },
    //   headerTitleStyle: {
    //     color: styles.headerTitleColor,
    //   },
    //   headerShadowVisible: false,
    //   contentStyle: {
    //     backgroundColor: styles.contentBackgroundColor,
    //   },
    // }
    // }
    >
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
