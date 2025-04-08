import { subMonths } from 'date-fns';
import { memo, useCallback } from 'react';
import { Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { Calendar } from '~/components/week-calendar';
import { useGenerateWeeks } from '~/components/week-calendar/utils';

const defaultHeaderHeight = Platform.OS === 'ios' ? 44 : 56; // Approx values

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
  const weeks = useGenerateWeeks(subMonths(new Date(), 5), new Date());

  const renderDay = ({ day, isActive }: { day: Date; isActive: boolean }) => {
    return <Day day={day} isActive={isActive} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendar</Text>
      <Calendar
        weeks={weeks}
        offsetPageLimit={7}
        onDateChange={(date) => {
          console.log(`New date: ${date.toLocaleDateString()}`);
        }}
        dimWeekends
        initialDate={new Date()}>
        <Calendar.Strip style={{ paddingTop: 14 }} />
        <Calendar.Screen containerStyle={styles.calendarScreen} renderDay={renderDay} />
      </Calendar>
    </View>
  );
};
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top + defaultHeaderHeight,
    // padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  dayContentStyle: {
    height: 600,
  },
  dayContainer: {
    backgroundColor: theme.colors.bg.primary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarScreen: {
    height: rt.screen.height - 140,
  },
}));

export default Page;
