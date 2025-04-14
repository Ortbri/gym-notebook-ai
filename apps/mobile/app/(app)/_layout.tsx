import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

export const unstable_settings = {
  initialRouteName: '(root)',
};

const AppLayout = () => {
  const { theme } = useUnistyles();
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        animationDuration: 50,
        contentStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
