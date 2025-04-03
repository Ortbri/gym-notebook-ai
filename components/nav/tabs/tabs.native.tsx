import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import NativeTabs from '~/components/nav/Tabs';

const TabsLayout = () => {
  const { theme } = useUnistyles();
  return (
    <NativeTabs
      hapticFeedbackEnabled
      scrollEdgeAppearance="transparent"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text.primary,
      }}>
      <NativeTabs.Screen
        name="calendar"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'flame.fill' : 'flame',
          }),
        }}
      />
      <NativeTabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'chart.line.text.clipboard.fill' : 'chart.line.text.clipboard',
          }),
        }}
      />
    </NativeTabs>
  );
};

export default TabsLayout;
