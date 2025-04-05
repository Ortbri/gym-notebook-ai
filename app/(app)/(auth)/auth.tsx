import { useClerk, useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// import Button from '~/components/ui/Button';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const onPress = useCallback(
    async (type: 'google' | 'apple') => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: type === 'google' ? 'oauth_google' : 'oauth_apple',
          redirectUrl: AuthSession.makeRedirectUri(),
        });

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [startSSOFlow]
  );

  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
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

      {/* <Pressable style={styles.btnContainer} onPress={() => onPress('google')}>
        <Ionicons name="logo-google" size={18} />
        <Text style={styles.btnText}>Sign in w/ google</Text>
      </Pressable> */}
      {/* <Pressable style={styles.btnContainer} onPress={() => onPress('apple')}>
        <Ionicons name="logo-apple" size={18} />
        <Text style={styles.btnText}>Sign in w/ apples</Text>
      </Pressable> */}
      {/* <Button>Testing</Button> */}
      {/* <Pressable style={styles.btnContainer} onPress={openLink}>
        <Ionicons name="mail" size={18} />
        <Text style={styles.btnText}>Continue w/ email</Text>
      </Pressable> */}

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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    paddingTop: 0, // Adjusted to remove dependency on rt
    paddingBottom: 0, // Adjusted to remove dependency on rt
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
    borderRadius: 8, // Adjusted to use a static value
    borderColor: '#ccc', // Adjusted to use a static color
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    marginHorizontal: 14,
    fontSize: 12,
    textAlign: 'center',
    color: '#666', // Adjusted to use a static color
  },
  link: {
    textDecorationLine: 'underline',
  },
});
