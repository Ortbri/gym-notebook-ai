import { useSSO } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';

import { Button } from '~/components/ui/Button';
import { Form } from '~/components/ui/Form';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const UniIonicons = withUnistyles(Ionicons, (theme, rt) => ({
  color: theme.colors.text.primary,
}));

export default function Home() {
  // useWarmUpBrowser();
  const router = useRouter();
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const onPress = useCallback(
    async (type: 'google' | 'apple') => {
      try {
        // Start the authentication process by calling `startSSOFlow()`
        const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
          strategy: type === 'google' ? 'oauth_google' : 'oauth_apple',
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

        // If sign in was successful, set the active session
        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        } else {
          // If there is no `createdSessionId`,
          // there are missing requirements, such as MFA
          // Use the `signIn` or `signUp` returned from `startSSOFlow`
          // to handle next steps
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [startSSOFlow]
  );

  return (
    <Form>
      <Text style={styles.title}>Gym Notebook</Text>
      <View style={styles.btnContainer}>
        <Button
          title="Continue with Email"
          size="lg"
          variant="primary"
          onPress={() => router.navigate('/(app)/(auth)/email/sign-in')}
        />
        <Button
          leftIcon={<UniIonicons name="logo-google" size={20} />}
          title="Continue with Google"
          size="lg"
          variant="secondary"
          onPress={() => onPress('google')}
        />
        <Button
          leftIcon={<UniIonicons name="logo-apple" size={20} />}
          title="Continue with Apple"
          size="lg"
          variant="secondary"
          onPress={() => onPress('apple')}
        />

        <Text style={styles.text}>
          By continuing, you agree to our{' '}
          <Link href="https://gymnotebook.app">
            <Text style={styles.link}>Terms of Service</Text>
          </Link>{' '}
          and{' '}
          <Link href="https://gymnotebook.app">
            <Text style={styles.link}>Privacy Policy</Text>
          </Link>
        </Text>
      </View>
    </Form>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.SatoshiBold,
  },
  emptyCont: {
    flex: 1,
  },
  btnContainer: {
    gap: 8,
  },
  text: {
    marginHorizontal: 14,
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.text.tertiary,
  },
  link: {
    textDecorationLine: 'underline',
  },
}));
