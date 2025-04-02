import React from 'react';
import { ScrollView, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import Fab from '~/components/ui/Fab';

const Calendar = () => {
  return (
    <>
      <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.text}>Calendar</Text>
      </ScrollView>
      <Fab />
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.bg.primary,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
}));
