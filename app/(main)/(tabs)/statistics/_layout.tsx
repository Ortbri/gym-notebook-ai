import { useUser } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';

const StatisticsLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: 'Statistics', headerRight: HeaderRight }} />
    </Stack>
  );
};

// later route to setting modal
const HeaderRight = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/settings/current')}>
      <Image source={{ uri: user?.imageUrl }} style={styles.headerRight} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default StatisticsLayout;
