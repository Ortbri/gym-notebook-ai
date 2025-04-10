import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import { useRouter } from 'expo-router';
import * as React from 'react';

import { BodyScrollView } from '~/components/BodyScroll';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Text } from '~/components/ui/Text';
// import { ThemedText } from '@/components/ThemedText';

export default function ResetPassword() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  const onResetPasswordPress = React.useCallback(async () => {
    if (!isLoaded) return;
    setErrors([]);

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, signIn]);

  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('../');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, code, password, signIn, setActive, router]);

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <Input
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          onChangeText={setCode}
        />
        <Input
          value={password}
          label="Enter your new password"
          placeholder="Enter your new password"
          secureTextEntry
          onChangeText={setPassword}
        />
        {errors.map((error) => (
          <Text style={{ color: 'red' }}>{error.longMessage}</Text>
        ))}
        <Button onPress={onVerifyPress} disabled={!code || !password}>
          Reset password
        </Button>
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <Button onPress={onResetPasswordPress} disabled={!emailAddress}>
        Continue
      </Button>
      {/* TODO: add key to error so it doesn't re-render or you can rerender on second attempt*/}
      {errors.map((error) => (
        <Text style={{ color: 'red' }}>{error.longMessage}</Text>
      ))}
    </BodyScrollView>
  );
}
