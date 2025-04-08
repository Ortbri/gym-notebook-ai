import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import Tabs from '~/components/nav/Tabs';

const TabsLayout = () => {
  const { theme } = useUnistyles();

  // Only render the avatar when we're sure the user is loaded and available

  return (
    <Tabs
      hapticFeedbackEnabled
      // @ts-ignore -- this is a hidden prop
      // fontFamily="SourGummy"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text.primary,
      }}
      scrollEdgeAppearance="transparent">
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }: { focused: boolean }) => ({
            sfSymbol: focused ? 'flame.fill' : 'flame',
          }),
        }}
      />

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
  );
};

export default TabsLayout;
