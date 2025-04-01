import { Tabs } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
        headerTitleStyle: {
          color: theme.colors.text.primary,
        },
        tabBarActiveTintColor: theme.colors.accent.regular,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          borderColor: 'transparent',
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          // headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="adjust" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="align-left" color={color} />,
        }}
      />
    </Tabs>
  );
}
