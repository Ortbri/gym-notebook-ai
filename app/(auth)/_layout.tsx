import { Stack } from 'expo-router';

import useNavStyle from '~/components/nav/NavStyles';

const AuthLayout = () => {
  const { headerBlurSettings } = useNavStyle();
  return (
    <Stack screenOptions={headerBlurSettings}>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="email/sign-in"
        options={{
          title: 'Sign In',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen name="email/sign-up" options={{ title: 'Sign Up' }} />
    </Stack>
  );
};

export default AuthLayout;
