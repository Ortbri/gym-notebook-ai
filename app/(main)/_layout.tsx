import { Stack } from 'expo-router';

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: 'red',
        },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings/current"
        options={{
          title: 'Settings',
          presentation: 'formSheet',
          headerShadowVisible: false,
          sheetGrabberVisible: true,
          sheetCornerRadius: 16, // Replace with a fixed value or your desired value
          contentStyle: {
            backgroundColor: '#ffffff', // Replace with your desired color
          },
          headerStyle: {
            backgroundColor: '#ffffff', // Replace with your desired color
          },
          headerTitleStyle: {
            color: '#000000', // Replace with your desired color
          },
        }}
      />
      <Stack.Screen
        name="chat/current"
        options={{
          title: 'Chat',
          presentation: 'formSheet',
          headerShadowVisible: false,
          sheetGrabberVisible: true,
          sheetCornerRadius: 16, // Replace with a fixed value or your desired value
          contentStyle: {
            backgroundColor: '#ffffff', // Replace with your desired color
          },
          headerStyle: {
            backgroundColor: '#ffffff', // Replace with your desired color
          },
          headerTitleStyle: {
            color: '#000000', // Replace with your desired color
          },
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          title: 'Chat',
          presentation: 'formSheet',
          headerShadowVisible: false,
          sheetGrabberVisible: true,
          sheetCornerRadius: 16, // Replace with a fixed value or your desired value
          contentStyle: {
            backgroundColor: '#ffffff', // Replace with your desired color
          },
          headerStyle: {
            backgroundColor: '#ffffff', // Replace with your desired color
          },
          headerTitleStyle: {
            color: '#000000', // Replace with your desired color
          },
        }}
      />
    </Stack>
  );
};

export default MainLayout;
