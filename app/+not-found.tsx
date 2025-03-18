import { Link, Stack } from 'expo-router';
import { Text, View } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </View>
  );
}
