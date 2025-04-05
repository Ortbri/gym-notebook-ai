import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(root)',
};
const AppLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ presentation: 'fullScreenModal' }} />
    </Stack>
  );
};

export default AppLayout;
