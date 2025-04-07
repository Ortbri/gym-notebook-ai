import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat/[id]"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="test/route"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
