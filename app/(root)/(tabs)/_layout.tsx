import { useUser } from '@clerk/clerk-expo';
import { subMonths } from 'date-fns';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import Tabs from '~/components/nav/Tabs';
import { CalendarProvider } from '~/components/week-calendar/components/calendar-provider';
import { useGenerateWeeks } from '~/utils/dateUtils';

/**
 * this should work for mobile only
 * to get wrb working steps
 * 1. Superwall setup with stripe
 * 2. Change to export default and use no tabs here vvv
 */

const TabsLayout = () => {
  const router = useRouter();
  const { user } = useUser();
  const { theme } = useUnistyles();

  const weeks = useGenerateWeeks(subMonths(new Date(), 5), new Date());

  return (
    <CalendarProvider
      weeks={weeks}
      initialDate={new Date()}
      offsetPageLimit={7}
      onDateChange={(date) => {
        console.log(`New date: ${date.toLocaleDateString()}`);
      }}
      dimWeekends>
      <View style={tabStyles.container}>
        {/* avatar */}
        <Pressable
          onPress={() => router.navigate('/(root)/profile')}
          style={tabStyles.avatarContainer}>
          <Image source={{ uri: user?.imageUrl }} style={tabStyles.avatar} />
        </Pressable>
        <Tabs
          hapticFeedbackEnabled
          fontFamily="Satoshi"
          screenOptions={{
            tabBarActiveTintColor: theme.colors.text.primary,
          }}
          scrollEdgeAppearance="transparent">
          {/* calendar tab */}
          <Tabs.Screen
            name="calendar"
            options={{
              title: 'Today',
              tabBarIcon: ({ focused }: { focused: boolean }) => ({
                sfSymbol: focused ? 'flame.fill' : 'flame',
              }),
            }}
          />
          {/* statistics tab */}
          <Tabs.Screen
            name="statistics"
            options={{
              title: 'Statistics',
              tabBarIcon: ({ focused }: { focused: boolean }) => ({
                sfSymbol: focused ? 'chart.line.text.clipboard.fill' : 'chart.line.text.clipboard',
              }),
            }}
          />
        </Tabs>
      </View>
    </CalendarProvider>
  );
};

const tabStyles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
  },
  avatarContainer: {
    height: 35,
    width: 35,
    position: 'absolute',
    right: 16,
    borderRadius: theme.borderRadius(4),
    overflow: 'hidden',
    top: rt.insets.top - 4,
    backgroundColor: theme.colors.bg.tertiary,
    zIndex: 1,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
}));

export default TabsLayout;
