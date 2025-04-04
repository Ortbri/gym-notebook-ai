import { useUser } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';

const StatisticsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff', // Replace with your desired color
        },
        headerTitleStyle: {
          color: '#000000', // Replace with your desired color
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: '#ffffff', // Replace with your desired color
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Statistics', headerRight: HeaderRight }} />
      <Stack.Screen
        name="newProj"
        options={{
          headerShown: false,
          presentation: 'modal',
          sheetGrabberVisible: true,
          sheetCornerRadius: 16, // Replace with your desired value
        }}
      />
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
