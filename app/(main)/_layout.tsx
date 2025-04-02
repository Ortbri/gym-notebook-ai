import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

const MainLayout = () => {
  const { theme } = useUnistyles();
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
          sheetCornerRadius: theme.spacing.xl,
          contentStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerTitleStyle: {
            color: theme.colors.text.primary,
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
          sheetCornerRadius: theme.spacing.xl,
          contentStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerTitleStyle: {
            color: theme.colors.text.primary,
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
          sheetCornerRadius: theme.spacing.xl,
          contentStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerTitleStyle: {
            color: theme.colors.text.primary,
          },
        }}
      />
    </Stack>
  );
};

export default MainLayout;
