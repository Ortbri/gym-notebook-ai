import { isSameDay, isWeekend } from 'date-fns';
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { CustomEnteringAnimation, CustomExitingAnimation } from '../animations';
import { useCalendar } from '../hooks';
import { getTheNameOfTheDay } from '../utils';

interface CalendarDayProps {
  day: Date;
  onPress: () => void;
}

export const CalendarDay = memo(({ day, onPress }: CalendarDayProps) => {
  const today = new Date();
  const isToday = isSameDay(day, today);
  const { activeDate, dimWeekends } = useCalendar();
  const { theme } = useUnistyles();
  const isSelected = isSameDay(day, activeDate);
  const isWeekendDay = isWeekend(day);

  const animatedActiveDayIndicatorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: theme.colors.accent.regular,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    // Determine the appropriate text color based on day state
    let textColor: string;
    if (isSelected) {
      textColor = theme.colors.bg.primary;
    } else {
      textColor = isToday ? theme.colors.accent.strong : theme.colors.text.primary;
    }

    return {
      color: withTiming(textColor),
    };
  });

  return (
    <Pressable style={styles.dayContainer} onPress={onPress}>
      <Text
        style={[
          styles.dayText,
          { color: theme.colors.text.primary },
          isWeekendDay && dimWeekends && { opacity: 0.5 },
        ]}>
        {getTheNameOfTheDay(day).slice(0, 1)}
      </Text>
      <View style={styles.dayNumberContainer}>
        <Animated.Text style={[styles.dayNumberText, animatedTextStyle]}>
          {day.getDate()}
        </Animated.Text>
        {isSelected && (
          <Animated.View
            entering={CustomEnteringAnimation}
            exiting={CustomExitingAnimation}
            style={[styles.activeDayIndicator, animatedActiveDayIndicatorStyle]}
          />
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create((theme) => ({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    fontSize: 9,
    fontWeight: '500',
  },
  dayNumberText: {
    fontSize: 16,
    fontWeight: '500',
    zIndex: 1,
  },
  dayNumberContainer: {
    width: 35,
    height: 35,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayIndicator: {
    borderRadius: 99,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
