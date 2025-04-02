import { useUser } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
const StatisticsLayout = () => {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.bg.primary },
        headerTitleStyle: { color: theme.colors.text.primary },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Statistics', headerLargeTitle: true, headerRight: HeaderRight }}
      />
    </Stack>
  );
};

// later route to setting modal
const HeaderRight = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/settings')}>
      <Image source={{ uri: user?.imageUrl }} style={styles.headerRight} />
    </Pressable>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  headerRight: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
}));

export default StatisticsLayout;
