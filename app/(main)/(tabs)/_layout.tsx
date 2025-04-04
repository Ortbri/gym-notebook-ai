import React from 'react';
// import { StyleSheet } from 'react-native';

import NativeTabs from '~/components/nav/Tabs';
import { RevenueCatProvider } from '~/providers/RevenueCat';

const TabsLayout = () => {
  return (
    <RevenueCatProvider>
      <NativeTabs
        hapticFeedbackEnabled
        scrollEdgeAppearance="transparent"
        screenOptions={
          {
            // tabBarActiveTintColor: styles.activeTintColor,
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

// const styles = StyleSheet.create({
//   activeTintColor: '#000', // Replace with your desired color
// });

export default TabsLayout;
