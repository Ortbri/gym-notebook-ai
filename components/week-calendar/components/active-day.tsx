import { format, isSameYear, isToday, isTomorrow, isYesterday } from 'date-fns';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { useCalendar } from '../hooks';

export function ActiveDayTitle() {
  const { activeDate } = useCalendar();
  const today = new Date();

  // Determine the display string based on the date
  let displayDate: string;
  if (isToday(activeDate)) {
    displayDate = 'Today';
  } else if (isTomorrow(activeDate)) {
    displayDate = 'Tomorrow';
  } else if (isYesterday(activeDate)) {
    displayDate = 'Yesterday';
  } else if (isSameYear(activeDate, today)) {
    displayDate = format(activeDate, 'MMM d');
  } else {
    displayDate = format(activeDate, 'MMM d, yyyy');
  }

  return (
    <Animated.Text key={displayDate} style={styles.text}>
      {displayDate}
    </Animated.Text>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.SatoshiBold,
  },
}));
