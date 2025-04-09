import { Stack } from 'expo-router';

import useNavStyle from '~/components/nav/NavStyles';

const StatisticsLayout = () => {
  const { headerBlurSettings } = useNavStyle();

  return (
    <Stack screenOptions={headerBlurSettings}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Statistics',
        }}
      />
      <Stack.Screen
        name="settings/menu"
        options={{
          title: 'Settings',
          headerLargeTitle: true,
          headerShown: true,
          ...headerBlurSettings,
        }}
      />
      <Stack.Screen
        name="settings/test"
        options={{
          title: 'Test',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="settings/dbSync"
        options={{
          title: 'DB Sync',
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default StatisticsLayout;
