import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        <Text style={styles.text}>Hello</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.typography,
  },
}));
