// export { default } from '../../../../components/nav/tabs/tabs';

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
        // labeled={false}

        screenOptions={{
          // tabBarLabelStyle: {
          //   fontFamily: require('../../../assets/fonts/SourGummy-Bold.ttf'),
          //   fontSize: 12,
          // },

          tabBarLabelStyle: {
            fontFamily: 'SourGummy', // Your custom font
            fontSize: 12,
          },
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.text.primary,
        }}
        scrollEdgeAppearance="transparent">
        <NativeTabs.Screen
          name="calendar"
          options={{
            // tabBarLabel: ({ focused }) => (
            //   <Text
            //     style={{
            //       fontFamily: 'SourGummy',
            //       fontSize: 12,
            //       color: focused ? theme.colors.text.primary : theme.colors.text.primary,
            //     }}>
            //     Today
            //   </Text>
            // ),

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
