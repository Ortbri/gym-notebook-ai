import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tab One',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Hello</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    padding: 24,
    backgroundColor: theme.colors.bg.primary,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
}));
