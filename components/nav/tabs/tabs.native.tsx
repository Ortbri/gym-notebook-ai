import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import NativeTabs from '~/components/nav/Tabs';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

const TabsLayout = () => {
  const { theme } = useUnistyles();
  return (
    <RevenueCatProvider>
      <NativeTabs
        hapticFeedbackEnabled
        // tabBarStyle={{
        //   // fontFamily: 'SourGummyRegular',
        //   fontFamily: 'SourGummyBold',
        //   fontSize: 33,
        // }}
        // hapticFeedbackEnabled
        // labeled={false}
        tabBarLabelStyle={{
          // not working right now
          fontFamily: 'SourGummyRegular',
          // fontSize: 33,
        }}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.text.primary,
        }}
        scrollEdgeAppearance="transparent">
        <NativeTabs.Screen
          name="calendar"
          options={{
            title: 'Today',
            // tabBarLabel
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
