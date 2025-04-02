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
        name="settings"
        options={{
          presentation: 'formSheet',
          headerShadowVisible: false,
          sheetGrabberVisible: true,
          sheetCornerRadius: theme.spacing.xl,
          contentStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
        }}
      />
    </Stack>
  );
};

export default MainLayout;
