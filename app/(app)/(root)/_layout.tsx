import { Stack } from 'expo-router';

// protect routes here
const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {},
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="chat/[id]" options={{}} />
    </Stack>
  );
};

export default AppLayout;
