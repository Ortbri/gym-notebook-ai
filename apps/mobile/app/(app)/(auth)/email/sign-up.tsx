import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BodyScrollView } from '~/components/BodyScroll';
import { Button } from '~/components/ui/Button';
import { Input, PasswordInput } from '~/components/ui/Input';
import { Typography } from '~/components/ui/Text';

// import { ThemedText } from '@/components/ThemedText';
// import { BodyScrollView } from '@/components/ui/BodyScrollView';
// import Button from '@/components/ui/button';
// import TextInput from '@/components/ui/text-input';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { theme } = useUnistyles();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    if (process.env.EXPO_OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsLoading(true);
    setErrors([]);

    try {
      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    if (process.env.EXPO_OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('../(root)/(tabs)');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: unknown) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView>
        <View style={styles.container}>
          <Input
            value={code}
            label={`Enter the verification code we sent to ${emailAddress}`}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
          />
          <Button
            title="Verify"
            onPress={onVerifyPress}
            isDisabled={!code || isLoading}
            size="lg"
          />
          {errors.map((error) => (
            <Typography key={error.longMessage} style={{ color: theme.colors.error.main }}>
              {error.longMessage}
            </Typography>
          ))}
        </View>
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView>
      <View style={styles.container}>
        <Input
          autoCapitalize="none"
          value={emailAddress}
          label="Email"
          placeholder="Enter email"
          keyboardType="email-address"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <PasswordInput
          value={password}
          label="Password"
          placeholder="Enter password"
          onChangeText={(pwd) => setPassword(pwd)}
        />
        <Button
          title="Continue"
          onPress={onSignUpPress}
          isDisabled={!emailAddress || !password || isLoading}
          size="lg"
        />
        {errors.map((error) => (
          <Typography key={error.longMessage} style={{ color: theme.colors.error.main }}>
            {error.longMessage}
          </Typography>
        ))}
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: 16,
    gap: 16,
  },
}));
