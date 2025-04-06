// export { default } from '../../../../components/nav/tabs/tabs';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

import Tabs from '~/components/nav/Tabs';
import { RevenueCatProvider } from '~/providers/RevenueCatProvider';

const TabsLayout = () => {
  const { theme } = useUnistyles();

  return (
    <RevenueCatProvider>
      <Tabs
        // labeled={false}
        hapticFeedbackEnabled
        fontFamily="SourGummy"
        screenOptions={{
          // fontFamily: require('../../../../assets/fonts/SourGummy-Regular.ttf'),
          fontFamily: 'SourGummy', // <-- pass as a top-level prop
          // tabBarLabelStyle: {
          //   fontFamily: theme.fonts.SourGummy,
          //   fontSize: 12,
          // },
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.text.primary,
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
