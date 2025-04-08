import { useClerk, useSSO } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect } from 'react';
import { View, Button, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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

export default function Home() {
  useWarmUpBrowser();

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

  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const openLink = async () => {
    await WebBrowser.openBrowserAsync('https://gymnotebook.app');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.emptyCont} />

      <Pressable style={styles.btnContainer} onPress={() => onPress('google')}>
        <Ionicons name="logo-google" size={18} />
        <Text style={styles.btnText}>Sign in w/ google</Text>
      </Pressable>
      <Pressable style={styles.btnContainer} onPress={() => onPress('apple')}>
        <Ionicons name="logo-apple" size={18} />
        <Text style={styles.btnText}>Sign in w/ apples</Text>
      </Pressable>
      <Pressable style={styles.btnContainer} onPress={openLink}>
        <Ionicons name="mail" size={18} />
        <Text style={styles.btnText}>Continue w/ email</Text>
      </Pressable>

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
  },
  emptyCont: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    borderColor: theme.colors.bg.tertiary,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
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
