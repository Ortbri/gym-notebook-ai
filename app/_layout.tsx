import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { theme } = useUnistyles();
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.body.style.backgroundColor = theme.colors.bg.primary;
      document.documentElement.style.backgroundColor = theme.colors.bg.primary;
    }
  }, [theme]);

  return (
    <Stack
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: theme.colors.bg.primary,
        // },
        // headerTitleStyle: {
        //   color: theme.colors.text.primary,
        // },
        headerTintColor: theme.colors.text.primary,
        contentStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
