import React from 'react';

import NativeTabs from '~/components/nav/Tabs';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

const TabsLayout = () => {
  return (
    <RevenueCatProvider>
      <NativeTabs
        hapticFeedbackEnabled
        scrollEdgeAppearance="transparent"
        screenOptions={
          {
            // tabBarActiveTintColor: theme.colors.text.primary,
          }
        }>
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
    </RevenueCatProvider>
  );
};

export default TabsLayout;
