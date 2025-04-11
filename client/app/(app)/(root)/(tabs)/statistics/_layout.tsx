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
    </Stack>
  );
};

export default StatisticsLayout;
