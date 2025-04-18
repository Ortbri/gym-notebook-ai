import React, { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '~/components/ui/Text';
import { Calendar } from '~/components/week-calendar';

const Day = memo(({ day, isActive }: { day: Date; isActive: boolean }) => {
  return (
    <View style={styles.dayContainer}>
      <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 6 }}>
        {day.toLocaleDateString()}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          paddingVertical: 6,
          opacity: 0.5,
        }}>
        {isActive ? 'Active' : 'Inactive'}
      </Text>
    </View>
  );
});

const Page = () => {
  const renderDay = ({ day, isActive }: { day: Date; isActive: boolean }) => {
    return <Day day={day} isActive={isActive} />;
  };

  return (
    <View>
      <Calendar.Strip style={{ paddingVertical: 14 }} />
      <Calendar.Screen containerStyle={styles.calendarScreen} renderDay={renderDay} />
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  dayContainer: {
    backgroundColor: theme.colors.bg.primary,
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarScreen: {
    height: rt.screen.height - 100 - 200,
    // flex: 1,
    // backgroundColor: 'red',
  },
}));

export default Page;
