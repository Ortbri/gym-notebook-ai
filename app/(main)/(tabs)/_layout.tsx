import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import Tabs from '~/components/nav/Tabs';

const TabsLayout = () => {
  const { theme } = useUnistyles();
  return (
    <Tabs
      // ignoresTopSafeAreas
      hapticFeedbackEnabled
      scrollEdgeAppearance="transparent"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text.primary,
      }}>
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'flame.fill' : 'flame',
          }),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'chart.line.text.clipboard.fill' : 'chart.line.text.clipboard',
          }),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
