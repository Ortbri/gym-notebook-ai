import { Link, Tabs } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.typography,
        },
        tabBarActiveTintColor: theme.colors.astral,
        tabBarStyle: {
          borderColor: 'transparent',
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          headerShown: false,
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <HeaderButton iconName="address-book" />
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          headerShown: false,
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
