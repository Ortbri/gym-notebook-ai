import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BodyScrollView } from '~/components/BodyScroll';
import { Form } from '~/components/ui/Form';
import { Button } from '~/components/ui/Button';
import { Input, PasswordInput } from '~/components/ui/Input';
import { Typography } from '~/components/ui/Text';

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const { theme } = useUnistyles();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    if (process.env.EXPO_OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsLoading(true);
    setErrors([]);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('../../(root)/(tabs)');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, signIn, emailAddress, password, setActive, router]);

  return (
    <Form>
      {/* <View style={styles.formSection}> */}
      {Platform.OS === 'web' ? <Typography>Sign in</Typography> : null}
      <Input
        autoCapitalize="none"
        value={emailAddress}
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={(email: string) => setEmailAddress(email)}
      />
      <PasswordInput
        value={password}
        label="Password"
        placeholder="Enter your password"
        onChangeText={(pwd: string) => setPassword(pwd)}
      />
      {errors.map((error) => (
        <Typography key={error.longMessage} style={{ color: theme.colors.error.main }}>
          {error.longMessage}
        </Typography>
      ))}
      <Button
        title="Sign in"
        onPress={onSignInPress}
        isDisabled={!emailAddress || !password || isLoading}
        size="lg"
      />
      {/* </View> */}

      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Typography style={styles.footerText}>Don't have an account?</Typography>
          <Button
            title="Sign up"
            onPress={() => router.push('./sign-up')}
            variant="ghost"
            size="sm"
          />
        </View>

        <View style={styles.footerSection}>
          <Typography style={styles.footerText}>Forgot password?</Typography>
          <Button
            title="Reset password"
            onPress={() => router.push('./reset-password')}
            variant="ghost"
            size="sm"
          />
        </View>
      </View>
    </Form>
  );
}

const styles = StyleSheet.create((theme) => ({
  formSection: {
    gap: 16,
  },
  footer: {
    gap: 24,
  },
  footerSection: {
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.text.secondary,
  },
}));
