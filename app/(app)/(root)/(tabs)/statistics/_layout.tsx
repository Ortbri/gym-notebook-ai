import { useUser } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';

import useNavStyle from '~/components/nav/NavStyles';

const StatisticsLayout = () => {
  const { headerBlurSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerBlurSettings}>
      <Stack.Screen name="index" options={{ title: 'Statistics' }} />
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

const styles = StyleSheet.create({
  headerRight: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default StatisticsLayout;
