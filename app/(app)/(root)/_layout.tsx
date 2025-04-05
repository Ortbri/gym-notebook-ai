import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="chat/[id]" options={{}} />
    </Stack>
  );
};

export default AppLayout;
