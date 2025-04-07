import { Stack } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';
import { useUnistyles, withUnistyles } from 'react-native-unistyles';

export const unstable_settings = {
  initialRouteName: '(root)',
};
// this is a workaround to get the symbol view to work with the theme
const StyledSymbolView = withUnistyles(SymbolView, (theme) => ({
  tintColor: theme.colors.text.primary,
}));
function HeaderBack() {
  return (
    <Pressable>
      <StyledSymbolView name="0.circle" />
    </Pressable>
  );
}
const AppLayout = () => {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          // backgroundColor: theme.colors.palette.gray[13],
          backgroundColor: theme.colors.bg.primary,
        },
      }}>
      <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
