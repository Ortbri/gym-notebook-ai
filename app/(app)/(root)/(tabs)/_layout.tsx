import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import Tabs from '~/components/nav/Tabs';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

const TabsLayout = () => {
  const { theme } = useUnistyles();

  // Only render the avatar when we're sure the user is loaded and available

  return (
    <RevenueCatProvider>
      <Tabs
        hapticFeedbackEnabled
        // @ts-ignore -- this is a hidden prop
        fontFamily="SourGummy"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.text.primary,
        }}
        scrollEdgeAppearance="transparent">
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
    </RevenueCatProvider>
  );
};

export default TabsLayout;
