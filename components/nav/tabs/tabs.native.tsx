import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import NativeTabs from '~/components/nav/Tabs';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

const TabsLayout = () => {
  const { theme } = useUnistyles();
  return (
    <RevenueCatProvider>
      <NativeTabs
        tabBarStyle={{
          fontFamily: 'SourGummyRegular',
          // fontSize: 24,
        }}
        // hapticFeedbackEnabled
        screenOptions={{
          tabBarActiveTintColor: theme.colors.accent.strong,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
        scrollEdgeAppearance="transparent">
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
