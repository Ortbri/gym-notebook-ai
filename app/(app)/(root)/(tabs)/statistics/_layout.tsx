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

// later route to setting modal
// const HeaderRight = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   return (
//     <Pressable onPress={() => router.navigate('/')}>
//       <Image source={{ uri: user?.imageUrl }} style={styles.headerRight} />
//     </Pressable>
//   );
// };

export default StatisticsLayout;
